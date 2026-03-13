import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

type ContactAutoReplyProps = {
  name: string;
  subject?: string;
};

export default function ContactAutoReply({
  name = "there",
  subject,
}: ContactAutoReplyProps) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out to Novagraphy</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Text style={logo}>NOVAGRAPHY</Text>
          </Section>

          <Hr style={divider} />

          {/* Content */}
          <Section style={section}>
            <Heading style={heading}>Hey {name},</Heading>
            <Text style={paragraph}>
              Thanks for reaching out to us
              {subject ? ` regarding "${subject}"` : ""}. We&apos;ve received
              your message and our team will get back to you within 24 hours.
            </Text>
            <Text style={paragraph}>
              In the meantime, feel free to check out our latest work on the
              portfolio or browse our shop.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Signature */}
          <Section style={section}>
            <Text style={signatureText}>
              Warm regards,
              <br />
              <strong style={{ color: "#ffffff" }}>The Novagraphy Team</strong>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              This is an automated reply. Please don&apos;t respond to this
              email directly. If you need immediate assistance, email us at
              hello@novagraphy.com.
            </Text>
            <Text style={footerBrand}>
              © {new Date().getFullYear()} NOVAGRAPHY. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ============================================
// STYLES — Premium Dark Theme
// ============================================
const main: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 20px",
};

const headerSection: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const logo: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#ffffff",
  letterSpacing: "6px",
  margin: "0",
};

const divider: React.CSSProperties = {
  borderColor: "#1a1a1a",
  margin: "24px 0",
};

const section: React.CSSProperties = {
  padding: "0 4px",
};

const heading: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "300",
  margin: "0 0 16px 0",
};

const paragraph: React.CSSProperties = {
  color: "#888888",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0 0 16px 0",
};

const signatureText: React.CSSProperties = {
  color: "#888888",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0",
};

const footerSection: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const footerText: React.CSSProperties = {
  color: "#555555",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 16px 0",
};

const footerBrand: React.CSSProperties = {
  color: "#333333",
  fontSize: "10px",
  letterSpacing: "3px",
  margin: "0",
};
