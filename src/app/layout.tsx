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
    "Triple M Public School, Hoshiarpur — Established in 2012. Offering Secondary and Higher Secondary education (PSEB) with experienced faculty, modern science labs, smart classrooms, and 16 bus routes across Hoshiarpur district.",
  keywords: [
    "Triple M Public School",
    "Triple M School Hoshiarpur",
    "school in Hoshiarpur",
    "PSEB school Punjab",
    "best school Hoshiarpur",
    "admissions 2025",
    "Class XI XII admissions",
    "Medical Non-Medical Commerce Arts",
    "school near Talwara",
    "school near Mukerian",
  ],
  authors: [{ name: "Triple M Public School" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.triplemschool.in",
    siteName: "Triple M Public School",
    title: "Triple M Public School — Hoshiarpur, Punjab",
    description:
      "Shaping young minds since 2012. Admissions open for the 2025–26 session.",
    images: [
      {
        url: "/images/campus/triple-m-building.png",
        width: 1200,
        height: 630,
        alt: "Triple M Public School Campus, Hoshiarpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triple M Public School — Hoshiarpur, Punjab",
    description:
      "Shaping young minds since 2012. Admissions open for the 2025–26 session.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.triplemschool.in",
  },
};

// JSON-LD Structured Data — tells Google this is a School
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://www.triplemschool.in",
  name: "Triple M Public School",
  alternateName: "Triple M School",
  url: "https://www.triplemschool.in",
  logo: "https://www.triplemschool.in/images/logo.png",
  image: "https://www.triplemschool.in/images/campus/triple-m-building.png",
  description:
    "Triple M Public School is a co-educational English medium school in Hoshiarpur, Punjab offering Secondary and Higher Secondary education under PSEB. Established in 2012.",
  foundingDate: "2012",
  telephone: "+919888299600",
  email: "triplem_school@yahoo.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hoshiarpur",
    addressLocality: "Hoshiarpur",
    addressRegion: "Punjab",
    postalCode: "146001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "31.532",
    longitude: "75.911",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "12:30",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Academic Programs",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Secondary Education (Class VI–X)" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Higher Secondary — Medical (Class XI–XII)" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Higher Secondary — Non-Medical (Class XI–XII)" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Higher Secondary — Commerce (Class XI–XII)" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
