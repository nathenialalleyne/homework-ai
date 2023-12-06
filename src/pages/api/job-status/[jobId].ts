import { NextApiRequest, NextApiResponse } from 'next';
import redisClient from '@/utils/redis';
import { databaseRouter } from '@/server/api/routers/database-operations'
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/server/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { jobId } = req.query;

    try {
        if (req.method === 'GET') { 
            const getStatus = await redisClient.get(jobId as string)
            const json = JSON.parse(getStatus!)

            console.log(json)

            if (json.status == 'complete') await databaseRouter.createCaller({db: db, auth: getAuth(req)}).createSource({name: json.data.originalFileName, vectorPrefix: json.data.vectorPrefix, gcpName: json.data.gcpName, vectorList: json.data.vectorList})

            return res.status(200).json(json);
        }
    } catch (err: any) {
        return res.status(500).json({ error: 'Error getting job ' + err.message });
    }
}