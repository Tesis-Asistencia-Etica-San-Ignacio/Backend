import ejs from 'ejs';
import puppeteer, { Browser } from 'puppeteer';
import path from 'path';
import fs from 'fs';


export class PDFService {
    public async generatePdf(data: { date: string }): Promise<Buffer> {
        let browser: Browser | null = null;
        
        // Ruta absoluta a la plantilla EJS en src/templates
        const templatePath = path.join(process.cwd(), 'src', 'templates','pdf', 'pdfTemplate.ejs');
       

        const logoHusiPath = path.resolve('src', 'templates', 'assets', 'logo-HUSI-ajustado-nuevo.png');
        const logoPujPath = path.resolve('src', 'templates', 'assets', 'pontificia_universidad_javeriana_logo-320x130.jpg');

        const logoHusiBase64 = fs.readFileSync(logoHusiPath).toString('base64');
        const logoPujBase64 = fs.readFileSync(logoPujPath).toString('base64');

      
        const logoHusiUri = `data:image/png;base64,${logoHusiBase64}`;
        const logoPujUri = `data:image/jpeg;base64,${logoPujBase64}`;

        const htmlContent = await ejs.renderFile(templatePath, {
            ...data,
            logoHusiUri,
            logoPujUri,
          });
      
         browser = await puppeteer.launch({
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
        await page.setContent(htmlContent, { waitUntil: 'load' });
        const pdfArray = await Promise.race([
            page.pdf({ format: 'A4', printBackground: true }),
            new Promise((_, reject) => setTimeout(() => reject('Timeout al generar el PDF'), 60000)), 
        ]);
        await browser.close();
        const pdfBuffer = Buffer.from(pdfArray as Uint8Array);
        return pdfBuffer;
    }
}
