import { Resend } from 'resend';

export class ResendService {
    private resend: Resend;

    constructor(resendInstance?: Resend) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            throw new Error("Falta la API Key de Resend. Verifica tu archivo .env");
        }
        this.resend = resendInstance || new Resend(apiKey);
    }

    async sendEmail(to: string[], subject: string, html: string) {
        try {
            await this.resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to,
                subject,
                html,
            });
        } catch (error) {
            console.error('Error enviando email:', error);
            throw error;
        }
    }
}
