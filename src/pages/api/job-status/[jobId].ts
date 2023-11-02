import { NextApiRequest, NextApiResponse } from 'next';
import queue from '@/utils/queue-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { jobId } = req.query;

    try{        
        if (req.method === 'GET') {
            await queue.getJob(jobId as string)
                .then((job) => {
                    if (!job) return res.status(404).json({ error: 'Job not found' });
                    return res.status(200).json({ status: job.status });
                })
                .catch((err) => {
                    return res.status(500).json({ error: 'Error getting job ' + err.message });
                });
        }
    }

    catch(err: any){
        return res.status(500).json({ error: 'Error getting job ' + err.message });
    }
}
