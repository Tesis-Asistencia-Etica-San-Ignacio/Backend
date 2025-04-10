import { Router } from 'express';
import { SmtpController } from '../controllers/smpt.controller';

const router = Router();
const smtpController = new SmtpController();

router.post('/send-email', (req, res) => smtpController.sendEmail(req, res));

export default router;