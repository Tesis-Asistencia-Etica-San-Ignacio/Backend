import { Router } from 'express';
import multer from 'multer';
import { uploadFileController, getAllFilesController, getFileByNameController  } from '../controllers/file.controller';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';


const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload', validateRoleMiddleware(['EVALUADOR']), upload.single('file'), uploadFileController);
router.get('/', getAllFilesController);
router.get('/:fileName', getFileByNameController);


export default router;
