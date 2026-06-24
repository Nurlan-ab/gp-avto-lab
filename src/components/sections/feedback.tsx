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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <input
                  name="name"
                  required
                  placeholder={ct("name")}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <input
                  name="phone"
                  placeholder={ct("phone")}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={ct("message")}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
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
