import nodemailer from "nodemailer";

// ─── HTML Escaper ────────────────────────────
// Prevents XSS in email bodies — user input MUST pass through this
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── SMTP Transporter ────────────────────────
// Only create transporter when credentials exist
function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Connection timeout to prevent hanging
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = createTransporter();

    if (!transporter) {
      console.warn("⚠️  SMTP credentials not configured. Email not sent.");
      console.log("Would have sent email:", {
        to: options.to,
        subject: options.subject,
      });
      return true; // Don't fail the API call if SMTP isn't set up
    }

    // Validate recipient
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(options.to)) {
      console.error("❌ Invalid recipient email address:", options.to);
      return false;
    }

    await transporter.sendMail({
      from: `"Triple M Public School" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: escapeHtml(options.subject).slice(0, 200), // Cap subject length
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
  // Escape ALL user input before injecting into HTML
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = data.phone ? escapeHtml(data.phone) : "";
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message);

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
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">
              <a href="mailto:${email}" style="color: #1A2D5A;">${email}</a>
            </td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">
              <a href="tel:${phone}" style="color: #1A2D5A;">${phone}</a>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Subject</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${subject}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 20px; background: #f9fafb; border-left: 3px solid #D4A843;">
          <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
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
  // Escape ALL user input
  const studentName = escapeHtml(data.studentName);
  const parentName = escapeHtml(data.parentName);
  const parentPhone = escapeHtml(data.parentPhone);
  const classApplying = escapeHtml(data.classApplying);

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
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 600;">${studentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Class</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${classApplying}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Parent/Guardian</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">${parentName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td>
            <td style="padding: 8px 0; color: #1E1E2E; font-weight: 500;">
              <a href="tel:${parentPhone}" style="color: #1A2D5A;">${parentPhone}</a>
            </td>
          </tr>
        </table>
        <p style="margin-top: 24px; color: #6b7280; font-size: 13px;">
          View all inquiries in the Admin Dashboard.
        </p>
      </div>
    </div>
  `;
}
