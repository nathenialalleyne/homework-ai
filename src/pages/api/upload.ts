import uploadFile from "@/server/gcp/upload-file"
import { NextApiRequest, NextApiResponse } from "next"
import formidable from 'formidable'
import splitPDF from "@/server/text-manipulation/split-pdf"
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';
import {openai} from "@/utils/openai"
import { Pinecone, RecordMetadata } from '@pinecone-database/pinecone';
import createFileInGCPStorage from "@/server/gcp/create-file";
import chunkText from "@/server/text-manipulation/chunk-text";
import { embedFiles } from "@/utils/openai";
import { upsertEmbedding } from "@/server/embeddings/pinecone-functions";
import { embedPrompt } from "@/server/embeddings/embed-prompt";
import combineDocs from "@/server/text-manipulation/combine-docs";
import { pinecone } from "@/utils/pinecone";
import { Embedding } from "openai/resources";
import promptAssignment from "@/server/gpt/prompt-assignment";

interface NextApiRequestWithFormData extends NextApiRequest {
    files: {
        [key: string]: any
    }

}

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function upload(req: NextApiRequestWithFormData, res: NextApiResponse) {
    const { method } = req
    
    switch (method) {
        case "POST":
        try {
            const form = formidable({})

            const data = await new Promise((res, rej) =>{
                form.parse(req, async (err, fields, files) => {
                    if (err) return rej(err)
                    if (!files.file) return rej("No file provided")
                    if (!fields.prompt) return rej("No prompt provided")
                    const file = files.file[0] as formidable.File

                    if (file.mimetype === 'application/pdf'){
                    
                        const pdfData = await fs.promises.readFile(file.filepath)
                        const pdf = PDFDocument.load(pdfData)

                        if ((await pdf).getPageCount() > 5){
                            const split = await splitPDF(file.filepath)
                            if (!split) return rej("Error splitting PDF")

                            await createFileInGCPStorage(split.fileName, split.fullDocumentText)

                            const chunked = await chunkText(split.fileName)
                            const embeddings = await embedFiles(chunked)

                            if (chunked.length > 100){
                                const maxBatchSize = 100;
                                const batches = [];

                                for (let i = 0; i < chunked.length; i += maxBatchSize) {
                                    const chunkBatch = chunked.slice(i, i + maxBatchSize);
                                    batches.push(chunkBatch);
                                }

                                const allEmbeddings = []
                                for (const batch of batches) {
                                    const embeddings = await embedFiles(batch);
                                    allEmbeddings.push(embeddings);
                                }
                            }

                            const promptEmbed = await embedPrompt(fields.prompt[0] as string)

                            const upsert  = await upsertEmbedding(embeddings, split.randomID, promptEmbed.data[0]?.embedding as number[])
                            // const upserts = await Promise.all(allEmbeddings.map(async (embeddings, index) => {
                            //     const id = split.randomID + '_' + String(index + 1)
                            //     const results = await upsertEmbedding(embeddings, split.randomID, promptEmbed.data[0]?.embedding as number[], id)
                            //     console.log(results)
                            //     return results
                            // }))

                            const matches: string[] = []

                            for (let i=0;i<upsert.length;i++){
                                const index = (upsert[i]?.metadata as RecordMetadata).index as number
                                matches.push(chunked[index] as string)
                            }
                            // upsert.forEach((upsert)=>{
                            //     for (let i=0;i<upsert.length;i++){
                            //         const index = (upsert[i]?.metadata as RecordMetadata).index as number
                            //         matches.push(chunked[index] as string)
                            //     }
                            // })

                            const promptCombination = combineDocs(matches)

                            const assignmentFinalPrompt = await promptAssignment(promptCombination, fields.prompt[0] as string)

                            res(assignmentFinalPrompt)
                            // res(matches)

                        }else{
                            const upload = await uploadFile(file)
                            res(upload)
                        }
                    }

                    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                        const upload = await uploadFile(file)
                        res(upload)
                    }
                })
            })

            res.status(200).json({ success: data })
        } catch (error) {
            res.status(500).json({ error: error })
        }
        break
        default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}