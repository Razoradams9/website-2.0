import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface MailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: { filename: string; path: string }[];
}

export async function sendEmail(options: MailOptions) {
  return transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    ...options,
  });
}

// ─── Email Templates ──────────────────────────────────────────

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME ?? "School";
  return sendEmail({
    to: email,
    subject: `Password Reset Request — ${schoolName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a3c6e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">${schoolName}</h1>
        </div>
        <div style="padding: 32px; background: #f9fafb;">
          <h2 style="color: #1a3c6e;">Password Reset Request</h2>
          <p>We received a request to reset your password. Click the button below to set a new password:</p>
          <a href="${resetUrl}"
             style="display:inline-block; background:#1a3c6e; color:white; padding:12px 24px;
                    border-radius:8px; text-decoration:none; font-weight:bold; margin: 16px 0;">
            Reset Password
          </a>
          <p style="color: #6b7280; font-size: 14px;">
            This link will expire in 1 hour. If you did not request this, please ignore this email.
          </p>
        </div>
        <div style="padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
          © ${new Date().getFullYear()} ${schoolName}. All rights reserved.
        </div>
      </div>
    `,
  });
}

export async function sendAdmissionConfirmationEmail(
  to: string,
  applicantName: string,
  applicationNo: string,
) {
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME ?? "School";
  return sendEmail({
    to,
    subject: `Admission Application Received — ${schoolName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a3c6e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">${schoolName}</h1>
        </div>
        <div style="padding: 32px; background: #f9fafb;">
          <h2 style="color: #1a3c6e;">Application Received Successfully</h2>
          <p>Dear Parent/Guardian,</p>
          <p>Thank you for applying to <strong>${schoolName}</strong>. We have received the admission application for <strong>${applicantName}</strong>.</p>
          <div style="background: white; border-left: 4px solid #c8a951; padding: 16px; margin: 16px 0;">
            <strong>Application Number: ${applicationNo}</strong>
            <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">
              Please keep this number for future reference.
            </p>
          </div>
          <p>Our admissions team will review your application and contact you within 3-5 working days.</p>
        </div>
        <div style="padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
          © ${new Date().getFullYear()} ${schoolName}. All rights reserved.
        </div>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(to: string, name: string, role: string) {
  const schoolName = process.env.NEXT_PUBLIC_SCHOOL_NAME ?? "School";
  const portalUrl =
    role === "STUDENT"
      ? "/portal/student"
      : role === "PARENT"
        ? "/portal/parent"
        : "/admin/dashboard";

  return sendEmail({
    to,
    subject: `Welcome to ${schoolName} Portal`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a3c6e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">${schoolName}</h1>
        </div>
        <div style="padding: 32px; background: #f9fafb;">
          <h2 style="color: #1a3c6e;">Welcome, ${name}!</h2>
          <p>Your account has been created on the ${schoolName} portal. You can now access your portal using the link below.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}${portalUrl}"
             style="display:inline-block; background:#1a3c6e; color:white; padding:12px 24px;
                    border-radius:8px; text-decoration:none; font-weight:bold; margin: 16px 0;">
            Access Portal
          </a>
        </div>
        <div style="padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
          © ${new Date().getFullYear()} ${schoolName}. All rights reserved.
        </div>
      </div>
    `,
  });
}
