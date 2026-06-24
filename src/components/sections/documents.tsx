"use client";

import { useTranslations } from "next-intl";
import { ScrollText, ExternalLink, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { DocumentItem } from "@/lib/data";

export function DocumentsSection({ documents }: { documents: DocumentItem[] }) {
  const t = useTranslations("home.documents");

  if (documents.length === 0) return null;

  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">Законодательство</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {documents.map((doc) => (
            <div key={doc.id} className="group flex items-start gap-4 p-6 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                <ScrollText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold group-hover:text-blue-700 transition-colors truncate">{doc.title}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                {doc.category && (
                  <span className="inline-block mt-2 text-xs uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{doc.category}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/documents" className="group inline-flex items-center gap-2 h-12 px-8 rounded-full border-2 border-blue-600 bg-blue-600 text-white font-medium hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30">
            {t("title")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
