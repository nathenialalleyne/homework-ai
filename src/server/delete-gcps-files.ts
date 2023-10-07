 import { Storage } from "@google-cloud/storage"

export default async function deleteFile(fileName: string){
     try{
     const storage = new Storage()
     const bucket = storage.bucket('pdf-source-storage-bucket')
     const file = bucket.file(fileName)
     await file.delete()
     } catch (error){
          throw new Error(`Error deleting file: ${fileName} `, {
               cause: error
          })
     }
}