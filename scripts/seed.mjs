import postgres from "postgres";

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) { console.error("DATABASE_URL is required"); process.exit(1); }

const seedData = {
  services: [
    { title_ru: "Выдача СБКТС", title_kg: "СБКТС берүү", title_en: "SBKTS Issuance", description_ru: "Оформление свидетельства о безопасности конструкции транспортного средства", description_kg: "Унаа каражатынын конструкциясынын коопсуздугу жөнүндө күбөлүк берүү", description_en: "Issuance of vehicle safety certificate", icon: "filecheck", sort_order: 1 },
    { title_ru: "Техническая экспертиза", title_kg: "Техникалык экспертиза", title_en: "Technical Expertise", description_ru: "Идентификация и оценка технического состояния транспортных средств", description_kg: "Унаа каражаттарын идентификациялоо жана техникалык абалын баалоо", description_en: "Identification and assessment of vehicle technical condition", icon: "clipboardcheck", sort_order: 2 },
    { title_ru: "Испытания ТС", title_kg: "УК сыноо", title_en: "Vehicle Testing", description_ru: "Проверка тормозных систем, рулевого управления, световых приборов и экологичности", description_kg: "Тормоз системаларын, рулдук башкарууну, жарык приборлорун жана экологиялык көрсөткүчтөрдү текшерүү", description_en: "Testing of brake systems, steering, lighting and environmental performance", icon: "wrench", sort_order: 3 },
    { title_ru: "Консультации", title_kg: "Консультациялар", title_en: "Consulting", description_ru: "Информационная поддержка по вопросам оценки соответствия", description_kg: "Шайкештикти баалоо маселелери боюнча маалыматтык колдоо", description_en: "Information support on conformity assessment matters", icon: "messagecircle", sort_order: 4 },
  ],
  news: [
    { title_ru: "Обновление перечня нормативных документов", title_kg: "Ченемдик документтердин тизмеси жаңыртылды", title_en: "Updated list of regulatory documents", excerpt_ru: "В разделе «Нормативные документы» опубликованы актуальные редакции ТР ТС 018/2011.", excerpt_kg: "«Ченемдик документтер» бөлүмүндө ТР ТС 018/2011 актуалдуу редакциялары жарыяланды.", excerpt_en: "Updated versions of TR CU 018/2011 published.", status: "published" },
    { title_ru: "Новый пункт испытаний в Ошской области", title_kg: "Ош облусунда жаңы сыноо пункту ачылды", title_en: "New testing point in Osh region", excerpt_ru: "Открыт дополнительный пункт проведения испытаний транспортных средств в с. Жапалак.", excerpt_kg: "Жапалак айылында унаа каражаттарын сыноо боюнча кошумча пункт ачылды.", excerpt_en: "An additional testing point opened in Japalak village.", status: "published" },
    { title_ru: "График работы в праздничные дни", title_kg: "Майрам күндөрүндөгү иш тартиби", title_en: "Holiday working hours", excerpt_ru: "Ознакомьтесь с изменённым графиком работы испытательных лабораторий.", excerpt_kg: "Майрам күндөрүндө сыноо лабораторияларынын өзгөртүлгөн иш тартиби менен таанышыңыз.", excerpt_en: "Check the updated working hours of testing laboratories during holidays.", status: "published" },
  ],
  documents: [
    { title_ru: "ТР ТС 018/2011", title_kg: "ТР ТС 018/2011", title_en: "TR CU 018/2011", category: "Технический регламент", description_ru: "О безопасности колёсных транспортных средств", description_kg: "Дөңгөлөктүү унаа каражаттарынын коопсуздугу жөнүндө", description_en: "On safety of wheeled vehicles" },
    { title_ru: "Решение КТС № 877", title_kg: "КТС № 877 чечими", title_en: "CUC Decision No. 877", category: "Решение", description_ru: "Порядок оценки соответствия транспортных средств", description_kg: "Унаа каражаттарынын шайкештигин баалоо тартиби", description_en: "Vehicle conformity assessment procedure" },
    { title_ru: "ГОСТ 33670-2015", title_kg: "ГОСТ 33670-2015", title_en: "GOST 33670-2015", category: "ГОСТ", description_ru: "Методы испытаний транспортных средств", description_kg: "Унаа каражаттарын сыноо ыкмалары", description_en: "Vehicle testing methods" },
    { title_ru: "ГОСТ 33997-2016", title_kg: "ГОСТ 33997-2016", title_en: "GOST 33997-2016", category: "ГОСТ", description_ru: "Требования к маркировке транспортных средств", description_kg: "Унаа каражаттарын маркировкалоого талаптар", description_en: "Vehicle marking requirements" },
  ],
  laboratories: [
    { name: "Пункт №1 — Бишкек", address: "г. Бишкек, Кара-Жыгач", phone: "+996 (312) 00-00-01", hours: "Пн–Пт: 09:00–18:00", coords: "42.8746,74.5698", sort_order: 1 },
    { name: "Пункт №2 — Сокулук", address: "Чуйская обл., Сокулукский р-н", phone: "+996 (312) 00-00-02", hours: "Пн–Пт: 09:00–18:00", coords: "42.85,74.3", sort_order: 2 },
    { name: "Пункт №3 — Кант", address: "Чуйская обл., г. Кант, Контур 444", phone: "+996 (312) 00-00-03", hours: "Пн–Пт: 09:00–18:00", coords: "42.88,74.85", sort_order: 3 },
    { name: "Пункт №4 — Жапалак", address: "Ошская обл., с. Жапалак", phone: "+996 (322) 00-00-04", hours: "Пн–Пт: 09:00–18:00", coords: "40.52,72.8", sort_order: 4 },
    { name: "Пункт №5 — Кокчо-Коз", address: "Ошская обл., Кокчо-Коз (СВХ)", phone: "+996 (322) 00-00-05", hours: "Пн–Пт: 09:00–18:00", coords: "40.53,72.79", sort_order: 5 },
  ],
  faq: [
    { question_ru: "Какие документы нужны для получения СБКТС?", question_kg: "СБКТС алуу үчүн кандай документтер керек?", question_en: "What documents are needed for SBKTS?", answer_ru: "Паспорт ТС, свидетельство о регистрации, документ о праве собственности, доверенность (если заявитель не собственник).", answer_kg: "УК паспорту, каттоо күбөлүгү, менчик укугу жөнүндө документ, ишеним кат (эгер арыз ээси ээси болбосо).", answer_en: "Vehicle passport, registration certificate, proof of ownership, power of attorney (if applicant is not the owner).", sort_order: 1 },
    { question_ru: "Сколько стоит техническая экспертиза?", question_kg: "Техникалык экспертиза канча турат?", question_en: "How much does technical expertise cost?", answer_ru: "Стоимость зависит от категории ТС. Точную цену уточняйте в лаборатории.", answer_kg: "Баасы УК категориясына жараша болот. Так баасын лабораториядан тактаңыз.", answer_en: "The cost depends on the vehicle category. Please check with the laboratory for exact pricing.", sort_order: 2 },
    { question_ru: "Как долго оформляется СБКТС?", question_kg: "СБКТС канча убакытта жасалат?", question_en: "How long does SBKTS processing take?", answer_ru: "Стандартный срок — до 5 рабочих дней после проведения испытаний.", answer_kg: "Стандарттык мөөнөт — сыноолор өткөрүлгөндөн кийин 5 жумуш күнгө чейин.", answer_en: "Standard processing time — up to 5 working days after testing.", sort_order: 3 },
  ],
};

async function seed() {
  const sql = postgres(DB_URL);

  // Clean all tables except users
  for (const t of ["faq", "feedback", "laboratories", "documents", "services", "news"]) {
    await sql.unsafe(`DELETE FROM ${t}`);
  }

  for (const [table, rows] of Object.entries(seedData)) {
    for (const row of rows) {
      const keys = Object.keys(row);
      const vals = Object.values(row);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
      await sql.unsafe(`INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders})`, vals);
    }
    console.log(`  ${table}: ${rows.length} rows`);
  }

  await sql.end();
  console.log("Done!");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
