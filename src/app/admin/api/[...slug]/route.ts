import { getSql, initDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";

const ADMIN_SECRET = process.env.PAYLOAD_SECRET || "gp-avto-lab-admin-2026";
const TABLES = ["news", "documents", "services", "faq", "feedback", "laboratories", "pages"] as const;

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

function auth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  return token === ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return json({ error: "Unauthorized" }, 401);
  const url = new URL(req.url);
  const table = url.pathname.split("/").at(-1);
  if (!table || !TABLES.includes(table as typeof TABLES[number])) return json({ error: "Not found" }, 404);
  await initDb();
  const sql = getSql();
  const rows = await sql.unsafe(`SELECT * FROM ${table} ORDER BY created_at DESC`);
  return json(rows);
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const isAuth = url.pathname.endsWith("auth");
  if (isAuth) {
    const body = await req.json();
    await initDb();
    const sql = getSql();
    const [user] = await sql.unsafe(`SELECT * FROM users WHERE username = $1`, [body.username]) as Record<string, unknown>[];
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
  await initDb();
  const sql = getSql();
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
  const [result] = await sql.unsafe(
    `INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders}) RETURNING id`,
    vals
  );
  return json({ id: result.id }, 201);
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
  const sets = keys.map((k, i) => `${k}=$${i + 1}`).join(",");
  const vals = keys.map(k => body[k]);
  vals.push(id);
  const idIdx = vals.length;
  await initDb();
  const sql = getSql();
  await sql.unsafe(
    `UPDATE ${table} SET ${sets}, updated_at=NOW() WHERE id=$${idIdx}`,
    vals
  );
  return json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return json({ error: "Unauthorized" }, 401);
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const table = parts.at(-2);
  const id = parts.at(-1);
  if (!table || !TABLES.includes(table as typeof TABLES[number]) || !id) return json({ error: "Not found" }, 404);
  await initDb();
  const sql = getSql();
  await sql.unsafe(`DELETE FROM ${table} WHERE id=$1`, [id]);
  return json({ ok: true });
}
