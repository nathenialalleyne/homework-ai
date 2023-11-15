import { Storage } from '@google-cloud/storage';
import { randomUUID } from 'crypto';
import { File } from 'formidable';

import { createReadStream } from 'fs';
import OCRFileContent from './ocr-file-content';
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
        const getFileContent = await OCRFileContent('gs://pdf-source-storage-bucket/' + fileName, fileName, randomID, 'application/pdf')

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

export default async function uploadFile(file?: File | Buffer, fileName?: string, sample?: boolean, bucket: string = 'pdf-source-storage-bucket') {
  try {

    const randomID = randomUUID()

    const option = {
      destination: randomUUID()
      
    }

    async function uploadBuffer(): Promise<string>{
      return await new Promise((resolve, reject) => {
      const save = storage.bucket(bucket).file(fileName as string)

      save.save(file as Buffer, {
          metadata: {
            contentType: 'application/pdf'
          },
          ...option
        }, (err) => {
          if (err) {
            reject(err)
          }
          resolve('done')
        })
      })
    }

    async function uploadFile(): Promise<string>{
      return await new Promise((resolve, reject) => {
      createReadStream((file as File).filepath)
        .pipe(
          storage.bucket(bucket).file((file as File).newFilename as string).createWriteStream({
            metadata: {
              contentType: (file as File).mimetype as string
            },
            ...option

          })
        )
        .on('error', (error) => {
          reject(error);
        })
        .on('finish', async () => {
          resolve('done');
        })
      })
    }

    if (sample) {
      const upload = await uploadFile()

      if(upload === 'done'){
        return `gs://${bucket}/` + ((file as File).newFilename)
      }
    }

    if (!sample) {
      const upload = file instanceof Buffer ? await uploadBuffer() : await uploadFile()

      if(upload === 'done'){
        const getFileContent = await OCRFileContent('gs://pdf-source-storage-bucket/' + ((file as File).newFilename || fileName ), ((file as File).newFilename || fileName as string), randomID, ((file as File).mimetype as string) || 'application/pdf')

        await deleteFile((file as File).newFilename || fileName as string)

        return getFileContent
      }
    }

  } catch (error) {
    throw new Error(`Error uploading file to GCP Storage ${error}`)
  }
}