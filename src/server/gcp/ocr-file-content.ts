import vision from '@google-cloud/vision'
import storage from '@/utils/google'
import deleteFile from './delete-gcps-files'
import { randomUUID } from 'crypto'
import client from '@/utils/google'
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth'

export default async function OCRFileContent(
  url: string,
  fileName: string,
  randomID: `${string}-${string}-${string}-${string}-${string}`,
  type: string,
) {
  const gcsKey = JSON.parse(
    Buffer.from(process.env.GCP_CRED_FILE!, 'base64').toString(),
  )
  try {
    if (type === 'application/pdf') {
      const visionClient = new vision.ImageAnnotatorClient({
        projectId: 'altrai',
        credentials: {
          client_email: gcsKey.client_email,
          private_key: gcsKey.private_key,
        },
      })
      const [operation] = await visionClient.asyncBatchAnnotateFiles({
        requests: [
          {
            inputConfig: {
              gcsSource: {
                uri: url,
              },
              mimeType: 'application/pdf',
            },
            features: [
              {
                type: 'DOCUMENT_TEXT_DETECTION',
              },
            ],
            outputConfig: {
              gcsDestination: {
                uri: 'gs://pdf-source-storage-bucket/' + randomID,
              },
            },
          },
        ],
      })

      await operation.promise()

      const fileContent = await fetchAndCombineJSONFiles(randomID)

      if (!fileContent) {
        throw new Error('No file content')
      }

      return fileContent
    }

    if (type === 'image/jpeg' || type === 'image/png') {
      const visionClient = new vision.ImageAnnotatorClient({
        projectId: 'altrai',
        credentials: {
          client_email: gcsKey.client_email,
          private_key: gcsKey.private_key,
        },
      })
      const [result] = await visionClient.documentTextDetection(url)

      deleteFile(fileName)

      return result.fullTextAnnotation
    }
  } catch (err) {
    throw new Error('No file content', {
      cause: err,
    })
  }
}

const fetchAndCombineJSONFiles = async (prefix: string) => {
  try {
    const [files] = await storage.bucket('pdf-source-storage-bucket').getFiles({
      prefix: prefix,
    })

    const fileContents = []
    for (const file of files) {
      const [data] = await file.download()
      fileContents.push(data.toString('utf-8'))
      file.delete()
    }

    return fileContents
  } catch (err) {
    throw new Error('Error fetching and combining JSON files', {
      cause: err,
    })
  }
}
