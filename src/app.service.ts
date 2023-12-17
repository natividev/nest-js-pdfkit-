import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
@Injectable()
export class AppService {
  async generatePdf(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      // Todo
      doc.text('PDF GENERADO CON NEST JS Y PDFKIT EN EL SERVIDOR');
      doc.moveDown();
      doc.text('Pdf desde el servidor');

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffer);
        resolve(pdfData);
      });
      doc.end();
    });

    return pdfBuffer; // Add this line
  }
}
