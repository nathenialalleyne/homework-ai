import { Storage } from '@google-cloud/storage';

export default async function createFileInGCPStorage(filename: string, fileContent: string) {
    try{
        const storage = new Storage();
    const bucket = storage.bucket('pdf-source-storage-bucket');

    const file = bucket.file(filename);

    await file.save(fileContent);
    }
    catch(e){
        throw new Error(`Error creating file: ${filename} `, {
            cause: e
        })
    }
}


