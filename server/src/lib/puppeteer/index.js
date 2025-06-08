import { uploadFileToFirebase } from '@lib/firebase';
import puppeteer from 'puppeteer';

export const convertHTMLToPDF = async (html) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      bottom: 20,
      left: 20,
      top: 20,
      right: 20
    }
  });
  const fileData = {
    fieldname: 'file',
    originalname: 'file.pdf',
    encoding: 'binary',
    mimetype: 'application/pdf',
    size: pdfBuffer.length,
    buffer: pdfBuffer
  };
  await browser.close();
  return await uploadFileToFirebase(fileData);
};
