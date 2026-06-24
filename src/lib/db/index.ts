import postgres from "postgres";

let sql: ReturnType<typeof postgres> | null = null;

export function getSql() {
  if (!sql) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) throw new Error("DATABASE_URL environment variable is required");
    sql = postgres(dbUrl, { max: 10 });
  }
  return sql;
}

export async function initDb() {
  const s = getSql();
  await s.unsafe(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      title_ru TEXT NOT NULL,
      title_kg TEXT,
      title_en TEXT,
      excerpt_ru TEXT,
      excerpt_kg TEXT,
      excerpt_en TEXT,
      content_ru TEXT,
      content_kg TEXT,
      content_en TEXT,
      status TEXT DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS documents (
      id SERIAL PRIMARY KEY,
      title_ru TEXT NOT NULL,
      title_kg TEXT,
      title_en TEXT,
      category TEXT NOT NULL,
      description_ru TEXT,
      file_url TEXT,
      published_date TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      title_ru TEXT NOT NULL,
      title_kg TEXT,
      title_en TEXT,
      description_ru TEXT,
      description_kg TEXT,
      description_en TEXT,
      icon TEXT DEFAULT 'filecheck',
      price_ru TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS faq (
      id SERIAL PRIMARY KEY,
      question_ru TEXT NOT NULL,
      question_kg TEXT,
      question_en TEXT,
      answer_ru TEXT,
      answer_kg TEXT,
      answer_en TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS feedback (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS laboratories (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT DEFAULT '',
      hours TEXT DEFAULT 'Пн–Пт: 09:00–18:00',
      coords TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    );

    INSERT INTO users (username, password_hash, role)
    VALUES ('admin', '$2b$10$JRZ24mHjf79jjnwdplybv.gYDRzlWbixfkQzRxnEg3noOkSkXc8Sy', 'admin')
    ON CONFLICT (username) DO NOTHING;
  `);
}
