import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[INSERT_NOVASTUDIO_TITLE]",
  description: "[INSERT_NOVASTUDIO_DESCRIPTION]",
  openGraph: {
    title: "[INSERT_NOVASTUDIO_OG_TITLE]",
    description: "[INSERT_NOVASTUDIO_OG_DESCRIPTION]",
    images: [{ url: "[INSERT_NOVASTUDIO_OG_IMAGE_URL]", width: 1200, height: 630, alt: "[INSERT_NOVASTUDIO_OG_IMAGE_ALT]" }],
  },
};

export default function NovaStudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
