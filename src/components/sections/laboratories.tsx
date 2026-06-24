"use client";

import { useTranslations } from "next-intl";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { LabItem } from "@/lib/data";

export function LaboratoriesSection({ labs }: { labs: LabItem[] }) {
  const t = useTranslations("home.map");

  if (labs.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {labs.map((lab) => (
            <Card key={lab.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{lab.name}</h3>
                  <Badge variant="outline" className="text-sm">#{lab.id}</Badge>
                </div>
                <p className="text-base text-muted-foreground flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-700" />
                  {lab.address}
                </p>
                {lab.phone && (
                  <p className="text-base text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-blue-700" />
                    {lab.phone}
                  </p>
                )}
                <p className="text-base text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-blue-700" />
                  {lab.hours}
                </p>
              </CardContent>
            </Card>
          ))}
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
