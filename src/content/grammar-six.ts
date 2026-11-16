import type { GrammarQuestion } from './grammar-one.ts'

// Authored exercises. IDs are append-only; do not reorder existing rows.
export const grammarSixSource = {
 title: 'DaF kompakt A1–B1، درس6: Kleider machen Freunde',
 url: 'https://www.vydavatelstvoklett.sk/uploads/61229686a3f39-probeseiten_a1_eb.pdf',
 noteFa: '۵۰ سؤال تألیفی؛ تطبیق مباحث با نمونهٔ رسمی کتاب درسی، درس۶، صفحات چاپی۵۳،۵۵–۵۷ و۵۹. ارجاع سؤال‌ها مربوط به همین کتاب درسی است؛ متن سؤال نقل‌قول کتاب نیست.',
}
const rows: Omit<GrammarQuestion, 'questionId' | 'lessonId' | 'origin'>[] = [
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte dieses Fenster! (öffnen)",
    "answer": "Öffnen",
    "options": [
      "Öffnen",
      "Öffnet",
      "Öffne",
      "Öffnest"
    ],
    "explanationFa": "در امر رسمی، فعل Öffnen پیش از Sie می‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte die Tür! (schließen)",
    "answer": "Schließen",
    "options": [
      "Schließen",
      "Schließt",
      "Schließ",
      "Schließe"
    ],
    "explanationFa": "امر رسمی با Schließen Sie ساخته می‌شود؛ مخاطب Sie حفظ می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte Programm drei! (wählen)",
    "answer": "Wählen",
    "options": [
      "Wählen",
      "Wählt",
      "Wähle",
      "Wählst"
    ],
    "explanationFa": "با مخاطب رسمی Sie از Wählen Sie استفاده می‌کنیم.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte diese Taste! (drücken)",
    "answer": "Drücken",
    "options": [
      "Drücken",
      "Drückt",
      "Drücke",
      "Drückst"
    ],
    "explanationFa": "فعل Drücken و سپس Sie، قالب امر رسمی است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte den Korb! (füllen)",
    "answer": "Füllen",
    "options": [
      "Füllen",
      "Füllt",
      "Fülle",
      "Füllst"
    ],
    "explanationFa": "در امر رسمی، Füllen قبل از Sie قرار می‌گیرد.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte an der Kasse! (bezahlen)",
    "answer": "Bezahlen",
    "options": [
      "Bezahlen",
      "Bezahlt",
      "Bezahle",
      "Bezahlst"
    ],
    "explanationFa": "قالب درست برای دستور رسمی Bezahlen Sie است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte leise! (sein)",
    "answer": "Seien",
    "options": [
      "Seien",
      "Sind",
      "Seid",
      "Sei"
    ],
    "explanationFa": "امر رسمی sein استثنایی است: Seien Sie.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر رسمی با Sie",
    "sentenceDe": "___ Sie bitte Geduld! (haben)",
    "answer": "Haben",
    "options": [
      "Haben",
      "Habt",
      "Hab",
      "Hast"
    ],
    "explanationFa": "امر رسمی haben با Haben Sie ساخته می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۹ · A3–4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با wir",
    "sentenceDe": "___ wir heute ins Café! (gehen)",
    "answer": "Gehen",
    "options": [
      "Gehen",
      "Geht",
      "Geh",
      "Gehst"
    ],
    "explanationFa": "برای پیشنهاد جمعی، فعل Gehen ابتدا و wir پس از آن می‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۷ و۵۹ · A3 / C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با wir",
    "sentenceDe": "___ wir heute zusammen! (kochen)",
    "answer": "Kochen",
    "options": [
      "Kochen",
      "Kocht",
      "Koch",
      "Kochst"
    ],
    "explanationFa": "Kochen wir یک پیشنهاد برای انجام کار با هم است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۷ و۵۹ · A3 / C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با wir",
    "sentenceDe": "___ wir doch Musik! (hören)",
    "answer": "Hören",
    "options": [
      "Hören",
      "Hört",
      "Höre",
      "Hörst"
    ],
    "explanationFa": "پیشنهاد مشترک با Hören wir ساخته می‌شود؛ doch می‌تواند پس از wir بیاید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۷ و۵۹ · A3 / C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با wir",
    "sentenceDe": "___ wir doch Anna! (treffen)",
    "answer": "Treffen",
    "options": [
      "Treffen",
      "Trefft",
      "Triff",
      "Trifft"
    ],
    "explanationFa": "برای پیشنهاد با wir، صورت Treffen به کار می‌رود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۷ و۵۹ · A3 / C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با wir",
    "sentenceDe": "___ wir das doch zusammen! (versuchen)",
    "answer": "Versuchen",
    "options": [
      "Versuchen",
      "Versucht",
      "Versuche",
      "Versuchst"
    ],
    "explanationFa": "در پیشنهاد با wir، فعل Versuchen در آغاز می‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۷ و۵۹ · A3 / C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با wir",
    "sentenceDe": "___ wir doch jetzt an! (anfangen)",
    "answer": "Fangen",
    "options": [
      "Fangen",
      "Fangt",
      "Fang",
      "Fängst"
    ],
    "explanationFa": "پیشنهاد جمعی با Fangen wir ساخته می‌شود؛ پیشوند an در پایان می‌ماند.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۷ و۵۹ · A3 / C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte morgen wieder! (du; kommen)",
    "answer": "Komm",
    "options": [
      "Komm",
      "Kommt",
      "Kommst",
      "Kommen"
    ],
    "explanationFa": "در امر du، ضمیر حذف و صورت Komm استفاده می‌شود؛ صورت Komme هم ممکن است، اما در گزینه‌ها نیست.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte noch zwei Minuten! (du; warten)",
    "answer": "Warte",
    "options": [
      "Warte",
      "Wartest",
      "Warten",
      "Wartet"
    ],
    "explanationFa": "امر مفرد warten به صورت Warte است و پایان e را نگه می‌دارد.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte das Fenster! (du; öffnen)",
    "answer": "Öffne",
    "options": [
      "Öffne",
      "Öffnest",
      "Öffnen",
      "Öffnet"
    ],
    "explanationFa": "در امر du، öffnen به Öffne تبدیل می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte meinen Fehler! (du; entschuldigen)",
    "answer": "Entschuldige",
    "options": [
      "Entschuldige",
      "Entschuldigst",
      "Entschuldigen",
      "Entschuldigt"
    ],
    "explanationFa": "صورت معیار امر du برای entschuldigen برابر Entschuldige است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte leise! (du; sein)",
    "answer": "Sei",
    "options": [
      "Sei",
      "Seid",
      "Seien",
      "Bist"
    ],
    "explanationFa": "امر مفرد sein برابر Sei است؛ با حالت خبری bist فرق دارد.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte Geduld! (du; haben)",
    "answer": "Hab",
    "options": [
      "Hab",
      "Habt",
      "Haben",
      "Hast"
    ],
    "explanationFa": "برای مخاطب du، امر haben به صورت Hab می‌آید؛ Hast حالت خبری است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte die Lampe an! (du; anmachen)",
    "answer": "Mach",
    "options": [
      "Mach",
      "Macht",
      "Machst",
      "Machen"
    ],
    "explanationFa": "در امر مفرد anmachen، بخش Mach ابتدا و پیشوند an در پایان جمله می‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای du",
    "sentenceDe": "___ bitte nach rechts! (du; schauen)",
    "answer": "Schau",
    "options": [
      "Schau",
      "Schaut",
      "Schauen",
      "Schaust"
    ],
    "explanationFa": "در امر مفرد schauen، Schau می‌آید؛ ضمیر du حذف می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte morgen wieder! (ihr; kommen)",
    "answer": "Kommt",
    "options": [
      "Kommt",
      "Komm",
      "Kommen",
      "Kommst"
    ],
    "explanationFa": "امر ihr مانند صورت خبری ihr kommt است؛ ضمیر ihr حذف می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte vor dem Café! (ihr; warten)",
    "answer": "Wartet",
    "options": [
      "Wartet",
      "Warte",
      "Warten",
      "Wartest"
    ],
    "explanationFa": "برای امر جمع غیررسمی از Wartet بدون ضمیر ihr استفاده می‌کنیم.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte das Fenster! (ihr; öffnen)",
    "answer": "Öffnet",
    "options": [
      "Öffnet",
      "Öffne",
      "Öffnen",
      "Öffnest"
    ],
    "explanationFa": "امر ihr برای öffnen برابر Öffnet است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte den Fehler! (ihr; entschuldigen)",
    "answer": "Entschuldigt",
    "options": [
      "Entschuldigt",
      "Entschuldige",
      "Entschuldigen",
      "Entschuldigst"
    ],
    "explanationFa": "برای مخاطبان ihr، امر entschuldigen برابر Entschuldigt است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte langsam! (ihr; reden)",
    "answer": "Redet",
    "options": [
      "Redet",
      "Rede",
      "Reden",
      "Redest"
    ],
    "explanationFa": "امر ihr مانند ihr redet است؛ ضمیر در دستور حذف می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte die Tür zu! (ihr; zumachen)",
    "answer": "Macht",
    "options": [
      "Macht",
      "Mach",
      "Machen",
      "Machst"
    ],
    "explanationFa": "امر ihr با Macht ساخته می‌شود و پیشوند zu در پایان می‌ماند.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte freundlich! (ihr; sein)",
    "answer": "Seid",
    "options": [
      "Seid",
      "Sei",
      "Seien",
      "Sind"
    ],
    "explanationFa": "امر sein برای مخاطبان ihr برابر Seid است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امر برای ihr",
    "sentenceDe": "___ bitte keine Angst! (ihr; haben)",
    "answer": "Habt",
    "options": [
      "Habt",
      "Hab",
      "Haben",
      "Hast"
    ],
    "explanationFa": "امر haben برای ihr برابر Habt است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۵–۵۶ و۵۹ · B5 / C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte den roten Korb! (du; nehmen)",
    "answer": "Nimm",
    "options": [
      "Nimm",
      "Nehm",
      "Nehmt",
      "Nimmst"
    ],
    "explanationFa": "در امر du، تغییر e به i در nehmen حفظ می‌شود: Nimm.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte den Termin nicht! (du; vergessen)",
    "answer": "Vergiss",
    "options": [
      "Vergiss",
      "Vergess",
      "Vergesst",
      "Vergisst"
    ],
    "explanationFa": "صورت امر مفرد vergessen برابر Vergiss است؛ t شخص سوم نمی‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte diese Nachricht! (du; lesen)",
    "answer": "Lies",
    "options": [
      "Lies",
      "Les",
      "Lest",
      "Liest"
    ],
    "explanationFa": "تغییر e به ie در امر du حفظ می‌شود؛ lesen به Lies تبدیل می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte langsam! (du; fahren)",
    "answer": "Fahr",
    "options": [
      "Fahr",
      "Fähr",
      "Fahrt",
      "Fährst"
    ],
    "explanationFa": "برخلاف du fährst، در امر مفرد fahren اوملاوت نمی‌آید: Fahr.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte nicht so schnell! (du; laufen)",
    "answer": "Lauf",
    "options": [
      "Lauf",
      "Läuf",
      "Lauft",
      "Läufst"
    ],
    "explanationFa": "در امر du، تغییر au به äuِ زمان حال حذف می‌شود: Lauf.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte nicht gegen den Tisch! (du; stoßen)",
    "answer": "Stoß",
    "options": [
      "Stoß",
      "Stöß",
      "Stoßt",
      "Stößt"
    ],
    "explanationFa": "در امر du، stoßen بدون اوملاوت می‌آید: Stoß.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte den Korb fest! (du; festhalten)",
    "answer": "Halte",
    "options": [
      "Halte",
      "Hält",
      "Haltet",
      "Hältst"
    ],
    "explanationFa": "امر مفرد halten برابر Halte است؛ اوملاوت ندارد و پیشوند fest پایان جمله است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte für das Foto! (du; lächeln)",
    "answer": "Lächle",
    "options": [
      "Lächle",
      "Lächelt",
      "Lächeln",
      "Lächelst"
    ],
    "explanationFa": "یکی از صورت‌های معیار امر lächeln، Lächle است؛ گزینه‌های دیگر برای امر du مناسب نیستند.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte eure Taschen! (ihr; nehmen)",
    "answer": "Nehmt",
    "options": [
      "Nehmt",
      "Nimm",
      "Nehmen",
      "Nimmst"
    ],
    "explanationFa": "امر ihr از صورت ihr nehmt می‌آید؛ تغییر e به iِ مفرد اینجا وجود ندارد.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "امرهای بی‌قاعده و تغییر واکه",
    "sentenceDe": "___ bitte eure Jacken nicht! (ihr; vergessen)",
    "answer": "Vergesst",
    "options": [
      "Vergesst",
      "Vergiss",
      "Vergessen",
      "Vergisst"
    ],
    "explanationFa": "صورت امر جمع غیررسمی vergessen برابر Vergesst است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۶ و۵۹ · C3",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "جایگاه پیشوند در امر",
    "sentenceDe": "du / anmachen / die Lampe",
    "answer": "Mach bitte die Lampe an.",
    "options": [
      "Mach bitte die Lampe an.",
      "Anmach bitte die Lampe.",
      "Mach bitte an die Lampe.",
      "Macht bitte die Lampe an."
    ],
    "explanationFa": "در امر du، Mach در آغاز و پیشوند an در پایان می‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۵–۵۷ · A3 / B5 / C3–4",
    "promptFa": "جملهٔ امری درست را برای مخاطب مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "جایگاه پیشوند در امر",
    "sentenceDe": "du / aufpassen / gut",
    "answer": "Pass bitte gut auf.",
    "options": [
      "Pass bitte gut auf.",
      "Aufpass bitte gut.",
      "Passt bitte gut auf.",
      "Passen bitte gut auf."
    ],
    "explanationFa": "امر مفرد aufpassen برابر Pass … auf است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۵–۵۷ · A3 / B5 / C3–4",
    "promptFa": "جملهٔ امری درست را برای مخاطب مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "جایگاه پیشوند در امر",
    "sentenceDe": "du / umdrehen / den Pullover",
    "answer": "Dreh bitte den Pullover um.",
    "options": [
      "Dreh bitte den Pullover um.",
      "Umdreh bitte den Pullover.",
      "Dreh bitte um den Pullover.",
      "Dreht bitte den Pullover um."
    ],
    "explanationFa": "در فعل umdrehen، پیشوند um در پایان دستور قرار می‌گیرد.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۵–۵۷ · A3 / B5 / C3–4",
    "promptFa": "جملهٔ امری درست را برای مخاطب مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "جایگاه پیشوند در امر",
    "sentenceDe": "du / einladen / Paul",
    "answer": "Lade bitte Paul ein.",
    "options": [
      "Lade bitte Paul ein.",
      "Einlade bitte Paul.",
      "Lädst bitte Paul ein.",
      "Ladet bitte Paul ein."
    ],
    "explanationFa": "امر du برای einladen برابر Lade … ein است؛ اوملاوت زمان حال نمی‌ماند.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۵–۵۷ · A3 / B5 / C3–4",
    "promptFa": "جملهٔ امری درست را برای مخاطب مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "جایگاه پیشوند در امر",
    "sentenceDe": "ihr / anfangen / jetzt",
    "answer": "Fangt bitte jetzt an.",
    "options": [
      "Fangt bitte jetzt an.",
      "Anfangt bitte jetzt.",
      "Fang bitte jetzt an.",
      "Fängt bitte jetzt an."
    ],
    "explanationFa": "برای ihr، فعل Fangt می‌آید؛ پیشوند an در پایان دستور است.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۵–۵۷ · A3 / B5 / C3–4",
    "promptFa": "جملهٔ امری درست را برای مخاطب مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "جایگاه پیشوند در امر",
    "sentenceDe": "du / anprobieren / die Jacke",
    "answer": "Probier bitte die Jacke an.",
    "options": [
      "Probier bitte die Jacke an.",
      "Anprobier bitte die Jacke.",
      "Probiert bitte die Jacke an.",
      "Probierst bitte die Jacke an."
    ],
    "explanationFa": "امر مفرد anprobieren با Probier آغاز می‌شود و an در پایان می‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۳ و۵۵–۵۷ · A3 / B5 / C3–4",
    "promptFa": "جملهٔ امری درست را برای مخاطب مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با sollen و wollen",
    "sentenceDe": "___ ich dir beim Waschen helfen? (sollen)",
    "answer": "Soll",
    "options": [
      "Soll",
      "Sollst",
      "Sollen",
      "Sollt"
    ],
    "explanationFa": "Soll ich …? برای پیشنهاد کمک خودمان است؛ sollen برای ich به Soll صرف می‌شود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۷ و۵۹ · C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با sollen و wollen",
    "sentenceDe": "___ wir heute zusammen kochen? (sollen)",
    "answer": "Sollen",
    "options": [
      "Sollen",
      "Soll",
      "Sollst",
      "Sollt"
    ],
    "explanationFa": "Sollen wir …? یک پیشنهاد مشترک است؛ برای wir از Sollen استفاده می‌کنیم.",
    "locator": "درس6 · کتاب درسی · چاپی۵۷ و۵۹ · C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با sollen و wollen",
    "sentenceDe": "___ wir einen Tee trinken? (wollen)",
    "answer": "Wollen",
    "options": [
      "Wollen",
      "Will",
      "Willst",
      "Wollt"
    ],
    "explanationFa": "Wollen wir …? برای پیشنهاد کار مشترک به کار می‌رود.",
    "locator": "درس6 · کتاب درسی · چاپی۵۷ و۵۹ · C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  },
  {
    "topicFa": "پیشنهاد با sollen و wollen",
    "sentenceDe": "wir / wollen / heute / zusammen essen → Vorschlag als Frage",
    "answer": "Wollen wir heute zusammen essen?",
    "options": [
      "Wollen wir heute zusammen essen?",
      "Will wir heute zusammen essen?",
      "Wollen wir heute zusammen isst?",
      "Wollt wir heute zusammen essen?"
    ],
    "explanationFa": "در این پیشنهاد پرسشی، Wollen ابتدا، wir پس از آن و مصدر essen در پایان می‌آید.",
    "locator": "درس6 · کتاب درسی · چاپی۵۷ و۵۹ · C4",
    "promptFa": "صورت درست را برای مخاطب و فعل مشخص‌شده انتخاب کن."
  }
]
export const grammarSixQuestions: GrammarQuestion[] = rows.map((row, index) => ({
 ...row, questionId: `a1-g06-${String(index + 1).padStart(3, '0')}`,
 lessonId: 'a1-lesson-06', origin: 'authored',
}))
