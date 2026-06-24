import { getLocale } from "next-intl/server";
import { getNews, getDocuments, getServices, getLabs, getFaq, getPage } from "@/lib/data";
import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { NewsSection } from "@/components/sections/news";
import { DocumentsSection } from "@/components/sections/documents";
import { PricingSection } from "@/components/sections/pricing";
import { LaboratoriesSection } from "@/components/sections/laboratories";
import { FaqSection } from "@/components/sections/faq";
import { FeedbackSection } from "@/components/sections/feedback";
import { MapSection } from "@/components/sections/map-section";
import { ContactsSection } from "@/components/sections/contacts";

export default async function HomePage() {
  const locale = await getLocale();

  const [news, documents, services, labs, faq] = await Promise.all([
    getNews(locale),
    getDocuments(locale),
    getServices(locale),
    getLabs(),
    getFaq(locale),
  ]);

  return (
    <>
      <HeroSection />
      <ServicesSection services={services} />
      <NewsSection items={news} />
      <DocumentsSection documents={documents} />
      <PricingSection services={services} />
      <LaboratoriesSection labs={labs} />
      <FaqSection items={faq} />
      <MapSection />
      <FeedbackSection />
      <ContactsSection />
    </>
  );
}
