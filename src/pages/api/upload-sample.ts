import {NextApiRequest, NextApiResponse} from 'next';
import { NextApiRequestWithFormData } from '@/utils/types';
import formidable from 'formidable';
import { databaseRouter } from "@/server/api/routers/database-operations";
import { db } from "@/server/db";
import { getAuth } from '@clerk/nextjs/server';
import { uploadFile } from '@/server/gcp/upload-sample';
import * as fs from 'fs/promises';

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

            console.log(files.file[0])

            const dbRouter = databaseRouter.createCaller({db: db, auth: getAuth(req)})
            const file = files.file[0] as formidable.File
            const buf = await fs.readFile(file.filepath)
            const upload = await uploadFile('user-sample-storage', buf, file.newFilename, file.mimetype as string)
            await fs.unlink(file.filepath);
            console.log('working')
            await dbRouter.addSample({
              text: upload.location
            })
            console.log('done')
            resolve(upload.data)
        })
    })
    res.status(200).json({data: data})
  }catch(e){
    res.status(400).json({error: e})
  }
}