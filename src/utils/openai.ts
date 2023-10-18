import OpenAI from "openai";

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
});

export const embedFiles = async (files: string[]) => {
    const embeddings = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: files,
    });

    return embeddings.data;
}