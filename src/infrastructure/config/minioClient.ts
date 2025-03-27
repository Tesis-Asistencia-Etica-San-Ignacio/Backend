import { Client } from 'minio';
import dotenv from 'dotenv';

dotenv.config();

export const minioClient = new Client({
  endPoint: process.env.MINIO_URL?.replace('http://', '') ?? 'minio',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER ?? '',
  secretKey: process.env.MINIO_ROOT_PASSWORD ?? ''
});
