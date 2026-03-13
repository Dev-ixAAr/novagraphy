'use server'

import { prisma } from '@/lib/prisma';
import { resend, FROM_EMAIL } from '@/lib/resend';

export async function submitApplication(
  formData: FormData,
  jobTitle: string
) {
  try {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const portfolioUrl = (formData.get('portfolioUrl') as string) || null;
    const linkedinUrl = (formData.get('linkedinUrl') as string) || null;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    // Save to database
    await prisma.jobApplication.create({
      data: {
        jobTitle,
        firstName,
        lastName,
        email,
        phone,
        portfolioUrl,
        linkedinUrl,
      },
    });

    // Send confirmation email via Resend
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Application Received - NOVAGRAPHY',
      html: buildConfirmationEmail(firstName, jobTitle),
    });

    return { success: true };
  } catch (error) {
    console.error('Application submission failed:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

// ─── Premium Dark-Themed HTML Email Template ─────────────────────────────────
function buildConfirmationEmail(firstName: string, jobTitle: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application Received</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(145deg,#12121a 0%,#1a1a2e 100%);border-radius:16px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding:48px 48px 0;text-align:center;">
              <div style="display:inline-block;padding:8px 20px;border:1px solid rgba(45,225,252,0.2);border-radius:100px;background:rgba(45,225,252,0.05);margin-bottom:32px;">
                <span style="color:#2de1fc;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Application Received</span>
              </div>
            </td>
          </tr>

          <!-- Brand Name -->
          <tr>
            <td style="padding:16px 48px 0;text-align:center;">
              <h1 style="margin:0;font-size:36px;font-weight:800;letter-spacing:6px;color:#ffffff;text-transform:uppercase;">NOVAGRAPHY<span style="color:#6366f1;">.</span></h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 48px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:0 48px;">
              <h2 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#ffffff;">Hey ${firstName},</h2>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#a0a0b8;">
                Thank you for applying for the position of
              </p>
              <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px 24px;margin-bottom:24px;">
                <span style="color:#2de1fc;font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">${jobTitle}</span>
              </div>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.7;color:#a0a0b8;">
                We are excited to have received your application. Our team will carefully review your portfolio and qualifications.
              </p>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#a0a0b8;">
                If your profile aligns with what we are looking for, we will reach out to schedule the next steps in our process: <strong style="color:#d0d0e0;">Portfolio Review → Culture Chat → Paid Test Project → Offer.</strong>
              </p>
            </td>
          </tr>

          <!-- Highlight Box -->
          <tr>
            <td style="padding:0 48px 40px;">
              <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(45,225,252,0.06));border:1px solid rgba(99,102,241,0.15);border-radius:12px;padding:24px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#c0c0d8;">
                  💡 <strong style="color:#ffffff;">Pro Tip:</strong> While you wait, make sure your portfolio showcases your most recent and impactful work. First impressions matter.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px;border-top:1px solid rgba(255,255,255,0.04);">
              <p style="margin:0 0 8px;font-size:12px;color:#60607a;text-align:center;letter-spacing:2px;text-transform:uppercase;">
                Novagraphy Creative Studio
              </p>
              <p style="margin:0;font-size:12px;color:#40405a;text-align:center;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
