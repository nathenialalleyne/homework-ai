import z from 'zod'
  
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

async function ocrEndpoint(convert: string){
    if (!convert) return
  
    const formData = new FormData();
    formData.append("base64Image", convert);
    formData.append("OCREngine", "2");

    const data = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          apikey: 'K84034087688957',
        },
        body: formData
      })

    const dataJson = await data.json()
    return dataJson
}


export const convertRouter = createTRPCRouter({
  convert: publicProcedure
    .input(z.object({ base64: z.string() }))
    .query(async ({ input }) => {
      try{
        const converted = await ocrEndpoint(input.base64)
        return converted;
      }catch(err){
        return err
      }
    }),
});