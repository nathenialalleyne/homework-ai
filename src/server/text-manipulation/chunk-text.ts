import { Storage } from "@google-cloud/storage";

export default async function chunkText(fileName: string): Promise<string[]> {
    const storage = new Storage()
    const bucket = storage.bucket('pdf-source-storage-bucket')
    
    const file = bucket.file(fileName)
    const text = (await file.download()).toString()

    const textLength = text.length;
    const chunkSize = Math.ceil(textLength / 1000);

    const storeText : string[] = []

    for (let i = 0; i < chunkSize; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const chunk = text.slice(start, end);
        storeText.push(chunk)
    }

    return storeText
}
 