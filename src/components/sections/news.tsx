"use client";

import { useTranslations } from "next-intl";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/lib/routing";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const newsItems = [
  {
    date: "2026-06-20",
    title: "Обновление перечня нормативных документов",
    excerpt: "В разделе «Нормативные документы» опубликованы актуальные редакции ТР ТС 018/2011 и сопутствующих ГОСТов.",
  },
  {
    date: "2026-06-15",
    title: "График работы в праздничные дни",
    excerpt: "Ознакомьтесь с изменённым графиком работы испытательных лабораторий в период государственных праздников.",
  },
  {
    date: "2026-06-10",
    title: "Новый пункт испытаний в Ошской области",
    excerpt: "Открыт дополнительный пункт проведения испытаний транспортных средств в с. Жапалак Ошской области.",
  },
  {
    date: "2026-06-01",
    title: "Внедрение электронной очереди",
    excerpt: "Система электронной очереди теперь доступна для предварительной записи на проведение испытаний.",
  },
];

export function NewsSection() {
  const t = useTranslations("home.news");
  const ct = useTranslations("common");

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.slice(0, 4).map((item, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(item.date)}</span>
                </div>
                <CardTitle className="text-base leading-snug">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm leading-relaxed">
                  {item.excerpt}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/news"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {ct("readMore")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
