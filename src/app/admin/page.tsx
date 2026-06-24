"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Shield, LayoutDashboard, Newspaper, FileText, Wrench,
  HelpCircle, MessageSquare, LogOut, Activity, Users,
  ChevronRight, Plus, Trash2, Pencil, X, MapPin, Save, File
} from "lucide-react";

const menuItems = [
  { slug: "dashboard", label: "Дашборд", icon: LayoutDashboard },
  { slug: "news", label: "Новости", icon: Newspaper },
  { slug: "documents", label: "Документы", icon: FileText },
  { slug: "services", label: "Услуги", icon: Wrench },
  { slug: "faq", label: "FAQ", icon: HelpCircle },
  { slug: "feedback", label: "Обращения", icon: MessageSquare },
  { slug: "laboratories", label: "Лаборатории", icon: MapPin },
  { slug: "pages", label: "Страницы", icon: File },
] as const;

type Row = Record<string, unknown>;

const COLLECTION_FIELDS: Record<string, { key: string; label: string; type?: string }[]> = {
  news: [
    { key: "title_ru", label: "Заголовок (RU)" },
    { key: "title_kg", label: "Заголовок (KG)" },
    { key: "title_en", label: "Заголовок (EN)" },
    { key: "excerpt_ru", label: "Анонс (RU)" },
    { key: "excerpt_kg", label: "Анонс (KG)" },
    { key: "excerpt_en", label: "Анонс (EN)" },
    { key: "content_ru", label: "Текст (RU)", type: "textarea" },
    { key: "content_kg", label: "Текст (KG)", type: "textarea" },
    { key: "content_en", label: "Текст (EN)", type: "textarea" },
    { key: "status", label: "Статус" },
  ],
  documents: [
    { key: "title_ru", label: "Название (RU)" },
    { key: "title_kg", label: "Название (KG)" },
    { key: "title_en", label: "Название (EN)" },
    { key: "category", label: "Категория" },
    { key: "description_ru", label: "Описание (RU)", type: "textarea" },
    { key: "file_url", label: "Ссылка на файл" },
  ],
  services: [
    { key: "title_ru", label: "Название (RU)" },
    { key: "title_kg", label: "Название (KG)" },
    { key: "title_en", label: "Название (EN)" },
    { key: "description_ru", label: "Описание (RU)", type: "textarea" },
    { key: "description_kg", label: "Описание (KG)", type: "textarea" },
    { key: "description_en", label: "Описание (EN)", type: "textarea" },
    { key: "icon", label: "Иконка (filecheck/clipboardcheck/wrench/messagecircle)" },
    { key: "price_ru", label: "Цена" },
    { key: "sort_order", label: "Порядок" },
  ],
  faq: [
    { key: "question_ru", label: "Вопрос (RU)" },
    { key: "question_kg", label: "Вопрос (KG)" },
    { key: "question_en", label: "Вопрос (EN)" },
    { key: "answer_ru", label: "Ответ (RU)", type: "textarea" },
    { key: "answer_kg", label: "Ответ (KG)", type: "textarea" },
    { key: "answer_en", label: "Ответ (EN)", type: "textarea" },
    { key: "sort_order", label: "Порядок" },
  ],
  feedback: [],
  laboratories: [
    { key: "name", label: "Название" },
    { key: "address", label: "Адрес" },
    { key: "phone", label: "Телефон" },
    { key: "hours", label: "Часы работы" },
    { key: "coords", label: "Координаты (lat,lng)" },
    { key: "sort_order", label: "Порядок" },
  ],
  pages: [
    { key: "slug", label: "Slug (about, contacts...)" },
    { key: "title_ru", label: "Заголовок (RU)" },
    { key: "title_kg", label: "Заголовок (KG)" },
    { key: "title_en", label: "Заголовок (EN)" },
    { key: "content_ru", label: "Содержание (RU)", type: "textarea" },
    { key: "content_kg", label: "Содержание (KG)", type: "textarea" },
    { key: "content_en", label: "Содержание (EN)", type: "textarea" },
  ],
};

const TABLE_HEADERS: Record<string, string[]> = {
  news: ["Заголовок", "Статус"],
  documents: ["Название", "Категория"],
  services: ["Название", "Цена"],
  faq: ["Вопрос"],
  feedback: ["Имя", "Email", "Статус"],
  laboratories: ["Название", "Адрес"],
  pages: ["Slug", "Заголовок"],
};

const TABLE_CELLS: Record<string, (row: Row) => string[]> = {
  news: (r) => [r.title_ru as string, r.status as string],
  documents: (r) => [r.title_ru as string, r.category as string],
  services: (r) => [r.title_ru as string, r.price_ru as string],
  faq: (r) => [r.question_ru as string],
  feedback: (r) => [r.name as string, r.email as string, r.status as string],
  laboratories: (r) => [r.name as string, r.address as string],
  pages: (r) => [r.slug as string, r.title_ru as string],
};

