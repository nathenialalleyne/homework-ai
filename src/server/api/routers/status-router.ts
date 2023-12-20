import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import z from 'zod'
import redisClient from '@/utils/redis'
import { awaitResult, getExecution } from '@defer/client'
import { databaseRouter } from './database-operations'

export const statusRouter = createTRPCRouter({
  soureStatus: publicProcedure
    .input(z.object({ executionID: z.string(), jobID: z.string() }))
    .query(async ({ ctx, input }) => {
      const getStatus = await redisClient.get(input.jobID as string)
      const json = JSON.parse(getStatus as string)

      const response = await getExecution(input.executionID as string)
      const state = response.state

      if (state == 'failed' || state == 'aborted') {
        return { state: state }
      }

      if (json.status == 'complete') {
        await databaseRouter
          .createCaller({ db: ctx.db, auth: ctx.auth })
          .createSource({
            name: json.data.originalFileName,
            vectorPrefix: json.data.vectorPrefix,
            gcpName: json.data.gcpName,
            vectorList: json.data.vectorList,
          })
      }
      return { state: json.status }
    }),
  promptStatus: publicProcedure
    .input(z.object({ executionID: z.string() }))
    .query(async ({ ctx, input }) => {
      const response = await getExecution(input.executionID as string)
      const state = response.state

      if (state == 'failed' || state == 'aborted') {
        return { state: state }
      }

      if (state == 'succeed') {
        return { state: 'complete' }
      }
    }),
})
