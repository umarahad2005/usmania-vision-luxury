import nodemailer from 'nodemailer';

interface EmailTemplate {
  to: string;
  subject: string;
  htmlContent: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({ to, subject, htmlContent }: EmailTemplate) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || '"Usmania Vision Co." <noreply@usmaniavision.com>',
      to: [to],
      subject,
      html: htmlContent,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('SMTP Error:', error);
    return { success: false, error };
  }
}

export function contactEmailTemplate(data: { name: string; email: string; message: string }) {
  // Deliver the contact form submission to the admin
  return {
    to: process.env.MAIL_TO || 'admin@usmaniavision.com',
    subject: `New Contact Form Submission from ${data.name}`,
    htmlContent: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #d4af37; padding-left: 1rem; margin-left: 0;">
        ${data.message.replace(/\n/g, '<br>')}
      </blockquote>
    `,
  };
}
