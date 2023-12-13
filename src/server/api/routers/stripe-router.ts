import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import z from 'zod'
import stripe from '@/utils/stripe'

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(z.object({ URL: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(process.env.STRIPE_TEST_KEY)
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: 'price_1OKcstFnFnGc1hoSczf66Gev',
            quantity: 1,
          },
        ],
        mode: 'subscription',
        payment_method_types: ['card'],
        success_url: input.URL + `success/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: input.URL,
      })
      return { sessionID: session.id }
    }),
  getSession: publicProcedure
    .input(z.object({ sessionID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input.sessionID)
      const session = await stripe.checkout.sessions.retrieve(input.sessionID)
      return session
    }),
})
