import { Request, Response } from "express";
import { GeneratePdfUseCase } from "../../application/useCases/pdf/generatePdf.useCase";
import { PDFService } from "../../application/services/pdf.service";
import { GetEthicalRulesByEvaluationUseCase } from "../../application/useCases/ethical_rules/getEthicalRulesByEvaluation.useCase";
import { EthicalNormRepository } from "../../infrastructure/database/repositories/ethicalRule.repository.impl";

import { CreateCaseUseCase } from "../../application/useCases/case/createCase.useCase";
import { CaseRepository } from "../../infrastructure/database/repositories/case.repository.impl";
import { uploadFileToMinio } from "../../application";
import { minioPublicUrl } from "../../infrastructure/config/minioClient";
import { EvaluacionRepository } from "../../infrastructure/database/repositories/evaluation.repository.impl";
import { GetEvaluacionByIdUseCase } from "../../application/useCases/evaluation/getEvaluationsById.useCase";


export class PdfController {
  private readonly genPdf = new GeneratePdfUseCase(new PDFService());
  private readonly getNorms = new GetEthicalRulesByEvaluationUseCase(
    new EthicalNormRepository()
  );
  private readonly getEvaluation = new GetEvaluacionByIdUseCase(
    new EvaluacionRepository()
  );

  public async generateEvaluatorPdf(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { evaluationId } = req.body;
      if (!evaluationId) {
        res.status(400).send("evaluationId requerido");
        return;
      }

      const norms = await this.getNorms.execute(evaluationId);
      const evaluation = await this.getEvaluation.execute(evaluationId);
      const version = evaluation?.version ?? 1;

      const buf = await this.genPdf.execute("ethicalNormsReport", {
        norms,
        date: new Date().toLocaleDateString("es-CO"),
        version,
      });

      res
        .status(200)
        .set({
          "Content-Type": "application/pdf",
          "Content-Length": buf.length,
          "Cache-Hit": "false",
        })
        .send(buf);
      return;
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generando PDF");
    }
  }

  public async saveInvestigatorPdf(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      console.log("En el controlador ---------------------->", data);

      // 3. Validar que ninguno esté ausente
      if (!data.nombre_proyecto || !data.fecha || !data.version || !data.codigo) {
        res
          .status(400)
          .send("Faltan campos obligatorios en los datos del caso");
        return;
      }

      // 1. Generar el PDF
      const buf = await this.genPdf.execute("pdfConsentTemplate", {
        data,
        date: new Date().toLocaleDateString("es-CO"),
      });

      // 2. Construir nombre y objeto File para MinIO
      const filename = `case_${data.codigo}_${Date.now()}.pdf`;
      const fileForMinio = {
        fieldname: "pdf",
        originalname: filename,
        encoding: "7bit",
        mimetype: "application/pdf",
        buffer: buf,
        size: buf.length,
      } as Express.Multer.File;

      // 3. Subir a MinIO
      await uploadFileToMinio(fileForMinio);
      const fileUrl = `${minioPublicUrl}/${filename}`;

      // 4. Preparar DTO con createdAt/updatedAt
      const nowIso = new Date().toISOString();
      const caseDto = {
        uid: req.user?.id,
        nombre_proyecto: data.nombre_proyecto,
        fecha: data.fecha,
        version: data.version,
        codigo: data.codigo,
        pdf: fileUrl,
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      // 5. Crear el caso en BD
      const createCase = new CreateCaseUseCase(new CaseRepository());
      await createCase.execute(caseDto);

      // 6. Enviar el PDF (manteniendo la cabecera para previsualizar)
      // res
      //   .status(200)
      //   .set({
      //     "Content-Type": "application/pdf",
      //     "Content-Length": buf.length,
      //     "Cache-Hit": "false",
      //   })
      //   .send(buf);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generando PDF o creando el caso");
    }
  }

  public async generateInvestigatorPdf(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      console.log("En el controlador ---------------------->", data);

      // 3. Validar que ninguno esté ausente
      if (!data.nombre_proyecto || !data.fecha || !data.version || !data.codigo) {
        res
          .status(400)
          .send("Faltan campos obligatorios en los datos del caso");
        return;
      }

      // 1. Generar el PDF
      const buf = await this.genPdf.execute("pdfConsentTemplate", {
        data,
        date: new Date().toLocaleDateString("es-CO"),
      });
      // 6. Enviar el PDF (manteniendo la cabecera para previsualizar)
      res
        .status(200)
        .set({
          "Content-Type": "application/pdf",
          "Content-Length": buf.length,
          "Cache-Hit": "false",
        })
        .send(buf);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generando PDF o creando el caso");
    }
  }
}
