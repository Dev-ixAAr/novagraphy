import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[INSERT_CAREERS_TITLE]",
  description: "[INSERT_CAREERS_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_CAREERS_OG_TITLE]",
    description: "[INSERT_CAREERS_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_CAREERS_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_CAREERS_OG_IMAGE_ALT]" }],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
