"use client";

import { useTranslations } from "next-intl";
import { Calendar, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const newsItems = [
  { date: "2026-06-20", title: "Обновление перечня нормативных документов", excerpt: "В разделе «Нормативные документы» опубликованы актуальные редакции ТР ТС 018/2011 и сопутствующих ГОСТов." },
  { date: "2026-06-15", title: "График работы в праздничные дни", excerpt: "Ознакомьтесь с изменённым графиком работы испытательных лабораторий." },
  { date: "2026-06-10", title: "Новый пункт испытаний в Ошской области", excerpt: "Открыт дополнительный пункт проведения испытаний транспортных средств в с. Жапалак." },
];

export function NewsSection() {
  const t = useTranslations("home.news");
  const ct = useTranslations("common");

  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">Актуальное</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {newsItems.map((item, i) => (
            <div key={i} className="group relative p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                {new Date(item.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              <h3 className="text-base font-semibold mb-3 leading-snug group-hover:text-blue-700 transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.excerpt}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/news" className={cn(buttonVariants({ variant: "outline" }))}>
            {ct("readMore")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
