import { getLocale } from "next-intl/server";
import { getPage } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default async function AboutPage() {
  const locale = await getLocale();
  const page = await getPage("about", locale);

  return (
    <Section>
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            {page?.title || "О предприятии"}
          </h1>
          {page?.content ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                Государственное предприятие «Институт допуска к дорожному движению» при
                Государственном центре по регистрации транспортных средств и водительского
                состава осуществляет деятельность по оценке соответствия транспортных средств
                требованиям технических регламентов.
              </p>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">История создания</h2>
              <p>
                Испытательные автолаборатории были созданы в рамках реализации требований
                Технического регламента Таможенного союза ТР ТС 018/2011 «О безопасности
                колёсных транспортных средств».
              </p>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Основные задачи</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Проведение испытаний транспортных средств на соответствие требованиям безопасности</li>
                <li>Выдача свидетельств о безопасности конструкции транспортного средства (СБКТС)</li>
                <li>Техническая экспертиза транспортных средств</li>
                <li>Консультационная поддержка по вопросам оценки соответствия</li>
              </ul>
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Реквизиты</h2>
              <p>ГП «Институт допуска к дорожному движению» при ГЦ по регистрации ТС и ВС</p>
              <p className="text-sm">г. Бишкек, ул. М. Горького, 142</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
