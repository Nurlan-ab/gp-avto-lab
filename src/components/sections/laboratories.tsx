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
                  <h3 className="font-semibold">{lab.name}</h3>
                  <Badge variant="outline" className="text-xs">#{lab.id}</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-700" />
                  {lab.address}
                </p>
                {lab.phone && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-blue-700" />
                    {lab.phone}
                  </p>
                )}
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-blue-700" />
                  {lab.hours}
                </p>
              </CardContent>
            </Card>
          ))}
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
