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
    default: "AskShop — Turn Your Shopify Store Into a Native Mobile App",
    template: "%s | AskShop",
  },
  description:
    "Build a dedicated native mobile app for your Shopify store. Choose between an AI-powered chat shopping experience or a classic store app. Push notifications, native checkout, white-label builds.",
  keywords: [
    "shopify mobile app builder",
    "shopify app builder",
    "convert shopify to mobile app",
    "shopify native app",
    "mobile commerce shopify",
    "ai shopping assistant",
    "conversational commerce",
    "shopify push notifications",
    "white label mobile app",
    "shopify to ios app",
    "shopify to android app",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://askshop.app",
    siteName: "AskShop",
    title: "AskShop — Turn Your Shopify Store Into a Native Mobile App",
    description:
      "Build a dedicated native mobile app for your Shopify store. AI chat shopping or classic store experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AskShop — Shopify Mobile App Builder",
    description:
      "Build a dedicated native mobile app for your Shopify store. AI chat shopping or classic store experience.",
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
