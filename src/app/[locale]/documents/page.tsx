import { getLocale } from "next-intl/server";
import { getDocuments } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ScrollText } from "lucide-react";

export default async function DocumentsPage() {
  const locale = await getLocale();
  const documents = await getDocuments(locale);

  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">
            Законодательство
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Нормативные документы
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Законодательная база в области безопасности транспортных средств
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {documents.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">Документы не найдены</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="group flex items-start gap-4 p-6 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                    <ScrollText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold group-hover:text-blue-700 transition-colors">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                    {doc.category && (
                      <span className="inline-block mt-2 text-xs uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {doc.category}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
