// smpt.useCase.ts
import { SmtpService } from '../../services/smpt.service';

interface SendEmailData {
    to: string[];
    subject: string;
    html?: string; // El cuerpo del correo podría ser opcional si solo envías adjuntos
    attachments?: {
        filename: string;
        content: Buffer; // El contenido del archivo adjunto como un Buffer
        contentType: string; // El tipo de contenido del archivo (ej: 'application/pdf')
    }[];
}

export class SendEmailUseCase {
    private smtpService: SmtpService;

    constructor(smtpService: SmtpService) {
        this.smtpService = smtpService;
    }

    public async execute(data: SendEmailData): Promise<void> {
        const { to, subject, html, attachments } = data;
        await this.smtpService.sendEmail(to, subject, html, attachments); // Modifica la llamada al servicio
    }
}