import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[INSERT_CONTACT_TITLE]",
  description: "[INSERT_CONTACT_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_CONTACT_OG_TITLE]",
    description: "[INSERT_CONTACT_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_CONTACT_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_CONTACT_OG_IMAGE_ALT]" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
