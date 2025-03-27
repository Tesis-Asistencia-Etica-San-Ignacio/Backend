import { Router } from 'express';
import multer from 'multer';
import { uploadFileController, getAllFilesController, getFileByNameController  } from '../controllers/file.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), uploadFileController);
router.get('/', getAllFilesController);
router.get('/:fileName', getFileByNameController);


export default router;
