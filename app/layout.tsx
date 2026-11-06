import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cosmicpower.ltd";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s | Golden Deer",
    default: "Golden Deer | Premium Makhana from Bihar",
  },
  description:
    "Discover Golden Deer makhana from Bihar by Cosmic Power Pvt. Ltd. Explore roasted flavours, raw fox nuts, recipes, and retail, wholesale and gifting enquiries.",
  openGraph: {
    title: "Golden Deer | Premium Makhana from Bihar",
    description:
      "Rooted in Bihar. Made for your everyday crunch. Discover our makhana collection, recipes, and retail, wholesale and gifting enquiries.",
    url: "https://www.cosmicpower.ltd/",
    siteName: "Golden Deer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Golden Deer premium makhana from Bihar by Cosmic Power Pvt. Ltd.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Deer | Premium Makhana from Bihar",
    description:
      "Discover Golden Deer makhana from Bihar. Explore roasted flavours, recipes, and retail, wholesale and gifting enquiries.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/images/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/logo.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.cosmicpower.ltd/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2E1E",
};

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-cream text-forest-deep">
        <OrganizationSchema />
        <WebSiteSchema />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
