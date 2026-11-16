import type { GrammarQuestion } from './grammar-one.ts'

// Authored exercises, not quotations. Locators refer to lesson 2 of the publisher's Kursbuch solutions.
export const grammarTwoSource = {
  title: 'DaF kompakt A1–B1، درس۲: Termine, Termine',
  url: 'https://www.klett.gr/media/wysiwyg/A08103-67618002_DaFkompakt_LoesKB_EB.pdf',
  noteFa: 'سؤال‌ها تألیفی‌اند؛ مباحث با پاسخ‌نامهٔ رسمی کتاب درسی، درس۲، بخش‌های A تا C (صفحهٔ۲ PDF) تطبیق دارند. ارجاع هر سؤال به بخش و تمرین همین پاسخ‌نامه است.',
}
const rows: [string, string, string, [string, string, string, string], string, string][] = [
  [
    "زمان و ساعت",
    "Der Kurs beginnt ___ 09:00 Uhr.",
    "um",
    [
      "um",
      "am",
      "im",
      "halb"
    ],
    "برای ساعت مشخص از um استفاده می‌کنیم.",
    "A1"
  ],
  [
    "زمان و ساعت",
    "___ Montag habe ich einen Termin.",
    "Am",
    [
      "Am",
      "Um",
      "Im",
      "Halb"
    ],
    "برای روز هفته از am استفاده می‌کنیم.",
    "A1–3"
  ],
  [
    "زمان و ساعت",
    "10:30 Uhr = ___ (inoffiziell)",
    "halb elf",
    [
      "halb elf",
      "halb zehn",
      "Viertel nach zehn",
      "Viertel vor elf"
    ],
    "halb elf یعنی نیم ساعت مانده به یازده، یعنی ده و نیم.",
    "A3"
  ],
  [
    "زمان و ساعت",
    "17:15 Uhr = ___ (inoffiziell)",
    "Viertel nach fünf",
    [
      "Viertel nach fünf",
      "Viertel vor fünf",
      "halb fünf",
      "fünf vor fünf"
    ],
    "Viertel nach پنج یعنی یک ربع از پنج گذشته است.",
    "A3"
  ],
  [
    "آرتیکل معرفه",
    "Das ist ein Film. ___ Film ist interessant.",
    "Der",
    [
      "Der",
      "Die",
      "Das",
      "Den"
    ],
    "Film اسم مذکر و اینجا فاعل است؛ برای اشارهٔ دوباره از der استفاده می‌کنیم.",
    "B2"
  ],
  [
    "آرتیکل معرفه",
    "Das ist ein Konzert. ___ Konzert ist heute.",
    "Das",
    [
      "Das",
      "Der",
      "Die",
      "Den"
    ],
    "Konzert خنثی است؛ آرتیکل معرفهٔ آن در حالت فاعلی das است.",
    "B2"
  ],
  [
    "آرتیکل معرفه",
    "Das ist eine Ausstellung. ___ Ausstellung ist schön.",
    "Die",
    [
      "Die",
      "Der",
      "Das",
      "Den"
    ],
    "Ausstellung مؤنث است و آرتیکل معرفهٔ آن die است.",
    "B2"
  ],
  [
    "آرتیکل معرفه",
    "Das ist ___ Konzert. (unbestimmter Artikel)",
    "ein",
    [
      "ein",
      "eine",
      "einen",
      "einem"
    ],
    "برای اسم خنثی Konzert در حالت فاعلی از ein استفاده می‌شود.",
    "B2"
  ],
  [
    "آکوزاتیو",
    "Wir besuchen ___ Markt. (bestimmter Artikel)",
    "den",
    [
      "den",
      "der",
      "das",
      "dem"
    ],
    "Markt مذکر و مفعول مستقیم besuchen است؛ der در آکوزاتیو به den تبدیل می‌شود.",
    "C3"
  ],
  [
    "آکوزاتیو",
    "Wir planen ___ Ausflug. (unbestimmter Artikel)",
    "einen",
    [
      "einen",
      "ein",
      "eine",
      "einem"
    ],
    "Ausflug مذکر است؛ آرتیکل نامعین مفعول مستقیم einen است.",
    "C3"
  ],
  [
    "آکوزاتیو",
    "Wir besuchen ___ Museum. (unbestimmter Artikel)",
    "ein",
    [
      "ein",
      "einen",
      "eine",
      "einem"
    ],
    "Museum خنثی است؛ ein در آکوزاتیو بدون تغییر می‌ماند.",
    "C3"
  ],
  [
    "آکوزاتیو",
    "Ich besuche ___ Kathedrale. (bestimmter Artikel)",
    "die",
    [
      "die",
      "der",
      "den",
      "das"
    ],
    "Kathedrale مؤنث است؛ آرتیکل معرفه در آکوزاتیو همچنان die است.",
    "C3"
  ],
  [
    "منفی‌سازی",
    "Ich habe ___ Auto. (Negation)",
    "kein",
    [
      "kein",
      "keinen",
      "keine",
      "nicht"
    ],
    "Auto خنثی است؛ برای منفی‌کردن اسم بدون آرتیکل معرفه از kein استفاده می‌کنیم.",
    "A3 / C3"
  ],
  [
    "منفی‌سازی",
    "Wir haben ___ Karten. (Negation)",
    "keine",
    [
      "keine",
      "kein",
      "keinen",
      "nicht"
    ],
    "Karten جمع است؛ صورت منفی اسم جمع keine است.",
    "A3 / C3"
  ],
  [
    "منفی‌سازی",
    "Der Film ist ___ interessant. (Negation)",
    "nicht",
    [
      "nicht",
      "kein",
      "keine",
      "keinen"
    ],
    "صفت interessant را با nicht منفی می‌کنیم.",
    "A3"
  ],
  [
    "منفی‌سازی",
    "Wir planen ___ Ausflug. (Negation)",
    "keinen",
    [
      "keinen",
      "kein",
      "keine",
      "nicht"
    ],
    "Ausflug مذکر و مفعول مستقیم است؛ صورت منفی آکوزاتیو keinen است.",
    "A3 / C3"
  ],
  [
    "جایگاه فعل",
    "Mit „Heute“ beginnen: Ich besuche heute die Ausstellung.",
    "Heute besuche ich die Ausstellung.",
    [
      "Heute besuche ich die Ausstellung.",
      "Heute ich besuche die Ausstellung.",
      "Heute die Ausstellung ich besuche.",
      "Heute besuchen ich die Ausstellung."
    ],
    "با آوردن Heute در آغاز، فعل صرف‌شده همچنان جایگاه دوم و فاعل پس از آن قرار می‌گیرد.",
    "B3"
  ],
  [
    "جایگاه فعل",
    "Mit „Am Montag“ beginnen: Wir besuchen am Montag das Museum.",
    "Am Montag besuchen wir das Museum.",
    [
      "Am Montag besuchen wir das Museum.",
      "Am Montag wir besuchen das Museum.",
      "Am Montag das Museum wir besuchen.",
      "Am Montag besucht wir das Museum."
    ],
    "Am Montag یک جزء جمله است؛ پس از آن فعل صرف‌شده و سپس فاعل می‌آید.",
    "B3"
  ],
  [
    "جایگاه فعل",
    "Mit „Morgen“ beginnen: Anna hat morgen Zeit.",
    "Morgen hat Anna Zeit.",
    [
      "Morgen hat Anna Zeit.",
      "Morgen Anna hat Zeit.",
      "Morgen haben Anna Zeit.",
      "Morgen Zeit Anna hat."
    ],
    "فعل صرف‌شده hat بعد از قید آغازین و پیش از فاعل می‌آید.",
    "B3"
  ],
  [
    "جایگاه فعل",
    "Mit „Um acht Uhr“ beginnen: Wir haben um acht Uhr einen Termin.",
    "Um acht Uhr haben wir einen Termin.",
    [
      "Um acht Uhr haben wir einen Termin.",
      "Um acht Uhr wir haben einen Termin.",
      "Um acht Uhr einen Termin wir haben.",
      "Um acht Uhr hat wir einen Termin."
    ],
    "عبارت زمانی آغازین جایگاه اول را می‌گیرد و haben در جایگاه دوم می‌ماند.",
    "B3"
  ],
  [
    "ضمیر آکوزاتیو",
    "Du siehst mich. Ich sehe ___. (du)",
    "dich",
    [
      "dich",
      "du",
      "dir",
      "ich"
    ],
    "ضمیر du وقتی مفعول مستقیم است به dich تبدیل می‌شود.",
    "C5"
  ],
  [
    "ضمیر آکوزاتیو",
    "Wo ist Paul? Ich sehe ___. (er)",
    "ihn",
    [
      "ihn",
      "er",
      "ihm",
      "sein"
    ],
    "Paul مذکر است؛ ضمیر مفعولی er در آکوزاتیو ihn است.",
    "C5"
  ],
  [
    "ضمیر آکوزاتیو",
    "Wir sind hier. Sie besucht ___. (wir)",
    "uns",
    [
      "uns",
      "wir",
      "unser",
      "ihr"
    ],
    "صورت مفعولی ضمیر wir برابر uns است.",
    "C5"
  ],
  [
    "ضمیر آکوزاتیو",
    "Ihr seid hier. Ich sehe ___. (ihr)",
    "euch",
    [
      "euch",
      "ihr",
      "euer",
      "wir"
    ],
    "صورت مفعولی ضمیر ihr در آکوزاتیو euch است.",
    "C5"
  ],
  [
    "فعل haben",
    "Ich ___ heute einen Termin.",
    "habe",
    [
      "habe",
      "hast",
      "hat",
      "haben"
    ],
    "haben با ich به صورت habe صرف می‌شود.",
    "C2–3"
  ],
  [
    "فعل haben",
    "Du ___ morgen Zeit.",
    "hast",
    [
      "hast",
      "habe",
      "hat",
      "habt"
    ],
    "صورت haben برای du برابر hast است.",
    "C2–3"
  ],
  [
    "فعل haben",
    "Anna ___ am Montag einen Termin.",
    "hat",
    [
      "hat",
      "hast",
      "haben",
      "habt"
    ],
    "Anna سوم‌شخص مفرد است و صورت فعل hat می‌آید.",
    "C2–3"
  ],
  [
    "فعل haben",
    "Ihr ___ heute keine Zeit.",
    "habt",
    [
      "habt",
      "haben",
      "hat",
      "hast"
    ],
    "برای ihr از habt استفاده می‌کنیم.",
    "C2–3"
  ]
]
export const grammarTwoQuestions: GrammarQuestion[] = rows.map(([topicFa, sentenceDe, answer, options, explanationFa, locator], index) => ({
  questionId: `a1-g02-${String(index + 1).padStart(3, '0')}`,
  lessonId: 'a1-lesson-02', topicFa, sentenceDe, answer, options, explanationFa,
  locator: `درس۲ · پاسخ‌نامهٔ کتاب درسی · ${locator}`,
  promptFa: topicFa === 'جایگاه فعل' ? 'جملهٔ درست را با عبارت خواسته‌شده آغاز کن.' : 'گزینهٔ درست را برای جای خالی انتخاب کن.',
  origin: 'authored',
}))
