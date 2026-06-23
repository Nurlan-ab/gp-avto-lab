"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/lib/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function ContactsSection() {
  const t = useTranslations("home.contacts");
  const ct = useTranslations("common");

  return (
    <Section variant="primary">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: MapPin, label: ct("address"), value: "г. Бишкек, ул. М. Горького, 142" },
            { icon: Phone, label: t("callCenter"), value: "+996 ( )  " },
            { icon: Mail, label: ct("contactEmail"), value: "laboratory@avtomektep.gov.kg" },
            { icon: Clock, label: ct("workingHours"), value: "09:00–18:00", extra: ct("lunch") + ": 12:30–13:30" },
          ].map((item, i) => (
            <Card key={i} className="bg-white/10 border-white/20 text-white backdrop-blur">
              <CardContent className="p-5 text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-blue-200" />
                </div>
                <p className="text-sm text-blue-200">{item.label}</p>
                <p className="font-medium">{item.value}</p>
                {item.extra && <p className="text-xs text-blue-300">{item.extra}</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/feedback"
            className="bg-white text-blue-900 hover:bg-blue-50 inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md font-medium transition-colors"
          >
            {ct("feedback")}
            <Send className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
