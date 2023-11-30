import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getEmbeddings, searchEmbeddings } from "@/server/embeddings/pinecone-functions";
import downloadFile from "@/server/gcp/get-file";
import chunkText from "@/server/text-manipulation/chunk-text";
import z from "zod";

export const sourceRouter = createTRPCRouter({
    useExistingSource: publicProcedure
    .input(z.object({ gcpName: z.string() }))
    .query(async ({ ctx, input }) => {
        const source = await ctx.db.source.findFirst({
            where:{
                gcpFileName: input.gcpName
            }
        })

        if (!source) throw new Error('Source not found')
        const chunked = await chunkText(input.gcpName)
        const search = await searchEmbeddings(source.vectorList.split(','),[1],source.vectorPrefix)
        const store: string[] = []

        search.forEach((match) => {
            console.log(match)

            const index = match.metadata?.index

            store.push(chunked[index as number]!)
        })

        return store
    }),

})