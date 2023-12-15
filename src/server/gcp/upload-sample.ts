import storage from '@/utils/google'

export async function uploadFile(
  bucket: string,
  file: Buffer,
  fileName: string,
  contentType: string,
) {
  await storage.bucket(bucket).file(`${fileName}`).save(file, {
    contentType: contentType,
  })
  const download = await storage.bucket(bucket).file(fileName).download()
  const buffer = Buffer.from(download[0]).toString('utf-8')
  return { location: `gs://${bucket}/${fileName}`, data: buffer }
}
