"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const MAP_KEY = process.env.NEXT_PUBLIC_MAPGL_KEY ?? "";

const labPoints = [
  { id: 1, name: "Бишкек", address: "Кара-Жыгач", coords: [74.5698, 42.8746] },
  { id: 2, name: "Сокулук", address: "Милан групп", coords: [74.3, 42.85] },
  { id: 3, name: "Кант", address: "Контур 444", coords: [74.85, 42.88] },
  { id: 4, name: "Жапалак", address: "Ошская обл.", coords: [72.8, 40.52] },
  { id: 5, name: "Кокчо-Коз", address: "Ошская обл. (СВХ)", coords: [72.79, 40.53] },
];

function Map2GIS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!MAP_KEY) return;
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    import("@2gis/mapgl")
      .then(({ load }) => load())
      .then((api) => {
        if (cancelled || !containerRef.current) return;
        map = new api.Map(containerRef.current, {
          center: [74.5698, 42.8746],
          zoom: 12,
          key: MAP_KEY,
          enableTrackResize: true,
        });
        labPoints.forEach((p) => {
          new api.Marker(map!, { coordinates: p.coords });
        });
        // Force resize after render
        setTimeout(() => map?.invalidateSize(), 100);
      })
      .catch((e: Error) => { if (!cancelled) setErr(e.message); });

    const onResize = () => map?.invalidateSize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      map?.destroy();
    };
  }, []);

  if (err) {
    return <div className="w-full h-[650px] bg-red-50 rounded-lg flex items-center justify-center text-red-600 text-sm p-4">Ошибка: {err}</div>;
  }

  return <div ref={containerRef} className="w-full h-[650px] bg-white" />;
}

export function MapSection() {
  const t = useTranslations("home.map");

  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden border shadow-md">
          {MAP_KEY ? (
            <Map2GIS />
          ) : (
            <div className="w-full h-[650px] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Карта загрузится после добавления ключа API
            </div>
          )}
        </div>
        <div className="text-center mt-10">
          <Link href="/laboratories" className="group inline-flex items-center gap-2 h-12 px-8 rounded-full border-2 border-blue-600 bg-blue-600 text-white font-medium hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30">
            {t("title")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
