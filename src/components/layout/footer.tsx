import { useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { Shield, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t bg-muted/30">
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Shield className="h-6 w-6 text-blue-700" />
              <span>{t("common.siteTitle")}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("common.siteDescription")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("footer.navigation")}</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: t("common.about") },
                { href: "/services", label: t("common.services") },
                { href: "/documents", label: t("common.documents") },
                { href: "/laboratories", label: t("common.laboratories") },
                { href: "/news", label: t("common.news") },
                { href: "/faq", label: t("common.faq") },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("footer.contacts")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-700" />
                <span>г. Бишкек, ул. М. Горького, 142</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-blue-700" />
                <a href="tel:+996" className="hover:text-primary">+996 ( )</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-blue-700" />
                <a href="mailto:laboratory@avtomektep.gov.kg" className="hover:text-primary break-all">
                  laboratory@avtomektep.gov.kg
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">{t("common.workingHours")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-blue-700" />
                <div>
                  <p>{t("footer.schedule")}</p>
                  <p>{t("footer.lunch")}</p>
                  <p className="text-xs mt-1">{t("common.weekend")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("common.siteTitle")}. {t("common.allRightsReserved")}.
        </div>
      </Container>
    </footer>
  );
}
