import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { NewsSection } from "@/components/sections/news";
import { DocumentsSection } from "@/components/sections/documents";
import { PricingSection } from "@/components/sections/pricing";
import { LaboratoriesSection } from "@/components/sections/laboratories";
import { MapSection } from "@/components/sections/map-section";
import { ContactsSection } from "@/components/sections/contacts";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <NewsSection />
      <DocumentsSection />
      <PricingSection />
      <LaboratoriesSection />
      <MapSection />
      <ContactsSection />
    </>
  );
}
