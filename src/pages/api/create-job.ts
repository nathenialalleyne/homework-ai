import {type NextApiRequest, type NextApiResponse} from 'next';
import BeeQueue, {Job} from 'bee-queue';
import formidable from 'formidable';
import queue from "@/utils/queue-config";
import process from '@/server/jobs/process-file';


interface NextApiRequestWithFormData extends NextApiRequest {
    files: {
        [key: string]: any
    }

}

type JobData = {
    file: formidable.File,
    prompt: string
}

export const config = {
  api: {
    bodyParser: false,
  }
};

export default async function handler(req: NextApiRequestWithFormData, res: NextApiResponse){
    if (req.method === 'POST'){
        const form = formidable({})

        const data: JobData = await new Promise((res, rej) =>{
            form.parse(req, async (err, fields, files) => {
                if (err) return rej(err)
                if (!files.file) return rej("No file provided")
                if (!fields.prompt) return rej("No prompt provided")
                const file = files.file[0] as formidable.File

                res({file: file, prompt: fields.prompt[0] as string})
            })
        })

        if (data instanceof Error) return res.status(400).json({error: 'Error parsing form data ' + data.message})

        try{
            const job = await queue.createJob({file: data.file, prompt: data.prompt}).save()
            await process(job)
            res.status(200).json({jobId: job.id.toString()})
        }

        catch(err: any){
            return res.status(500).json({error: 'Error processing file ' + err.message})
        }
    }else{
        res.status(405).json({error: 'Method not allowed'})
    }
}