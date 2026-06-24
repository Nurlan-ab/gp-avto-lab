"use client";

import { useTranslations } from "next-intl";
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";
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

  const inputClass = "flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none";
  const wrapperClass = "flex items-center gap-3 h-12 px-4 rounded-xl border border-border bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all";

  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-600 mb-4 inline-block">Обратная связь</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="max-w-lg mx-auto">
          {sent ? (
            <div className="text-center p-12 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="text-lg font-semibold text-emerald-800 mb-1">{t("success")}</h3>
              <p className="text-sm text-emerald-600">{t("successMessage")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={wrapperClass}>
                <User className="h-5 w-5 text-muted-foreground shrink-0" />
                <input name="name" required placeholder={ct("name")} className={inputClass} />
              </div>
              <div className={wrapperClass}>
                <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                <input name="email" type="email" required placeholder="Email" className={inputClass} />
              </div>
              <div className={wrapperClass}>
                <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                <input name="phone" placeholder={ct("phone")} className={inputClass} />
              </div>
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-border bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <MessageSquare className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <textarea name="message" required rows={4} placeholder={ct("message")}
                  className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 focus:outline-none resize-none" />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full h-12 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {sending ? ct("sending") : ct("send")}
              </button>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
