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
        topK: idList.length,
        filter: {
            "reqid": {$eq: randomID}            
        },
        includeMetadata: true
    })        

    const matches = data.matches.map((match) => {
        const id = match.id as string
        const index = idList.indexOf(id)
        console.log(match.score)
        return {
            ...match,
            index
        }
    })

    if (matches.length === 0) {
        return searchEmbeddings(idList, promptEmbed, randomID);
    }

    const totalScore = matches.reduce((sum, match) => sum + match?.score!, 0);
    const averageScore = totalScore / matches.length;


    const percentageBelowAverage = 0.4; 

    const belowAverageThreshold = averageScore * (1 - percentageBelowAverage);

    const potentiallyRelevantMatches = matches.filter(match => match?.score! >= belowAverageThreshold);

    return potentiallyRelevantMatches
}

export async function getEmbeddings(vectorPrefix: string, length: number){
    const embeddings = []
    const hold = []
    for (let i=0;i<length;i++){
        hold.push(`${vectorPrefix}_${i}`)
    }

    const data = embeddings.push(await pinecone.index('test').fetch(hold))

    console.log(data)
    console.log(embeddings)

    if (embeddings.length === 0) {
        return getEmbeddings(vectorPrefix, length);
    }
    
    return embeddings
}