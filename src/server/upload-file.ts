import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'crypto';
import { File } from 'formidable';

import { createReadStream } from 'fs';
import OCRFileContent from './ocr-file-content';

const storage = new Storage();

export const getSecuredUrl = async (filename: string) => {
const now = Date.now();
const expires = new Date(now + 24 * 60 * 60 * 1000);
const url = await storage.bucket('pdf-source-storage-bucket').file(filename).getSignedUrl({
expires: expires.getTime(),
version: "v4",
action: "read",
});
return url;
};

export default async function uploadFile(file: File) {

    const option = {
      destination: randomUUID()
      
    }
    
    const upload = await new Promise((resolve, reject) => {
      createReadStream(file.filepath)
        .pipe(
          storage.bucket('pdf-source-storage-bucket').file(file.newFilename as string).createWriteStream({
            metadata: {
              contentType: file.mimetype as string
            },
            ...option
          })
        )
        .on('error', (error) => {
          reject(error);
        })
        .on('finish', async () => {
          const getFileContent = await OCRFileContent('gs://pdf-source-storage-bucket/' + file.newFilename, file.newFilename)
          resolve(getFileContent);
        });
    });

    return upload
}