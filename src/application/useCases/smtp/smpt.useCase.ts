import { SmtpService } from '../../services/smpt.service';

interface SendEmailData {
    to: string[];
    subject: string;
    html: string;
}

export class SendEmailUseCase {
    private smtpService: SmtpService;

    constructor(smtpService: SmtpService) {
        this.smtpService = smtpService;
    }

    public async execute(data: SendEmailData): Promise<void> {
        const { to, subject, html } = data;
        await this.smtpService.sendEmail(to, subject, html);
    }
}