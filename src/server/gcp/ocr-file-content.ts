import vision from '@google-cloud/vision';
import { Storage } from '@google-cloud/storage';
import deleteFile from './delete-gcps-files';
import { randomUUID } from 'crypto';

export default async function OCRFileContent(url: string, fileName: string, randomID: `${string}-${string}-${string}-${string}-${string}`, type: string){

    try{ 
      if (type === 'application/pdf'){
        const client = new vision.ImageAnnotatorClient();
        const [operation] = await client.asyncBatchAnnotateFiles({
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
            uri: 'gs://pdf-source-storage-bucket/' + randomID,
          },
        },
      },
    ],
  })

  await operation.promise()

  const fileContent = await fetchAndCombineJSONFiles(randomID)
  
  if(!fileContent){
    throw new Error('No file content')
  }

  return fileContent
}

if (type === 'image/jpeg' || type === 'image/png'){
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.documentTextDetection(url);

  deleteFile(fileName)

  return result.fullTextAnnotation;
}
    } catch (err){
    throw new Error('No file content', {
      cause: err
    })
  }
}

const fetchAndCombineJSONFiles = async (prefix:string) => {
  try {
    const storage = new Storage();
    const [files] = await storage.bucket('pdf-source-storage-bucket').getFiles({
      prefix: prefix
    });

    const fileContents = [];
    for (const file of files) {
      const [data] = await file.download();
      fileContents.push(data.toString('utf-8'));
      file.delete();
    }

    return fileContents
  } catch (err) {
    throw new Error('Error fetching and combining JSON files', {
      cause: err,
    });
  }
};
