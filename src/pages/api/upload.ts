import uploadFile from "@/server/gcp/upload-file"
import { NextApiRequest, NextApiResponse } from "next"
import formidable from 'formidable'
import splitPDF from "@/server/text-manipulation/split-pdf"
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';
import {openai} from "@/utils/openai"
import { Pinecone } from '@pinecone-database/pinecone';
import createFileInGCPStorage from "@/server/gcp/create-file";
import chunkText from "@/server/text-manipulation/chunk-text";
import { embedFiles } from "@/utils/openai";
import { upsertEmbedding } from "@/server/embeddings/pinecone-functions";
import { embedPrompt } from "@/server/embeddings/embed-prompt";

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

            // const api = await openai.embeddings.create({
            //     model: "text-embedding-ada-002",
            //     input: "long test string, this is ",
            // })

            // const pinecone = new Pinecone({ 
            // apiKey: process.env.PINECONE_API_KEY as string,
            // environment: 'gcp-starter'
            // })

            // const upsert = await pinecone.index('test').upsert([{
            //     id: '1',
            //     values: api.data[0]?.embedding as number[],
            //     metadata: {
            //         name: 'test',
            //         description: 'test'
            //     }
            // }])
            
            // return res.status(200).json({success: upsert})

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
                            const promptEmbed = await embedPrompt(fields.prompt[0] as string)

                            const upsert = await upsertEmbedding(embeddings, split.randomID, promptEmbed.data[0]?.embedding as number[])
                            
                            res(upsert)
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
            // const test = await uploadFile(data.files.file[0])

            res.status(200).json({ success: data })
        } catch (error) {
            res.status(500).json({ success: error })
        }
        break
        default:
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}