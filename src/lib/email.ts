import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn("⚠️  SMTP credentials not configured. Email not sent.");
      console.log("Would have sent email:", {
        to: options.to,
        subject: options.subject,
      });
      return true; // Don't fail the API call if SMTP isn't set up
    }

    await transporter.sendMail({
      from: `"Triple M Public School" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    return true;
  } catch (error) {
    console.error("❌ Email send error:", error);
    return false;
  }
}

export function contactEmailTemplate(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #0F1B3D; padding: 24px 32px;">
        <h1 style="color: #F0C75E; margin: 0; font-size: 20px; letter-spacing: 1px;">
          TRIPLE M PUBLIC SCHOOL
        </h1>
        <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">
          New Contact Form Submission
        </p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 100px;">Name</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">
              <a href="mailto:${data.email}" style="color: #1A2D5A;">${data.email}</a>
            </td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">
              <a href="tel:${data.phone}" style="color: #1A2D5A;">${data.phone}</a>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Subject</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${data.subject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 20px; background: #f9fafb; border-left: 3px solid #D4A843;">
          <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      <div style="padding: 16px 32px; background: #f3f4f6; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #9ca3af; font-size: 11px;">
          This email was sent from the contact form at triplemschool.in
        </p>
      </div>
    </div>
  `;
}

export function admissionEmailTemplate(data: {
  studentName: string;
  parentName: string;
  parentPhone: string;
  classApplying: string;
}): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
      <div style="background: #0F1B3D; padding: 24px 32px;">
        <h1 style="color: #F0C75E; margin: 0; font-size: 20px; letter-spacing: 1px;">
          TRIPLE M PUBLIC SCHOOL
        </h1>
        <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">
          New Admission Inquiry
        </p>
      </div>
      <div style="padding: 32px;">
        <p style="color: #374151; line-height: 1.6;">
          A new admission inquiry has been submitted:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 120px;">Student</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 600;">${data.studentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Class</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${data.classApplying}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Parent/Guardian</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${data.parentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">
              <a href="tel:${data.parentPhone}" style="color: #1A2D5A;">${data.parentPhone}</a>
            </td>
          </tr>
        </table>
        <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">
          View all inquiries in the <a href="${process.env.AUTH_URL || 'http://localhost:3000'}/admin/admissions" style="color: #1A2D5A;">Admin Dashboard</a>.
        </p>
      </div>
    </div>
  `;
}
