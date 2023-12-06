import { NextApiRequest, NextApiResponse } from 'next';
import redisClient from '@/utils/redis';
import { databaseRouter } from '@/server/api/routers/database-operations'
import { getAuth } from '@clerk/nextjs/server';
import { db } from '@/server/db';
import { awaitResult, getExecution } from '@defer/client';
import promptOpenAI from '@/defer/prompt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { executionID } = req.query;
    const split = executionID?.toString().split(',')

    try {
        if (req.method === 'GET') { 
            const jobID = split?.[0]
            const executionID: string = split?.[1]!
            const getStatus = await redisClient.get(jobID as string)
            const json = JSON.parse(getStatus!)

            const response = await getExecution(executionID as string)
            const state = response.state
            
            if (state == 'failed'){
                return res.status(400).json({error: 'Job failed'})
            }

            if(json.status == 'complete'){
                await databaseRouter.createCaller({db: db, auth: getAuth(req)}).createSource({name: json.data.originalFileName, vectorPrefix: json.data.vectorPrefix, gcpName: json.data.gcpName, vectorList: json.data.vectorList})
            }

            return res.status(200).json({state: json.status, result: response.result});
        }
    } catch (err: any) {
        return res.status(500).json({ error: 'Error getting job ' + err.message });
    }
}