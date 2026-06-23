"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const labLocations = [
  { id: 1, name: "Бишкек", address: "Кара-Жыгач", coords: [42.8746, 74.5698] as [number, number] },
  { id: 2, name: "Сокулук", address: "Милан групп", coords: [42.85, 74.3] as [number, number] },
  { id: 3, name: "Кант", address: "Контур 444", coords: [42.88, 74.85] as [number, number] },
  { id: 4, name: "Жапалак", address: "Ошская обл.", coords: [40.52, 72.8] as [number, number] },
  { id: 5, name: "Кокчо-Коз", address: "Ошская обл. (СВХ)", coords: [40.53, 72.79] as [number, number] },
];

function MapWidget({ locations }: { locations: typeof labLocations }) {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    let map: import("leaflet").Map | null = null;
    import("leaflet").then((leaflet) => {
      import("leaflet/dist/leaflet.css");
      setL(leaflet);

      const container = document.getElementById("map-container");
      if (!container || container.dataset.initialized) return;
      container.dataset.initialized = "true";

      map = leaflet.map("map-container").setView([41.5, 74.5], 7);

      leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      locations.forEach((loc) => {
        leaflet.marker(loc.coords)
          .addTo(map!)
          .bindPopup(`<strong>Пункт №${loc.id} — ${loc.name}</strong><br/>${loc.address}`);
      });

      const bounds = leaflet.latLngBounds(locations.map((l) => l.coords));
      if (bounds.isValid()) {
        map!.fitBounds(bounds, { padding: [40, 40] });
      }
    });

    return () => {
      map?.remove();
    };
  }, [locations]);

  return (
    <div
      id="map-container"
      className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center text-muted-foreground"
    >
      Загрузка карты...
    </div>
  );
}

export function MapSection() {
  const t = useTranslations("home.map");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Section variant="muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden border shadow-md">
          {mounted ? (
            <MapWidget locations={labLocations} />
          ) : (
            <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              Загрузка карты...
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/laboratories"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            {t("title")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
