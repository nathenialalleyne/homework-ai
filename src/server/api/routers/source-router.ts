import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { embedPrompt } from "@/server/embeddings/embed-prompt";
import { getEmbeddings, searchEmbeddings } from "@/server/embeddings/pinecone-functions";
import downloadFile from "@/server/gcp/get-file";
import chunkText from "@/server/text-manipulation/chunk-text";
import z from "zod";
import {PDFDocument} from 'pdf-lib';
import fs from 'fs';
import promptAssignment from "@/server/gpt/prompt-assignment";

export const sourceRouter = createTRPCRouter({
    useExistingSource: publicProcedure
    .input(z.object({ gcpName: z.string(), prompt: z.string() }))
    .query(async ({ ctx, input }) => {
        const source = await ctx.db.source.findFirst({
            where:{
                gcpFileName: input.gcpName
            }
        })

        const sample = await ctx.db.writingSamples.findFirst({
            where: {
                user: ctx.auth.userId!
            }
        })

        if (!source) throw new Error('Source not found')

        
        const chunked = await chunkText(input.gcpName)
        const sampleText = await downloadFile(sample!.fileName, 'user-sample-storage')
        const promptEmbedding = await embedPrompt(input.prompt)

        const search = await searchEmbeddings(source.vectorList.split(','),promptEmbedding.data[0]?.embedding!,source.vectorPrefix)

        const store: string[] = []

        search.forEach((match) => {
            console.log(match)

            const index = match.metadata?.index

            store.push(chunked[index as number]!)
        })

        const joined = store.join('')
        console.log(joined)

        return await promptAssignment(input.prompt, joined, sampleText)
    }),

})