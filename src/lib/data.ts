import { getSql, initDb } from "@/lib/db";

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  created_at: string;
};

export type DocumentItem = {
  id: number;
  title: string;
  category: string;
  description: string;
};

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: string;
};

export type LabItem = {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coords: [number, number];
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

function pickLang(locale: string) {
  return locale === "en" ? "en" : locale === "kg" ? "kg" : "ru";
}

function localizedField(fieldBase: string, locale: string): string {
  const lang = pickLang(locale);
  return `${fieldBase}_${lang}`;
}

export async function getNews(locale: string, limit = 3): Promise<NewsItem[]> {
  await initDb();
  const sql = getSql();
  const titleF = localizedField("title", locale);
  const excerptF = localizedField("excerpt", locale);
  const rows = await sql.unsafe(
    `SELECT id, ${titleF} as title, ${excerptF} as excerpt, created_at FROM news WHERE status='published' ORDER BY created_at DESC LIMIT $1`,
    [limit]
  );
  return rows as unknown as NewsItem[];
}

export async function getDocuments(locale: string): Promise<DocumentItem[]> {
  await initDb();
  const sql = getSql();
  const titleF = localizedField("title", locale);
  const descF = localizedField("description", locale);
  const rows = await sql.unsafe(
    `SELECT id, ${titleF} as title, category, COALESCE(${descF}, '') as description FROM documents ORDER BY created_at DESC`
  );
  return rows as unknown as DocumentItem[];
}

export async function getServices(locale: string): Promise<ServiceItem[]> {
  await initDb();
  const sql = getSql();
  const titleF = localizedField("title", locale);
  const descF = localizedField("description", locale);
  const rows = await sql.unsafe(
    `SELECT id, ${titleF} as title, COALESCE(${descF}, '') as description, icon, COALESCE(price_ru, 'по запросу') as price FROM services ORDER BY sort_order, id`
  );
  return rows as unknown as ServiceItem[];
}

export async function getLabs(): Promise<LabItem[]> {
  await initDb();
  const sql = getSql();
  const rows = await sql.unsafe(
    `SELECT id, name, address, phone, hours, coords FROM laboratories ORDER BY sort_order, id`
  );
  return rows.map((r: Record<string, unknown>) => ({
    ...r,
    coords: (r.coords as string).split(",").map(Number) as [number, number],
  })) as unknown as LabItem[];
}

export async function getFaq(locale: string): Promise<FaqItem[]> {
  await initDb();
  const sql = getSql();
  const qF = localizedField("question", locale);
  const aF = localizedField("answer", locale);
  const rows = await sql.unsafe(
    `SELECT id, ${qF} as question, ${aF} as answer FROM faq ORDER BY sort_order, id`
  );
  return rows as unknown as FaqItem[];
}
