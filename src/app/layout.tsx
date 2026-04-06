import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
import LayoutShell from "@/components/layout/LayoutShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Triple M Public School — Hoshiarpur, Punjab",
    template: "%s | Triple M Public School",
  },
  description:
    "Triple M Public School, Hoshiarpur — Established in 2012. Offering Secondary and Higher Secondary education with experienced faculty, modern science labs, smart classrooms, and comprehensive transport facilities across Hoshiarpur district.",
  keywords: [
    "Triple M Public School",
    "Hoshiarpur",
    "Punjab",
    "school",
    "education",
    "admissions",
    "CBSE",
    "science",
    "medical",
    "non-medical",
  ],
  authors: [{ name: "Triple M Public School" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.triplemschool.in",
    siteName: "Triple M Public School",
    title: "Triple M Public School — Hoshiarpur, Punjab",
    description:
      "Shaping young minds since 2012. Admissions open for the upcoming session.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triple M Public School — Hoshiarpur, Punjab",
    description:
      "Shaping young minds since 2012. Admissions open for the upcoming session.",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
