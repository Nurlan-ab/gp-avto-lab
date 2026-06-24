import { getLocale } from "next-intl/server";
import { getServices } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FileCheck, ClipboardCheck, Wrench, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "@/lib/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  filecheck: FileCheck, clipboardcheck: ClipboardCheck, wrench: Wrench, messagecircle: MessageCircle,
};
const fallback = [FileCheck, ClipboardCheck, Wrench, MessageCircle];

export default async function ServicesPage() {
  const locale = await getLocale();
  const services = await getServices(locale);

  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-950 via-slate-900 to-slate-800 py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Направления работы
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Услуги лабораторий
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-2xl">
              Полный перечень услуг, оказываемых испытательными автолабораториями Кыргызской Республики
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {services.map((svc, i) => {
              const Icon = iconMap[svc.icon?.toLowerCase()] || fallback[i % fallback.length];
              return (
                <div key={svc.id} className="group p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:text-blue-700 transition-colors">{svc.title}</h2>
                      <p className="text-base text-muted-foreground leading-relaxed mb-4">{svc.description}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        {svc.price && (
                          <span className="inline-flex items-center text-sm font-semibold text-blue-700 bg-blue-50 px-4 py-1.5 rounded-lg">
                            {svc.price}
                          </span>
                        )}
                        <Link href="/feedback" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                          Заказать услугу
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16 p-10 rounded-2xl bg-gradient-to-r from-blue-50 to-white border border-blue-100">
            <h3 className="text-xl font-bold mb-3">Нужна консультация?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">Свяжитесь с нами для уточнения стоимости и сроков оказания услуг</p>
            <Link href="/feedback" className={cn(buttonVariants({}), "bg-blue-600 hover:bg-blue-700 text-white")}>
              Оставить заявку
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
