import { Storage } from "@google-cloud/storage";

export default async function chunkText(fileName: string): Promise<string[]> {
    const storage = new Storage()
    const bucket = storage.bucket('pdf-source-storage-bucket')
    
    const file = bucket.file(fileName)
    const text = (await file.download())[0].toString()

    const textLength = text.length;
    const chunkSize = 1000

    const storeText : string[] = []

    for (let i = 0; i < textLength; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        storeText.push(chunk);
    }

    return storeText
}
 