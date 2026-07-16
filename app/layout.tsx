import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/shared/SmoothScroll";
import PageTransition from "@/components/shared/PageTransition";
import ScrollProgress from "@/components/shared/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://goldendeer.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: "%s — Golden Deer",
    default:
      "Golden Deer — Premium Roasted Makhana & Bulk Fox Nuts by Cosmic Power",
  },
  description:
    "Discover Golden Deer premium roasted makhana — clean-label, high-protein, naturally gluten-free. Sustainably sourced from pristine wetlands. Shop online or inquire about bulk orders.",
  openGraph: {
    title: "Golden Deer — Premium Roasted Makhana & Bulk Fox Nuts",
    description:
      "Hand-picked jumbo seeds, slow-roasted to perfection. No preservatives. Retail via Blinkit, Zepto, Amazon. Bulk & wholesale inquiries welcome.",
    url: "/",
    siteName: "Golden Deer",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Golden Deer — Premium Roasted Makhana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Deer — Premium Roasted Makhana & Bulk Fox Nuts",
    description:
      "Hand-picked jumbo seeds, slow-roasted to perfection. No preservatives. Retail via Blinkit, Zepto, Amazon. Bulk & wholesale inquiries welcome.",
    images: ["/images/og/og-home.jpg"],
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
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2E1E",
};

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
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main className="flex-1 pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
