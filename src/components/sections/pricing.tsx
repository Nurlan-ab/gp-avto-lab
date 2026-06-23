"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const priceItems = [
  { service: "Выдача СБКТС (для физических лиц)", price: "по запросу", unit: "услуга" },
  { service: "Выдача СБКТС (для юридических лиц)", price: "по запросу", unit: "услуга" },
  { service: "Техническая экспертиза ТС", price: "по запросу", unit: "услуга" },
  { service: "Испытания тормозных систем", price: "по запросу", unit: "ось" },
  { service: "Проверка световых приборов", price: "по запросу", unit: "услуга" },
  { service: "Проверка экологичности (CO/CH)", price: "по запросу", unit: "услуга" },
  { service: "Идентификация ТС", price: "по запросу", unit: "услуга" },
  { service: "Консультация специалиста", price: "бесплатно", unit: "" },
];

export function PricingSection() {
  const t = useTranslations("home.pricing");
  const ct = useTranslations("common");

  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-primary/20">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Услуга</th>
                <th className="text-right py-3 px-4 font-semibold text-foreground w-32">Стоимость</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground w-24">Ед. изм.</th>
              </tr>
            </thead>
            <tbody>
              {priceItems.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-muted hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 text-muted-foreground">{item.service}</td>
                  <td className="py-3 px-4 text-right font-medium text-foreground">
                    {item.price}
                  </td>
                  <td className="py-3 px-4 text-center text-muted-foreground">
                    {item.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Актуальные цены уточняйте в испытательной лаборатории. Стоимость может изменяться.
        </p>

        <div className="text-center mt-8">
          <Link
            href="/services"
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
