import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';

const router = Router();
const pdfController = new PdfController();

router.post('/generate', (req, res) => pdfController.generatePdf(req, res));

export default router;
