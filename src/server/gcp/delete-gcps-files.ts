 import { Storage } from "@google-cloud/storage"
 import client from '@/utils/google'

export default async function deleteFile(fileName: string, bucketName: string = 'pdf-source-storage-bucket'){
     try{
    const storage = new Storage({projectId: 'altrai', authClient: await client})
     const bucket = storage.bucket(bucketName)
     const file = bucket.file(fileName)
     await file.delete()
     } catch (error){
          throw new Error(`Error deleting file: ${fileName} `, {
               cause: error
          })
     }
}