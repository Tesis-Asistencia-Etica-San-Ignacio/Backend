import { Router } from 'express';
import { ResendService } from '../../infrastructure/email/resendService.ts';

const createEmailRoutes = (resendService: ResendService) => {
    const router = Router();

    router.post('/send-email', async (req, res) => {
        try {
            if (!req.body || typeof req.body !== 'object') {
                return res.status(400).json({ error: 'Cuerpo de la solicitud inválido' });
            }

            const { to, subject, html } = req.body;

            if (!to || !subject || !html) {
                return res.status(400).json({ error: 'Faltan parámetros requeridos' });
            }

            await resendService.sendEmail(to, subject, html);
            res.json({ message: 'Email enviado con éxito' });

        } catch (error) {
            console.error('Error enviando email:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            res.status(500).json({ error: `Error enviando email: ${errorMessage}` });
        }
    });

    return router;
};

export default createEmailRoutes;
