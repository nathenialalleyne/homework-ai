import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'crypto';
import { File } from 'formidable';
import splitPDF from './split-pdf';

import { createReadStream } from 'fs';
import OCRFileContent, { getImageFileContent } from './ocr-file-content';
import deleteFile from './delete-gcps-files';

const storage = new Storage();

export async function uploadSplitFile(file: Buffer, fileName: string){
  try{
    const randomID = randomUUID()

    const option = {
      destination: randomUUID()
      
    }
    const upload = await new Promise((resolve, reject) => {
      const save = storage.bucket('pdf-source-storage-bucket').file(fileName)

      save.save(file, {
          metadata: {
            contentType: 'application/pdf'
          },
          ...option
        }, (err) => {
          if (err) {
            throw new Error('No file content', {
              cause: err
            })
          }
          resolve('done')
        })
    })
    
    if(upload === 'done'){
        const getFileContent = await OCRFileContent('gs://pdf-source-storage-bucket/' + fileName, fileName, randomID)

        await deleteFile(fileName)
        
        return getFileContent
    }

    throw new Error('No file content')

    } catch (error) {
      throw new Error('No file content', {
        cause: error
      })
    }
}

export default async function uploadFile(file: File) {
  try {

    const randomID = randomUUID()

    const option = {
      destination: randomUUID()
      
    }

    const upload = await new Promise((resolve, reject) => {
      createReadStream((file as File).filepath)
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
          resolve('done');
        });
    });

    if(upload === 'done'){
      const getFileContent = await OCRFileContent('gs://pdf-source-storage-bucket/' + file.newFilename, file.newFilename, randomID)
      return getFileContent
    }
    throw new Error('No file content')
  } catch (error) {
    throw new Error('No file content', {
      cause: error
    })
  }
}