import { minioClient } from '../../infrastructure/config/minioClient';

export async function uploadFileToMinio(file: Express.Multer.File, bucket = 'uploads') {
  const metaData = {
    'Content-Type': file.mimetype,
  };

  await minioClient.putObject(bucket, file.originalname, file.buffer, file.size, metaData);
}
