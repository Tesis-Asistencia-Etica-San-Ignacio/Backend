import { Request, Response } from 'express';
import { uploadFileToMinio, getAllFilesFromMinio, getFileByName } from '../../application';

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

export const getFileByNameController = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params;
    const fileStat = await getFileByName(fileName);
    return res.status(200).json(fileStat);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error al obtener la metadata del archivo');
  }
};

export const getAllFilesController = async (req: Request, res: Response) => {
  try {
    const files = await getAllFilesFromMinio();
    return res.status(200).json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al obtener la lista de archivos');
  }
};