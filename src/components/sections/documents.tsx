import { useTranslations } from "next-intl";
import { ScrollText, ExternalLink, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const documents = [
  { label: "ТР ТС 018/2011", desc: "О безопасности колёсных ТС" },
  { label: "Решение КТС № 877", desc: "Порядок оценки соответствия" },
  { label: "ГОСТ 33670-2015", desc: "Методы испытаний ТС" },
  { label: "ГОСТ 33997-2016", desc: "Требования к маркировке" },
];

export function DocumentsSection() {
  const t = useTranslations("home.documents");

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
            <div key={doc.label} className="group flex items-start gap-4 p-6 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                <ScrollText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold group-hover:text-blue-700 transition-colors truncate">{doc.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/documents" className={cn(buttonVariants({ variant: "outline" }))}>
            {t("title")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
