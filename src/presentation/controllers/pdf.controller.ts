import { Request, Response } from 'express';
import { GeneratePdfUseCase } from '../../application/useCases/pdf/generatePdf.useCase';
import { PDFService } from '../../application/services/pdf.service';

export class PdfController {
    private generatePdfUseCase: GeneratePdfUseCase;

    constructor() {
        this.generatePdfUseCase = new GeneratePdfUseCase(new PDFService());
    }

    public async generatePdf(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body; // Debe contener: { userName, userType, date }
            const pdfBuffer = await this.generatePdfUseCase.execute(data);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="reporte.pdf"',
                'Content-Length': pdfBuffer.length,
            });
            res.send(pdfBuffer);
        } catch (error) {
            console.error('Error generando PDF:', error);
            res.status(500).json({ message: 'Error generando el PDF' });
        }
    }
}
