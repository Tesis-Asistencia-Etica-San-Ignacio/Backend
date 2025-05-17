// src/application/services/pdf.service.ts
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

export class PDFService {
  public async generatePdf<T>(templateName: string, data: T): Promise<Buffer> {
    // … tu render EJS previo …

    // ───────── Ajuste de carga de assets ─────────
    // 1) Calcula la ruta absoluta a src/application/assets
    const assetsDir = path.resolve(
      process.cwd(),               // apunta a la raíz del proyecto
      'src', 'application', 'assets'
    );

    // 2) Construye las rutas de los logos
    const logoHusiPath = path.join(assetsDir, 'logo-HUSI-ajustado-nuevo.png');
    const logoPujPath  = path.join(assetsDir, 'pontificia_universidad_javeriana_logo-320x130.jpg');

    // 3) Léalos y codifícalos
    const logoHusiBase64 = fs.readFileSync(logoHusiPath).toString('base64');
    const logoPujBase64  = fs.readFileSync(logoPujPath).toString('base64');

    // 4) Inyecta en el contexto de tu plantilla
    const htmlContent = await ejs.renderFile(
      path.resolve(process.cwd(), 'src', 'templates', 'pdf', `${templateName}.ejs`),
      {
        ...data,
        logoHusiUri: `data:image/png;base64,${logoHusiBase64}`,
        logoPujUri:  `data:image/jpeg;base64,${logoPujBase64}`,
      }
    );
    // ───────── fin ajuste ─────────

    // … tu código de Puppeteer igual que antes …
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage'],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'load' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return Buffer.from(pdfBuffer);
  }
}
