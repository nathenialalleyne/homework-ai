import { defer } from '@defer/client'
import { GoogleAuth } from 'google-auth-library'
import { Storage } from '@google-cloud/storage'
import client from '@/utils/google'
import chunkText from '@/server/text-manipulation/chunk-text'
import { embedFiles } from '@/utils/openai'
import { NextApiRequestWithFormData } from '@/utils/types'
import { databaseRouter } from '@/server/api/routers/database-operations'
import { upsertEmbedding } from '@/server/embeddings/pinecone-functions'
import { Embedding } from 'openai/resources'
import { db } from '@/server/db'
import { getAuth } from '@clerk/nextjs/dist/types/server-helpers.server'
import redisClient from '@/utils/redis'

type Props = {
    req: NextApiRequestWithFormData,
    split: {fileName: string, fullDocumentText: string, randomID: string}
    originalFileName: string,
    jobID: `${string}-${string}-${string}-${string}-${string}`
}

async function uploadBigPDF({ req, split, originalFileName, jobID}: Props){
    return new Promise(async (resolve, reject) => {
        
        redisClient.set(jobID, 'processing')

        const storage = new Storage({projectId: 'altrai', authClient: await client})

        const chunked = await chunkText(storage, split.fileName) || reject('Error chunking text')
        const embeddings = await embedFiles(chunked) || reject('Error embedding files')


        function chunckEmbeddings(){
            const maxBatchSize = 100;
            const batches = [];

            for (let i = 0; i < chunked.length; i += maxBatchSize) {
                const chunkBatch = embeddings.slice(i, i + maxBatchSize);
                batches.push(chunkBatch);
            }

            return batches
        }

        async function upsertBatch(){
            const chunkArr = chunckEmbeddings()
            const idList = []
                for (let i=0;i<chunkArr.length;i++){
                    const upsert = await upsertEmbedding(chunkArr[i] as Embedding[], `${split?.randomID}_${i}`)
                    idList.push(...upsert.idList)
                }
            if (idList.length) return reject('Error upserting embeddings')

            return {idList, randomID: split?.randomID}
        }

        const upsert = embeddings.length > 100 ? await upsertBatch() : await upsertEmbedding(embeddings, split.randomID)

        if (!upsert) return reject('Error upserting embeddings')

        const serializedID = upsert?.idList.join(',')

        await databaseRouter.createCaller({db: db, auth: getAuth(req)}).createSource({name: originalFileName, vectorPrefix: upsert?.randomID!, gcpName: split.fileName, vectorList: serializedID})

        redisClient.set(jobID, 'complete', 'EX', 60)

        resolve('resolve')
    })
}

export default defer(uploadBigPDF)