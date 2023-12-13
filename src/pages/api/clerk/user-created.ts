import { NextApiRequest, NextApiResponse } from 'next'
import type { WebhookEvent } from '@clerk/clerk-sdk-node'
import { databaseRouter } from '@/server/api/routers/database-operations'
import { db } from '@/server/db'
import { getAuth } from '@clerk/nextjs/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

  if (!webhookSecret) {
    res.status(400).send('Missing webhook secret')
    return
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).send('Missing required headers')
  }

  const payload = JSON.stringify(req.body)
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent

  try {
    evt = wh.verify(payload, {
      svix_id: svix_id!,
      svix_timestamp: svix_timestamp!,
      svix_signature: svix_signature!,
    }) as WebhookEvent

    if (!evt) {
      throw new Error('Invalid webhook signature')
    }
  } catch (err) {
    res.status(400).send('Error occuered')
  }
  
  const { id } = evt.data
  const { type } = evt.type
}
