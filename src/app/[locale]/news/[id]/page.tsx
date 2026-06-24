import { getLocale } from "next-intl/server";
import { getSql, initDb } from "@/lib/db";
import { Link } from "@/lib/routing";
import { Calendar, ArrowLeft } from "lucide-react";
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
  const date = row.created_at as string;

  return (
    <Section>
      <Container>
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Все новости
          </Link>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4 text-blue-500" />
            {new Date(date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">{title}</h1>

          <div className="prose prose-lg max-w-none text-base leading-relaxed">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br/>") }} />
            ) : (
              <p className="text-muted-foreground">Текст новости отсутствует</p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
