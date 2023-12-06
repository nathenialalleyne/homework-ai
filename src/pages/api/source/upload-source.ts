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
import { assignOptions, awaitResult, getExecution } from '@defer/client';
import { btoa } from 'buffer';

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req: NextApiRequestWithFormData, res: NextApiResponse){

  try{
    const form = formidable({})

    const formPromise: {jobID: `${string}-${string}-${string}-${string}-${string}`, executionID: string} = await new Promise(async (resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) return reject(err)
        if (!files.file) return reject('No file uploaded')
        if (!fields.prompt) return reject('No prompt uploaded')

        const file = files.file[0] as formidable.File
        const prompt = fields.prompt?.[0] as string

        if (file.mimetype == 'application/pdf'){

          const pdfData = await fs.promises.readFile(file.filepath)
          const pdf = await PDFDocument.load(pdfData)

          if (pdf.getPageCount() > 5){
            if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, pdfData, 'application/pdf'))) return reject('Error uploading to GCP')
            const jobID = randomUUID()
            assignOptions(uploadBigPDF, {metadata: {jobID: jobID}})
            
            const {id} = await uploadBigPDF({fileNameInGCP: file.newFilename, originalFileName: file.originalFilename!,  jobID: jobID, prompt: prompt})

            return resolve({jobID: jobID, executionID: id})
            
          }
          else{
            if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, pdfData, 'application/pdf'))) return reject('Error uploading to GCP')
            const jobID = randomUUID()
            assignOptions(uploadSmallPDF, {metadata: {jobID: jobID}})
            
            const { id } = await uploadSmallPDF({fileNameInGCP: file.newFilename, originalFileName: file.originalFilename!,  jobID: jobID})

            return resolve({jobID: jobID, executionID: id})
            
          }
        }
        
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
          const imageData = await fs.promises.readFile(file.filepath)
          const jobID = randomUUID()

          if (!(await createFileInGCPStorage('pdf-source-storage-bucket', file.newFilename, imageData, file.mimetype))) return reject('Error uploading to GCP')
          assignOptions(uploadImage, {metadata: {jobID: jobID}})

          const { id } = await uploadImage({fileNameInGCP: file.newFilename, originalFileName: file.originalFilename!,  jobID: jobID, mimetype: file.mimetype})

          return resolve({jobID: jobID, executionID: id})
        }
      })
    })

    if (formPromise) return res.status(200).json({message: 'Success', jobID: formPromise?.jobID!, executionID: formPromise?.executionID! })
    else return res.status(500).json({error: 'Error uploading file'})

  }
  catch(err){
    return res.status(500).json({error: 'error'})
  }
}