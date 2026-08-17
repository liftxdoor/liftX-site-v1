import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const siteUrl = new URL("https://liftxdoor.com");

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "LIFTX",
  url: siteUrl.href,
  logo: new URL("/images/liftx-wordmark.png", siteUrl).href,
  image: new URL("/gallery/full-view-github-hero.jpg", siteUrl).href,
  telephone: "+1-208-995-4321",
  email: "josh@liftxdoor.com",
  description:
    "Garage door installation, repair, operators, commercial overhead doors, and premium Full-View systems across Boise and the Treasure Valley.",
  areaServed: [
    "Boise",
    "Meridian",
    "Eagle",
    "Nampa",
    "Caldwell",
    "Kuna",
    "Star",
    "Garden City",
    "Treasure Valley",
    "Valley County",
  ].map((name) => ({ "@type": "AdministrativeArea", name })),
  serviceType: [
    "Garage door repair",
    "Garage door installation",
    "Commercial overhead doors",
    "Full-View aluminum and glass doors",
    "Garage door openers",
  ],
};

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Garage Door & Full-View Experts in the Treasure Valley | LIFTX",
    template: "%s | LIFTX",
  },
  description:
    "Garage door repair, installation, operators, commercial overhead doors, and premium Full-View systems across Boise and the Treasure Valley.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "LIFTX",
    title: "Garage Door & Full-View Experts in the Treasure Valley | LIFTX",
    description:
      "Garage door repair, installation, operators, commercial overhead doors, and premium Full-View systems across Boise and the Treasure Valley.",
    images: [
      {
        url: "/gallery/full-view-github-hero.jpg",
        width: 1600,
        height: 900,
        alt: "Full-View aluminum and glass door installed by LIFTX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage Door & Full-View Experts in the Treasure Valley | LIFTX",
    description:
      "Garage door repair, installation, operators, commercial overhead doors, and premium Full-View systems across Boise and the Treasure Valley.",
    images: ["/gallery/full-view-github-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
