"use client";

import { useTranslations } from "next-intl";
import { Calendar, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { NewsItem } from "@/lib/data";

export function NewsSection({ items }: { items: NewsItem[] }) {
  const t = useTranslations("home.news");
  const ct = useTranslations("common");

  if (items.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">Актуальное</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item) => (
            <div key={item.id} className="group relative p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                {new Date(item.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              <h3 className="text-lg font-semibold mb-3 leading-snug group-hover:text-blue-700 transition-colors">{item.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{item.excerpt}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/news" className="group inline-flex items-center gap-2 h-12 px-8 rounded-full border-2 border-blue-600 bg-blue-600 text-white font-medium hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30">
            {ct("readMore")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
