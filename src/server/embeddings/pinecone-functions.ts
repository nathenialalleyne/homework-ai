import { pinecone } from '@/utils/pinecone';
import { RecordValues } from '@pinecone-database/pinecone';
import { match } from 'assert';
import { Embedding } from 'openai/resources';

export const upsertEmbedding = async (embedding: Embedding[], randomID: string, promptEmbed: number[]) => {
    try {
        const idList: string[] = []
        const upsertData = embedding.map((embed, index) => {
            const id = randomID + '_' + String(index + 1)
            idList.push(id)
            return {
                id: id,
                values: embed.embedding as RecordValues,
                metadata: {
                    reqid: randomID,
                }
            };
        });
        await pinecone.index('test').upsert([...upsertData])


        const data = await pinecone.index('test').query({
            vector: promptEmbed,
            topK: 10,
            filter: {
                "reqid": {$eq: 'test2'}
            }
        })        

        const matches = data.matches.map((match) => {
            const id = match.id as string
            const index = idList.indexOf(id)
            return {
                ...match,
                index
            }
        })
        return matches
    }
    catch (e) {
        throw new Error(`Error upserting embedding`, {
            cause: e
        })
    }
}

// const getEmbeddings = async (id: string, promptEmbed: number[]) => {
//     try {
//         const data = await pinecone.index('test').query({
//             id,
//             vector: promptEmbed,
//             topK: 10,
//         })
//         return data
//     }
//     catch (e) {
//         throw new Error(`Error retrieving embedding`, {
//             cause: e
//         })
//     }
// }

// export const searchEmbeddings = async (id: string) => {
//     try {
//         const embeddings = getEmbeddings(id)
//         ;(await embeddings).matches.map((match) => match.)
//         const data = await pinecone.index('test').retrieve(id)
//         return data
//     }
//     catch (e) {
//         throw new Error(`Error retrieving embedding`, {
//             cause: e
//         })
//     }
// }