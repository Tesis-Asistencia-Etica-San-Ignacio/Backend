// smtp.controller.ts
import { Request, Response } from 'express';
import { SendEmailUseCase } from '../../application/useCases/smtp/smpt.useCase';
import { SmtpService } from '../../application/services/smpt.service';
import { GeneratePdfUseCase } from '../../application/useCases/pdf/generatePdf.useCase';
import { PDFService } from '../../application/services/pdf.service';

export class SmtpController {
    private sendEmailUseCase: SendEmailUseCase;
    private generatePdfUseCase: GeneratePdfUseCase

    constructor() {
        this.sendEmailUseCase = new SendEmailUseCase(new SmtpService());
        this.generatePdfUseCase = new GeneratePdfUseCase(new PDFService());
    }

    public async sendEmail(req: Request, res: Response): Promise<void> {
        try {
            const { userName, userType, date, to, subject } = req.body;

            const pdfBuffer = await this.generatePdfUseCase.execute({ userName, userType, date });

            if (!to || (Array.isArray(to) && to.length === 0) || (typeof to === 'string' && to.trim() === '') || !subject || subject.trim() === '') {
                res.status(400).json({ message: `Faltan datos requeridos para enviar el correo. To: ${to}, Subject: ${subject}` });
                return;
            }

            const recipients = typeof to === 'string' ? [to.trim()] : (Array.isArray(to) ? to.map(item => item.trim()) : []);

            await this.sendEmailUseCase.execute({
                to: recipients,
                subject: subject.trim(),
                attachments: [
                    {
                        filename: 'reporte.pdf',
                        content: pdfBuffer,
                        contentType: 'application/pdf',
                    },
                ],
                html: `<p>Adjunto encontrarás el reporte generado.</p>`,
            });
            
            res.status(200).json({ message: 'Correo electrónico enviado exitosamente.' });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).json({ message: 'Error al enviar el correo electrónico.' });
        }
    }
}