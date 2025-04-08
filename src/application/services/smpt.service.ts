import nodemailer from "nodemailer";

export class SmtpService {
    private transporter: nodemailer.Transporter;

    constructor() {
        const host = process.env.SMTP_HOST;
        const port = parseInt(process.env.SMTP_PORT || "587", 10);
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;

        if (!host || !port || !user || !pass) {
            throw new Error("Faltan credenciales SMTP. Verifica tu archivo .env");
        }

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: false,
            auth: {
                user,
                pass,
            },
        });
    }

    async sendEmail(to: string[], subject: string, html: string) {
        try {
            // Ojo: nodemailer usa "to" como string, no array
            const toList = to.join(", ");

            await this.transporter.sendMail({
                from: "Acme <no-reply@acme.com>", // Ajusta el remitente real
                to: toList,
                subject,
                html,
            });
        } catch (error) {
            console.error("Error enviando email via SMTP:", error);
            throw error;
        }
    }
}
