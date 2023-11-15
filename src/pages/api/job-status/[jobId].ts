import { NextApiRequest, NextApiResponse } from 'next';
import queue from '@/utils/queue-config';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { jobId } = req.query;

    
    try {
        if (req.method === 'GET') { 
            const job = await queue.getJob(jobId as string)
            const jobt = {}

            if (!job) {
                return res.status(404).json({ error: 'Job not found' });
            }


            job.on('succeeded', (res)=>{
                console.log('job succeeded')
                console.log(res)
            })

            return res.status(200).json({ job: job.status});
        }
    } catch (err: any) {
        return res.status(500).json({ error: 'Error getting job ' + err.message });
    }
}