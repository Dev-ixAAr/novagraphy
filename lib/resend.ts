// lib/resend.ts
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender — update this when you verify your domain on Resend
// For testing, Resend provides: "onboarding@resend.dev"
export const FROM_EMAIL = "Acme <onboarding@resend.dev>";

// Admin email for alerts
export const ADMIN_EMAIL = "catyykitty@gmail.com";
