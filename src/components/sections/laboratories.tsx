import { useTranslations } from "next-intl";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/lib/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const labs = [
  { id: 1, name: "Пункт №1 – Бишкек", address: "г. Бишкек, Кара-Жыгач", phone: "+996", hours: "Пн–Пт: 09:00–18:00", coords: [42.8746, 74.5698] },
  { id: 2, name: "Пункт №2 – Сокулук", address: "Чуйская обл., Сокулукский р-н, Милан групп", phone: "+996", hours: "Пн–Пт: 09:00–18:00", coords: [42.85, 74.3] },
  { id: 3, name: "Пункт №3 – Кант", address: "Чуйская обл., г. Кант, Контур 444", phone: "+996", hours: "Пн–Пт: 09:00–18:00", coords: [42.88, 74.85] },
  { id: 4, name: "Пункт №4 – Жапалак", address: "Ошская обл., с. Жапалак", phone: "+996", hours: "Пн–Пт: 09:00–18:00", coords: [40.52, 72.8] },
  { id: 5, name: "Пункт №5 – Кокчо-Коз", address: "Ошская обл., Кокчо-Коз (СВХ)", phone: "+996", hours: "Пн–Пт: 09:00–18:00", coords: [40.53, 72.79] },
];

export function LaboratoriesSection() {
  const t = useTranslations("home.map");

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
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-blue-700" />
                  {lab.phone}
                </p>
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
