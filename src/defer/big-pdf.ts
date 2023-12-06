import { defer } from '@defer/client'
import { Storage } from '@google-cloud/storage'
import client from '@/utils/google'
import chunkText from '@/server/text-manipulation/chunk-text'
import { embedFiles } from '@/utils/openai'
import { searchEmbeddings, upsertEmbedding } from '@/server/embeddings/pinecone-functions'
import { Embedding } from 'openai/resources'
import redisClient from '@/utils/redis'
import splitPDF from '@/server/text-manipulation/split-pdf'
import deleteFile from '@/server/gcp/delete-gcps-files'
import { embedPrompt } from '@/server/embeddings/embed-prompt'
import promptAssignment from '@/server/gpt/prompt-assignment'

type Props = {
    fileNameInGCP: string,
    originalFileName: string,
    jobID: `${string}-${string}-${string}-${string}-${string}`,
    prompt: string
}

async function uploadBigPDF({ fileNameInGCP, originalFileName, jobID, prompt}: Props){
    try{
        const promise = new Promise(async (resolve, reject) => {

            await redisClient.set(jobID, JSON.stringify({status: 'processing'}), 'EX', 120)
            
            const storage = new Storage({projectId: 'altrai', authClient: await client})
            const download = await storage.bucket('pdf-source-storage-bucket').file(fileNameInGCP).download()
            
            await deleteFile(fileNameInGCP, 'pdf-source-storage-bucket')
            
            const split = await splitPDF(download[0]) || reject('Error splitting pdf')
            const chunked = await chunkText(storage, split!.fileName) || reject('Error chunking text')
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

            const upsert = embeddings.length > 100 ? await upsertBatch() : await upsertEmbedding(embeddings, split!.randomID)
            if (!upsert) return reject('Error upserting embeddings')

            const serializedID = upsert?.idList.join(',')

            console.log('adding to redis')

            await redisClient.set(jobID, JSON.stringify({status: 'complete', data: {originalFileName: originalFileName, vectorPrefix: upsert?.randomID!, gcpName: split!.fileName, vectorList: serializedID}}), 'EX', 120)
            
            const embeddedPrompt = await embedPrompt(prompt)

            const search = await searchEmbeddings(upsert?.idList, embeddedPrompt.data[0]?.embedding!, upsert?.randomID!)

            const store: string[] = []

            search.forEach((match) => {
            console.log()

            const index = match.metadata?.index

            store.push(chunked[index as number]!)
        })

        console.log(store.length)

        const joined = store.join('')
        console.log(joined)

        console.log(await promptAssignment(prompt, joined, 'test'))
            resolve('resolve')
        })
        return promise
    } catch (e){
        redisClient.set(jobID, JSON.stringify({status: 'error', error: e}), 'EX', 120)
    }
}

export default defer(uploadBigPDF, {retry: 3, })