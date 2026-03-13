import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[INSERT_NOVA2_TITLE]",
  description: "[INSERT_NOVA2_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_NOVA2_OG_TITLE]",
    description: "[INSERT_NOVA2_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_NOVA2_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_NOVA2_OG_IMAGE_ALT]" }],
  },
};

export default function Nova2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
