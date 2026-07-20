import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPaletteProvider } from "@/components/command-palette-context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://sparklaunch.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SparkLaunch — Launch your product. Reach thousands of makers.",
    template: "%s · SparkLaunch",
  },
  description:
    "SparkLaunch is the all-in-one launch platform for makers and founders. Launch your product, reach thousands of makers, and get your first users in one click.",
  keywords: [
    "product launch",
    "makers",
    "startup",
    "indie hackers",
    "launch platform",
    "product hunt alternative",
  ],
  authors: [{ name: "SparkLaunch" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "SparkLaunch — Launch your product. Reach thousands of makers.",
    description:
      "Launch your product, reach thousands of makers, and get your first users in one click.",
    siteName: "SparkLaunch",
  },
  twitter: {
    card: "summary_large_image",
    title: "SparkLaunch",
    description:
      "Launch your product. Reach thousands of makers. Get your first users in one click.",
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CommandPaletteProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CommandPaletteProvider>
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
