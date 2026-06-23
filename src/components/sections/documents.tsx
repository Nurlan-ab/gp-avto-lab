import { useTranslations } from "next-intl";
import { ScrollText, ExternalLink } from "lucide-react";
import { Link } from "@/lib/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const documents = [
  { label: "ТР ТС 018/2011", href: "#" },
  { label: "Решение КТС № 877", href: "#" },
  { label: "Решение ЕЭК № 232", href: "#" },
  { label: "ГОСТ 33670-2015", href: "#" },
  { label: "ГОСТ 33997-2016", href: "#" },
];

export function DocumentsSection() {
  const t = useTranslations("home.documents");

  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {documents.map((doc) => (
            <a
              key={doc.label}
              href={doc.href}
              className="flex items-center gap-3 p-4 rounded-lg bg-card border hover:border-primary/50 hover:shadow transition-all group"
            >
              <ScrollText className="h-5 w-5 text-blue-700 shrink-0" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">
                {doc.label}
              </span>
              <ExternalLink className="h-3.5 w-3.5 ml-auto text-muted-foreground shrink-0" />
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/documents"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t("title")}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
