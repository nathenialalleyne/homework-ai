import {NextApiRequest, NextApiResponse} from 'next';
import { NextApiRequestWithFormData } from '@/utils/types';
import formidable from 'formidable';
import { databaseRouter } from "@/server/api/routers/database-operations";
import { db } from "@/server/db";
import { getAuth } from '@clerk/nextjs/server';
import { uploadFile } from '@/server/gcp/upload-sample';
import createFileInGCPStorage from '@/server/gcp/create-file';
import * as fs from 'fs/promises';
import WordExtractor from 'word-extractor';

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req: NextApiRequestWithFormData, res: NextApiResponse) {
  try{
    const data = await new Promise(async (resolve, reject) =>{
        const form = formidable({})
        form.parse(req, async (err, fields, files) => {
            if (err) return reject(err)
            if (!files.file) return reject("No file provided")

            const dbRouter = databaseRouter.createCaller({db: db, auth: getAuth(req)})
            const file = files.file[0] as formidable.File
            const buf = await fs.readFile(file.filepath)

            if (file.mimetype != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return reject("Invalid file type")

            const extractor = new WordExtractor();
            const doc = await extractor.extract(file.filepath)
            const body = doc.getBody()

            await createFileInGCPStorage('user-sample-storage', file.newFilename, body, 'text/plain')


            const actionType = fields.actionType?.toString()
            
            actionType === 'update' ? await dbRouter.updateSample({
              id: fields.id?.toString()!,
              newFileName: file.newFilename
            }) :
            await dbRouter.addSample({
              text: file.newFilename
            })
            console.log('done')
            resolve(body)
        })
    })
    res.status(200).json({data: data})
  }catch(e){
    res.status(400).json({error: e})
  }
}