"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { FaqItem } from "@/lib/data";

export function FaqSection({ items }: { items: FaqItem[] }) {
  const t = useTranslations("home.faq");
  const [openId, setOpenId] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-border/60 overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium pr-4">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openId === item.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openId === item.id && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
