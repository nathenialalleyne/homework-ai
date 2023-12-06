import {openai} from '@/utils/openai';

export default async function promptAssignment(prompt: string, doc: string, sample: string) {
const response = await openai.chat.completions.create({
  model: "ft:gpt-3.5-turbo-1106:personal::8SslaCq5",
  messages: [
    {
      "role": "system",
      "content": 'You are a college essay writing assistant, all your essays should be formatted intro, body, conclusion. do not put identifiers for the paragraphs there should be no "introduction: " for example. Each essay should be at least 5 paragraphs long, and each essay should have at least 700 words. Remember these all need to be college grade assignments. Please use whatever resources you need to complete these assignments.'
    },
    {
      "role": "user",
      "content": `write me an essay about ${prompt}, use this document as a reference and source for most of your information: ${doc}`
    }
  ],
});
    return response.choices[0]?.message.content
}