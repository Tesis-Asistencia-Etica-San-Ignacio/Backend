import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';

const router = Router();
const pdfController = new PdfController();

router.post('/generate', (req, res) => pdfController.generateEvaluatorPdf(req, res));
router.post('/generate-investigator', (req, res) => pdfController.generateInvestigatorPdf(req, res));

export default router;
