import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import z from 'zod'
import promptOpenAI from '@/defer/prompt'
import { randomUUID } from 'crypto'
import { awaitResult, defer } from '@defer/client'

export const sourceRouter = createTRPCRouter({
  promptOpenAI: publicProcedure
    .input(z.object({ gcpName: z.string(), prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const source = await ctx.db.source.findFirst({
        where: {
          gcpFileName: input.gcpName,
        },
      })

      const vectorList = source?.vectorList.split(',')
      const vectorPrefix = source?.vectorPrefix!

      const jobID = randomUUID()
      const { id } = await promptOpenAI({
        prompt: input.prompt,
        fileNameInGCP: input.gcpName,
        vectorList: vectorList!,
        vectorPrefix: vectorPrefix,
        jobID: jobID,
        userID: ctx.auth.userId!,
      })

      return { id: id }
    }),
})
