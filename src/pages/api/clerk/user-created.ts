import {NextApiRequest, NextApiResponse} from 'next';
import type { WebhookEvent } from "@clerk/clerk-sdk-node"
import { databaseRouter } from '@/server/api/routers/database-operations';
import { db } from '@/server/db';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const evt = req.body.evt as WebhookEvent;
  
  try{
    switch(evt.type) {
      case "user.created":
        const dbRouter = databaseRouter.createCaller({db: db, auth: getAuth(req)})
        await dbRouter.createUser({
          id: evt.data.id,
          createdAt: new Date(evt.data.created_at),
        })

        break;
    }
    res.status(200)
  }
  catch(e){
    res.status(400)
  }
}
