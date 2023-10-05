 import { Storage } from "@google-cloud/storage"

export default async function deleteFile(fileName: string){
     const storage = new Storage()
     const bucket = storage.bucket('pdf-source-storage-bucket')
     const file = bucket.file(fileName)
     await file.delete()
}