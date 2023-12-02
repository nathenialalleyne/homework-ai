import {openai} from '@/utils/openai';

export default async function promptAssignment(prompt: string, doc: string, sample: string) {
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
        
        {
            role: "user",
            content: `Rewrite the following text in first person, rick, clear and in academic language. Here is the required document: ${doc}`
        }
    ]
})
    return response.choices[0]?.message.content
}