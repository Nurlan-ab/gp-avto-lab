import { getLocale } from "next-intl/server";
import { getSql, initDb } from "@/lib/db";
import { getNews } from "@/lib/data";
import { Link } from "@/lib/routing";
import { Calendar, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  await initDb();
  const sql = getSql();
  const [row] = await sql.unsafe(`SELECT * FROM news WHERE id = $1`, [id]) as Record<string, unknown>[];
  if (!row) notFound();

  const lang = locale === "en" ? "en" : locale === "kg" ? "kg" : "ru";
  const title = (row[`title_${lang}`] as string) || (row.title_ru as string);
  const content = (row[`content_${lang}`] as string) || (row.content_ru as string) || "";
  const excerpt = (row[`excerpt_${lang}`] as string) || (row.excerpt_ru as string) || "";
  const date = row.created_at as string;

  // Get other recent news for sidebar
  const recentNews = await getNews(locale, 4);

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-16">
        <Container>
          <Link href="/news" className="inline-flex items-center gap-1 text-sm text-blue-300 hover:text-blue-200 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Все новости
          </Link>
          <div className="flex items-center gap-3 text-sm text-blue-300/70 mb-4">
            <Calendar className="h-4 w-4" />
            {new Date(date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            <span className="text-blue-300/30">·</span>
            <Clock className="h-4 w-4" />
            {new Date(date).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-3xl">{title}</h1>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
            {/* Article */}
            <div className="flex-1 min-w-0">
              <div className="p-8 lg:p-10 rounded-2xl bg-white border border-border/60">
                {excerpt && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 pb-8 border-b">
                    {excerpt}
                  </p>
                )}
                <div className="prose prose-lg max-w-none">
                  {content ? (
                    <div className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br/>") }} />
                  ) : (
                    <p className="text-muted-foreground italic">Текст новости отсутствует</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 shrink-0">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Другие новости
                </h3>
                <div className="space-y-3">
                  {recentNews.filter((n) => n.id !== Number(id)).slice(0, 3).map((item) => (
                    <Link key={item.id} href={`/news/${item.id}`}
                      className="block p-4 rounded-xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                        <Calendar className="h-3 w-3 text-blue-500" />
                        {new Date(item.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                      <h4 className="text-sm font-medium leading-snug line-clamp-2 hover:text-blue-700 transition-colors">
                        {item.title}
                      </h4>
                    </Link>
                  ))}
                </div>
                <Link href="/news" className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Все новости
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
