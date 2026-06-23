"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/lib/routing";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const locales = [
  { code: "ky", label: "KG", native: "Кыргызча" },
  { code: "ru", label: "RU", native: "Русский" },
  { code: "en", label: "EN", native: "English" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  const current = locales.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 h-9 px-3 py-2 rounded-md text-xs font-medium hover:bg-muted transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span>{current?.label ?? "RU"}</span>
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 rounded-md border bg-popover shadow-lg z-50">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => handleChange(l.code)}
              className={cn(
                "w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted",
                locale === l.code && "font-semibold text-primary",
              )}
            >
              {l.native}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
