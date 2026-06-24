import { getLocale } from "next-intl/server";
import { getServices } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FileCheck, ClipboardCheck, Wrench, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "@/lib/routing";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  filecheck: FileCheck,
  clipboardcheck: ClipboardCheck,
  wrench: Wrench,
  messagecircle: MessageCircle,
};
const fallback = [FileCheck, ClipboardCheck, Wrench, MessageCircle];

export default async function ServicesPage() {
  const locale = await getLocale();
  const services = await getServices(locale);

  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">
            Направления работы
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Услуги</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Полный перечень услуг испытательных автолабораторий
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {services.map((svc, i) => {
            const Icon = iconMap[svc.icon?.toLowerCase()] || fallback[i % fallback.length];
            return (
              <div key={svc.id} className="group p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold mb-3">{svc.title}</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">{svc.description}</p>
                    {svc.price && svc.price !== "по запросу" && (
                      <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                        {svc.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
