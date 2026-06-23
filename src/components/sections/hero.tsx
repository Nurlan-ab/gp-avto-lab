"use client";

import { useTranslations } from "next-intl";
import { Shield, ArrowRight, Building2, CheckCircle, MapPin } from "lucide-react";
import { Link } from "@/lib/routing";
import { Container } from "@/components/layout/container";
import { motion } from "framer-motion";

const stats = [
  { icon: MapPin, value: "5", labelKey: "stats.labs" },
  { icon: Building2, value: "10+", labelKey: "stats.years" },
  { icon: CheckCircle, value: "5000+", labelKey: "stats.issued" },
];

export function HeroSection() {
  const t = useTranslations("hero");
  const ct = useTranslations("common");

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-[-30%] left-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/20 backdrop-blur">
                <Shield className="h-7 w-7 text-blue-300" />
              </div>
              <span className="text-blue-200/80 text-sm font-medium tracking-[0.2em] uppercase">
                {ct("siteTitle")}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
              {t("title")}
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/70 leading-relaxed mb-12 max-w-xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
              >
                {t("cta")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl border border-white/20 text-white/80 font-medium hover:bg-white/5 hover:border-white/30 hover:text-white transition-all"
              >
                {ct("about")}
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-white/[0.03] backdrop-blur">
        <Container>
          <div className="grid grid-cols-3 divide-x divide-white/10 py-8">
            {stats.map(({ icon: Icon, value, labelKey }, i) => {
              const label = t(labelKey as Parameters<typeof t>[0]);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 px-4"
                >
                  <Icon className="h-5 w-5 text-blue-400/60" />
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight">{value}</span>
                  <span className="text-sm text-blue-200/60">{label}</span>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-px">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
          <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
            className="fill-white dark:fill-background" />
        </svg>
      </div>
    </section>
  );
}
