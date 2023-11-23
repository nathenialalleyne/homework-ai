import { pinecone } from '@/utils/pinecone';
import { RecordMetadata, RecordValues, ScoredPineconeRecord } from '@pinecone-database/pinecone';
import { match } from 'assert';
import { Embedding } from 'openai/resources';

export const upsertEmbedding = async (embedding: Embedding[], randomID: string) => {
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
                    index: index
                }
            };
        });
        await pinecone.index('test').upsert([...upsertData])
        return {idList, randomID}
    }
    catch (e) {
        throw new Error(`Error upserting embedding ${e}`, {
            cause: e
        })
    }
}

export const searchEmbeddings = async (idList: string[], promptEmbed: number[], randomID: string): Promise<ScoredPineconeRecord<RecordMetadata>[]> => {
    const data = await pinecone.index('test').query({
        vector: promptEmbed,
        topK: Math.floor(idList.length / 4),
        filter: {
            "reqid": {$eq: randomID}            
        },
        includeMetadata: true
    })        

    const matches = data.matches.map((match) => {
        const id = match.id as string
        const index = idList.indexOf(id)
        return {
            ...match,
            index
        }
    })

    if (matches.length === 0) {
        return searchEmbeddings(idList, promptEmbed, randomID);
    }

    return matches
}