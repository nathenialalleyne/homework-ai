import { NextApiRequestWithFormData } from '@/utils/types';
import { type NextApiResponse } from 'next';
import formidable from 'formidable'
import fs from 'fs';
import {PDFDocument} from 'pdf-lib';
import splitPDF from '@/server/text-manipulation/split-pdf';
import createFileInGCPStorage from '@/server/gcp/create-file';
import { databaseRouter } from '@/server/api/routers/database-operations';
import { db } from '@/server/db';
import { getAuth } from '@clerk/nextjs/server';
import chunkText from '@/server/text-manipulation/chunk-text';
import { embedFiles } from '@/utils/openai';
import { upsertEmbedding } from '@/server/embeddings/pinecone-functions';
import uploadBigPDF from '@/defer/big-pdf';
import uploadSmallPDF from '@/defer/small-pdf';
import uploadImage from '@/defer/image';
import { google } from '@google-cloud/vision/build/protos/protos';
import { randomUUID } from 'crypto';
import OCRFileContent from '@/server/gcp/ocr-file-content';
import deleteFile from '@/server/gcp/delete-gcps-files';
import { assignOptions } from '@defer/client';
import { btoa } from 'buffer';

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req: NextApiRequestWithFormData, res: NextApiResponse){

  try{
    const form = formidable({})

    const formPromise: {jobID: `${string}-${string}-${string}-${string}-${string}`} = await new Promise(async (resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err)
        if (!files.file) return reject('No file uploaded')

        const file = files.file[0] as formidable.File

        if (file.mimetype == 'application/pdf'){

          const pdfData = await fs.promises.readFile(file.filepath)
          const pdf = await PDFDocument.load(pdfData)

          if (pdf.getPageCount() > 5){
            if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, pdfData, 'application/pdf'))) return reject('Error uploading to GCP')
            const jobID = randomUUID()
            assignOptions(uploadBigPDF, {metadata: {jobID: jobID}})
            
            await uploadBigPDF({fileNameInGCP: file.newFilename, originalFileName: file.originalFilename!,  jobID: jobID})

            return resolve({jobID: jobID})
            
          }
          else{
            if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, pdfData, 'application/pdf'))) return reject('Error uploading to GCP')
            const jobID = randomUUID()
            assignOptions(uploadSmallPDF, {metadata: {jobID: jobID}})
            
            await uploadSmallPDF({fileNameInGCP: file.newFilename, originalFileName: file.originalFilename!,  jobID: jobID})

            return resolve({jobID: jobID})
            
          }
        }
        
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
          const imageData = await fs.promises.readFile(file.filepath)
          const jobID = randomUUID()

          if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, imageData, file.mimetype))) return reject('Error uploading to GCP')
          assignOptions(uploadImage, {metadata: {jobID: jobID}})

          await uploadImage({fileNameInGCP: file.newFilename, originalFileName: file.originalFilename!,  jobID: jobID, mimetype: file.mimetype})
          return resolve({jobID: jobID})
        }

        //   else{
        //     const random = Math.random().toString(36).substring(7)

        //     if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, pdfData))) return reject('Error uploading to GCP')

            
            // const text = await OCRFileContent('gs://pdf-source-storage-bucket/' + file.newFilename, file.newFilename, randomUUID(), file.mimetype)
        //     const parsedText = JSON.parse(text as string).responses[0].fullTextAnnotation?.text!
        //     await deleteFile(file.newFilename)
        //     const uuid = `${randomUUID()}.txt`
        //     if (!(await createFileInGCPStorage('pdf-source-storage-bucket', uuid, parsedText))) return reject('Error uploading to GCP')

        //     const chunked = await chunkText(uuid) || reject('Error chunking text')
        //     const embeddings = await embedFiles(chunked) || reject('Error embedding files')

        //     const upsert = await upsertEmbedding(embeddings, random)
        //     const serializedID = upsert?.idList.join(',')
        //     console.log(serializedID)

        //     if (!upsert) return reject('Error upserting embeddings')

        //     await databaseRouter.createCaller({db: db, auth: getAuth(req)}).createSource({name: file.originalFilename!, gcpName: uuid, vectorPrefix: upsert?.randomID, vectorList: serializedID})
        //     resolve('resolve')
        //   }
        // }

        // if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
        //   console.log('test')
        //   const random = Math.random().toString(36).substring(7)
        //   const fileData = await fs.promises.readFile(file.filepath)

        //   if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, fileData))) return reject('Error uploading to GCP')
        //   const text = await OCRFileContent('gs://pdf-source-storage-bucket/' + file.newFilename, file.newFilename, randomUUID(), file.mimetype)
        //   console.log((text as google.cloud.vision.v1.ITextAnnotation).text)
          
        //   const uuid = `${randomUUID()}.txt`
        //   if (!(await createFileInGCPStorage('pdf-source-storage-bucket', uuid, (text as google.cloud.vision.v1.ITextAnnotation).text!))) return reject('Error uploading to GCP')
        //   const embeddings = await embedFiles([(text as google.cloud.vision.v1.ITextAnnotation).text!]) || reject('Error embedding files')

        //   const upsert = await upsertEmbedding(embeddings, random)

        //   if (!upsert) return reject('Error upserting embeddings')

        //   const serializedID = upsert?.idList.join(',')
        //   console.log(serializedID)

        //   await databaseRouter.createCaller({db: db, auth: getAuth(req)}).createSource({name: file.originalFilename!, gcpName: uuid, vectorPrefix: upsert?.randomID, vectorList: serializedID})
        //   resolve('resolve')

        // }

        // else return reject('Invalid file type')
      })
    })

    if (formPromise) return res.status(200).json({message: 'Success', jobID: formPromise?.jobID! })
    else return res.status(500).json({error: 'Error uploading file'})

  }
  catch(err){
    return res.status(500).json({error: 'error'})
  }
}