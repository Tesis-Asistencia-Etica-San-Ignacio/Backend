// src/application/useCases/pdf/generatePdf.useCase.ts
import { PDFService } from '../../services/pdf.service';

export class GeneratePdfUseCase {
  constructor(private readonly pdfService: PDFService) {}

  /**
   * @param templateName nombre de la plantilla EJS en src/templates/pdf
   * @param data objeto con propiedades (e.g. date, norms, etc)
   */
  public async execute<T>(
    templateName: string,
    data: T
  ): Promise<Buffer> {
    console.log('executeexecuteexecuteexecuteexecuteexecuteexecute', data);
    return this.pdfService.generatePdf(templateName, data);
  }
}
