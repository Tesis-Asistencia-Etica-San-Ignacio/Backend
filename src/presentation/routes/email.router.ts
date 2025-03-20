// /src/presentation/routes/emailRoutes.ts
import { Router } from "express";
import { EmailController } from "../controllers/email.controller";
import { SmtpService } from "../../infrastructure";

export default function createEmailRoutes() {
    const router = Router();
    const smtpService = new SmtpService();
    const emailController = new EmailController(smtpService);

    router.post("/send-email", (req, res) => emailController.sendEmail(req, res));

    return router;
}
