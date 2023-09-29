import z from 'zod'
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


export const databaseRouter = createTRPCRouter({
  addSample: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input,ctx }) => {
        await ctx.db.writingSamples.create({
          data:{
            user: ctx.auth.userId as string,
            text: input.text
          }
        })
    }),
  getSamples: publicProcedure
    .query(async ({ ctx }) => {
      const samples = await ctx.db.writingSamples.findMany({
        where:{
          user: ctx.auth.userId as string
        }
      })
      return samples
    }),
  updateSample: publicProcedure
    .input(z.object({ id: z.number(), text: z.string() }))
    .query(async ({ input,ctx }) => {
      await ctx.db.writingSamples.update({
        where:{
          id: input.id
        },
        data:{
          text: input.text
        }
      })
    }),
    
});