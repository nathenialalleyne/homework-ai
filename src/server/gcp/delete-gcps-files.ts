import storage from '@/utils/google'

export default async function deleteFile(
  fileName: string,
  bucketName: string = 'pdf-source-storage-bucket',
) {
  try {
    const bucket = storage.bucket(bucketName)
    const file = bucket.file(fileName)
    await file.delete()
  } catch (error) {
    throw new Error(`Error deleting file: ${fileName} `, {
      cause: error,
    })
  }
}
