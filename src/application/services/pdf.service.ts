import ejs from 'ejs';
import puppeteer from 'puppeteer';
import path from 'path';

export class PDFService {
    public async generatePdf(data: { userName: string; userType: string; date: string }): Promise<Buffer> {
        // Ruta absoluta a la plantilla EJS en src/templates
        const templatePath = path.join(process.cwd(), 'src', 'templates','pdf', 'pdfTemplate.ejs');
        const htmlContent: string = await ejs.renderFile(templatePath, data);

        // Lanzar Puppeteer con opciones extendidas
        const browser = await puppeteer.launch({
            headless: true,
            //sexecutablePath: '/usr/bin/chromium', // Asegúrate de que Chromium esté instalado en el contenedor
            protocolTimeout: 60000,              // Aumenta el timeout a 60 segundos
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ],
        });

        const page = await browser.newPage();
        // Usamos 'domcontentloaded' para evitar esperar recursos innecesarios
        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
        const pdfArray = await Promise.race([
            page.pdf({ format: 'A4', printBackground: true }),
            new Promise((_, reject) => setTimeout(() => reject('Timeout al generar el PDF'), 60000)), 
        ]);
        await browser.close();
        const pdfBuffer = Buffer.from(pdfArray as Uint8Array);
        return pdfBuffer;
    }
}
