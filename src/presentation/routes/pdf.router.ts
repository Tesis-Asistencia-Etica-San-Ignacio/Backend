import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';
import { validateRoleMiddleware } from "../middleware/jwtMiddleware";

const router = Router();
const pdfController = new PdfController();

router.post('/generate', validateRoleMiddleware(['EVALUADOR']), (req, res) => pdfController.generateEvaluatorPdf(req, res));
router.post('/generate-investigator', validateRoleMiddleware(['INVESTIGADOR']), (req, res) => pdfController.generateInvestigatorPdf(req, res));
router.post('/save-investigator', validateRoleMiddleware(['INVESTIGADOR']), (req, res) => pdfController.saveInvestigatorPdf(req, res));

export default router;
