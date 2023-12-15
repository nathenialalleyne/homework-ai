import storage from '@/utils/google'

export default async function downloadFile(
  fileName: string,
  bucketName: string = 'pdf-source-storage-bucket',
) {
  const bucket = storage.bucket(bucketName)
  const file = bucket.file(fileName)
  const download = await file.download()

  const buffer = Buffer.from(download[0]).toString('utf-8')
  return buffer
}
