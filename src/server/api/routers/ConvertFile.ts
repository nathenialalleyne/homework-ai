import z from 'zod'
  
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { utapi } from 'uploadthing/server';
import vision from '@google-cloud/vision';

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

async function getGoogleStorage() {
    const storage = new Storage();

    const option = {
      destination: 
    }
}

async function setEndPoint(url: string){
  const client = new vision.ImageAnnotatorClient();
  const [opertation] = await client.asyncBatchAnnotateFiles({
    requests: [
      {
        inputConfig: {
          gcsSource: {
            uri: url,
          },
          mimeType: 'application/pdf',
        },
        features: [
          {
            type: 'DOCUMENT_TEXT_DETECTION',
          },
        ],
        outputConfig: {
          gcsDestination: {
            uri: url,
          },
        },
      },
    ],
  })

  const [filesResponse] = await opertation.promise();

  return filesResponse
}

export const convertRouter = createTRPCRouter({
  convert: publicProcedure
    .input(z.object({ fileKey: z.string() }))
    .query(async ({ input }) => {
      try{
        const file = await utapi.getFileUrls(input.fileKey)
        const converted = await setEndPoint(file[0]?.url as string)
        return converted;
      }catch(err){
        return err
      }
    }),
});