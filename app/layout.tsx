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
  src: "./fonts/CONTRAIL-Regular.woff2",
  variable: "--font-contrail",
  display: "swap",
});

const gcGudlak = localFont({
  src: "./fonts/GCGudlakDemo-Regular.woff2",
  variable: "--font-gudlak",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NOVAGRAPHY | Visual Experience",
  description: "Awwwards-winning portfolio and visual experience.",
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