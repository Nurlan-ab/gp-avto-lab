import { getLabs } from "@/lib/data";
import { Link } from "@/lib/routing";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function LaboratoriesPage() {
  const labs = await getLabs();

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Сеть пунктов
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Испытательные лаборатории
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-2xl">
              5 пунктов испытаний на территории Кыргызской Республики — от Бишкека до Оша
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          {labs.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg">Данные о лабораториях не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {labs.map((lab, i) => (
                <div key={lab.id} className="group relative p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{lab.id}</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs text-muted-foreground">Работает</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold tracking-tight mb-4 group-hover:text-blue-700 transition-colors">{lab.name}</h2>
                  <div className="space-y-3">
                    <p className="text-base text-muted-foreground flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-600" />
                      {lab.address}
                    </p>
                    {lab.phone && (
                      <p className="text-base text-muted-foreground flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0 text-blue-600" />
                        {lab.phone}
                      </p>
                    )}
                    <p className="text-base text-muted-foreground flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-blue-600" />
                      {lab.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "gap-2")}>
              На главную
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
