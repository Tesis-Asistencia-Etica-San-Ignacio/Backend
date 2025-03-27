import { Request, Response } from 'express';
import { uploadFileToMinio } from '../../application/services/file.service';

export const uploadFileController = async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).send('Archivo no enviado');

  try {
    await uploadFileToMinio(req.file);
    res.status(200).send('Archivo subido a MIN.IO');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al subir archivo');
  }
};
