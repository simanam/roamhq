import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { VideoShowcase } from "@/components/sections/video-showcase";
import { LiveMap } from "@/components/sections/live-map";
import { ForBrands } from "@/components/sections/for-brands";
import { ForFleets } from "@/components/sections/for-fleets";
import { Metrics } from "@/components/sections/metrics";
import { DashboardPreview } from "@/components/dashboard/dashboard-preview";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://roamhq.co";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Roam",
  url: siteUrl,
  logo: `${siteUrl}/roamlogo.png`,
  description:
    "GPS-tracked mobile billboard advertising platform. Transform commercial trucks into measurable advertising assets with verified exposure and real-time tracking.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: "English",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    offerCount: "3",
    offers: [
      {
        "@type": "Offer",
        name: "Starter Campaign",
        description: "Regional mobile billboard campaign with 1-3 trucks",
        price: "2500",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Growth Campaign",
        description: "Multi-market mobile billboard campaign with 5-10 trucks",
        price: "8500",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Enterprise Campaign",
        description: "National network mobile billboard campaign with 20+ trucks",
        price: "0",
        priceCurrency: "USD",
      },
    ],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Mobile Billboard Advertising",
  provider: {
    "@type": "Organization",
    name: "Roam",
  },
  description:
    "GPS-tracked mobile billboard advertising on commercial trucks. Real-time tracking, verified exposure, and outcome-based pricing.",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <main id="main-content" className="min-h-screen">
        <Navbar />
        <Hero />
        <HowItWorks />
        <VideoShowcase />
        <LiveMap />
        <ForBrands />
        <ForFleets />
        <Metrics />
        <DashboardPreview />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
