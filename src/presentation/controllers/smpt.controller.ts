import { Request, Response } from 'express';
import { SendEmailUseCase } from '../../application/useCases/smtp/smpt.useCase';
import { SmtpService } from '../../application/services/smpt.service';
import { GeneratePdfUseCase } from '../../application/useCases/pdf/generatePdf.useCase';
import { PDFService } from '../../application/services/pdf.service';
import { GetEthicalRulesByEvaluationUseCase } from '../../application/useCases/ethical_rules/getEthicalRulesByEvaluation.useCase';
import { EthicalNormRepository } from '../../infrastructure/database/repositories/ethicalRule.repository.impl';
import { generateEmailHtml } from '../../shared/utils/emailTemplate';
import { GetUserByIdUseCase } from '../../application/useCases/user/getUserById.useCase';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository.impl';

export class SmtpController {
  private readonly sendEmailUseCase = new SendEmailUseCase(new SmtpService());
  private readonly generatePdfUseCase = new GeneratePdfUseCase(new PDFService());
  private readonly getNormsUseCase = new GetEthicalRulesByEvaluationUseCase(
    new EthicalNormRepository()
  );

  public async sendEmail(req: Request, res: Response): Promise<void> {
    try {
      // Extraemos to, infoMail y evaluationId
      const {
        to,
        infoMail,
        evaluationId,
      } = req.body as {
        to: string | string[];
        infoMail: {
          subject: string;
          mensajeAdicional?: string;
          userType?: string;
        };
        evaluationId: string;
      };

      // 1. Validaciones básicas
      if (!to || !infoMail?.subject || !evaluationId) {
        res.status(400).json({
          message: `Faltan datos. to: ${to}, subject: ${infoMail?.subject}, evaluationId: ${evaluationId}`,
        });
        return;
      }

      // 2. Normalizar destinatarios
      const recipients: string[] =
        typeof to === 'string' ? [to.trim()] : to.map((t) => t.trim());

      // 3. Obtener nombre completo del usuario
      let userFullName: string | undefined;
      if (req.user?.name && req.user?.last_name) {
        userFullName = `${req.user.name} ${req.user.last_name}`;
      } else {
        const userId = req.user?.id;
        if (!userId) {
          res.status(400).json({ message: 'No se obtuvo ID de usuario.' });
          return;
        }
        const userData = await new GetUserByIdUseCase(new UserRepository()).execute(userId);
        if (userData?.name && userData?.last_name) {
          userFullName = `${userData.name} ${userData.last_name}`;
        }
      }

      if (!userFullName) {
        res.status(400).json({ message: 'No se pudo determinar nombre de usuario.' });
        return;
      }

      // 5. Generar el PDF en base al template y los datos
      const norms = await this.getNormsUseCase.execute(evaluationId);
      const pdfBuffer = await this.generatePdfUseCase.execute('ethicalNormsReport', {
        norms,
        date: new Date().toLocaleDateString('es-CO'),
      });

      // 6. Generar el HTML del correo
      const htmlContent = await generateEmailHtml({
        userName: userFullName,
        infoMail,
      });

      // 7. Enviar el correo con el PDF adjunto
      await this.sendEmailUseCase.execute({
        to: recipients,
        subject: infoMail.subject.trim(),
        html: htmlContent,
        attachments: [
          {
            filename: 'reporte-normas.pdf',
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ],
      });

      res.status(200).json({ message: 'Correo enviado exitosamente.' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo.' });
    }
  }
}
