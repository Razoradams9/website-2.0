import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3Client = new S3Client({
  region: process.env.AWS_REGION ?? "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME ?? "";

export async function uploadToS3(
  file: Buffer,
  options: {
    key?: string;
    folder?: string;
    contentType?: string;
    fileName?: string;
  } = {},
): Promise<{ key: string; url: string }> {
  const ext = options.fileName?.split(".").pop() ?? "bin";
  const key = options.key ?? `${options.folder ?? "uploads"}/${randomUUID()}.${ext}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: options.contentType ?? "application/octet-stream",
      // Block public ACL — use presigned URLs for private docs
    }),
  );

  const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return { key, url };
}

export async function deleteFromS3(key: string): Promise<void> {
  await s3Client.send(
    new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
  );
}

export async function getPresignedUrl(
  key: string,
  expiresIn = 3600,
): Promise<string> {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn });
}

export default s3Client;
