"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield, Newspaper, FileText, Wrench, HelpCircle,
  MessageSquare, LogOut, Plus, Pencil, Trash2,
} from "lucide-react";

type CollectionType = "news" | "documents" | "services" | "faq" | "feedback";

const collections: { slug: CollectionType; label: string; icon: React.ElementType }[] = [
  { slug: "news", label: "Новости", icon: Newspaper },
  { slug: "documents", label: "Документы", icon: FileText },
  { slug: "services", label: "Услуги", icon: Wrench },
  { slug: "faq", label: "FAQ", icon: HelpCircle },
  { slug: "feedback", label: "Обратная связь", icon: MessageSquare },
];

export default function AdminDashboard() {
  const [active, setActive] = useState<CollectionType>("news");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/admin/api/news")
      .then((r) => {
        if (r.status === 401) { setAuthorized(false); router.push("/admin/login"); }
        else { setAuthorized(true); return r.json(); }
      })
      .then((data) => { if (data) setRows(data); })
      .catch(() => setAuthorized(false));
  }, [router]);

  useEffect(() => {
    fetch(`/admin/api/${active}`)
      .then((r) => r.json())
      .then(setRows);
  }, [active]);

  const handleLogout = async () => {
    await fetch("/admin/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleDelete = async (id: number) => {
    await fetch(`/admin/api/${active}/${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r: Record<string, unknown>) => r.id !== id));
  };

  if (authorized === null) return <div className="p-8">Загрузка...</div>;
  if (authorized === false) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="flex items-center gap-2 p-4 border-b border-white/10">
          <Shield className="h-5 w-5 text-blue-400" />
          <span className="font-bold text-sm">Админ-панель</span>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {collections.map(({ slug, label, icon: Icon }) => (
            <button
              key={slug}
              onClick={() => setActive(slug)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                active === slug ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">
            {collections.find((c) => c.slug === active)?.label}
          </h1>
          <span className="text-sm text-muted-foreground">{rows.length} записей</span>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          {rows.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">Нет записей</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">ID</th>
                  {active === "news" && <th className="text-left p-3 font-medium">Заголовок</th>}
                  {active === "documents" && <><th className="text-left p-3 font-medium">Название</th><th className="text-left p-3 font-medium">Категория</th></>}
                  {active === "services" && <th className="text-left p-3 font-medium">Название</th>}
                  {active === "faq" && <th className="text-left p-3 font-medium">Вопрос</th>}
                  {active === "feedback" && <><th className="text-left p-3 font-medium">Имя</th><th className="text-left p-3 font-medium">Email</th></>}
                  <th className="text-right p-3 font-medium w-24">Действия</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row: Record<string, unknown>) => (
                  <tr key={row.id as number} className="border-t hover:bg-muted/30">
                    <td className="p-3 text-muted-foreground">{row.id as number}</td>
                    {active === "news" && <td className="p-3 font-medium">{row.title_ru as string}</td>}
                    {active === "documents" && <><td className="p-3 font-medium">{row.title_ru as string}</td><td className="p-3 text-muted-foreground">{row.category as string}</td></>}
                    {active === "services" && <td className="p-3 font-medium">{row.title_ru as string}</td>}
                    {active === "faq" && <td className="p-3">{row.question_ru as string}</td>}
                    {active === "feedback" && <><td className="p-3 font-medium">{row.name as string}</td><td className="p-3 text-muted-foreground">{row.email as string}</td></>}
                    <td className="p-3 text-right">
                      <button onClick={() => handleDelete(row.id as number)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
