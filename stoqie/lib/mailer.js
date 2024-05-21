// lib/mailer.js
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email, userId) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const resetLink = `${process.env.NEXTAUTH_URL}/new-password?user=${userId}`;

  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Password Reset',
    text: `Click the link to reset your password: ${resetLink}`,
  };

  await transporter.sendMail(message);
}