import storage from '@/utils/google'

export default async function createFileInGCPStorage(
  bucketName: string = 'pdf-source-storage-bucket',
  filename: string,
  fileContent: string | Buffer,
  contentType?: string,
) {
  try {
    const options = contentType ? { contentType: contentType } : {}
    const bucket = storage.bucket(bucketName)

    const file = bucket.file(filename)

    await file.save(fileContent, options)

    return `gs://${bucketName}/${filename}`
  } catch (e) {
    throw new Error(`Error creating file: ${filename} `, {
      cause: e,
    })
  }
}
