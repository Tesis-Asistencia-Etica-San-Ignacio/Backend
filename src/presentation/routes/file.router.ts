import { Router } from 'express';
import multer from 'multer';
import { uploadFileController } from '../controllers/file.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadFileController);

export default router;
