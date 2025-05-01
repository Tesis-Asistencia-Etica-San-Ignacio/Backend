import { Request, Response } from "express";
import { GeneratePdfUseCase } from "../../application/useCases/pdf/generatePdf.useCase";
import { PDFService } from "../../application/services/pdf.service";
import { GetEthicalRulesByEvaluationUseCase } from "../../application/useCases/ethical_rules/getEthicalRulesByEvaluation.useCase";
import { EthicalNormRepository } from "../../infrastructure/database/repositories/ethicalRule.repository.impl";

export class PdfController {
  private readonly genPdf = new GeneratePdfUseCase(new PDFService());
  private readonly getNorms = new GetEthicalRulesByEvaluationUseCase(
    new EthicalNormRepository()
  );

  public async generatePdf(req: Request, res: Response): Promise<void> {
    try {
      const { evaluationId } = req.body;
      if (!evaluationId) {
        res.status(400).send("evaluationId requerido");
        return;
      }

      const norms = await this.getNorms.execute(evaluationId);
      const buf = await this.genPdf.execute("ethicalNormsReport", {
        norms,
        date: new Date().toLocaleDateString("es-CO"),
      });

      res
        .status(200)
        .set({
          "Content-Type": "application/pdf",
          "Content-Length": buf.length,
          "Cache-Hit": "false",
        })
        .send(buf);
      return
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generando PDF");
    }
  }

}
