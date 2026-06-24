"use client";

import { useTranslations } from "next-intl";
import { Send, User, Mail, Phone, MessageSquare, MapPin, Clock as ClockIcon } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function FeedbackPage() {
  const t = useTranslations("home.feedback");
  const ct = useTranslations("common");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    await fetch("/admin/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form)),
    });
    setSent(true);
    setSending(false);
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              Связь с нами
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Contact info sidebar */}
            <div className="lg:w-80 shrink-0 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-border/60 space-y-5">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Адрес</p>
                      <p className="text-sm">г. Бишкек, ул. М. Горького, 142</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Телефон</p>
                      <p className="text-sm">+996 (312) 00-00-00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <p className="text-sm">laboratory@avtomektep.gov.kg</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <ClockIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Режим работы</p>
                      <p className="text-sm">Пн–Пт: 09:00–18:00</p>
                      <p className="text-xs text-muted-foreground">Перерыв 12:30–13:30</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex-1">
              <div className="p-8 rounded-2xl bg-white border border-border/60">
                <h2 className="text-xl font-bold tracking-tight mb-6">Напишите нам</h2>
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-emerald-500">✓</span>
                    </div>
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">{t("success")}</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">{t("successMessage")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                        <input name="name" required placeholder={ct("name")}
                          className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                        <input name="email" type="email" required placeholder="Email"
                          className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                      </div>
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                      <input name="phone" placeholder={ct("phone")}
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                    </div>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                      <textarea name="message" required rows={5} placeholder={ct("message")}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all" />
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full h-12 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50">
                      <Send className="h-4 w-4" />
                      {sending ? ct("sending") : ct("send")}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