export default function AdminDashboard() {
  const [active, setActive] = useState<string>("dashboard");
  const [rows, setRows] = useState<Row[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const loadStats = useCallback(async () => {
    const counts: Record<string, number> = {};
    const tables = ["news", "documents", "services", "faq", "feedback", "laboratories", "pages"];
    await Promise.all(tables.map(async (t) => {
      const r = await fetch(`/admin/api/${t}`);
      if (r.ok) { const d = await r.json(); counts[t] = d.length; }
    }));
    setStats(counts);
  }, []);

  useEffect(() => {
    fetch("/admin/api/news")
      .then((r) => {
        if (r.status === 401) { setAuthorized(false); router.push("/admin/login"); }
        else { setAuthorized(true); loadStats(); return r.json(); }
      })
      .then((data) => { if (data) setRows(data); })
      .catch(() => setAuthorized(false));
  }, [router, loadStats]);

  useEffect(() => {
    if (active === "dashboard") { loadStats(); return; }
    fetch(`/admin/api/${active}`).then((r) => r.json()).then(setRows);
  }, [active, loadStats]);

  const handleLogout = async () => {
    await fetch("/admin/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить запись?")) return;
    await fetch(`/admin/api/${active}/${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== id));
    loadStats();
  };

  const openCreate = () => {
    setEditing(null);
    setFormData({});
    setShowForm(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    const data: Record<string, string> = {};
    const fields = COLLECTION_FIELDS[active] || [];
    for (const f of fields) {
      data[f.key] = String(row[f.key] ?? "");
    }
    setFormData(data);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const body = { ...formData };
    // Convert sort_order to number if present
    if ("sort_order" in body) body.sort_order = String(Number(body.sort_order) || 0);

    if (editing) {
      await fetch(`/admin/api/${active}/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/admin/api/${active}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    setSaving(false);
    setShowForm(false);
    // Refresh list
    const r = await fetch(`/admin/api/${active}`);
    setRows(await r.json());
    loadStats();
  };

  if (authorized === null) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-600 border-t-transparent" />
        <span className="text-sm text-muted-foreground">Загрузка...</span>
      </div>
    </div>
  );
  if (authorized === false) return null;

  const statCards = [
    { label: "Новости", value: stats.news || 0, icon: Newspaper, color: "text-blue-600 bg-blue-50" },
    { label: "Документы", value: stats.documents || 0, icon: FileText, color: "text-emerald-600 bg-emerald-50" },
    { label: "Услуги", value: stats.services || 0, icon: Wrench, color: "text-violet-600 bg-violet-50" },
    { label: "Обращения", value: stats.feedback || 0, icon: MessageSquare, color: "text-amber-600 bg-amber-50" },
  ];

  const activeLabel = menuItems.find(m => m.slug === active)?.label || "";
  const activeFields = COLLECTION_FIELDS[active] || [];

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
          {active !== "dashboard" && active !== "feedback" && (
            <button onClick={openCreate} className="flex items-center gap-2 h-10 px-4 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="h-4 w-4" /> Добавить
            </button>
          )}
        </header>

        <div className="p-8">
          {active === "dashboard" ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {statCards.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setActive(menuItems.find(m => m.label === s.label)?.slug || "dashboard")}>
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
                    {menuItems.filter(m => m.slug !== "dashboard" && m.slug !== "feedback").map(m => (
                      <button key={m.slug} onClick={() => setActive(m.slug)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm">
                        <div className="flex items-center gap-3">
                          <m.icon className="h-4 w-4 text-muted-foreground" />
                          <span>{m.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{stats[m.slug] || 0} записей</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border p-6">
                  <h3 className="font-semibold mb-4">Система</h3>
                  <div className="text-sm text-muted-foreground space-y-3">
                    <div className="flex items-center gap-3">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span>Статус: активно</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-emerald-500" />
                      <span>Пользователь: admin</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-violet-500" />
                      <span>Всего записей: {Object.values(stats).reduce((a, b) => a + b, 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border overflow-hidden">
              {/* Form overlay */}
              {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4">
                    <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-2xl z-10">
                      <h3 className="text-lg font-semibold">
                        {editing ? "Редактировать" : "Добавить"} — {activeLabel}
                      </h3>
                      <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form onSubmit={handleSave} className="p-6 space-y-4">
                      {activeFields.map((f) => (
                        <div key={f.key}>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">{f.label}</label>
                          {f.type === "textarea" ? (
                            <textarea
                              value={formData[f.key] || ""}
                              onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                            />
                          ) : (
                            <input
                              type="text"
                              value={formData[f.key] || ""}
                              onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                              className="w-full h-10 px-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                          )}
                        </div>
                      ))}
                      <div className="flex items-center gap-3 pt-2">
                        <button type="submit" disabled={saving}
                          className="flex items-center gap-2 h-10 px-6 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
                          <Save className="h-4 w-4" />
                          {saving ? "Сохранение..." : "Сохранить"}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)}
                          className="h-10 px-4 rounded-xl border text-sm hover:bg-slate-50 transition-colors">
                          Отмена
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {rows.length === 0 ? (
                <div className="p-16 text-center text-muted-foreground">
                  <div className="text-4xl mb-3">—</div>
                  <p className="text-sm">Нет записей</p>
                  {active !== "feedback" && (
                    <button onClick={openCreate} className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      + Добавить первую запись
                    </button>
                  )}
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 border-b">
                      <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                      {(TABLE_HEADERS[active] || []).map((h) => (
                        <th key={h} className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                      <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => {
                      const cellFn = TABLE_CELLS[active];
                      const cells = cellFn ? cellFn(row) : [];
                      return (
                        <tr key={row.id as number} className={`border-b last:border-0 hover:bg-slate-50/50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-slate-50/20"}`}>
                          <td className="p-4 text-sm text-muted-foreground font-mono">{row.id as number}</td>
                          {cells.map((val, j) => (
                            <td key={j} className="p-4 text-sm">
                              {j === 0 ? (
                                <span className="font-medium">{val}</span>
                              ) : typeof val === "string" && val.length > 40 ? (
                                <span className="text-muted-foreground line-clamp-1">{val}</span>
                              ) : (
                                <span className="text-muted-foreground">{val || "—"}</span>
                              )}
                            </td>
                          ))}
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {active !== "feedback" && (
                                <button onClick={() => openEdit(row)}
                                  className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition-colors"
                                  title="Редактировать">
                                  <Pencil className="h-4 w-4" />
                                </button>
                              )}
                              <button onClick={() => handleDelete(row.id as number)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
                                title="Удалить">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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
