import { Request, Response } from 'express';
import { SendEmailUseCase } from '../../application/useCases/smtp/smpt.useCase';
import { SmtpService } from '../../application/services/smpt.service';
import { GeneratePdfUseCase } from '../../application/useCases/pdf/generatePdf.useCase';
import { PDFService } from '../../application/services/pdf.service';
import { generateEmailHtml } from '../../shared/utils/emailTemplate';
import { GetUserByIdUseCase } from '../../application/useCases/user/getUserById.useCase';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository.impl';

export class SmtpController {
    private sendEmailUseCase: SendEmailUseCase;
    private generatePdfUseCase: GeneratePdfUseCase;

    constructor() {
        this.sendEmailUseCase = new SendEmailUseCase(new SmtpService());
        this.generatePdfUseCase = new GeneratePdfUseCase(new PDFService());
    }

    async sendEmail(req: Request, res: Response): Promise<void> {
        try {
            const { to, infoMail } = req.body;

            let userFullName: string | undefined;
            if (req.user && req.user.name && req.user.last_name) {
                userFullName = `${req.user.name} ${req.user.last_name}`;
            } else {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(400).json({ message: 'No se pudo obtener la ID del usuario.' });
                    return;
                }
                const userRepository = new UserRepository();
                const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
                const userData = await getUserByIdUseCase.execute(userId);
                if (userData && userData.name && userData.last_name) {
                    userFullName = `${userData.name} ${userData.last_name}`;
                }
            }

            if (!to || !infoMail || !infoMail.subject || !userFullName) {
                res.status(400).json({
                    message: `Faltan datos requeridos. to: ${to}, subject: ${infoMail && infoMail.subject}, userFullName: ${userFullName}`,
                });
                return;
            }

            const recipients =
                typeof to === 'string'
                    ? [to.trim()]
                    : Array.isArray(to)
                        ? to.map((item) => item.trim())
                        : [];

            // Genera concurrentemente el PDF y el HTML (usando la plantilla fijada y los datos inyectados)
            const [pdfBuffer, htmlContent] = await Promise.all([
                this.generatePdfUseCase.execute({
                    userName: userFullName,
                    userType: infoMail.userType, // Si lo requieres; de lo contrario, se puede dejar fijo
                    date: new Date().toISOString(),
                }),
                generateEmailHtml({ userName: userFullName, infoMail })
            ]);

            await this.sendEmailUseCase.execute({
                to: recipients,
                subject: infoMail.subject.trim(),
                html: htmlContent,
                attachments: [
                    {
                        filename: 'reporte.pdf',
                        content: pdfBuffer,
                        contentType: 'application/pdf',
                    },
                ],
            });

            res.status(200).json({ message: 'Correo electrónico enviado exitosamente.' });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).json({ message: 'Error al enviar el correo electrónico.' });
        }
    }
}
