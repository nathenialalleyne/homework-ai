import { NextApiRequest, NextApiResponse } from 'next';
import redisClient from '@/utils/redis';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { jobId } = req.query;

    try {
        if (req.method === 'GET') { 
            const getStatus = await redisClient.get(jobId as string)
            const json = JSON.parse(getStatus!)
            return res.status(200).json(json);
        }
    } catch (err: any) {
        return res.status(500).json({ error: 'Error getting job ' + err.message });
    }
}