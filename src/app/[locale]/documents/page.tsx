import { getLocale } from "next-intl/server";
import { getDocuments } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ScrollText, Download, ExternalLink } from "lucide-react";

export default async function DocumentsPage() {
  const locale = await getLocale();
  const documents = await getDocuments(locale);
  const categories = [...new Set(documents.map((d) => d.category).filter(Boolean))];

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Законодательство
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Нормативные документы
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-2xl">
              Законодательная и нормативная база в области безопасности колёсных транспортных средств
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-5xl mx-auto">
            {documents.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <ScrollText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-lg">Документы не найдены</p>
              </div>
            ) : (
              <>
                {categories.map((cat) => {
                  const docs = documents.filter((d) => d.category === cat);
                  if (docs.length === 0) return null;
                  return (
                    <div key={cat} className="mb-12 last:mb-0">
                      <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        {cat}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {docs.map((doc) => (
                          <div key={doc.id} className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                              <ScrollText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-semibold group-hover:text-blue-700 transition-colors truncate">{doc.title}</h3>
                                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{doc.description}</p>
                              <div className="mt-3 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
                                  <Download className="h-3 w-3" />
                                  Скачать PDF
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
