import BeeQueue from "bee-queue";
import redisClient from './redis'
import { Queue } from 'bullmq'
import { Worker } from 'bullmq'
import uploadFile from "@/server/gcp/upload-file"
import { NextApiRequest } from "next"
import splitPDF from "@/server/text-manipulation/split-pdf"
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';
import { RecordMetadata } from '@pinecone-database/pinecone';
import createFileInGCPStorage from "@/server/gcp/create-file";
import chunkText from "@/server/text-manipulation/chunk-text";
import { embedFiles } from "@/utils/openai";
import { searchEmbeddings, upsertEmbedding } from "@/server/embeddings/pinecone-functions";
import { embedPrompt } from "@/server/embeddings/embed-prompt";
import combineDocs from "@/server/text-manipulation/combine-docs";
import { Embedding } from "openai/resources";
import promptAssignment from "@/server/gpt/prompt-assignment";
import { databaseRouter } from "@/server/api/routers/database-operations";
import { db } from "@/server/db";
import { getAuth } from '@clerk/nextjs/server';


// const queue = new BeeQueue('process-file-queue', {
//     redis: redisClient
// });
// const queue = new Queue('process-file-queue', {
//     connection: redisClient
// })

const queue = new BeeQueue('process-file-queue', {
    redis: redisClient
})



// export const worker = new Worker('process-job-queue', async job => {
// }, {connection: redisClient})
// queue.process(async (job: any) => {
//         const file = job.data.file
//         const prompt = job.data.prompt
//         if (file.mimetype === 'application/pdf'){
//             const pdfData = await fs.promises.readFile(file.filepath)
//             const pdf = PDFDocument.load(pdfData)
    
//             if ((await pdf).getPageCount() > 5){
//                 const split = await splitPDF(file.filepath)
//                 if (!split) return  
//                 job.reportProgress({progress: 10, message: 'Splitting PDF'})
    
//                 await createFileInGCPStorage(split.fileName, split.fullDocumentText)
//                 job.reportProgress({progress: 20, message: 'Stored File in GCP Storage'})
    
//                 // await databaseRouter.createCaller({db: db, auth: getAuth(job.req)}).createSource({id: split.fileName, name: file.originalFilename as string})
//                 // job.reportProgress({progress: 25, message: 'Stored Source in DB'})

//                 const chunked = await chunkText(split.fileName)
//                 const embeddings = await embedFiles(chunked)
    
//                 function chunckEmbeddings(){
//                     const maxBatchSize = 100;
//                     const batches = [];
    
//                     for (let i = 0; i < chunked.length; i += maxBatchSize) {
//                         const chunkBatch = embeddings.slice(i, i + maxBatchSize);
//                         batches.push(chunkBatch);
//                     }
    
//                     return batches
//                 }

//                 job.reportProgress({progress: 40, message: 'Embedded Text'})
                                
//                 const promptEmbed = await embedPrompt(prompt as string)

//                 job.reportProgress({progress: 40, message: 'Embedded Prompt'})
    
//                 async function upsertBatch(){
//                     const chunkArr = chunckEmbeddings()
//                     const idList = []

//                     for (let i=0;i<chunkArr.length;i++){
//                         const upsert = await upsertEmbedding(chunkArr[i] as Embedding[], `${split?.randomID}_${i}`)
//                         idList.push(...upsert)
//                     }

//                     return idList
//                 }
    
//                 const upsert  = embeddings.length > 100 ? await upsertBatch() : await upsertEmbedding(embeddings, split.randomID)
//                 job.reportProgress({progress: 70, message: 'Inserted Embeddings into Pinecone'}) 

//                 const search = await searchEmbeddings(upsert, promptEmbed.data[0]?.embedding as number[], split.randomID)
                                
//                 const matches: string[] = []
    
//                 for (let i=0;i<search.length;i++){
//                     const index = (search[i]?.metadata as RecordMetadata).index as number
//                     matches.push(chunked[index] as string)
//                 }
//                 job.reportProgress({progress: 90, message: 'Searched Embeddings'})

//                 const promptCombination = combineDocs(matches)
//                 job.reportProgress({progress: 40, message: 'Combined Documents'})

//                 const assignmentFinalPrompt = await promptAssignment(promptCombination, prompt as string)
//                 job.reportProgress({progress: 100, message: 'Prompted GPT3'})

//                 return assignmentFinalPrompt

//             }else{
//                 const upload = await uploadFile(file)
//                 return upload
//             }
//         }
    
//         if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//             const upload = await uploadFile(file)
//             return upload
//         }
// })

export default queue

