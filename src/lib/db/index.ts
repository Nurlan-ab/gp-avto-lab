import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data.db");

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    initTables(db);
  }
  return db;
}

function initTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'editor',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ru TEXT NOT NULL,
      title_kg TEXT,
      title_en TEXT,
      category TEXT NOT NULL,
      description_ru TEXT,
      file_url TEXT,
      published_date TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_ru TEXT NOT NULL,
      title_kg TEXT,
      title_en TEXT,
      description_ru TEXT,
      description_kg TEXT,
      description_en TEXT,
      icon TEXT DEFAULT 'filecheck',
      price_ru TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faq (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_ru TEXT NOT NULL,
      question_kg TEXT,
      question_en TEXT,
      answer_ru TEXT,
      answer_kg TEXT,
      answer_en TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT (datetime('now'))
    );

    INSERT OR IGNORE INTO users (username, password_hash, role)
    VALUES ('admin', '$2b$10$JRZ24mHjf79jjnwdplybv.gYDRzlWbixfkQzRxnEg3noOkSkXc8Sy', 'admin');
  `);
}
