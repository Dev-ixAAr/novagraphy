// lib/actions/contact.ts
"use server";

import { prisma } from "@/lib/prisma";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import ContactAutoReply from "@/components/emails/ContactAutoReply";

type ContactFormInput = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export async function submitContactForm(data: ContactFormInput) {
  // 1. Save to database
  const submission = await prisma.contactSubmission.create({ data });

  // 2. Send emails (non-blocking — don't fail the form if email fails)
  try {
    // 2a. Admin Alert — notify the team about the new message
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Contact: ${data.subject || "General Inquiry"} — from ${data.name}`,
      text: [
        `New contact form submission from ${data.name}`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Subject: ${data.subject || "N/A"}`,
        ``,
        `Message:`,
        `${data.message}`,
        ``,
        `---`,
        `Reply directly to: ${data.email}`,
      ].join("\n"),
      replyTo: data.email,
    });

    // 2b. Auto-Reply — thank the user
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Thanks for reaching out — Novagraphy",
      react: ContactAutoReply({
        name: data.name,
        subject: data.subject,
      }),
    });
  } catch (emailError) {
    console.error("Failed to send contact emails:", emailError);
    // Don't throw — the submission was saved successfully
  }

  return submission;
}