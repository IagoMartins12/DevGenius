// pages/api/sendEmail.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();

  const { to, subject, text } = body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use o serviço de e-mail que você deseja (Gmail, Outlook, etc.)
    auth: {
      user: process.env.MY_EMAIL as string,
      pass: 'dmmprajscyftpiar',
    },
  });

  const mailOptions = {
    from: process.env.MY_EMAIL as string,
    to: to,
    subject: subject,
    html: text,
  };

  const response = await transporter.sendMail(mailOptions);

  return NextResponse.json(response);
}
