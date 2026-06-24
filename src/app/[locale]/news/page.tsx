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
    <Section>
      <Container>
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">
            Актуальное
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">Новости</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Актуальная информация о деятельности испытательных лабораторий
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">Новостей пока нет</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {news.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`}
                className="group relative p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" />
                  {new Date(item.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <h2 className="text-lg font-semibold mb-3 leading-snug group-hover:text-blue-700 transition-colors">{item.title}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{item.excerpt}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  Читать далее
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
