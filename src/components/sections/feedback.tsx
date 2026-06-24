"use client";

import { useTranslations } from "next-intl";
import { Send, User, Mail, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function FeedbackSection() {
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
    <Section variant="muted">
      <Container>
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">
            Обратная связь
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="text-center p-14 rounded-3xl bg-white border border-emerald-100 shadow-lg shadow-emerald-500/5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">{t("success")}</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">{t("successMessage")}</p>
            </div>
          ) : (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-border/60 shadow-lg shadow-slate-200/50">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <div className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      name="name" required placeholder={ct("name")}
                      className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border/80 bg-slate-50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      name="email" type="email" required placeholder="Email"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border/80 bg-slate-50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <input
                    name="phone" placeholder={ct("phone")}
                    className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-border/80 bg-slate-50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <textarea
                    name="message" required rows={5} placeholder={ct("message")}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-border/80 bg-slate-50 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 resize-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-14 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <Send className="h-5 w-5" />
                  {sending ? ct("sending") : ct("send")}
                </button>
              </form>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
