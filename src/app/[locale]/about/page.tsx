import { getLocale } from "next-intl/server";
import { getPage } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Shield, Building2, FileCheck, MapPin, Phone } from "lucide-react";

export default async function AboutPage() {
  const locale = await getLocale();
  const page = await getPage("about", locale);

  return (
    <>
      {/* Hero banner */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-blue-400 mb-4">
              О предприятии
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              {page?.title || "Государственные испытательные автолаборатории"}
            </h1>
            <p className="text-lg text-blue-200/80 leading-relaxed max-w-2xl">
              Обеспечение безопасности дорожного движения через объективную оценку транспортных средств
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            {page?.content ? (
              <div className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                  {[
                    { icon: Shield, title: "Миссия", text: "Обеспечение соответствия транспортных средств требованиям безопасности через проведение объективных испытаний и экспертиз." },
                    { icon: Building2, title: "Статус", text: "Государственное предприятие в структуре ГЦ по регистрации ТС и ВС Кыргызской Республики." },
                    { icon: FileCheck, title: "Аккредитация", text: "Аккредитованные испытательные лаборатории, действующие в соответствии с ТР ТС 018/2011." },
                  ].map((item) => (
                    <div key={item.title} className="p-8 rounded-2xl bg-white border border-border/60 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                        <item.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-12">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-6">История создания</h2>
                    <div className="p-8 rounded-2xl bg-white border border-border/60">
                      <p className="text-base leading-relaxed text-muted-foreground">
                        Испытательные автолаборатории были созданы в рамках реализации требований
                        Технического регламента Таможенного союза ТР ТС 018/2011 «О безопасности
                        колёсных транспортных средств». Предприятие осуществляет свою деятельность
                        на территории Кыргызской Республики, обеспечивая проведение оценки соответствия
                        транспортных средств установленным требованиям безопасности.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Основные задачи</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Проведение испытаний ТС на соответствие требованиям безопасности",
                        "Выдача свидетельств о безопасности конструкции ТС (СБКТС)",
                        "Техническая экспертиза транспортных средств",
                        "Консультационная поддержка по вопросам оценки соответствия",
                      ].map((task, i) => (
                        <div key={i} className="flex items-start gap-3 p-5 rounded-2xl bg-white border border-border/60">
                          <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-sm font-bold">
                            {i + 1}
                          </span>
                          <span className="text-sm leading-relaxed">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-6">Реквизиты</h2>
                    <div className="p-8 rounded-2xl bg-white border border-border/60 space-y-4">
                      <p className="text-base font-semibold">ГП «Институт допуска к дорожному движению» при ГЦ по регистрации ТС и ВС</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                        г. Бишкек, ул. М. Горького, 142
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                        +996 (312) 00-00-00
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
