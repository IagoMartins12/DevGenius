// utils/sendEmail.js
import nodemailer from 'nodemailer';

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use o serviço de e-mail que você deseja (Gmail, Outlook, etc.)
    auth: {
      user: 'devgenius2011@gmail.com',
      pass: 'dmmprajscyftpiar',
    },
  });

  const mailOptions = {
    from: 'devgenius2011@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);

  return;
}
