"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/routing";
import { useState } from "react";
import { Menu, Shield, Phone, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Container } from "@/components/layout/container";

export function Header() {
  const t = useTranslations("common");
  const locale = useLocale();
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Shield className="h-6 w-6 text-blue-700" />
          <span className="hidden sm:inline">{t("siteTitle")}</span>
          <span className="sm:hidden">АвтоЛаб</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {navItems.slice(0, 6).map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  href={`/${locale}${item.href === "/" ? "" : item.href}`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9 px-3 py-2 text-sm font-medium">
                {t("more") || "Ещё"}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 gap-1 p-2">
                  {navItems.slice(6).map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink
                        href={`/${locale}${item.href}`}
                        className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary focus:bg-muted"
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Search */}
          <button className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition-colors">
            <Search className="h-5 w-5" />
          </button>

          {/* Contact Phone */}
          <a href="tel:+996" className="hidden sm:inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted transition-colors">
            <Phone className="h-5 w-5" />
          </a>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent size-8 hover:bg-muted hover:text-foreground transition-colors">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pt-12">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href === "/" ? "/" : item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-3 py-2.5 text-base rounded-md transition-colors hover:bg-muted hover:text-primary"
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
