"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, Send, Shield } from "lucide-react";
import { Link } from "@/lib/routing";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function ContactsSection() {
  const t = useTranslations("home.contacts");
  const ct = useTranslations("common");

  return (
    <Section variant="primary">
      <Container>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-200 mb-4 inline-block">Связь с нами</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{t("title")}</h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { icon: MapPin, label: ct("address"), value: "г. Бишкек, ул. М. Горького, 142" },
            { icon: Phone, label: t("callCenter"), value: "+996 ( )" },
            { icon: Mail, label: ct("contactEmail"), value: "laboratory@avtomektep.gov.kg" },
            { icon: Clock, label: ct("workingHours"), value: "09:00–18:00", extra: "Перерыв 12:30–13:30" },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur hover:bg-white/10 transition-colors">
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-blue-200" />
              </div>
              <p className="text-xs text-blue-200/60 font-medium tracking-wider uppercase">{item.label}</p>
              <p className="text-sm font-medium">{item.value}</p>
              {item.extra && <p className="text-xs text-blue-300/70">{item.extra}</p>}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-white text-blue-900 font-semibold hover:bg-blue-50 transition-all shadow-lg"
          >
            <Send className="h-5 w-5" />
            {ct("feedback")}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
