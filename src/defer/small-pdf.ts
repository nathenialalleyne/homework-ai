import { defer } from '@defer/client'
import storage from '@/utils/google'
import chunkText from '@/server/text-manipulation/chunk-text'
import { embedFiles } from '@/utils/openai'
import { upsertEmbedding } from '@/server/embeddings/pinecone-functions'
import redisClient from '@/utils/redis'
import deleteFile from '@/server/gcp/delete-gcps-files'
import OCRFileContent from '@/server/gcp/ocr-file-content'
import { randomUUID } from 'crypto'
import createFileInGCPStorage from '@/server/gcp/create-file'
import { db } from '@/server/db'

type Props = {
  fileNameInGCP: string
  originalFileName: string
  jobID: `${string}-${string}-${string}-${string}-${string}`
  userID: string
}

async function uploadSmallPDF({
  fileNameInGCP,
  originalFileName,
  jobID,
  userID,
}: Props) {
  try {
    const promise = new Promise(async (resolve, reject) => {
      // await redisClient.set(
      //   jobID,
      //   JSON.stringify({ status: 'processing' }),
      //   'EX',
      //   120,
      // )

      const text = await OCRFileContent(
        'gs://pdf-source-storage-bucket/' + fileNameInGCP,
        fileNameInGCP,
        randomUUID(),
        'application/pdf',
      )
      const parsedText: string = JSON.parse(text as string).responses[0]
        .fullTextAnnotation?.text!

      const uuid = `${randomUUID()}.txt`
      if (
        !(await createFileInGCPStorage(
          'pdf-source-storage-bucket',
          uuid,
          parsedText,
        ))
      )
        return reject('Error uploading to GCP')

      await deleteFile(fileNameInGCP, 'pdf-source-storage-bucket')
      console.log('deleting file')

      const random = Math.random().toString(36).substring(7)
      const chunked = (await chunkText(uuid)) || reject('Error chunking text')

      const embeddings =
        (await embedFiles(chunked)) || reject('Error embedding files')

      const upsert = await upsertEmbedding(embeddings, random)
      if (!upsert) return reject('Error upserting embeddings')

      const serializedID = upsert?.idList.join(',')

      console.log('adding to redis')

      await db.source.create({
        data: {
          gcpFileName: uuid,
          name: originalFileName,
          userID: userID,
          vectorList: serializedID,
          vectorPrefix: upsert?.randomID!,
        },
      })

      // await redisClient.set(jobID, JSON.stringify({status: 'complete', data: {originalFileName: originalFileName, vectorPrefix: upsert?.randomID!, gcpName: uuid, vectorList: serializedID}}), 'EX', 120)

      resolve('resolve')
    })
    return promise
  } catch (e) {
    // redisClient.set(
    //   jobID,
    //   JSON.stringify({ status: 'error', error: e }),
    //   'EX',
    //   120,
    // )
  }
}

export default defer(uploadSmallPDF, { retry: 3 })
