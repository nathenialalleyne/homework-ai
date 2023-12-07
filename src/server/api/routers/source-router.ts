import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import z from "zod";
import promptOpenAI from "@/defer/prompt";
import { randomUUID } from "crypto";

export const sourceRouter = createTRPCRouter({
    promptOpenAI: publicProcedure
    .input(z.object({ gcpName: z.string(), prompt: z.string()}))
    .query(async ({ ctx, input }) => {
        const source = await ctx.db.source.findFirst({
            where:{
                gcpFileName: input.gcpName
            }
        })

        const vectorList = source?.vectorList.split(',')
        const vectorPrefix = source?.vectorPrefix!

        const jobID = randomUUID()
        const {id} = await promptOpenAI({prompt: input.prompt, fileNameInGCP: input.gcpName, vectorList: vectorList!, vectorPrefix: vectorPrefix, jobID: jobID})
        return {jobID: jobID, executionID: id}
    })
})