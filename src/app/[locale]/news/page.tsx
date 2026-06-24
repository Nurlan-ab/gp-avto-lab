import { getLocale } from "next-intl/server";
import { getNews } from "@/lib/data";
import { Link } from "@/lib/routing";
import { Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default async function NewsPage() {
  const locale = await getLocale();
  const news = await getNews(locale, 20);

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Актуальное
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Новости и объявления
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-2xl">
              Актуальная информация о деятельности испытательных лабораторий Кыргызской Республики
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          {news.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-lg">Новостей пока нет</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {news.map((item) => (
                <Link key={item.id} href={`/news/${item.id}`}
                  className="group relative flex flex-col p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
                    {new Date(item.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <h2 className="text-lg font-semibold mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="mt-5 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 group-hover:gap-2 transition-all">
                    Читать далее
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
