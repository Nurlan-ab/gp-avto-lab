import { getLabs } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MapPin, Phone, Clock } from "lucide-react";

export default async function LaboratoriesPage() {
  const labs = await getLabs();

  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Испытательные лаборатории
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Сеть испытательных автолабораторий на территории Кыргызской Республики
          </p>
        </div>

        {labs.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">Данные о лабораториях не найдены</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {labs.map((lab) => (
              <div key={lab.id} className="p-6 rounded-2xl bg-white border border-border/60 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold">{lab.name}</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">#{lab.id}</span>
                </div>
                <div className="space-y-3">
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
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
