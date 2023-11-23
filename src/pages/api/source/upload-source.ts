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
import { type Embedding } from 'openai/resources';

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req: NextApiRequestWithFormData, res: NextApiResponse){
  try{
    const form = formidable({})
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({error: err})
        if (!files.file) return res.status(500).json({error: "No file provided"})

        const file = files.file[0] as formidable.File

        if (file.mimetype == 'application/pdf'){

          const pdfData = await fs.promises.readFile(file.filepath)
          const pdf = PDFDocument.load(pdfData)

          if ((await pdf).getPageCount() > 5){
            const split = await splitPDF(file.filepath)
            if (!split) return res.status(500).json({error: "Error splitting PDF"})

            await createFileInGCPStorage('pdf-source-storage-bucket', split.fileName, split.fullDocumentText)

            const chunked = await chunkText(split.fileName)
            const embeddings = await embedFiles(chunked)


            function chunckEmbeddings(){
                const maxBatchSize = 100;
                const batches = [];

                for (let i = 0; i < chunked.length; i += maxBatchSize) {
                    const chunkBatch = embeddings.slice(i, i + maxBatchSize);
                    batches.push(chunkBatch);
                }

                return batches
            }

            async function upsertBatch(){
              const chunkArr = chunckEmbeddings()
              const idList = []
                  for (let i=0;i<chunkArr.length;i++){
                      const upsert = await upsertEmbedding(chunkArr[i] as Embedding[], `${split?.randomID}_${i}`)
                      idList.push(...upsert.idList)
                  }
              return {idList, randomID: split?.randomID}
            }

            const upsert = embeddings.length > 100 ? await upsertBatch() : await upsertEmbedding(embeddings, split.randomID)

            await databaseRouter.createCaller({db: db, auth: getAuth(req)}).createSource({name: file.originalFilename!, vectorPrefix: upsert.randomID!, gcpName: split.fileName})
            res.status(200)
        }
      }
    })
  }
  catch(err){
    res.status(500).json({error: err})
  }
}