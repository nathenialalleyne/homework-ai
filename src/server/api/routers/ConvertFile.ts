import z from 'zod'
  
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { utapi } from 'uploadthing/server';

async function ocrEndpoint(convert: string){
    if (!convert) return
  
    const formData = new FormData();
    formData.append("url", convert);
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
    .input(z.object({ fileKey: z.string() }))
    .query(async ({ input }) => {
      try{
        const file = await utapi.getFileUrls(input.fileKey)
        const converted = await ocrEndpoint(file[0]?.url as string)
        return converted;
      }catch(err){
        return err
      }
    }),
});