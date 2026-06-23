"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield, LayoutDashboard, Newspaper, FileText, Wrench,
  HelpCircle, MessageSquare, LogOut, TrendingUp, Users,
  Activity, ChevronRight, Plus, Trash2, Eye
} from "lucide-react";

type CollectionType = "news" | "documents" | "services" | "faq" | "feedback";

const menuItems = [
  { slug: "dashboard", label: "Дашборд", icon: LayoutDashboard },
  { slug: "news", label: "Новости", icon: Newspaper },
  { slug: "documents", label: "Документы", icon: FileText },
  { slug: "services", label: "Услуги", icon: Wrench },
  { slug: "faq", label: "FAQ", icon: HelpCircle },
  { slug: "feedback", label: "Обращения", icon: MessageSquare },
] as const;

export default function AdminDashboard() {
  const [active, setActive] = useState<string>("dashboard");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/admin/api/news")
      .then((r) => {
        if (r.status === 401) { setAuthorized(false); router.push("/admin/login"); }
        else { setAuthorized(true); loadStats(); return r.json(); }
      })
      .then((data) => { if (data) setRows(data); })
      .catch(() => setAuthorized(false));
  }, [router]);

  const loadStats = async () => {
    const counts: Record<string, number> = {};
    for (const t of ["news", "documents", "services", "faq", "feedback"]) {
      const r = await fetch(`/admin/api/${t}`);
      if (r.ok) { const d = await r.json(); counts[t] = d.length; }
    }
    setStats(counts);
  };

  useEffect(() => {
    if (active === "dashboard") { loadStats(); return; }
    if (active === "feedback" || active === "news" || active === "documents" || active === "services" || active === "faq") {
      fetch(`/admin/api/${active}`).then((r) => r.json()).then(setRows);
    }
  }, [active]);

  const handleLogout = async () => {
    await fetch("/admin/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleDelete = async (id: number) => {
    await fetch(`/admin/api/${active}/${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== id));
    loadStats();
  };

  if (authorized === null) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
  </div>;
  if (authorized === false) return null;

  const statCards = [
    { label: "Новости", value: stats.news || 0, icon: Newspaper, color: "text-blue-600 bg-blue-50" },
    { label: "Документы", value: stats.documents || 0, icon: FileText, color: "text-emerald-600 bg-emerald-50" },
    { label: "Услуги", value: stats.services || 0, icon: Wrench, color: "text-violet-600 bg-violet-50" },
    { label: "Обращения", value: stats.feedback || 0, icon: MessageSquare, color: "text-amber-600 bg-amber-50" },
  ];

  const activeLabel = menuItems.find(m => m.slug === active)?.label || "";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">GP Avto Lab</div>
            <div className="text-xs text-slate-400">Админ-панель</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {menuItems.map(({ slug, label, icon: Icon }) => (
            <button
              key={slug}
              onClick={() => { setActive(slug); setShowForm(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === slug
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{label}</span>
              {slug !== "dashboard" && stats[slug] !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${active === slug ? "bg-white/20" : "bg-white/10"}`}>
                  {stats[slug]}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">A</div>
            <div className="text-sm">
              <div className="font-medium">admin</div>
              <div className="text-xs text-slate-400">Администратор</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" /> Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold tracking-tight">{activeLabel}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {active === "dashboard" ? "Обзор системы" : `Управление разделом «${activeLabel}»`}
            </p>
          </div>
          {active !== "dashboard" && (
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 h-10 px-4 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" /> Добавить
            </button>
          )}
        </header>

        <div className="p-8">
          {active === "dashboard" ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {statCards.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                        <s.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl border p-6">
                  <h3 className="font-semibold mb-4">Быстрые действия</h3>
                  <div className="space-y-2">
                    {menuItems.filter(m => m.slug !== "dashboard").map(m => (
                      <button key={m.slug} onClick={() => setActive(m.slug)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                        <div className="flex items-center gap-3">
                          <m.icon className="h-4 w-4 text-muted-foreground" />
                          <span>{m.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border p-6">
                  <h3 className="font-semibold mb-4">Последняя активность</h3>
                  <div className="text-sm text-muted-foreground space-y-3">
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span>Система активна</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-emerald-500" />
                      <span>Пользователь: admin</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border overflow-hidden">
              {rows.length === 0 ? (
                <div className="p-16 text-center text-muted-foreground">
                  <div className="text-4xl mb-3">—</div>
                  <p className="text-sm">Нет записей</p>
                  <p className="text-xs mt-1">Нажмите «Добавить» чтобы создать первую запись</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 border-b">
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                      {active === "news" && <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Заголовок</th>}
                      {active === "documents" && <><th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Название</th><th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Категория</th></>}
                      {active === "services" && <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Название</th>}
                      {active === "faq" && <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Вопрос</th>}
                      {active === "feedback" && <><th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Имя</th><th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th></>}
                      <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.id as number} className={`border-b last:border-0 hover:bg-slate-50/50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/20"}`}>
                        <td className="p-4 text-sm text-muted-foreground font-mono">{row.id as number}</td>
                        {active === "news" && <td className="p-4 text-sm font-medium">{row.title_ru as string}</td>}
                        {active === "documents" && <><td className="p-4 text-sm font-medium">{row.title_ru as string}</td><td className="p-4 text-sm text-muted-foreground">{row.category as string}</td></>}
                        {active === "services" && <td className="p-4 text-sm font-medium">{row.title_ru as string}</td>}
                        {active === "faq" && <td className="p-4 text-sm">{row.question_ru as string}</td>}
                        {active === "feedback" && <><td className="p-4 text-sm font-medium">{row.name as string}</td><td className="p-4 text-sm text-muted-foreground">{row.email as string}</td></>}
                        <td className="p-4 text-right">
                          <button onClick={() => handleDelete(row.id as number)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
