import type { Metadata } from "next";
import localFont from "next/font/local";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { InitialPreloader } from "@/components/InitialPreloader";
import { Navbar } from "@/components/Navbar";

// 1. Google Font Setup
const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

// 2. Local Custom Fonts Setup
// Ensure these files exist in /app/fonts/
const baseNeue = localFont({
  src: "./fonts/BaseNeue-Regular.woff2", // Adjust path/filename as needed
  variable: "--font-base-neue",
  display: "swap",
});

const contrail = localFont({
  src: "./fonts/Contrail-Regular.woff2",
  variable: "--font-contrail",
  display: "swap",
});

const gcGudlak = localFont({
  src: "./fonts/GCGudlakDemo-Regular.woff2",
  variable: "--font-gudlak",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novagraphy.com"), // TODO: [INSERT_SITE_URL] — Replace with your production URL
  title: {
    default: "[INSERT_GLOBAL_TITLE_HERE]", // e.g. "NOVAGRAPHY — Premium Digital Design Agency"
    template: "%s | NOVAGRAPHY",
  },
  description: "[INSERT_GLOBAL_DESCRIPTION]",
  keywords: [
    "[INSERT_KEYWORD_1]",
    "[INSERT_KEYWORD_2]",
    "[INSERT_KEYWORD_3]",
    "[INSERT_KEYWORD_4]",
    "[INSERT_KEYWORD_5]",
  ],
  authors: [{ name: "[INSERT_AUTHOR_NAME]" }],
  creator: "[INSERT_CREATOR_NAME]",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NOVAGRAPHY",
    title: "[INSERT_OG_GLOBAL_TITLE]",
    description: "[INSERT_OG_GLOBAL_DESCRIPTION]",
    images: [
      {
        url: "[INSERT_OG_IMAGE_URL]", // e.g. /opengraph-image.png
        width: 1200,
        height: 630,
        alt: "[INSERT_OG_IMAGE_ALT]",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "[INSERT_TWITTER_GLOBAL_TITLE]",
    description: "[INSERT_TWITTER_GLOBAL_DESCRIPTION]",
    images: ["[INSERT_TWITTER_IMAGE_URL]"],
    creator: "[INSERT_TWITTER_HANDLE]", // e.g. @novagraphy
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Suppress hydration warning is required for next-themes
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${shareTechMono.variable} 
          ${baseNeue.variable} 
          ${contrail.variable} 
          ${gcGudlak.variable}
          antialiased selection:bg-electric-blue selection:text-black
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <InitialPreloader />
            <CartDrawer />
            <Navbar />
            {/* Main Content Wrapper */}
            <main className="relative min-h-screen w-full overflow-hidden">
              {children}
            </main>

            {/* Floating Action Button */}
            <ThemeToggle />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}