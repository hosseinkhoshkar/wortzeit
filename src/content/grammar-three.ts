import type { GrammarQuestion } from './grammar-one.ts'

// Authored exercises. IDs are append-only; do not reorder existing rows.
export const grammarThreeSource = {
 title: 'DaF kompakt A1–B1، درس3: Unternehmen Familie',
 url: 'https://www.klett.gr/media/wysiwyg/A08103-67618002_DaFkompakt_LoesKB_EB.pdf',
 noteFa: '۵۰ سؤال تألیفی؛ تطبیق مباحث با پاسخ‌نامهٔ رسمی Kursbuch، درس۳، A3–4، B3، C3؛ صفحهٔ۳ PDF. ارجاع سؤال‌ها مربوط به همین پاسخ‌نامه است؛ متن سؤال نقل‌قول کتاب نیست.',
}
const rows: Omit<GrammarQuestion, 'questionId' | 'lessonId' | 'origin'>[] = [
  {
    "topicFa": "صرف können",
    "sentenceDe": "Ich ___ gut kochen. (können)",
    "answer": "kann",
    "options": [
      "kann",
      "kannst",
      "können",
      "könnt"
    ],
    "explanationFa": "برای ich، صورت können («توانستن») برابر kann است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف können",
    "sentenceDe": "Du ___ Deutsch sprechen. (können)",
    "answer": "kannst",
    "options": [
      "kann",
      "kannst",
      "können",
      "könnt"
    ],
    "explanationFa": "برای du، صورت können («توانستن») برابر kannst است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف können",
    "sentenceDe": "Er ___ heute kommen. (können)",
    "answer": "kann",
    "options": [
      "kann",
      "kannst",
      "können",
      "könnt"
    ],
    "explanationFa": "برای er/sie/es، صورت können («توانستن») برابر kann است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف können",
    "sentenceDe": "Wir ___ zusammen lernen. (können)",
    "answer": "können",
    "options": [
      "kann",
      "kannst",
      "können",
      "könnt"
    ],
    "explanationFa": "برای wir، صورت können («توانستن») برابر können است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف können",
    "sentenceDe": "Ihr ___ hier essen. (können)",
    "answer": "könnt",
    "options": [
      "kann",
      "kannst",
      "können",
      "könnt"
    ],
    "explanationFa": "برای ihr، صورت können («توانستن») برابر könnt است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف können",
    "sentenceDe": "Frau Braun, Sie ___ hier warten. (können)",
    "answer": "können",
    "options": [
      "kann",
      "kannst",
      "können",
      "könnt"
    ],
    "explanationFa": "برای Sie رسمی، صورت können («توانستن») برابر können است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف müssen",
    "sentenceDe": "Ich ___ heute arbeiten. (müssen)",
    "answer": "muss",
    "options": [
      "muss",
      "musst",
      "müssen",
      "müsst"
    ],
    "explanationFa": "برای ich، صورت müssen («باید») برابر muss است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف müssen",
    "sentenceDe": "Du ___ Brot kaufen. (müssen)",
    "answer": "musst",
    "options": [
      "muss",
      "musst",
      "müssen",
      "müsst"
    ],
    "explanationFa": "برای du، صورت müssen («باید») برابر musst است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف müssen",
    "sentenceDe": "Anna ___ die Kinder betreuen. (müssen)",
    "answer": "muss",
    "options": [
      "muss",
      "musst",
      "müssen",
      "müsst"
    ],
    "explanationFa": "برای er/sie/es، صورت müssen («باید») برابر muss است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف müssen",
    "sentenceDe": "Wir ___ das Essen kochen. (müssen)",
    "answer": "müssen",
    "options": [
      "muss",
      "musst",
      "müssen",
      "müsst"
    ],
    "explanationFa": "برای wir، صورت müssen («باید») برابر müssen است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف müssen",
    "sentenceDe": "Ihr ___ jetzt lernen. (müssen)",
    "answer": "müsst",
    "options": [
      "muss",
      "musst",
      "müssen",
      "müsst"
    ],
    "explanationFa": "برای ihr، صورت müssen («باید») برابر müsst است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف müssen",
    "sentenceDe": "Herr Klein, Sie ___ noch warten. (müssen)",
    "answer": "müssen",
    "options": [
      "muss",
      "musst",
      "müssen",
      "müsst"
    ],
    "explanationFa": "برای Sie رسمی، صورت müssen («باید») برابر müssen است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف möchten",
    "sentenceDe": "Ich ___ einen Kaffee trinken. (möchten)",
    "answer": "möchte",
    "options": [
      "möchte",
      "möchtest",
      "möchten",
      "möchtet"
    ],
    "explanationFa": "برای ich، صورت möchten («مایل بودن») برابر möchte است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف möchten",
    "sentenceDe": "Du ___ einen Kuchen backen. (möchten)",
    "answer": "möchtest",
    "options": [
      "möchte",
      "möchtest",
      "möchten",
      "möchtet"
    ],
    "explanationFa": "برای du، صورت möchten («مایل بودن») برابر möchtest است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف möchten",
    "sentenceDe": "Paul ___ Deutsch lernen. (möchten)",
    "answer": "möchte",
    "options": [
      "möchte",
      "möchtest",
      "möchten",
      "möchtet"
    ],
    "explanationFa": "برای er/sie/es، صورت möchten («مایل بودن») برابر möchte است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف möchten",
    "sentenceDe": "Wir ___ zusammen essen. (möchten)",
    "answer": "möchten",
    "options": [
      "möchte",
      "möchtest",
      "möchten",
      "möchtet"
    ],
    "explanationFa": "برای wir، صورت möchten («مایل بودن») برابر möchten است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف möchten",
    "sentenceDe": "Ihr ___ heute kochen. (möchten)",
    "answer": "möchtet",
    "options": [
      "möchte",
      "möchtest",
      "möchten",
      "möchtet"
    ],
    "explanationFa": "برای ihr، صورت möchten («مایل بودن») برابر möchtet است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "صرف möchten",
    "sentenceDe": "Frau Roth, Sie ___ etwas trinken. (möchten)",
    "answer": "möchten",
    "options": [
      "möchte",
      "möchtest",
      "möchten",
      "möchtet"
    ],
    "explanationFa": "برای Sie رسمی، صورت möchten («مایل بودن») برابر möchten است؛ فعل اصلی در پایان به صورت مصدر می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Ich / können / heute / kochen → Aussagesatz",
    "answer": "Ich kann heute kochen.",
    "options": [
      "Ich kann heute kochen.",
      "Ich können heute kochen.",
      "Ich heute kann kochen.",
      "Ich kann heute koche."
    ],
    "explanationFa": "فعل کمکی kann جایگاه دوم و مصدر kochen پایان جمله است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Heute / ich / müssen / arbeiten → Aussagesatz",
    "answer": "Heute muss ich arbeiten.",
    "options": [
      "Heute muss ich arbeiten.",
      "Heute ich muss arbeiten.",
      "Heute muss arbeiten ich.",
      "Heute müssen ich arbeiten."
    ],
    "explanationFa": "Heute جایگاه اول را می‌گیرد؛ muss دوم است و arbeiten در پایان می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Wir / möchten / zusammen / essen → Aussagesatz",
    "answer": "Wir möchten zusammen essen.",
    "options": [
      "Wir möchten zusammen essen.",
      "Wir möchte zusammen essen.",
      "Wir zusammen möchten essen.",
      "Wir möchtet zusammen essen."
    ],
    "explanationFa": "möchten با wir صرف می‌شود و essen در پایان می‌ماند.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Du kannst morgen kommen. → Ja/Nein-Frage",
    "answer": "Kannst du morgen kommen?",
    "options": [
      "Kannst du morgen kommen?",
      "Kann du morgen kommen?",
      "Kannst du morgen kommst?",
      "Könnt du morgen kommen?"
    ],
    "explanationFa": "در سؤال بله/خیر، فعل کمکی Kannst ابتدا، فاعل du پس از آن و مصدر kommen در پایان است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Was / du / möchten / trinken → W-Frage",
    "answer": "Was möchtest du trinken?",
    "options": [
      "Was möchtest du trinken?",
      "Was du möchtest trinken?",
      "Was möchtest trinken du?",
      "Was möchtet du trinken?"
    ],
    "explanationFa": "در سؤال W، möchtest پس از پرسش‌واژه است و trinken در پایان می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Wann / ihr / müssen / arbeiten → W-Frage",
    "answer": "Wann müsst ihr arbeiten?",
    "options": [
      "Wann müsst ihr arbeiten?",
      "Wann ihr müsst arbeiten?",
      "Wann müsst arbeiten ihr?",
      "Wann muss ihr arbeiten?"
    ],
    "explanationFa": "بعد از Wann، فعل صرف‌شدهٔ müsst و سپس فاعل ihr می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Am Montag / wir / können / kommen → Aussagesatz",
    "answer": "Am Montag können wir kommen.",
    "options": [
      "Am Montag können wir kommen.",
      "Am Montag wir können kommen.",
      "Am Montag können kommen wir.",
      "Am Montag kann wir kommen."
    ],
    "explanationFa": "عبارت Am Montag یک جزء جمله است؛ können دوم و kommen در پایان است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "جمله با فعل کمکی",
    "sentenceDe": "Anna muss heute lernen. → Ja/Nein-Frage",
    "answer": "Muss Anna heute lernen?",
    "options": [
      "Muss Anna heute lernen?",
      "Musst Anna heute lernen?",
      "Muss Anna heute lernt?",
      "Müssen Anna heute lernen?"
    ],
    "explanationFa": "برای Anna فعل muss می‌آید؛ در قالب خواسته‌شده فعل ابتدا و lernen در پایان قرار می‌گیرد.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A3",
    "promptFa": "قالب استاندارد را انتخاب کن: فعل کمکی صرف‌شده، مصدر در پایان و در سؤال، فاعل بلافاصله پس از فعل کمکی."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Das ist ___ Bruder. (ich)",
    "answer": "mein",
    "options": [
      "mein",
      "meine",
      "meinen",
      "meinem"
    ],
    "explanationFa": "Bruder مذکر و در این جمله نومیناتیو است؛ برای ich از mein استفاده می‌شود.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Das ist ___ Schwester. (ich)",
    "answer": "meine",
    "options": [
      "meine",
      "mein",
      "meinen",
      "meinem"
    ],
    "explanationFa": "Schwester مؤنث و فاعلی است؛ صورت درست meine است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "___ Kind ist hier. (du)",
    "answer": "Dein",
    "options": [
      "Dein",
      "Deine",
      "Deinen",
      "Deinem"
    ],
    "explanationFa": "Kind خنثی و فاعل است؛ ضمیر ملکی du در اینجا Dein است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "___ Eltern wohnen in Bonn. (du)",
    "answer": "Deine",
    "options": [
      "Deine",
      "Dein",
      "Deinen",
      "Deinem"
    ],
    "explanationFa": "Eltern جمع و فاعل است؛ برای du از Deine استفاده می‌کنیم.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Paul hat eine Schwester. ___ Schwester heißt Mia.",
    "answer": "Seine",
    "options": [
      "Seine",
      "Sein",
      "Seinen",
      "Seinem"
    ],
    "explanationFa": "صاحب Paul و اسمِ متعلق Schwester مؤنث است؛ پس Seine درست است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Anna hat einen Bruder. ___ Bruder heißt Tim.",
    "answer": "Ihr",
    "options": [
      "Ihr",
      "Ihre",
      "Ihren",
      "Ihrem"
    ],
    "explanationFa": "صاحب Anna است؛ برای Bruder مذکر در نومیناتیو، Ihr می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Das ist ___ Familie. (wir)",
    "answer": "unsere",
    "options": [
      "unsere",
      "unser",
      "unseren",
      "unserem"
    ],
    "explanationFa": "Familie مؤنث است؛ ضمیر ملکی wir در نومیناتیو با e پایان می‌یابد.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Das ist ___ Vater. (ihr)",
    "answer": "euer",
    "options": [
      "euer",
      "eure",
      "euren",
      "eurem"
    ],
    "explanationFa": "برای ihr و Vater مذکر در حالت فاعلی از euer استفاده می‌کنیم.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Frau Wolf, ist das ___ Tochter? (Sie)",
    "answer": "Ihre",
    "options": [
      "Ihre",
      "Ihr",
      "Ihren",
      "Ihrem"
    ],
    "explanationFa": "در خطاب رسمی، ضمیر ملکی با حرف بزرگ است؛ Tochter مؤنث، پس Ihre است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "Herr Wolf, ist das ___ Sohn? (Sie)",
    "answer": "Ihr",
    "options": [
      "Ihr",
      "Ihre",
      "Ihren",
      "Ihrem"
    ],
    "explanationFa": "Sohn مذکر و در اینجا نومیناتیو است؛ در خطاب رسمی Ihr می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "___ Kinder sind hier. (wir)",
    "answer": "Unsere",
    "options": [
      "Unsere",
      "Unser",
      "Unseren",
      "Unserem"
    ],
    "explanationFa": "Kinder جمع و فاعل است؛ صورت ملکی wir در اینجا Unsere است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ملکی در نومیناتیو",
    "sentenceDe": "___ Mutter ist Lehrerin. (ihr)",
    "answer": "Eure",
    "options": [
      "Eure",
      "Euer",
      "Euren",
      "Eurem"
    ],
    "explanationFa": "برای Mutter مؤنث، euer به eure تبدیل می‌شود؛ ابتدای جمله Eure نوشته می‌شود.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Hast du Brot? – Nein, ich habe ___.",
    "answer": "keins",
    "options": [
      "keins",
      "keinen",
      "keiner",
      "keinem"
    ],
    "explanationFa": "Brot خنثی است؛ وقتی اسم تکرار نمی‌شود، ضمیر منفی آکوزاتیو keins است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Hast du einen Apfel? – Nein, ich habe ___.",
    "answer": "keinen",
    "options": [
      "keinen",
      "keiner",
      "keins",
      "keinem"
    ],
    "explanationFa": "Apfel مذکر و مفعول haben است؛ بدون تکرار اسم، keinen می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Hast du eine Banane? – Nein, ich habe ___.",
    "answer": "keine",
    "options": [
      "keine",
      "keinen",
      "keiner",
      "keins"
    ],
    "explanationFa": "Banane مؤنث و مفعول است؛ ضمیر منفی آن keine است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Hast du Eier? – Nein, ich habe ___.",
    "answer": "keine",
    "options": [
      "keine",
      "keins",
      "keiner",
      "keinem"
    ],
    "explanationFa": "Eier جمع و مفعول است؛ ضمیر منفی جمع در اینجا keine است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Ich habe ___ Brot. (Negation)",
    "answer": "kein",
    "options": [
      "kein",
      "keine",
      "keinen",
      "keinem"
    ],
    "explanationFa": "پیش از اسم خنثی Brot در آکوزاتیو، آرتیکل منفی kein می‌آید.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Ich habe kein Brot. → Ich habe ___.",
    "answer": "keins",
    "options": [
      "keins",
      "kein",
      "keinen",
      "keiner"
    ],
    "explanationFa": "با حذف اسم خنثی، kein به ضمیر مستقل keins تبدیل می‌شود.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Wir kaufen ___ Äpfel. (Negation)",
    "answer": "keine",
    "options": [
      "keine",
      "kein",
      "keinen",
      "keinem"
    ],
    "explanationFa": "Äpfel جمع و مفعول مستقیم است؛ آرتیکل منفی جمع keine است.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "منفی‌سازی با kein",
    "sentenceDe": "Wir haben keine Äpfel. → Wir haben ___.",
    "answer": "keine",
    "options": [
      "keine",
      "kein",
      "keins",
      "keiner"
    ],
    "explanationFa": "در جمع آکوزاتیو، صورت ضمیری و صورت همراه اسم هر دو keine هستند.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · B3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پیوند und",
    "sentenceDe": "Anna kocht. Paul lernt. (mit und)",
    "answer": "Anna kocht und Paul lernt.",
    "options": [
      "Anna kocht und Paul lernt.",
      "Anna kocht und Paul lernst.",
      "Anna kocht und Paul lernen.",
      "Anna kochen und Paul lernt."
    ],
    "explanationFa": "دو جملهٔ خبری با und وصل می‌شوند؛ در جملهٔ دوم، Paul پیش از فعل صرف‌شدهٔ lernt می‌ماند.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A4",
    "promptFa": "گزینهٔ مطابق قالب خواسته‌شده را انتخاب کن."
  },
  {
    "topicFa": "پیوند und",
    "sentenceDe": "Ich koche. Ich lerne. (mit und; ich nur einmal)",
    "answer": "Ich koche und lerne.",
    "options": [
      "Ich koche und lerne.",
      "Ich koche und lernen.",
      "Ich kochen und lerne.",
      "Ich koche und lernst."
    ],
    "explanationFa": "وقتی فاعل یکسان حذف می‌شود، هر دو فعل همچنان برای ich صرف می‌شوند.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A4",
    "promptFa": "گزینهٔ مطابق قالب خواسته‌شده را انتخاب کن."
  },
  {
    "topicFa": "پیوند und",
    "sentenceDe": "Wir kochen. Wir lernen. (mit und; wir nur einmal)",
    "answer": "Wir kochen und lernen.",
    "options": [
      "Wir kochen und lernen.",
      "Wir kochen und lernt.",
      "Wir kocht und lernen.",
      "Wir kochst und lernen."
    ],
    "explanationFa": "با فاعل مشترک wir، دو فعل kochen و lernen هر دو پایان en دارند.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A4",
    "promptFa": "گزینهٔ مطابق قالب خواسته‌شده را انتخاب کن."
  },
  {
    "topicFa": "پیوند und",
    "sentenceDe": "Mia lernt. Tim kocht. (mit und)",
    "answer": "Mia lernt und Tim kocht.",
    "options": [
      "Mia lernt und Tim kocht.",
      "Mia lernt und Tim kochst.",
      "Mia lernen und Tim kocht.",
      "Mia lernt und Tim kochen."
    ],
    "explanationFa": "با und دو جملهٔ خبری مستقل وصل می‌شوند؛ در هر دو، فاعل پیش از فعل صرف‌شده قرار دارد.",
    "locator": "درس3 · پاسخ‌نامهٔ کتاب درسی · A4",
    "promptFa": "گزینهٔ مطابق قالب خواسته‌شده را انتخاب کن."
  }
]
export const grammarThreeQuestions: GrammarQuestion[] = rows.map((row, index) => ({
 ...row, questionId: `a1-g03-${String(index + 1).padStart(3, '0')}`,
 lessonId: 'a1-lesson-03', origin: 'authored',
}))
