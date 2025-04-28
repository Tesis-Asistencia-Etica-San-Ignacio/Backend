import ejs from 'ejs';
import puppeteer, { Browser } from 'puppeteer';
import path from 'path';
import fs from 'fs';

export class PDFService {
  public async generatePdf(data: { date: string; type: 'consent' | 'evaluation' }): Promise<Buffer> {
    let browser: Browser | null = null;

    // Seleccionar la plantilla dependiendo del tipo
    const templateFileName = data.type === 'consent' 
      ? 'pdfConsentTemplate.ejs'
      : 'pdfTemplate.ejs';

    const templatePath = path.join(process.cwd(), 'src', 'templates', 'pdf', templateFileName);

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
      protocolTimeout: 60000,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'load' });

    const pdfArray = await Promise.race([
      page.pdf({ format: 'A4', printBackground: true }),
      new Promise((_, reject) => setTimeout(() => reject('Timeout al generar el PDF'), 60000)),
    ]);

    await browser.close();
    return Buffer.from(pdfArray as Uint8Array);
  }
}
