import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import { createLogMd } from '@repository';
dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

export const connectNodemailer = () => {
  transporter.verify(function (error) {
    if (error) console.log(error);
    else console.log('Nodemailer connect successful!');
  });
};

export const sendMail = async ({ to, subject, text, html, attachments = [], type }) => {
  let mailOptions = {
    from: process.env.NODEMAILER_USERNAME,
    to,
    subject,
    text,
    html: html
      ? `<!DOCTYPE html>
          <html>
          <head>
          <style>
            body { font-family: 'Times New Roman', Times, serif; }
            .container { width: 100%; max-width: 1000px; margin: auto; padding: 20px; 
              border: 1px solid #ddd; border-radius: 4px; }
          </style>
          </head>
          <body>
          <div class="container">
            ${html}
          </div>
          </body>
          </html>`
      : undefined,
    attachments
  };
  const params = { to, subject, content: html, type };
  try {
    await transporter.sendMail(mailOptions);
    params.status = 1;
    await createLogMd(params);
    return { status: 1 };
  } catch (error) {
    params.status = 2;
    params.mess = error.toString();
    await createLogMd(params);
    return { status: 0, mess: error.toString() };
  }
};
