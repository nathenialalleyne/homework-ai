import stripe from '@/utils/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false,
  },
}

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

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log(paymentIntentSucceeded)
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.status(200).json({ received: true })
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}
