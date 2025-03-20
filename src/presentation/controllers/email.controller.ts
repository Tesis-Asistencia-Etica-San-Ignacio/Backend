import { Request, Response } from "express";
import { SmtpService } from "../../infrastructure/";

export class EmailController {
    constructor(private smtpService: SmtpService) { }

    async sendEmail(req: Request, res: Response) {
        try {
            if (!req.body || typeof req.body !== "object") {
                return res.status(400).json({ error: "Cuerpo de la solicitud inválido" });
            }

            const { to, subject, html } = req.body;

            if (!to || !subject || !html) {
                return res.status(400).json({ error: "Faltan parámetros requeridos" });
            }

            await this.smtpService.sendEmail(to, subject, html);
            return res.json({ message: "Email enviado con éxito" });
        } catch (error) {
            console.error("Error enviando email:", error);
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            return res.status(500).json({ error: `Error enviando email: ${errorMessage}` });
        }
    }
}
