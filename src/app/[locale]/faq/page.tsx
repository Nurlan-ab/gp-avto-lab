"use client";

import { useTranslations } from "next-intl";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { FaqItem } from "@/lib/data";

export default function FaqPage() {
  const t = useTranslations("home.faq");
  const [items, setItems] = useState<FaqItem[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/admin/api/faq").then(r => r.json()).then(setItems).catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(i => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q));
  }, [items, search]);

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Помощь
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      <Section variant="muted">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="relative mb-10">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск по вопросам..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">{search ? "Ничего не найдено" : "Вопросы не найдены"}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white border border-border/60 overflow-hidden hover:border-blue-200 transition-colors">
                    <button
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-medium pr-4 text-base">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                          openId === item.id ? "rotate-180 text-blue-600" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-200 ${
                        openId === item.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 text-base text-muted-foreground leading-relaxed">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
