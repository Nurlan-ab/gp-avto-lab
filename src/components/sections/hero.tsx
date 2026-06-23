import { useTranslations } from "next-intl";
import { Shield, ArrowRight } from "lucide-react";
import { Link } from "@/lib/routing";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export function HeroSection() {
  const t = useTranslations("hero");
  const ct = useTranslations("common");

  return (
    <Section variant="hero" className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-blue-300" />
            <span className="text-blue-200 text-sm font-medium tracking-wider uppercase">
              {ct("siteTitle")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
            {t("title")}
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-10 max-w-2xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md bg-white text-blue-900 font-medium hover:bg-blue-50 transition-colors"
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-md border border-white/30 text-white font-medium hover:bg-white/10 transition-colors"
            >
              {ct("about")}
            </Link>
          </div>
        </div>
      </Container>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full h-16 sm:h-20 lg:h-24">
          <path
            d="M0 40C360 80 1080 0 1440 40V80H0V40Z"
            className="fill-white dark:fill-background"
          />
        </svg>
      </div>
    </Section>
  );
}
