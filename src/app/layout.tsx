import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/context/waitlist-context";
import { WaitlistModal } from "@/components/ui/waitlist-modal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roamhq.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roam - GPS-Tracked Mobile Billboard Advertising",
    template: "%s | Roam",
  },
  description:
    "Transform commercial trucks into measurable advertising assets. GPS-tracked mobile billboards with verified exposure, real routes, and outcome-based pricing. Launch campaigns that move with your audience.",
  keywords: [
    "mobile billboard advertising",
    "truck advertising",
    "fleet advertising",
    "out-of-home advertising",
    "OOH advertising",
    "GPS-tracked billboards",
    "trailer wrap advertising",
    "truck wrap advertising",
    "mobile advertising",
    "transit advertising",
    "fleet monetization",
    "truck advertising network",
    "brand awareness",
    "outdoor advertising",
  ],
  authors: [{ name: "Roam" }],
  creator: "Roam",
  publisher: "Roam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Roam",
    title: "Roam - GPS-Tracked Mobile Billboard Advertising",
    description:
      "Transform commercial trucks into measurable advertising assets. GPS-tracked mobile billboards with verified exposure and real-time tracking.",
    images: [
      {
        url: "/roamprebiw.png",
        width: 1200,
        height: 630,
        alt: "Roam - Turn Every Mile Into A Measurable Impression",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roam - GPS-Tracked Mobile Billboard Advertising",
    description:
      "Transform commercial trucks into measurable advertising assets. GPS-tracked mobile billboards with verified exposure.",
    images: ["/roamprebiw.png"],
    creator: "@roamhq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "advertising",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-electric-indigo focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <WaitlistProvider>
          {children}
          <WaitlistModal />
        </WaitlistProvider>
      </body>
    </html>
  );
}
