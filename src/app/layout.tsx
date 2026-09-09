import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd, organizationSchema, websiteSchema, softwareAppSchema } from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AskShop — Shopify Mobile App Builder with AI Shopping",
    template: "%s | AskShop",
  },
  description:
    "Turn your Shopify store into a native iOS and Android app with an AI shopping assistant built in. Native checkout, push notifications, no success fees.",
  keywords: [
    "shopify mobile app builder",
    "shopify app builder",
    "ai shopping",
    "ai shopping app",
    "turn shopify store into mobile app",
    "shopify to mobile app",
    "convert shopify to mobile app",
    "shopify native app",
    "mobile commerce shopify",
    "ai shopping assistant",
    "conversational commerce",
    "shopify push notifications",
    "white label mobile app",
    "shopify to ios app",
    "shopify to android app",
    "universal commerce protocol",
    "ucp shopify",
    "agentic commerce",
    "ai shopping agent",
    "ai visibility ecommerce",
    "ecommerce retention app",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://askshop.app",
    siteName: "AskShop",
    title: "AskShop — Shopify Mobile App Builder with AI Shopping",
    description:
      "Turn your Shopify store into a native app with an AI shopping assistant built in. Native checkout, push notifications, no success fees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AskShop — Shopify Mobile App Builder with AI Shopping",
    description:
      "Turn your Shopify store into a native app with an AI shopping assistant built in. Native checkout, push notifications, no success fees.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://askshop.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={softwareAppSchema} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
