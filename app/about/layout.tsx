import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[INSERT_ABOUT_TITLE]",
  description: "[INSERT_ABOUT_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_ABOUT_OG_TITLE]",
    description: "[INSERT_ABOUT_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_ABOUT_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_ABOUT_OG_IMAGE_ALT]" }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
