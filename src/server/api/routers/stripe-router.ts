import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import z from "zod";
import stripe from '@/utils/stripe';

export const stripeRouter = createTRPCRouter({
    createCheckoutSession: publicProcedure
    .input(z.object({ priceID: z.string(), successURL: z.string(), cancelURL: z.string()}))
    .query(async ({ ctx, input }) => {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: input.priceID,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            payment_method_types: ['card'],
            success_url: input.successURL + `?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: input.cancelURL,
        });
        return {sessionID: session.id}
    })


})