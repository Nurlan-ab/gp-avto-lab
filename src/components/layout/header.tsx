"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/routing";
import { useState } from "react";
import { Menu, Shield, Phone, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Container } from "@/components/layout/container";

export function Header() {
  const t = useTranslations("common");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/documents", label: t("documents") },
    { href: "/laboratories", label: t("laboratories") },
    { href: "/news", label: t("news") },
    { href: "/faq", label: t("faq") },
    { href: "/feedback", label: t("feedback") },
  ];

  const linkClass = "inline-flex h-9 items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-primary">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="hidden sm:inline tracking-tight">{t("siteTitle")}</span>
          <span className="sm:hidden font-semibold">АвтоЛаб</span>
        </Link>

        {/* Desktop nav — plain links, no NavigationMenuLink */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navItems.slice(0, 6).map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 px-3 py-2 text-sm font-medium rounded-lg">
                  {t("more") || "Ещё"}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-48 gap-1 p-2">
                    {navItems.slice(6).map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary focus:bg-muted"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <a href="tel:+996" className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors">
            <Phone className="h-5 w-5" />
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden inline-flex shrink-0 items-center justify-center rounded-lg size-9 hover:bg-muted transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pt-12">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-3 py-2.5 text-base rounded-lg transition-colors hover:bg-muted hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
