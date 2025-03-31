import { PDFService } from '../../services/pdf.service';

export class GeneratePdfUseCase {
    private pdfService: PDFService;

    constructor(pdfService: PDFService) {
        this.pdfService = pdfService;
    }

    public async execute(data: { userName: string; userType: string; date: string }): Promise<Buffer> {
        return this.pdfService.generatePdf(data);
    }
}
