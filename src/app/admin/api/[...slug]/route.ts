import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";

const ADMIN_SECRET = process.env.PAYLOAD_SECRET || "gp-avto-lab-admin-2026";
const TABLES = ["news", "documents", "services", "faq", "feedback"] as const;

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

function auth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  return token === ADMIN_SECRET;
}

async function handleAuth(body: { username?: string; password?: string }) {
  const db = getDb();
  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(body.username) as Record<string, unknown> | undefined;
  if (!user || !(await compare(body.password || "", user.password_hash as string))) {
    return null;
  }
  return user;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return json({ error: "Unauthorized" }, 401);
  const url = new URL(req.url);
  const table = url.pathname.split("/").at(-1);
  if (!table || !TABLES.includes(table as typeof TABLES[number])) return json({ error: "Not found" }, 404);
  const rows = getDb().prepare(`SELECT * FROM ${table} ORDER BY created_at DESC`).all();
  return json(rows);
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const isAuth = url.pathname.endsWith("auth");
  if (isAuth) {
    const body = await req.json();
    const db = getDb();
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(body.username) as Record<string, unknown> | undefined;
    if (!user || !(await compare(body.password || "", user.password_hash as string))) {
      return json({ error: "Неверный логин или пароль" }, 401);
    }
    const res = json({ ok: true, role: user.role });
    res.cookies.set("admin_token", ADMIN_SECRET, { httpOnly: true, path: "/", maxAge: 86400 });
    return res;
  }
  if (!auth(req)) return json({ error: "Unauthorized" }, 401);
  const table = url.pathname.split("/").at(-1);
  if (!table || !TABLES.includes(table as typeof TABLES[number])) return json({ error: "Not found" }, 404);
  const body = await req.json();
  const keys = Object.keys(body).filter(k => !["id", "created_at", "updated_at"].includes(k));
  const vals = keys.map(k => body[k]);
  const stmt = getDb().prepare(`INSERT INTO ${table} (${keys.join(",")}) VALUES (${keys.map(() => "?").join(",")})`);
  const result = stmt.run(...vals);
  return json({ id: result.lastInsertRowid }, 201);
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return json({ error: "Unauthorized" }, 401);
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const table = parts.at(-2);
  const id = parts.at(-1);
  if (!table || !TABLES.includes(table as typeof TABLES[number]) || !id) return json({ error: "Not found" }, 404);
  const body = await req.json();
  const keys = Object.keys(body).filter(k => !["id", "created_at"].includes(k));
  const sets = keys.map(k => `${k}=?`).join(",");
  const vals = keys.map(k => body[k]);
  getDb().prepare(`UPDATE ${table} SET ${sets}, updated_at=datetime('now') WHERE id=?`).run(...vals, id);
  return json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return json({ error: "Unauthorized" }, 401);
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const table = parts.at(-2);
  const id = parts.at(-1);
  if (!table || !TABLES.includes(table as typeof TABLES[number]) || !id) return json({ error: "Not found" }, 404);
  getDb().prepare(`DELETE FROM ${table} WHERE id=?`).run(id);
  return json({ ok: true });
}
