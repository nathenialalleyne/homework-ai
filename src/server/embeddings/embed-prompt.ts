import { openai } from '@/utils/openai';

export const embedPrompt = async (prompt: string) => {
    const embedding = await openai.embeddings.create({
        input: prompt,
        model: "text-embedding-ada-002",
    })
    return embedding;
}
