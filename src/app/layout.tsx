import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Figtree } from "next/font/google";
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

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tapmerce.ai"),
  title: {
    default: "AI Shopping Assistant & Mobile Apps for Nutrition Brands | Tapmerce",
    template: "%s | Tapmerce",
  },
  description:
    "AI shopping for nutrition brands (supplements, infant formula, sports nutrition, healthy food): an AI chatbot for your online store and your own iOS and Android app. Shopify and other platforms.",
  keywords: [
    "ai shopping assistant",
    "ai chatbot for ecommerce",
    "shopify ai chatbot",
    "shopify chatbot",
    "ecommerce ai chatbot",
    "ai product recommendations",
    "product recommendation quiz",
    "shopify mobile app builder",
    "ecommerce mobile app",
    "ai agent for ecommerce",
    "ai shopping agent",
    "agentic commerce",
    "nutrition ecommerce",
    "nutrition app",
    "ecommerce ai assistant",
    "supplement app",
    "supplement marketing",
    "shopify supplement store",
    "supplement subscription",
    "shopify subscription app",
    "ai for nutrition brands",
    "structure function claims",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tapmerce.ai",
    siteName: "Tapmerce",
    title: "AI Shopping Assistant & Mobile Apps for Nutrition Brands",
    description:
      "An AI chatbot for your online store, your own mobile app, and a place in AI shopping marketplaces. Built for nutrition brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Shopping Assistant & Mobile Apps for Nutrition Brands",
    description:
      "An AI chatbot for your online store, your own mobile app, and a place in AI shopping marketplaces. Built for nutrition brands.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://tapmerce.ai",
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${figtree.variable} h-full antialiased`}
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
