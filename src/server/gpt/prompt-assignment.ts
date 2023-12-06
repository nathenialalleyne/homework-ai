import {openai} from '@/utils/openai';

export default async function promptAssignment(prompt: string, doc: string, sample: string) {
const response = await openai.chat.completions.create({
  model: "gpt-4-1106-preview",
  messages: [
    {
      "role": "system",
      "content": "You are an assistant whose job is to write essays in English and transmit them back as JSON. You may be provided with text that you are to use as a source and any additional information you can provide on the topic based on your existing knowledge. Please provide specific textual evidence from the provided source. If a source isn't provided please use any existing knowledge, and do not provide specific textual examples from non input sources. You will also be given a sample of writing that you must write in the style of, this means you're to imitate commonly used vocabulary, tone (if it fits the specific assignment you're prompted for), sentence structure, and punctuation. Do not copy the subject of the provided sample, you are to write about the requested prompt. If a sample is not provided, please use any existing knowledge.\nplease expand upon the thoughts in every paragraph you create, so if you have something where additional information could be provided, please provide it rather than moving along to a new paragraph.\nit should be structured as so:\nintroduction\nbody paragraphs (however many are deemed necessary)\nconclusion\n\nthe overall essay length NEEDS to be 1000 words or more\nand your JSON output should be as such\n{\ncontent:{\nintro,\nbody: [content, etc],\nconclusion,\n},\nsources: [source1, etc]\n}\ndo not deviate from this schema.\n\ndo not put the conclusion into the body\n\nmake sure to expand on any ideas you have in a paragraph to make sure the amount you've written fits the required word count and group any similar or continuing thoughts within the same paragraph"
    },
    {
      "role": "user",
      "content": `As my essay writing assistant, write me an in-depth 1500-word essay about ${prompt}, and it's impact on modern civilizations, here is the source i want you to write based off, please use specific textual evidence: \nplease follow this prompt exactly ${doc}`
    }
  ],
  temperature: 0.5,
  max_tokens: 4095,
  top_p: 0.77,
  frequency_penalty: 0.2,
  presence_penalty: 0,
});
    return response.choices[0]?.message.content
}