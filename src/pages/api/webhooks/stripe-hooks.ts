import stripe from '@/utils/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

import { buffer } from 'micro'
import { db } from '@/server/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const signature = req.headers['stripe-signature']
    if (!signature) throw new Error('Stripe signature is required')

    const buf = await buffer(req)
    const endpointSecret =
      'whsec_bb513486ef44d95ffb90c9104140efe8ffda649645d21c2168e350b6cbc4cba2'

    let event: any

    try {
      event = stripe.webhooks.constructEvent(buf, signature, endpointSecret)
      if (!event) console.log('Event is null')
    } catch (err: any) {
      console.log(err)
      res.status(402).send(`Webhook Error: ${err.message}`)
      return
    }

    const { id } = event.data
    console.log(event)
    console.log('Event ID: ' + id)

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        if (
          await db.user.findUnique({
            where: { id: paymentIntentSucceeded.metadata.userId },
          })
        ) {
          await db.user.update({
            where: { id: paymentIntentSucceeded.metadata.userId },
            data: { accountType: 'premium' },
          })
          break
        }

        await db.user.create({
          data: {
            id: paymentIntentSucceeded.metadata.userId,
            actionsRemaining: 10,
            accountType: 'premium',
          },
        })
        break

      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object
        db.user.update({
          where: { id: subscriptionDeleted.metadata.userId },

          data: { accountType: 'free' },
        })

        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}
