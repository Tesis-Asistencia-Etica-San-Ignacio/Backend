import { Request, Response } from 'express'
import { SendEmailUseCase } from '../../application/useCases/smtp/smpt.useCase'
import { SmtpService } from '../../application/services/smpt.service'
import { GeneratePdfUseCase } from '../../application/useCases/pdf/generatePdf.useCase'
import { PDFService } from '../../application/services/pdf.service'
import { GetEthicalRulesByEvaluationUseCase } from '../../application/useCases/ethical_rules/getEthicalRulesByEvaluation.useCase'
import { EthicalNormRepository } from '../../infrastructure/database/repositories/ethicalRule.repository.impl'
import { generateEmailHtml } from '../../shared/utils/emailTemplate'
import { GetUserByIdUseCase } from '../../application/useCases/user/getUserById.useCase'
import { UserRepository } from '../../infrastructure/database/repositories/user.repository.impl'
import { GetEvaluacionByIdUseCase } from "../../application/useCases/evaluation/getEvaluationsById.useCase";
import { EvaluacionRepository } from '../../infrastructure/database/repositories/evaluation.repository.impl'

export class SmtpController {
  private readonly sendEmailUseCase = new SendEmailUseCase(new SmtpService())
  private readonly generatePdfUseCase = new GeneratePdfUseCase(new PDFService())
  private readonly getNormsUseCase = new GetEthicalRulesByEvaluationUseCase(
    new EthicalNormRepository()
  )
  private readonly getEvaluation = new GetEvaluacionByIdUseCase(
    new EvaluacionRepository()
  );

  public async sendEmail(req: Request, res: Response): Promise<void> {
    try {
      const {
        to,
        infoMail,
        evaluationId,
        modelo,
      } = req.body as {
        to: string | string[]
        infoMail: {
          subject: string
          mensajeAdicional?: string
          userType?: string
        }
        evaluationId: string
        modelo: string
      }


      // 1. Validaciones básicas
      if (!to || !infoMail?.subject || !evaluationId) {
        res.status(400).json({
          message: `Faltan datos. to: ${to}, subject: ${infoMail?.subject}, evaluationId: ${evaluationId}`,
        })
        return
      }

      // 2. Normalizar destinatarios
      const recipients: string[] =
        typeof to === 'string' ? [to.trim()] : to.map((t) => t.trim())

      // 3. Obtener datos del usuario (nombre completo + modelo)
      let userFullName: string | undefined

      // 3a. Si req.user ya trae name, last_name y modelo
      if (req.user?.name && req.user?.last_name) {
        userFullName = `${req.user.name} ${req.user.last_name}`
      }



      // 3b. Si no, busca en la base de datos
      if ((!userFullName) && req.user?.id) {
        const userId = req.user.id
        const userData = await new GetUserByIdUseCase(new UserRepository()).execute(userId)

        if (!userFullName && userData?.name && userData?.last_name) {
          userFullName = `${userData.name} ${userData.last_name}`
        }
      }

      if (!userFullName) {
        res.status(400).json({ message: 'No se pudo determinar nombre de usuario.' })
        return
      }

      // (si quieres que modelo sea obligatorio, agrega otro chequeo aquí)
      // if (!userModel) { ... }

      // 4. Generar el PDF
      const norms = await this.getNormsUseCase.execute(evaluationId)
      const evaluation = await this.getEvaluation.execute(evaluationId);
      const version = evaluation?.version ?? 1;
      const pdfBuffer = await this.generatePdfUseCase.execute('ethicalNormsReport', {
        norms,
        date: new Date().toLocaleDateString('es-CO'),
        version,
      })

      // 5. Generar el HTML del correo incluyendo el modelo
      const htmlContent = await generateEmailHtml({
        userName: userFullName,
        modelo: modelo,
        infoMail,
      })

      // 6. Enviar el correo con el PDF adjunto
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
      })

      res.status(200).json({ message: 'Correo enviado exitosamente.' })
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      res.status(500).json({ message: 'Error al enviar el correo.' })
    }
  }
}
