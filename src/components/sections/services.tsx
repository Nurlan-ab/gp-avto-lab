"use client";

import { useTranslations } from "next-intl";
import { FileCheck, ClipboardCheck, Wrench, MessageCircle, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { motion } from "framer-motion";
import type { ServiceItem } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  filecheck: FileCheck,
  clipboardcheck: ClipboardCheck,
  wrench: Wrench,
  messagecircle: MessageCircle,
};
const fallbackIcons = [FileCheck, ClipboardCheck, Wrench, MessageCircle];

export function ServicesSection({ services }: { services: ServiceItem[] }) {
  const t = useTranslations("home.services");

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4">
            Направления работы
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((svc, i) => {
            const Icon = iconMap[svc.icon.toLowerCase()] || fallbackIcons[i % fallbackIcons.length];
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group relative h-full p-8 rounded-2xl bg-white border border-border/60 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                    <Icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight">{svc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {svc.description}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                    Подробнее
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
