import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Victorian Points Test Calculator | VicPoints",
  description:
    "Estimate your Victorian Points Test (VPT) score for skilled visa nomination under subclasses 190 and 491. Explore the published scoring factors, salary scenarios, and official resources.",
  keywords: [
    "Victorian Points Test",
    "VPT calculator",
    "Victoria skilled nomination",
    "Subclass 190 Victoria",
    "Subclass 491 Victoria",
    "Live in Melbourne ROI",
    "Registration of Interest",
    "Victorian visa points",
  ],
  authors: [{ name: "VicPoints Independent Research" }],
  openGraph: {
    title: "Victorian Points Test Calculator | VicPoints",
    description:
      "Estimate your Victorian Points Test score for skilled visa nomination under subclasses 190 and 491. Explore the published scoring factors and official resources.",
    url: "https://vicpoints.com.au",
    siteName: "VicPoints",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victorian Points Test Calculator | VicPoints",
    description:
      "Estimate your Victorian Points Test (VPT) score for skilled visa nomination under subclasses 190 and 491.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-navy-950 dark:text-slate-100 flex flex-col font-sans transition-colors antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
