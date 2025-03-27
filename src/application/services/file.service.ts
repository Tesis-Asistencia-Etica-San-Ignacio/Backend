import { minioClient } from "../../infrastructure/config/minioClient";

export async function uploadFileToMinio(
  file: Express.Multer.File,
  bucket = "uploads"
) {
  const metaData = {
    "Content-Type": file.mimetype,
  };

  await minioClient.putObject(
    bucket,
    file.originalname,
    file.buffer,
    file.size,
    metaData
  );
}

/**
 * Obtiene todos los archivos del bucket 'uploads'
 */
export async function getAllFilesFromMinio(bucket = "uploads"): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const files: any[] = [];
    const stream = minioClient.listObjectsV2(bucket, "", true);
    stream.on("data", (obj) => files.push(obj));
    stream.on("end", () => resolve(files));
    stream.on("error", (err) => reject(err));
  });
}

/**
 * Obtiene la metadata de un archivo específico por su nombre (fileName)
 */
// Versión usando Promesas nativas de minio:
export async function getFileByName(fileName: string, bucket = 'uploads') {
  // Si no pasas opciones, minioClient.statObject() retorna una Promesa
  return minioClient.statObject(bucket, fileName);
}
