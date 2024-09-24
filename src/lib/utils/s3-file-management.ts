import * as Minio from 'minio'

// Create a new Minio client with the S3 endpoint, access key, and secret key
export const s3Client = new Minio.Client({
  endPoint: process.env.S3_ENDPOINT || '',
  port: process.env.S3_PORT ? Number(process.env.S3_PORT) : undefined,
  accessKey: process.env.S3_ACCESS_KEY || '',
  secretKey: process.env.S3_SECRET_KEY || '',
  useSSL: process.env.S3_USE_SSL === 'true',
  region: process.env.S3_REGION || '',
})

export async function createBucketIfNotExists(bucketName: string) {
  const bucketExists = await s3Client.bucketExists(bucketName)
  if (!bucketExists) {
    await s3Client.makeBucket(bucketName)
  }
}
