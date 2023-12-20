import { defer } from '@defer/client'
import { embedPrompt } from '@/server/embeddings/embed-prompt'
import redisClient from '@/utils/redis'
import storage from '@/utils/google'
import { searchEmbeddings } from '@/server/embeddings/pinecone-functions'
import chunkText from '@/server/text-manipulation/chunk-text'
import promptAssignment from '@/server/gpt/prompt-assignment'
import { randomUUID } from 'crypto'
import { db } from '@/server/db'

type Props = {
  prompt: string
  jobID: `${string}-${string}-${string}-${string}-${string}`
  vectorList: string[]
  vectorPrefix: string
  fileNameInGCP: string
  userID: string
}

async function promptOpenAI({
  prompt,
  jobID,
  vectorList,
  vectorPrefix,
  fileNameInGCP,
  userID,
}: Props) {
  new Promise(async (resolve, reject) => {
    // redisClient.set(jobID, JSON.stringify({ status: 'processing' }), 'EX', 120)

    const chunked = await chunkText(fileNameInGCP)

    const embeddedPrompt = await embedPrompt(prompt)

    const search = await searchEmbeddings(
      vectorList,
      embeddedPrompt.data[0]?.embedding!,
      vectorPrefix,
    )

    const store: string[] = []

    search.forEach((match) => {
      const index = match.metadata?.index
      store.push(chunked[index as number]!)
    })

    const joined = store.join('')

    const finalPrompt = await promptAssignment(prompt, joined, 'test')

    console.log(finalPrompt)

    const fileName = `${randomUUID}.txt`
    storage.bucket('prompt-outputs').file(`${jobID}.txt`).save(finalPrompt!)

    db.assignment.create({
      data: {
        name: fileName,
        user: userID,
      },
    })

    redisClient.json.set(jobID, "$.status", 'complete', )

    resolve({ fileName: fileName })
  })
}

export default defer(promptOpenAI)
