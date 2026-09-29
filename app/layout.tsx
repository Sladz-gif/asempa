import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { ChatFloatingButton } from "@/components/chat/ChatFloatingButton";
import { ChatMobileSheet } from "@/components/chat/ChatPanel";
import { BookingModalWrapper } from "@/components/booking/BookingModalWrapper";
import { LegalServiceJSONLD } from "@/components/seo/JSONLD";
import { FIRM } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(FIRM.siteUrl),
  title: {
    default: `${FIRM.name} · ${FIRM.shortName} Law Firm, Accra Ghana`,
    template: `%s · ${FIRM.shortName}`,
  },
  description: `${FIRM.positioning} ${FIRM.name} is an Accra-based law firm specialising in corporate & commercial law, dispute resolution, property, family & succession, employment, and regulatory compliance.`,
  keywords: [
    "law firm Accra",
    "lawyers Ghana",
    "corporate law Ghana",
    "dispute resolution Ghana",
    "property law Accra",
    "family law Ghana",
    "Data Protection Act 843",
    "Companies Act 992",
  ],
  authors: [{ name: FIRM.name }],
  creator: FIRM.name,
  publisher: FIRM.name,
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: FIRM.siteUrl,
    siteName: FIRM.name,
    title: `${FIRM.name} — Law Firm, Accra Ghana`,
    description: FIRM.positioning,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: FIRM.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${FIRM.name} — Accra Law Firm`,
    description: FIRM.positioning,
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "legal",
};

export const viewport: Viewport = {
  themeColor: "#FAF6EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GH"
      className="antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700;800;900&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-warm-surface text-warm-text overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black-900"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatFloatingButton />
        <ChatMobileSheet />
        <BookingModalWrapper />
        <CookieBanner />
        <LegalServiceJSONLD />
      </body>
    </html>
  );
}
