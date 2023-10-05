import vision from '@google-cloud/vision';
import { Storage } from '@google-cloud/storage';

export default async function OCRFileContent(url: string, fileName: string){
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

  const fileContent = await readOCRFileContent(fileName + 'output-1-to-1.json' as string)

  if(!fileContent){
    throw new Error('No file content')
  }

  return fileContent
}

export const readOCRFileContent = async (fileName: string) => {
    try{
        const file = await new Promise((res,rej)=>{
            new Storage().bucket('pdf-source-storage-bucket')
            .file(fileName)
            .download().then((d)=>{
            res((d[0].toString('utf-8')))
            })
        })
        return JSON.parse((file as string)).responses[0].fullTextAnnotation.text
    }catch(err){
        throw new Error('No file content', {
            cause: err
        })
    }

    }