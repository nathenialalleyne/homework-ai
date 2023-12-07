import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { embedPrompt } from "@/server/embeddings/embed-prompt";
import { getEmbeddings, searchEmbeddings } from "@/server/embeddings/pinecone-functions";
import downloadFile from "@/server/gcp/get-file";
import chunkText from "@/server/text-manipulation/chunk-text";
import z from "zod";
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';
import promptAssignment from "@/server/gpt/prompt-assignment";
import promptOpenAI from "@/defer/prompt";
import { Storage } from "@google-cloud/storage";
import client from "@/utils/google";
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