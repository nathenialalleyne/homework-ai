import {openai} from '@/utils/openai';

export default async function promptAssignment(prompt: string, doc: string) {
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
        {
            role: "system",
            content: "The following is a conversation with an AI assistant that write essays using provided text documents. The assistant is helpful, creative, clever, and very friendly and writes in a human-like manner.",
            
        },
        {
            role: "user",
            content: `Write an essay on the following topic: ${prompt}, using only what is found in the following documents, also be sure to cite specifically from the text: ${doc}`
        }
    ]
})
    console.log(response.choices[0]?.message.content)
    return response.choices[0]?.message.content
}