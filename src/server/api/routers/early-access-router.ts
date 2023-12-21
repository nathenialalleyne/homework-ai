import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import z from 'zod'
import resend from '@/utils/resend'
import EarlyAccessSignUp from '@/emails/early-access-email'

export const earlyAccessRouter = createTRPCRouter({
  addToEmailList: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email } = input
      // if (await ctx.db.earlyAccess.findUnique({ where: { email: email } })) {
      //   return { status: 'registered' }
      // }

      await resend.emails.send({
        from: 'info@geniusdraft.com',
        to: email,
        subject: 'Signed up for early access',
        react: EarlyAccessSignUp(),
      })
      // if (await ctx.db.earlyAccess.create({ data: { email: email } })) {

      // }
      return { status: 'ok' }

      throw new Error('Failed to add to email list')
    }),
})
