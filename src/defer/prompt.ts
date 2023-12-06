import {defer} from '@defer/client'
import { embedPrompt } from '@/server/embeddings/embed-prompt'
import redisClient from '@/utils/redis'
import client from '@/utils/google'
import { Storage } from '@google-cloud/storage'
import { searchEmbeddings } from '@/server/embeddings/pinecone-functions'
import chunkText from '@/server/text-manipulation/chunk-text'
import promptAssignment from '@/server/gpt/prompt-assignment'


type Props = {
    prompt: string,
    jobID: `${string}-${string}-${string}-${string}-${string}`,
    vectorList: string[],
    vectorPrefix: string,
    fileNameInGCP: string
}

async function promptOpenAI ({prompt, jobID, vectorList, vectorPrefix, fileNameInGCP}: Props){

    new Promise(async (resolve, reject) => {
        redisClient.set(jobID, JSON.stringify({status: 'processing'}), 'EX', 120)

        const storage = new Storage({projectId: 'altrai', authClient: await client})

        const chunked = await chunkText(storage, fileNameInGCP)

        const embeddedPrompt = await embedPrompt(prompt)

        const search = await searchEmbeddings(vectorList, embeddedPrompt.data[0]?.embedding!, vectorPrefix)

        const store: string[] = []

        search.forEach((match) => {
            const index = match.metadata?.index
            store.push(chunked[index as number]!)
        })

        const joined = store.join('')

        const finalPrompt = await promptAssignment(prompt, joined, 'test')

        console.log(finalPrompt)

        resolve('resolve')
    })
}

export default defer(promptOpenAI)