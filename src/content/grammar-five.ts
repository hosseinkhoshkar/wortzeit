import type { GrammarQuestion } from './grammar-one.ts'

// Authored exercises. IDs are append-only; do not reorder existing rows.
export const grammarFiveSource = {
 title: 'DaF kompakt A1–B1، درس5: Endlich ein Zimmer!',
 url: 'https://www.klett.gr/media/wysiwyg/A08103-67618002_DaFkompakt_LoesKB_EB.pdf',
 noteFa: '۵۰ سؤال تألیفی؛ تطبیق مباحث با پاسخ‌نامهٔ رسمی Kursbuch، درس۵، A4 و A6–7 (صفحهٔ۳ PDF)، B2 و C3 (صفحهٔ۴ PDF). ارجاع سؤال‌ها مربوط به همین پاسخ‌نامه است؛ متن سؤال نقل‌قول کتاب نیست.',
}
const rows: Omit<GrammarQuestion, 'questionId' | 'lessonId' | 'origin'>[] = [
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Ich rufe Anna heute ___. (anrufen)",
    "answer": "an",
    "options": [
      "an",
      "auf",
      "mit",
      "ein"
    ],
    "explanationFa": "در anrufen، بخش صرف‌شدهٔ rufe در جمله می‌آید و پیشوند an در پایان است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Ich schaue das Zimmer morgen ___. (anschauen)",
    "answer": "an",
    "options": [
      "an",
      "mit",
      "weg",
      "zurück"
    ],
    "explanationFa": "فعل هدف anschauen است؛ پیشوند an از schaue جدا می‌شود و در پایان می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Du schaust im Internet ___. (nachschauen)",
    "answer": "nach",
    "options": [
      "nach",
      "mit",
      "ein",
      "weg"
    ],
    "explanationFa": "پیشوند nach در nachschauen جدا می‌شود و در پایان جمله قرار می‌گیرد.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Vera fährt am Freitag ___. (wegfahren)",
    "answer": "weg",
    "options": [
      "weg",
      "mit",
      "ein",
      "auf"
    ],
    "explanationFa": "در wegfahren، fährt بخش صرف‌شده و weg پیشوند پایانی است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Wir mailen heute ___. (zurückmailen)",
    "answer": "zurück",
    "options": [
      "zurück",
      "an",
      "ein",
      "auf"
    ],
    "explanationFa": "پیشوند zurück از mailen جدا می‌شود و در پایان جمله می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Du holst mich um sechs ___. (abholen)",
    "answer": "ab",
    "options": [
      "ab",
      "ein",
      "an",
      "zu"
    ],
    "explanationFa": "فعل هدف abholen است؛ بخش ab در پایان جمله می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Anna bringt Möbel ___. (mitbringen)",
    "answer": "mit",
    "options": [
      "mit",
      "ein",
      "auf",
      "zu"
    ],
    "explanationFa": "در mitbringen، پیشوند mit در پایان جمله از bringt جداست.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "فعل جداشدنی در حال",
    "sentenceDe": "Ihr macht das Fenster ___. (aufmachen)",
    "answer": "auf",
    "options": [
      "auf",
      "mit",
      "an",
      "ein"
    ],
    "explanationFa": "برای فعل هدف aufmachen، پیشوند auf در پایان جمله می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4 / A7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "مصدر جداشدنی با فعل کمکی",
    "sentenceDe": "Ich möchte dich morgen ___. (anrufen)",
    "answer": "anrufen",
    "options": [
      "anrufen",
      "rufe an",
      "anruft",
      "angerufen"
    ],
    "explanationFa": "بعد از möchte، مصدر کامل و یکپارچهٔ anrufen در پایان می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A6–7",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "مصدر جداشدنی با فعل کمکی",
    "sentenceDe": "Wir müssen Möbel ___. (mitbringen)",
    "answer": "mitbringen",
    "options": [
      "mitbringen",
      "bringen mit",
      "mitbringt",
      "mitgebracht"
    ],
    "explanationFa": "با فعل کمکی müssen، مصدر mitbringen جدا نمی‌شود.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A6–7",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "مصدر جداشدنی با فعل کمکی",
    "sentenceDe": "Du kannst mich morgen ___. (abholen)",
    "answer": "abholen",
    "options": [
      "abholen",
      "holst ab",
      "abholt",
      "abgeholt"
    ],
    "explanationFa": "بعد از kannst از مصدر کامل abholen استفاده می‌کنیم.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A6–7",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "مصدر جداشدنی با فعل کمکی",
    "sentenceDe": "Anna will am Freitag ___. (wegfahren)",
    "answer": "wegfahren",
    "options": [
      "wegfahren",
      "fährt weg",
      "wegfährt",
      "weggefahren"
    ],
    "explanationFa": "پس از will، مصدر wegfahren در پایان یکپارچه می‌ماند.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A6–7",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "مصدر جداشدنی با فعل کمکی",
    "sentenceDe": "Ihr müsst heute ___. (zurückmailen)",
    "answer": "zurückmailen",
    "options": [
      "zurückmailen",
      "mailt zurück",
      "zurückmailt",
      "zurückgemailt"
    ],
    "explanationFa": "با müsst، مصدر کامل zurückmailen در پایان جمله قرار می‌گیرد.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A6–7",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "مصدر جداشدنی با فعل کمکی",
    "sentenceDe": "Wir möchten das Zimmer morgen ___. (anschauen)",
    "answer": "anschauen",
    "options": [
      "anschauen",
      "schauen an",
      "anschaut",
      "angeschaut"
    ],
    "explanationFa": "پس از möchten، مصدر کامل anschauen بدون جداشدن پیشوند می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A6–7",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Ich habe mit Anna ___. (reden)",
    "answer": "geredet",
    "options": [
      "geredet",
      "gereden",
      "geredt",
      "reden"
    ],
    "explanationFa": "Partizip II فعل reden برابر geredet است؛ به‌دلیل پایان d در ریشه، et می‌گیرد.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Der Besuch hat lange ___. (dauern)",
    "answer": "gedauert",
    "options": [
      "gedauert",
      "gedauern",
      "gedaueret",
      "dauern"
    ],
    "explanationFa": "فعل باقاعدهٔ dauern در Partizip II به gedauert تبدیل می‌شود.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Anna hat mich ___. (informieren)",
    "answer": "informiert",
    "options": [
      "informiert",
      "geinformiert",
      "informieren",
      "geinformieren"
    ],
    "explanationFa": "فعل‌های پایان‌یافته به ieren پیشوند ge نمی‌گیرند: informiert.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Wir sind nach Bonn ___. (fahren)",
    "answer": "gefahren",
    "options": [
      "gefahren",
      "gefahrt",
      "gefährt",
      "fahren"
    ],
    "explanationFa": "Partizip II فعل بی‌قاعدهٔ fahren برابر gefahren است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Ich habe einen Freund ___. (treffen)",
    "answer": "getroffen",
    "options": [
      "getroffen",
      "getrefft",
      "getreffen",
      "treffen"
    ],
    "explanationFa": "Partizip II فعل treffen با تغییر واکه به getroffen تبدیل می‌شود.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Anna ist in Bonn ___. (bleiben)",
    "answer": "geblieben",
    "options": [
      "geblieben",
      "gebleibt",
      "gebleiben",
      "bleiben"
    ],
    "explanationFa": "صورت Partizip II فعل bleiben برابر geblieben است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Wir haben zusammen ___. (essen)",
    "answer": "gegessen",
    "options": [
      "gegessen",
      "geesst",
      "geessen",
      "essen"
    ],
    "explanationFa": "Partizip II فعل essen برابر gegessen است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Ich bin gestern zu Hause ___. (sein)",
    "answer": "gewesen",
    "options": [
      "gewesen",
      "gesein",
      "geseit",
      "sein"
    ],
    "explanationFa": "Partizip II فعل sein برابر gewesen است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Ich habe vor dem Haus ___. (stehen)",
    "answer": "gestanden",
    "options": [
      "gestanden",
      "gesteht",
      "gestehen",
      "stehen"
    ],
    "explanationFa": "Partizip II فعل stehen برابر gestanden است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Du hast die Anzeige ___. (lesen)",
    "answer": "gelesen",
    "options": [
      "gelesen",
      "geliest",
      "gelest",
      "lesen"
    ],
    "explanationFa": "صورت Partizip II فعل lesen برابر gelesen است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Wir haben die Wohnung ___. (sehen)",
    "answer": "gesehen",
    "options": [
      "gesehen",
      "geseht",
      "gesieht",
      "sehen"
    ],
    "explanationFa": "Partizip II فعل sehen برابر gesehen است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Anna hat ein Zimmer ___. (finden)",
    "answer": "gefunden",
    "options": [
      "gefunden",
      "gefindet",
      "gefinden",
      "finden"
    ],
    "explanationFa": "Partizip II فعل finden برابر gefunden است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Ich habe an die Wohnung ___. (denken)",
    "answer": "gedacht",
    "options": [
      "gedacht",
      "gedenkt",
      "gedenken",
      "denken"
    ],
    "explanationFa": "denken از فعل‌های مختلط است؛ Partizip II آن gedacht است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Ich habe die Antwort ___. (wissen)",
    "answer": "gewusst",
    "options": [
      "gewusst",
      "geweißt",
      "gewissen",
      "wissen"
    ],
    "explanationFa": "Partizip II فعل مختلط wissen برابر gewusst است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Anna hat den Termin ___. (vergessen)",
    "answer": "vergessen",
    "options": [
      "vergessen",
      "gevergessen",
      "vergesst",
      "vergegessen"
    ],
    "explanationFa": "Partizip II فعل vergessen همان vergessen است؛ پیشوند جدانشدنی ver پیش از خود ge نمی‌گیرد.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت Partizip II",
    "sentenceDe": "Wir haben das Wochenende in Bonn ___. (verbringen)",
    "answer": "verbracht",
    "options": [
      "verbracht",
      "geverbringt",
      "geverbringen",
      "verbringt"
    ],
    "explanationFa": "Partizip II فعل verbringen برابر verbracht است و پیشوند ge نمی‌گیرد.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Ich ___ gestern nach Bonn gefahren. (Perfekt)",
    "answer": "bin",
    "options": [
      "bin",
      "habe",
      "bist",
      "seid"
    ],
    "explanationFa": "fahren در معنای رفتن به مقصد با sein می‌آید؛ برای ich از bin استفاده می‌شود.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Wir ___ gestern zu Hause geblieben. (Perfekt)",
    "answer": "sind",
    "options": [
      "sind",
      "haben",
      "bin",
      "seid"
    ],
    "explanationFa": "Perfekt فعل bleiben با sein است؛ برای wir از sind استفاده می‌کنیم.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Anna ___ gestern in Berlin gewesen. (Perfekt)",
    "answer": "ist",
    "options": [
      "ist",
      "hat",
      "bin",
      "seid"
    ],
    "explanationFa": "Perfekt فعل sein با خود sein ساخته می‌شود؛ برای Anna از ist استفاده می‌کنیم.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Ihr ___ gestern nach Hause gefahren. (Perfekt)",
    "answer": "seid",
    "options": [
      "seid",
      "habt",
      "sind",
      "bin"
    ],
    "explanationFa": "برای ihr صورت sein برابر seid است؛ gefahren در این معنای حرکتی با sein می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Ich ___ die Anzeige gelesen. (Perfekt)",
    "answer": "habe",
    "options": [
      "habe",
      "bin",
      "hast",
      "seid"
    ],
    "explanationFa": "Perfekt فعل lesen با haben ساخته می‌شود؛ برای ich از habe استفاده می‌کنیم.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Du ___ heute im Café gegessen. (Perfekt)",
    "answer": "hast",
    "options": [
      "hast",
      "bist",
      "hat",
      "seid"
    ],
    "explanationFa": "Perfekt فعل essen با haben است؛ برای du از hast استفاده می‌شود.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Wir ___ Anna gestern getroffen. (Perfekt)",
    "answer": "haben",
    "options": [
      "haben",
      "sind",
      "habt",
      "bin"
    ],
    "explanationFa": "treffen با haben می‌آید؛ برای wir صورت haben درست است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "انتخاب haben یا sein",
    "sentenceDe": "Anna ___ an das Zimmer gedacht. (Perfekt)",
    "answer": "hat",
    "options": [
      "hat",
      "ist",
      "haben",
      "bin"
    ],
    "explanationFa": "Perfekt فعل denken با haben ساخته می‌شود؛ برای Anna از hat استفاده می‌کنیم.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Ich habe Anna gestern ___. (anrufen)",
    "answer": "angerufen",
    "options": [
      "angerufen",
      "geanrufen",
      "angeruft",
      "anrufen"
    ],
    "explanationFa": "در Partizip II فعل جداشدنی anrufen، ge میان پیشوند و ریشه می‌آید: angerufen.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Wir haben Möbel ___. (mitbringen)",
    "answer": "mitgebracht",
    "options": [
      "mitgebracht",
      "gemitbringen",
      "mitgebringt",
      "mitbringen"
    ],
    "explanationFa": "Partizip II فعل mitbringen برابر mitgebracht است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Anna hat mich am Bahnhof ___. (abholen)",
    "answer": "abgeholt",
    "options": [
      "abgeholt",
      "geabholt",
      "abgeholen",
      "abholen"
    ],
    "explanationFa": "در abholen، ge پس از پیشوند ab می‌آید: abgeholt.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Du hast das Fenster ___. (aufmachen)",
    "answer": "aufgemacht",
    "options": [
      "aufgemacht",
      "geaufmacht",
      "aufgemachen",
      "aufmachen"
    ],
    "explanationFa": "Partizip II فعل aufmachen برابر aufgemacht است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Der Vermieter hat mich ___. (zurückrufen)",
    "answer": "zurückgerufen",
    "options": [
      "zurückgerufen",
      "gezurückrufen",
      "zurückgeruft",
      "zurückrufen"
    ],
    "explanationFa": "در zurückrufen، صورت Partizip II برابر zurückgerufen است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Die Heizung ist gestern ___. (ausgehen)",
    "answer": "ausgegangen",
    "options": [
      "ausgegangen",
      "geausgehen",
      "ausgegeht",
      "ausgehen"
    ],
    "explanationFa": "Partizip II فعل ausgehen برابر ausgegangen است؛ در این معنا با sein می‌آید.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Wir haben gestern ___. (zurückmailen)",
    "answer": "zurückgemailt",
    "options": [
      "zurückgemailt",
      "gezurückmailt",
      "zurückgemailen",
      "zurückmailen"
    ],
    "explanationFa": "در zurückmailen، ge میان پیشوند و mailt قرار می‌گیرد: zurückgemailt.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "پرفکت فعل‌های پیشونددار",
    "sentenceDe": "Ich habe das Zimmer gestern ___. (anschauen)",
    "answer": "angeschaut",
    "options": [
      "angeschaut",
      "geanschaut",
      "angeschauen",
      "anschauen"
    ],
    "explanationFa": "Partizip II فعل anschauen برابر angeschaut است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · A4–7 / C3",
    "promptFa": "گزینهٔ درست را برای جای خالی انتخاب کن."
  },
  {
    "topicFa": "ساخت جمله در پرفکت",
    "sentenceDe": "Ich / gestern / das Zimmer / sehen → Perfekt",
    "answer": "Ich habe gestern das Zimmer gesehen.",
    "options": [
      "Ich habe gestern das Zimmer gesehen.",
      "Ich bin gestern das Zimmer gesehen.",
      "Ich habe gestern das Zimmer geseht.",
      "Ich hat gestern das Zimmer gesehen."
    ],
    "explanationFa": "در Perfekt، فعل کمکی habe در جایگاه دوم و Partizip II یعنی gesehen در پایان قرار دارد.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "جملهٔ درست را با قالب پرفکت انتخاب کن."
  },
  {
    "topicFa": "ساخت جمله در پرفکت",
    "sentenceDe": "Anna / in Berlin / bleiben → Perfekt",
    "answer": "Anna ist in Berlin geblieben.",
    "options": [
      "Anna ist in Berlin geblieben.",
      "Anna hat in Berlin geblieben.",
      "Anna ist in Berlin gebleibt.",
      "Anna sind in Berlin geblieben."
    ],
    "explanationFa": "bleiben با sein می‌آید؛ برای Anna از ist استفاده می‌کنیم و geblieben در پایان است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · B2",
    "promptFa": "جملهٔ درست را با قالب پرفکت انتخاب کن."
  },
  {
    "topicFa": "ساخت جمله در پرفکت",
    "sentenceDe": "Wir / das Fenster / aufmachen → Perfekt",
    "answer": "Wir haben das Fenster aufgemacht.",
    "options": [
      "Wir haben das Fenster aufgemacht.",
      "Wir sind das Fenster aufgemacht.",
      "Wir haben das Fenster geaufmacht.",
      "Wir hat das Fenster aufgemacht."
    ],
    "explanationFa": "با wir فعل کمکی haben می‌آید و aufgemacht در پایان، یکپارچه نوشته می‌شود.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "جملهٔ درست را با قالب پرفکت انتخاب کن."
  },
  {
    "topicFa": "ساخت جمله در پرفکت",
    "sentenceDe": "Du / mich / anrufen → Perfekt",
    "answer": "Du hast mich angerufen.",
    "options": [
      "Du hast mich angerufen.",
      "Du hat mich angerufen.",
      "Du bist mich angerufen.",
      "Du hast mich angeruft."
    ],
    "explanationFa": "با du از hast استفاده می‌شود؛ Partizip II فعل anrufen برابر angerufen است.",
    "locator": "درس5 · پاسخ‌نامهٔ کتاب درسی · C3",
    "promptFa": "جملهٔ درست را با قالب پرفکت انتخاب کن."
  }
]
export const grammarFiveQuestions: GrammarQuestion[] = rows.map((row, index) => ({
 ...row, questionId: `a1-g05-${String(index + 1).padStart(3, '0')}`,
 lessonId: 'a1-lesson-05', origin: 'authored',
}))
