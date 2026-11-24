import type { GrammarQuestion } from './grammar-one.ts'

// Authored content. Question identities and row order are append-only.
export const grammarSevenSource = {
 title: 'DaF kompakt A1–B1، درس۷: Grüezi in der Schweiz',
 url: 'https://www.klett-international.com/de/downloads/5731/loesungen-zum-kursbuch/pdf',
 noteFa: '۵۰ سؤال تألیفی با مرور آموزشی؛ دامنه با پاسخ‌نامهٔ رسمی درس۷، PDF4–5 و واژه‌نامهٔ صفحه‌به‌صفحهٔ ناشر، Kb.S.60–65 / Ab.S.61 مقابله شده است. متن سؤال، توضیح و مثال نقل‌قول کتاب نیست.',
}

export const grammarSevenQuestions: GrammarQuestion[] = [
  {
    "questionId": "a1-g07-001",
    "lessonId": "a1-lesson-07",
    "topicFa": "حرف اضافهٔ mit و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Wir fahren mit ___ Bus zum Bahnhof. (der Bus)",
    "answer": "dem",
    "options": [
      "dem",
      "den",
      "der",
      "das"
    ],
    "explanationFa": "mit همیشه داتیو می‌گیرد؛ der Bus در داتیو به dem Bus تبدیل می‌شود.",
    "review": {
      "ruleFa": "mit در بیان وسیله همیشه داتیو می‌گیرد: der/das → dem، die مؤنث → der و die جمع → den. برای آرتیکل نامعین، مذکر/خنثی einem و مؤنث einer است. در داتیو جمع اغلب n هم به اسم افزوده می‌شود.",
      "pitfallFa": "den آرتیکل آکوزاتیو مذکر است؛ حرکت‌کردن باعث نمی‌شود mit آکوزاتیو بگیرد.",
      "exampleDe": "Wir fahren mit dem Zug nach Bern.",
      "exampleFa": "با قطار به برن می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۰ · A3؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-002",
    "lessonId": "a1-lesson-07",
    "topicFa": "حرف اضافهٔ mit و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Melanie fährt mit ___ Straßenbahn. (die Straßenbahn)",
    "answer": "der",
    "options": [
      "der",
      "die",
      "dem",
      "den"
    ],
    "explanationFa": "اسم مؤنث بعد از mit در داتیو آرتیکل der می‌گیرد.",
    "review": {
      "ruleFa": "mit در بیان وسیله همیشه داتیو می‌گیرد: der/das → dem، die مؤنث → der و die جمع → den. برای آرتیکل نامعین، مذکر/خنثی einem و مؤنث einer است. در داتیو جمع اغلب n هم به اسم افزوده می‌شود.",
      "pitfallFa": "dem برای مذکر و خنثی است؛ die صورت مؤنث در نومیناتیو یا آکوزاتیو است.",
      "exampleDe": "Ich fahre mit der Bahn zur Arbeit.",
      "exampleFa": "با قطار به محل کار می‌روم."
    },
    "locator": "کتاب درسی چاپی۶۰ · A3؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-003",
    "lessonId": "a1-lesson-07",
    "topicFa": "حرف اضافهٔ mit و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Wir fahren mit ___ Auto. (das Auto)",
    "answer": "dem",
    "options": [
      "dem",
      "das",
      "den",
      "der"
    ],
    "explanationFa": "Auto خنثی است و بعد از mit به dem Auto نیاز دارد.",
    "review": {
      "ruleFa": "mit در بیان وسیله همیشه داتیو می‌گیرد: der/das → dem، die مؤنث → der و die جمع → den. برای آرتیکل نامعین، مذکر/خنثی einem و مؤنث einer است. در داتیو جمع اغلب n هم به اسم افزوده می‌شود.",
      "pitfallFa": "das صورت پایهٔ خنثی است؛ mit صورت داتیو dem را لازم دارد.",
      "exampleDe": "Fahrt ihr mit dem Fahrrad zum Park?",
      "exampleFa": "با دوچرخه به پارک می‌روید؟"
    },
    "locator": "کتاب درسی چاپی۶۰ · A3؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-004",
    "lessonId": "a1-lesson-07",
    "topicFa": "حرف اضافهٔ mit و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Sie fährt mit ___ Bus nach Hause. (ein Bus)",
    "answer": "einem",
    "options": [
      "einem",
      "einen",
      "ein",
      "einer"
    ],
    "explanationFa": "آرتیکل نامعین مذکر در داتیو einem است.",
    "review": {
      "ruleFa": "mit در بیان وسیله همیشه داتیو می‌گیرد: der/das → dem، die مؤنث → der و die جمع → den. برای آرتیکل نامعین، مذکر/خنثی einem و مؤنث einer است. در داتیو جمع اغلب n هم به اسم افزوده می‌شود.",
      "pitfallFa": "einen مربوط به آکوزاتیو مذکر و einer مربوط به داتیو مؤنث است.",
      "exampleDe": "Wir fahren mit einem Zug nach Zürich.",
      "exampleFa": "با یک قطار به زوریخ می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۰ · A3؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-005",
    "lessonId": "a1-lesson-07",
    "topicFa": "مقصد با zu و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Ich gehe zu ___ Bahnhof. (der Bahnhof)",
    "answer": "dem",
    "options": [
      "dem",
      "den",
      "der",
      "das"
    ],
    "explanationFa": "zu برای مقصد هم داتیو می‌گیرد: zu dem Bahnhof.",
    "review": {
      "ruleFa": "zu مقصد را نشان می‌دهد و همیشه داتیو می‌گیرد؛ حتی اگر فعل حرکت باشد. zu dem معمولاً zum و zu der معمولاً zur می‌شود. حالت دستوری را فقط از حرکت یا سکون حدس نزن.",
      "pitfallFa": "zu dem را معمولاً zum کوتاه می‌کنیم؛ در جای خالی فقط آرتیکل لازم است.",
      "exampleDe": "Wir gehen zu dem neuen Park.",
      "exampleFa": "به آن پارک جدید می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ · A3–4؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-006",
    "lessonId": "a1-lesson-07",
    "topicFa": "مقصد با zu و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Wir gehen zu ___ Kirche. (die Kirche)",
    "answer": "der",
    "options": [
      "der",
      "die",
      "dem",
      "den"
    ],
    "explanationFa": "با zu، آرتیکل مؤنث در داتیو der است.",
    "review": {
      "ruleFa": "zu مقصد را نشان می‌دهد و همیشه داتیو می‌گیرد؛ حتی اگر فعل حرکت باشد. zu dem معمولاً zum و zu der معمولاً zur می‌شود. حالت دستوری را فقط از حرکت یا سکون حدس نزن.",
      "pitfallFa": "عبارت zu der می‌تواند zur شود؛ zu die برای این مقصد نادرست است.",
      "exampleDe": "Sie geht zu der alten Kirche.",
      "exampleFa": "او به آن کلیسای قدیمی می‌رود."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ · A3–4؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-007",
    "lessonId": "a1-lesson-07",
    "topicFa": "مبدأ با von و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Der Bus kommt von ___ Bahnhof. (der Bahnhof)",
    "answer": "dem",
    "options": [
      "dem",
      "den",
      "der",
      "das"
    ],
    "explanationFa": "von مبدأ را نشان می‌دهد و همیشه داتیو می‌گیرد.",
    "review": {
      "ruleFa": "von برای بیان مبدأ داتیو می‌گیرد: von dem Bahnhof، von der Kirche. صورت von dem اغلب به vom کوتاه می‌شود؛ برای مقصد در این مبحث از zu استفاده می‌کنیم.",
      "pitfallFa": "von dem اغلب vom می‌شود؛ den صورت آکوزاتیو است.",
      "exampleDe": "Wir kommen von dem Museum.",
      "exampleFa": "از آن موزه می‌آییم."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ · A3–4؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-008",
    "lessonId": "a1-lesson-07",
    "topicFa": "مبدأ با von و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Melanie kommt von ___ Grillparty. (die Grillparty)",
    "answer": "der",
    "options": [
      "der",
      "die",
      "dem",
      "den"
    ],
    "explanationFa": "اسم مؤنث بعد از von در داتیو با der می‌آید.",
    "review": {
      "ruleFa": "von برای بیان مبدأ داتیو می‌گیرد: von dem Bahnhof، von der Kirche. صورت von dem اغلب به vom کوتاه می‌شود؛ برای مقصد در این مبحث از zu استفاده می‌کنیم.",
      "pitfallFa": "von der مؤنث است؛ آن را به vom که کوتاه‌شدهٔ von dem است تبدیل نکن.",
      "exampleDe": "Paul kommt von der Arbeit.",
      "exampleFa": "پاول از محل کار می‌آید."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ · A3–4؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-009",
    "lessonId": "a1-lesson-07",
    "topicFa": "صورت‌های کوتاه zum، zur و vom",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "zu + dem Bahnhof = ___ Bahnhof",
    "answer": "zum",
    "options": [
      "zum",
      "zur",
      "vom",
      "im"
    ],
    "explanationFa": "zu dem به zum کوتاه می‌شود و مقصد را نشان می‌دهد.",
    "review": {
      "ruleFa": "سه صورت را جدا یاد بگیر: zu dem → zum، zu der → zur، von dem → vom. zu مقصد و von مبدأ را بیان می‌کند و هر دو داتیو می‌گیرند؛ جنس و شمار اسم تعیین‌کنندهٔ آرتیکل است.",
      "pitfallFa": "vom کوتاه‌شدهٔ von dem است و معنای مبدأ می‌دهد؛ zur از zu der می‌آید.",
      "exampleDe": "Gehen Sie bitte zum Museum!",
      "exampleFa": "لطفاً به موزه بروید!"
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ · A3–4؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-010",
    "lessonId": "a1-lesson-07",
    "topicFa": "صورت‌های کوتاه zum، zur و vom",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "zu + der Zytglogge = ___ Zytglogge",
    "answer": "zur",
    "options": [
      "zur",
      "zum",
      "vom",
      "ins"
    ],
    "explanationFa": "zu der به zur تبدیل می‌شود؛ Zytglogge در این درس مؤنث است.",
    "review": {
      "ruleFa": "سه صورت را جدا یاد بگیر: zu dem → zum، zu der → zur، von dem → vom. zu مقصد و von مبدأ را بیان می‌کند و هر دو داتیو می‌گیرند؛ جنس و شمار اسم تعیین‌کنندهٔ آرتیکل است.",
      "pitfallFa": "zum از zu dem ساخته می‌شود؛ برای مؤنثِ این عبارت، zur لازم است.",
      "exampleDe": "Wir gehen zur Touristeninformation.",
      "exampleFa": "به دفتر اطلاعات گردشگری می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ · A3–4؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-011",
    "lessonId": "a1-lesson-07",
    "topicFa": "صورت‌های کوتاه zum، zur و vom",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "von + dem Bahnhof = ___ Bahnhof",
    "answer": "vom",
    "options": [
      "vom",
      "zum",
      "zur",
      "ins"
    ],
    "explanationFa": "von dem به vom کوتاه می‌شود؛ یعنی از ایستگاه.",
    "review": {
      "ruleFa": "سه صورت را جدا یاد بگیر: zu dem → zum، zu der → zur، von dem → vom. zu مقصد و von مبدأ را بیان می‌کند و هر دو داتیو می‌گیرند؛ جنس و شمار اسم تعیین‌کنندهٔ آرتیکل است.",
      "pitfallFa": "zum مقصد و vom مبدأ را بیان می‌کند؛ این دو قابل جایگزینی در بازنویسی خواسته‌شده نیستند.",
      "exampleDe": "Der Weg vom Bahnhof ist kurz.",
      "exampleFa": "راهِ ایستگاه تا اینجا کوتاه است."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ · A3–4؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-012",
    "lessonId": "a1-lesson-07",
    "topicFa": "حرف اضافهٔ mit و داتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Wir fahren mit ___ Bussen. (Plural)",
    "answer": "den",
    "options": [
      "den",
      "dem",
      "der",
      "die"
    ],
    "explanationFa": "در داتیو جمع از den استفاده می‌کنیم؛ Busse نیز به Bussen تبدیل شده است.",
    "review": {
      "ruleFa": "mit در بیان وسیله همیشه داتیو می‌گیرد: der/das → dem، die مؤنث → der و die جمع → den. برای آرتیکل نامعین، مذکر/خنثی einem و مؤنث einer است. در داتیو جمع اغلب n هم به اسم افزوده می‌شود.",
      "pitfallFa": "در داتیو جمع غالباً n به اسم افزوده می‌شود؛ جمع‌های پایان‌یافته به n یا s، n اضافی نمی‌گیرند.",
      "exampleDe": "Die Touristen kommen mit den Zügen.",
      "exampleFa": "گردشگران با قطارها می‌آیند."
    },
    "locator": "کتاب درسی چاپی۶۰ · A3؛ پاسخ‌نامهٔ رسمی PDF4",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-013",
    "lessonId": "a1-lesson-07",
    "topicFa": "مسیر با durch و آکوزاتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Gehen Sie durch ___ Park! (der Park)",
    "answer": "den",
    "options": [
      "den",
      "dem",
      "der",
      "des"
    ],
    "explanationFa": "durch آکوزاتیو می‌گیرد؛ der Park به den Park تبدیل می‌شود.",
    "review": {
      "ruleFa": "durch عبور از داخل یک محدوده را نشان می‌دهد و همیشه آکوزاتیو می‌گیرد. در آرتیکل معین، مذکر der → den است؛ خنثی das و مؤنث die در آکوزاتیو تغییر نمی‌کنند.",
      "pitfallFa": "dem داتیو است؛ بعد از durch حتی در بیان مسیر هم den لازم است.",
      "exampleDe": "Wir gehen durch den Garten.",
      "exampleFa": "از میان باغ می‌گذریم."
    },
    "locator": "کتاب درسی چاپی۶۴ · C1–2؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-014",
    "lessonId": "a1-lesson-07",
    "topicFa": "مسیر با durch و آکوزاتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Wir gehen durch ___ Einkaufszentrum. (das Einkaufszentrum)",
    "answer": "das",
    "options": [
      "das",
      "dem",
      "den",
      "der"
    ],
    "explanationFa": "در آکوزاتیو، آرتیکل خنثی das تغییر نمی‌کند.",
    "review": {
      "ruleFa": "durch عبور از داخل یک محدوده را نشان می‌دهد و همیشه آکوزاتیو می‌گیرد. در آرتیکل معین، مذکر der → den است؛ خنثی das و مؤنث die در آکوزاتیو تغییر نمی‌کنند.",
      "pitfallFa": "durch آکوزاتیو می‌گیرد، اما آکوزاتیو همهٔ اسم‌ها den نیست؛ den مربوط به مذکر است.",
      "exampleDe": "Sie geht durch das Tor.",
      "exampleFa": "او از دروازه عبور می‌کند."
    },
    "locator": "کتاب درسی چاپی۶۴ · C1–2؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-015",
    "lessonId": "a1-lesson-07",
    "topicFa": "مسیر با durch و آکوزاتیو",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Der Weg führt durch ___ Stadt. (die Stadt)",
    "answer": "die",
    "options": [
      "die",
      "der",
      "dem",
      "den"
    ],
    "explanationFa": "آرتیکل مؤنث در آکوزاتیو die باقی می‌ماند.",
    "review": {
      "ruleFa": "durch عبور از داخل یک محدوده را نشان می‌دهد و همیشه آکوزاتیو می‌گیرد. در آرتیکل معین، مذکر der → den است؛ خنثی das و مؤنث die در آکوزاتیو تغییر نمی‌کنند.",
      "pitfallFa": "der Stadt داتیو یا گنیتیو است؛ حرف اضافهٔ durch در این جمله die می‌خواهد.",
      "exampleDe": "Wir fahren durch die Altstadt.",
      "exampleFa": "از میان بخش قدیمی شهر می‌گذریم."
    },
    "locator": "کتاب درسی چاپی۶۴ · C1–2؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-016",
    "lessonId": "a1-lesson-07",
    "topicFa": "مسیر با um ... herum",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Gehen Sie um ___ Ecke! (die Ecke)",
    "answer": "die",
    "options": [
      "die",
      "der",
      "dem",
      "den"
    ],
    "explanationFa": "um در بیان مسیر آکوزاتیو می‌گیرد و Ecke مؤنث است.",
    "review": {
      "ruleFa": "um در بیان مسیر آکوزاتیو می‌گیرد؛ um die Ecke یعنی سرِ پیچ/دورِ گوشه. ساخت um ... herum حرکت دور یک مکان را بیان می‌کند؛ عبور از داخل در این مبحث با durch بیان می‌شود.",
      "pitfallFa": "با um آرتیکل مؤنث die می‌ماند؛ der در اینجا مناسب نیست.",
      "exampleDe": "Der Bus fährt um die Ecke.",
      "exampleFa": "اتوبوس سر پیچ می‌پیچد."
    },
    "locator": "کتاب درسی چاپی۶۴ · C1–2؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-017",
    "lessonId": "a1-lesson-07",
    "topicFa": "مسیر با um ... herum",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Wir gehen um ___ Park herum. (der Park)",
    "answer": "den",
    "options": [
      "den",
      "dem",
      "der",
      "das"
    ],
    "explanationFa": "در ساخت um ... herum، اسم بعد از um آکوزاتیو است.",
    "review": {
      "ruleFa": "um در بیان مسیر آکوزاتیو می‌گیرد؛ um die Ecke یعنی سرِ پیچ/دورِ گوشه. ساخت um ... herum حرکت دور یک مکان را بیان می‌کند؛ عبور از داخل در این مبحث با durch بیان می‌شود.",
      "pitfallFa": "herum در پایانِ عبارت می‌آید؛ آرتیکل را خودِ um تعیین می‌کند.",
      "exampleDe": "Die Kinder laufen um den Platz herum.",
      "exampleFa": "بچه‌ها دور میدان می‌دوند."
    },
    "locator": "کتاب درسی چاپی۶۴ · C1–2؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-018",
    "lessonId": "a1-lesson-07",
    "topicFa": "مسیر با um ... herum",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Sie läuft um ___ Gebäude herum. (das Gebäude)",
    "answer": "das",
    "options": [
      "das",
      "dem",
      "den",
      "der"
    ],
    "explanationFa": "Gebäude خنثی است؛ در آکوزاتیو پس از um، das می‌ماند.",
    "review": {
      "ruleFa": "um در بیان مسیر آکوزاتیو می‌گیرد؛ um die Ecke یعنی سرِ پیچ/دورِ گوشه. ساخت um ... herum حرکت دور یک مکان را بیان می‌کند؛ عبور از داخل در این مبحث با durch بیان می‌شود.",
      "pitfallFa": "وجود حرکت به‌تنهایی معیار انتخاب حالت نیست؛ اینجا خودِ um آکوزاتیو می‌گیرد.",
      "exampleDe": "Wir gehen um das Haus herum.",
      "exampleFa": "دور خانه می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۴ · C1–2؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-019",
    "lessonId": "a1-lesson-07",
    "topicFa": "مرور عبارت‌های مسیر و رفت‌وآمد",
    "promptFa": "برای معنای «از ایستگاه تا موزه»، عبارت درست را انتخاب کن.",
    "sentenceDe": "von / der Bahnhof → bis zu / das Museum",
    "answer": "vom Bahnhof bis zum Museum",
    "options": [
      "vom Bahnhof bis zum Museum",
      "zum Bahnhof bis vom Museum",
      "vom Bahnhof bis zur Museum",
      "von Bahnhof bis zu den Museum"
    ],
    "explanationFa": "مبدأ با von و مقصد با bis zu بیان می‌شود؛ Bahnhof مذکر و Museum خنثی‌اند.",
    "review": {
      "ruleFa": "برای رفت‌وآمد، وسیله با mit + داتیو، پیاده با zu Fuß، مبدأ با von + داتیو و مقصد با zu + داتیو بیان می‌شود. durch + آکوزاتیو عبور از داخل و um ... herum دورزدن یک مکان را بیان می‌کند.",
      "pitfallFa": "vom = von dem، zum = zu dem و zur = zu der؛ جنس اسم را همراه صورت کوتاه‌شده بررسی کن.",
      "exampleDe": "Wir gehen vom Hotel bis zur Kirche.",
      "exampleFa": "از هتل تا کلیسا پیاده می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ و۶۴ · A3–4 / C1–2؛ پاسخ‌نامهٔ رسمی PDF4–5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-020",
    "lessonId": "a1-lesson-07",
    "topicFa": "مرور عبارت‌های مسیر و رفت‌وآمد",
    "promptFa": "برای بیان وسیلهٔ رفت‌وآمد، حرف اضافهٔ درست را انتخاب کن.",
    "sentenceDe": "Ich fahre ___ dem Bus.",
    "answer": "mit",
    "options": [
      "mit",
      "durch",
      "um",
      "zu"
    ],
    "explanationFa": "برای بیان وسیلهٔ رفت‌وآمد در این جمله از mit استفاده می‌کنیم.",
    "review": {
      "ruleFa": "برای رفت‌وآمد، وسیله با mit + داتیو، پیاده با zu Fuß، مبدأ با von + داتیو و مقصد با zu + داتیو بیان می‌شود. durch + آکوزاتیو عبور از داخل و um ... herum دورزدن یک مکان را بیان می‌کند.",
      "pitfallFa": "durch و um مسیر را مشخص می‌کنند؛ zu مقصد را نشان می‌دهد، نه وسیلهٔ این سفر را.",
      "exampleDe": "Sie fährt mit der Straßenbahn ins Zentrum.",
      "exampleFa": "او با تراموا به مرکز شهر می‌رود."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ و۶۴ · A3–4 / C1–2؛ پاسخ‌نامهٔ رسمی PDF4–5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-021",
    "lessonId": "a1-lesson-07",
    "topicFa": "مرور عبارت‌های مسیر و رفت‌وآمد",
    "promptFa": "برای معنای «پیاده» عبارت ثابت را کامل کن.",
    "sentenceDe": "Ich gehe ___ Fuß zum Museum.",
    "answer": "zu",
    "options": [
      "zu",
      "mit",
      "von",
      "durch"
    ],
    "explanationFa": "برای پیاده‌رفتن عبارت ثابت zu Fuß را به کار می‌بریم.",
    "review": {
      "ruleFa": "برای رفت‌وآمد، وسیله با mit + داتیو، پیاده با zu Fuß، مبدأ با von + داتیو و مقصد با zu + داتیو بیان می‌شود. durch + آکوزاتیو عبور از داخل و um ... herum دورزدن یک مکان را بیان می‌کند.",
      "pitfallFa": "zu Fuß را یک عبارت یاد بگیر؛ آن را با الگوی mit dem Bus نساز.",
      "exampleDe": "Heute gehen wir zu Fuß nach Hause.",
      "exampleFa": "امروز پیاده به خانه می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ و۶۴ · A3–4 / C1–2؛ پاسخ‌نامهٔ رسمی PDF4–5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-022",
    "lessonId": "a1-lesson-07",
    "topicFa": "مرور عبارت‌های مسیر و رفت‌وآمد",
    "promptFa": "صورت آرتیکل پس از durch را انتخاب کن.",
    "sentenceDe": "Wir gehen durch ___ Garten. (der Garten)",
    "answer": "den",
    "options": [
      "den",
      "dem",
      "der",
      "das"
    ],
    "explanationFa": "durch آکوزاتیو می‌گیرد؛ der Garten به den Garten تبدیل می‌شود.",
    "review": {
      "ruleFa": "برای رفت‌وآمد، وسیله با mit + داتیو، پیاده با zu Fuß، مبدأ با von + داتیو و مقصد با zu + داتیو بیان می‌شود. durch + آکوزاتیو عبور از داخل و um ... herum دورزدن یک مکان را بیان می‌کند.",
      "pitfallFa": "برای دورزدن یک مکان um ... herum و برای رفتن به سمت آن zu به کار می‌رود؛ این جمله عبور از داخل را می‌گوید.",
      "exampleDe": "Der Bus fährt durch die Stadt.",
      "exampleFa": "اتوبوس از میان شهر می‌گذرد."
    },
    "locator": "کتاب درسی چاپی۶۰–۶۱ و۶۴ · A3–4 / C1–2؛ پاسخ‌نامهٔ رسمی PDF4–5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-023",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین man",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "In Bern ___ man Deutsch. (sprechen)",
    "answer": "spricht",
    "options": [
      "spricht",
      "sprechen",
      "sprichst",
      "sprecht"
    ],
    "explanationFa": "man از نظر دستوری سوم‌شخص مفرد است؛ sprechen با آن spricht می‌شود.",
    "review": {
      "ruleFa": "man برای اشارهٔ عمومی به آدم‌ها به کار می‌رود، اما از نظر دستوری سوم‌شخص مفرد است: man ist، man hat، man kann. در این کاربرد فقط فاعل است؛ آن را با اسم Mann به معنی مرد اشتباه نگیر.",
      "pitfallFa": "معنای man ممکن است مردم باشد، اما فعل آن جمع صرف نمی‌شود.",
      "exampleDe": "Hier spricht man auch Französisch.",
      "exampleFa": "اینجا فرانسوی هم صحبت می‌کنند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Kb.S.۶۳ / Ab.S.۶۱",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-024",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین man",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Hier ___ man eine Fahrkarte kaufen. (können)",
    "answer": "kann",
    "options": [
      "kann",
      "können",
      "kannst",
      "könnt"
    ],
    "explanationFa": "با man از صورت سوم‌شخص مفرد kann استفاده می‌کنیم و kaufen مصدر می‌ماند.",
    "review": {
      "ruleFa": "man برای اشارهٔ عمومی به آدم‌ها به کار می‌رود، اما از نظر دستوری سوم‌شخص مفرد است: man ist، man hat، man kann. در این کاربرد فقط فاعل است؛ آن را با اسم Mann به معنی مرد اشتباه نگیر.",
      "pitfallFa": "können برای wir یا sie جمع است؛ man به صورت kann نیاز دارد.",
      "exampleDe": "Im Museum kann man viel lernen.",
      "exampleFa": "در موزه می‌شود چیزهای زیادی یاد گرفت."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Kb.S.۶۳ / Ab.S.۶۱",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-025",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین man",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Im Bus ___ man eine Fahrkarte haben. (müssen)",
    "answer": "muss",
    "options": [
      "muss",
      "müssen",
      "musst",
      "müsst"
    ],
    "explanationFa": "man با muss می‌آید؛ فعل اصلی haben در پایان به صورت مصدر است.",
    "review": {
      "ruleFa": "man برای اشارهٔ عمومی به آدم‌ها به کار می‌رود، اما از نظر دستوری سوم‌شخص مفرد است: man ist، man hat، man kann. در این کاربرد فقط فاعل است؛ آن را با اسم Mann به معنی مرد اشتباه نگیر.",
      "pitfallFa": "müssen با man هماهنگ نیست؛ باید فعل وجهی را برای سوم‌شخص مفرد صرف کرد.",
      "exampleDe": "Hier muss man leise sprechen.",
      "exampleFa": "اینجا باید آرام صحبت کرد."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Kb.S.۶۳ / Ab.S.۶۱",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-026",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین man",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Im Museum ___ man nicht rauchen. (dürfen)",
    "answer": "darf",
    "options": [
      "darf",
      "dürfen",
      "darfst",
      "dürft"
    ],
    "explanationFa": "با man، dürfen به darf صرف می‌شود؛ darf nicht یعنی مجاز نیست.",
    "review": {
      "ruleFa": "man برای اشارهٔ عمومی به آدم‌ها به کار می‌رود، اما از نظر دستوری سوم‌شخص مفرد است: man ist، man hat، man kann. در این کاربرد فقط فاعل است؛ آن را با اسم Mann به معنی مرد اشتباه نگیر.",
      "pitfallFa": "darf nicht ممنوعیت را بیان می‌کند؛ آن را با muss nicht به معنی لازم‌نبودن اشتباه نگیر.",
      "exampleDe": "Hier darf man keine Fotos machen.",
      "exampleFa": "اینجا اجازهٔ عکس‌گرفتن نیست."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Kb.S.۶۳ / Ab.S.۶۱",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-027",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین man",
    "promptFa": "برای معنای «آدم اینجا با اتوبوس می‌رود»، جای خالی چیست؟",
    "sentenceDe": "___ fährt hier mit dem Bus.",
    "answer": "Man",
    "options": [
      "Man",
      "Mann",
      "Alle",
      "Wir"
    ],
    "explanationFa": "Man ضمیر نامعین و با fährt هماهنگ است.",
    "review": {
      "ruleFa": "man برای اشارهٔ عمومی به آدم‌ها به کار می‌رود، اما از نظر دستوری سوم‌شخص مفرد است: man ist، man hat، man kann. در این کاربرد فقط فاعل است؛ آن را با اسم Mann به معنی مرد اشتباه نگیر.",
      "pitfallFa": "Mann اسمِ مرد است؛ man ضمیر است و فقط در آغاز جمله با حرف بزرگ نوشته می‌شود.",
      "exampleDe": "Man bezahlt hier am Automaten.",
      "exampleFa": "اینجا از دستگاه پرداخت می‌کنند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Kb.S.۶۳ / Ab.S.۶۱",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-028",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین man",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Man ___ morgen das Museum. (besichtigen)",
    "answer": "besichtigt",
    "options": [
      "besichtigt",
      "besichtigen",
      "besichtigst",
      "besichtige"
    ],
    "explanationFa": "فاعل man است؛ فعل besichtigen برای سوم‌شخص مفرد به besichtigt تبدیل می‌شود.",
    "review": {
      "ruleFa": "man برای اشارهٔ عمومی به آدم‌ها به کار می‌رود، اما از نظر دستوری سوم‌شخص مفرد است: man ist، man hat، man kann. در این کاربرد فقط فاعل است؛ آن را با اسم Mann به معنی مرد اشتباه نگیر.",
      "pitfallFa": "صرف فعل از معنای عمومی man تأثیر نمی‌گیرد؛ صورت مفرد لازم است.",
      "exampleDe": "Im Sommer besucht man gern den Park.",
      "exampleFa": "در تابستان معمولاً دوست دارند از پارک دیدن کنند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Kb.S.۶۳ / Ab.S.۶۱",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-029",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین alle",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Alle ___ heute zum Museum. (gehen)",
    "answer": "gehen",
    "options": [
      "gehen",
      "geht",
      "gehst",
      "gehe"
    ],
    "explanationFa": "Alle در این جمله به همهٔ افراد اشاره می‌کند و فعل جمع می‌گیرد.",
    "review": {
      "ruleFa": "alle در معنای همهٔ افراد یا تمام اعضای یک گروه جمع است و در نقش فاعل فعل جمع می‌گیرد: alle sind، alle haben. می‌تواند مستقل یا پیش از اسم جمع بیاید؛ آن را با man که فعل مفرد می‌گیرد یکی ندان.",
      "pitfallFa": "geht برای er/sie/es یا ihr است؛ Alle در نقش فاعلِ این جمله جمع است.",
      "exampleDe": "Alle warten vor dem Bahnhof.",
      "exampleFa": "همه جلوی ایستگاه منتظرند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-030",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین alle",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Alle ___ die Fahrkarte dabei. (haben)",
    "answer": "haben",
    "options": [
      "haben",
      "hat",
      "hast",
      "habe"
    ],
    "explanationFa": "Alle فاعل جمع است؛ haben باید به صورت جمع بیاید.",
    "review": {
      "ruleFa": "alle در معنای همهٔ افراد یا تمام اعضای یک گروه جمع است و در نقش فاعل فعل جمع می‌گیرد: alle sind، alle haben. می‌تواند مستقل یا پیش از اسم جمع بیاید؛ آن را با man که فعل مفرد می‌گیرد یکی ندان.",
      "pitfallFa": "hat برای سوم‌شخص مفرد است و با Alle در این جمله هماهنگ نیست.",
      "exampleDe": "Alle haben heute Zeit.",
      "exampleFa": "همه امروز وقت دارند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-031",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین alle",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Alle ___ mit dem Bus fahren. (wollen)",
    "answer": "wollen",
    "options": [
      "wollen",
      "will",
      "willst",
      "wollt"
    ],
    "explanationFa": "با Alle از wollen جمع استفاده می‌کنیم؛ fahren در پایان مصدر است.",
    "review": {
      "ruleFa": "alle در معنای همهٔ افراد یا تمام اعضای یک گروه جمع است و در نقش فاعل فعل جمع می‌گیرد: alle sind، alle haben. می‌تواند مستقل یا پیش از اسم جمع بیاید؛ آن را با man که فعل مفرد می‌گیرد یکی ندان.",
      "pitfallFa": "will مفرد و wollt برای ihr است؛ اینجا سوم‌شخص جمع لازم است.",
      "exampleDe": "Alle wollen die Stadt besichtigen.",
      "exampleFa": "همه می‌خواهند از شهر بازدید کنند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-032",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین alle",
    "promptFa": "برای معنای «همهٔ مهمان‌ها»، جای خالی چیست؟",
    "sentenceDe": "___ Gäste kommen um acht Uhr.",
    "answer": "Alle",
    "options": [
      "Alle",
      "Man",
      "Etwas",
      "Nichts"
    ],
    "explanationFa": "Alle پیش از اسم جمع Gäste به معنی همهٔ مهمان‌هاست.",
    "review": {
      "ruleFa": "alle در معنای همهٔ افراد یا تمام اعضای یک گروه جمع است و در نقش فاعل فعل جمع می‌گیرد: alle sind، alle haben. می‌تواند مستقل یا پیش از اسم جمع بیاید؛ آن را با man که فعل مفرد می‌گیرد یکی ندان.",
      "pitfallFa": "man یک ضمیر مستقل است و نمی‌تواند در این ساخت جای تعیین‌کنندهٔ جمع Gäste بنشیند.",
      "exampleDe": "Alle Kinder spielen im Garten.",
      "exampleFa": "همهٔ بچه‌ها در باغ بازی می‌کنند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-033",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین alle",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Alle ___ freundlich. (sein)",
    "answer": "sind",
    "options": [
      "sind",
      "ist",
      "seid",
      "bin"
    ],
    "explanationFa": "Alle در این جمله فاعل جمع است و با sind می‌آید.",
    "review": {
      "ruleFa": "alle در معنای همهٔ افراد یا تمام اعضای یک گروه جمع است و در نقش فاعل فعل جمع می‌گیرد: alle sind، alle haben. می‌تواند مستقل یا پیش از اسم جمع بیاید؛ آن را با man که فعل مفرد می‌گیرد یکی ندان.",
      "pitfallFa": "seid برای مخاطب ihr و ist مفرد است؛ هیچ‌کدام با Alle در این جمله هماهنگ نیست.",
      "exampleDe": "Alle sind schon im Museum.",
      "exampleFa": "همه از قبل در موزه هستند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-034",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین alle",
    "promptFa": "گزینهٔ درست را مطابق معنی یا قالب مشخص‌شده انتخاب کن.",
    "sentenceDe": "Alle ___ die Stadt sehr interessant. (finden)",
    "answer": "finden",
    "options": [
      "finden",
      "findet",
      "findest",
      "finde"
    ],
    "explanationFa": "فعل finden با فاعل جمع Alle به صورت finden می‌آید.",
    "review": {
      "ruleFa": "alle در معنای همهٔ افراد یا تمام اعضای یک گروه جمع است و در نقش فاعل فعل جمع می‌گیرد: alle sind، alle haben. می‌تواند مستقل یا پیش از اسم جمع بیاید؛ آن را با man که فعل مفرد می‌گیرد یکی ندان.",
      "pitfallFa": "پایانهٔ t در findet برای سوم‌شخص مفرد است؛ Alle اینجا جمع است.",
      "exampleDe": "Alle finden den Park schön.",
      "exampleFa": "همه پارک را زیبا می‌دانند."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-035",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین etwas",
    "promptFa": "برای معنای «چیزی» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "Ich möchte ___ essen.",
    "answer": "etwas",
    "options": [
      "etwas",
      "man",
      "nichts",
      "alle"
    ],
    "explanationFa": "etwas ضمیر نامعین برای یک چیز نامشخص است.",
    "review": {
      "ruleFa": "etwas یعنی چیزی یا مقداری نامشخص؛ در نقش فاعل، فعل مفرد می‌گیرد و در نقش مفعولِ این جمله‌ها شکلش تغییر نمی‌کند. nichts معنای منفیِ هیچ‌چیز دارد؛ انتخاب را با معنای مشخص‌شدهٔ سؤال هماهنگ کن.",
      "pitfallFa": "nichts یعنی هیچ‌چیز و با معنای خواسته‌شده فرق دارد؛ alle به همهٔ افراد یا اعضای یک گروه اشاره می‌کند.",
      "exampleDe": "Möchtest du etwas trinken?",
      "exampleFa": "می‌خواهی چیزی بنوشی؟"
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-036",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین etwas",
    "promptFa": "برای معنای «چیزی» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "Ich bringe ___ zur Party mit.",
    "answer": "etwas",
    "options": [
      "etwas",
      "man",
      "nichts",
      "alle"
    ],
    "explanationFa": "etwas مفعول نامعینِ غیرشخصیِ mitbringen است.",
    "review": {
      "ruleFa": "etwas یعنی چیزی یا مقداری نامشخص؛ در نقش فاعل، فعل مفرد می‌گیرد و در نقش مفعولِ این جمله‌ها شکلش تغییر نمی‌کند. nichts معنای منفیِ هیچ‌چیز دارد؛ انتخاب را با معنای مشخص‌شدهٔ سؤال هماهنگ کن.",
      "pitfallFa": "man فقط در نقش فاعل به کار می‌رود؛ nichts معنای هیچ‌چیز می‌دهد، نه چیزی.",
      "exampleDe": "Ich kaufe etwas für die Reise.",
      "exampleFa": "برای سفر چیزی می‌خرم."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-037",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین etwas",
    "promptFa": "برای معنای «چیزی» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "Kann ich ___ für dich tun?",
    "answer": "etwas",
    "options": [
      "etwas",
      "man",
      "alle",
      "nichts"
    ],
    "explanationFa": "برای پرسیدن اینکه می‌توان کاری برای کسی انجام داد از etwas استفاده می‌کنیم.",
    "review": {
      "ruleFa": "etwas یعنی چیزی یا مقداری نامشخص؛ در نقش فاعل، فعل مفرد می‌گیرد و در نقش مفعولِ این جمله‌ها شکلش تغییر نمی‌کند. nichts معنای منفیِ هیچ‌چیز دارد؛ انتخاب را با معنای مشخص‌شدهٔ سؤال هماهنگ کن.",
      "pitfallFa": "nichts از نظر شکل ضمیر است، اما معنای خواسته‌شدهٔ سؤال را نمی‌دهد.",
      "exampleDe": "Kann ich dir etwas zeigen?",
      "exampleFa": "می‌توانم چیزی به تو نشان بدهم؟"
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-038",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین etwas",
    "promptFa": "برای معنای «چیزی» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "Auf dem Tisch liegt ___.",
    "answer": "etwas",
    "options": [
      "etwas",
      "man",
      "alle",
      "nichts"
    ],
    "explanationFa": "etwas در این جمله به یک چیز نامشخص روی میز اشاره دارد.",
    "review": {
      "ruleFa": "etwas یعنی چیزی یا مقداری نامشخص؛ در نقش فاعل، فعل مفرد می‌گیرد و در نقش مفعولِ این جمله‌ها شکلش تغییر نمی‌کند. nichts معنای منفیِ هیچ‌چیز دارد؛ انتخاب را با معنای مشخص‌شدهٔ سؤال هماهنگ کن.",
      "pitfallFa": "liegen با etwas مفرد به liegt تبدیل شده است؛ alle در معنای همهٔ افراد فعل جمع می‌خواهد.",
      "exampleDe": "In der Tasche ist etwas.",
      "exampleFa": "داخل کیف چیزی هست."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-039",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین nichts",
    "promptFa": "برای معنای «هیچ‌چیز» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "Ich kaufe heute ___.",
    "answer": "nichts",
    "options": [
      "nichts",
      "etwas",
      "man",
      "alle"
    ],
    "explanationFa": "nichts خودش معنای منفیِ هیچ‌چیز دارد.",
    "review": {
      "ruleFa": "nichts یعنی هیچ‌چیز و خودش بار منفی دارد؛ برای همین معنای منفیِ ساده به nicht اضافی نیاز ندارد. در نقش فاعل با فعل مفرد می‌آید. etwas مقابل معناییِ آن در این تمرین‌هاست.",
      "pitfallFa": "برای همین معنای منفیِ ساده، nicht دیگری به nichts اضافه نمی‌کنیم؛ etwas یعنی چیزی.",
      "exampleDe": "Ich brauche heute nichts.",
      "exampleFa": "امروز به هیچ‌چیز نیاز ندارم."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-040",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین nichts",
    "promptFa": "برای معنای «هیچ‌چیز» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "In meiner Tasche ist ___.",
    "answer": "nichts",
    "options": [
      "nichts",
      "etwas",
      "alle",
      "man"
    ],
    "explanationFa": "nichts نبودن هر چیز در کیف را بیان می‌کند.",
    "review": {
      "ruleFa": "nichts یعنی هیچ‌چیز و خودش بار منفی دارد؛ برای همین معنای منفیِ ساده به nicht اضافی نیاز ندارد. در نقش فاعل با فعل مفرد می‌آید. etwas مقابل معناییِ آن در این تمرین‌هاست.",
      "pitfallFa": "nichts با فعل مفرد می‌آید؛ alle در نقش فاعل جمع به sind یا liegen نیاز دارد.",
      "exampleDe": "Auf dem Tisch liegt nichts.",
      "exampleFa": "هیچ‌چیز روی میز نیست."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-041",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین nichts",
    "promptFa": "برای معنای «هیچ‌چیز» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "Ich verstehe ___.",
    "answer": "nichts",
    "options": [
      "nichts",
      "etwas",
      "man",
      "alle"
    ],
    "explanationFa": "nichts مفعول جمله و به معنی هیچ‌چیز است.",
    "review": {
      "ruleFa": "nichts یعنی هیچ‌چیز و خودش بار منفی دارد؛ برای همین معنای منفیِ ساده به nicht اضافی نیاز ندارد. در نقش فاعل با فعل مفرد می‌آید. etwas مقابل معناییِ آن در این تمرین‌هاست.",
      "pitfallFa": "man نمی‌تواند مفعول verstehen باشد؛ etwas جمله را از نظر معنا مثبت می‌کند.",
      "exampleDe": "Ohne Brille sehe ich nichts.",
      "exampleFa": "بدون عینک هیچ‌چیز نمی‌بینم."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-042",
    "lessonId": "a1-lesson-07",
    "topicFa": "ضمیر نامعین nichts",
    "promptFa": "برای معنای «هیچ‌چیز» انتخاب کن؛ گزینهٔ مناسب را انتخاب کن.",
    "sentenceDe": "Ich habe ___ vergessen.",
    "answer": "nichts",
    "options": [
      "nichts",
      "man",
      "etwas",
      "alle"
    ],
    "explanationFa": "nichts نشان می‌دهد هیچ چیزی فراموش نشده است.",
    "review": {
      "ruleFa": "nichts یعنی هیچ‌چیز و خودش بار منفی دارد؛ برای همین معنای منفیِ ساده به nicht اضافی نیاز ندارد. در نقش فاعل با فعل مفرد می‌آید. etwas مقابل معناییِ آن در این تمرین‌هاست.",
      "pitfallFa": "این ضمیر خودش منفی است؛ اضافه‌کردن nicht برای این جملهٔ ساده لازم نیست.",
      "exampleDe": "Wir haben nichts gekauft.",
      "exampleFa": "هیچ‌چیز نخریده‌ایم."
    },
    "locator": "درس۷ · ضمایر نامعین؛ واژه‌نامهٔ رسمی Ab.S.۶۱؛ واژه‌نامهٔ درس۷ PDF8",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-043",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens برای آینده",
    "promptFa": "با توجه به Morgen، زمان رویداد و صورت دستوری فعل را انتخاب کن.",
    "sentenceDe": "Morgen besuche ich Bern.",
    "answer": "Zukunft; Präsens",
    "options": [
      "Zukunft; Präsens",
      "Vergangenheit; Perfekt",
      "Gegenwart; Präteritum",
      "Vergangenheit; Präteritum"
    ],
    "explanationFa": "قید Morgen رویداد را به آینده می‌برد، هرچند فعل besuche در Präsens است.",
    "review": {
      "ruleFa": "اگر قید زمانی مانند morgen، nächste Woche یا in zwei Wochen آینده را روشن کند، می‌توان از Präsens استفاده کرد. صرف فعل با فاعل هماهنگ می‌ماند و در جملهٔ خبری، فعل صرف‌شده جایگاه دوم دارد.",
      "pitfallFa": "برای بیان آینده در آلمانی همیشه به werden نیاز نیست؛ قید زمان می‌تواند آینده را روشن کند.",
      "exampleDe": "Morgen fahre ich nach Zürich.",
      "exampleFa": "فردا به زوریخ می‌روم."
    },
    "locator": "کتاب درسی چاپی۶۳ · B4؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-044",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens برای آینده",
    "promptFa": "با Präsens و قید آینده، صورت درست فعل را انتخاب کن.",
    "sentenceDe": "In zwei Wochen ___ wir Bern. (besuchen)",
    "answer": "besuchen",
    "options": [
      "besuchen",
      "besucht",
      "besuchst",
      "besuche"
    ],
    "explanationFa": "با فاعل wir، فعل besuchen است؛ In zwei Wochen زمان آینده را نشان می‌دهد.",
    "review": {
      "ruleFa": "اگر قید زمانی مانند morgen، nächste Woche یا in zwei Wochen آینده را روشن کند، می‌توان از Präsens استفاده کرد. صرف فعل با فاعل هماهنگ می‌ماند و در جملهٔ خبری، فعل صرف‌شده جایگاه دوم دارد.",
      "pitfallFa": "Präsens فقط مخصوص همین لحظه نیست؛ با قید آینده، برنامهٔ آینده را هم بیان می‌کند.",
      "exampleDe": "Nächste Woche besuchen wir das Museum.",
      "exampleFa": "هفتهٔ آینده از موزه بازدید می‌کنیم."
    },
    "locator": "کتاب درسی چاپی۶۳ · B4؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-045",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens برای آینده",
    "promptFa": "کدام جمله با Präsens و ترتیب درست، «فردا به موزه می‌روم» را بیان می‌کند؟",
    "sentenceDe": "morgen / ich / gehen / ins Museum",
    "answer": "Morgen gehe ich ins Museum.",
    "options": [
      "Morgen gehe ich ins Museum.",
      "Morgen ich gehe ins Museum.",
      "Morgen gehen ich ins Museum.",
      "Morgen gehst ich ins Museum."
    ],
    "explanationFa": "وقتی Morgen در جایگاه اول است، فعل gehe دوم و فاعل ich پس از آن می‌آید.",
    "review": {
      "ruleFa": "اگر قید زمانی مانند morgen، nächste Woche یا in zwei Wochen آینده را روشن کند، می‌توان از Präsens استفاده کرد. صرف فعل با فاعل هماهنگ می‌ماند و در جملهٔ خبری، فعل صرف‌شده جایگاه دوم دارد.",
      "pitfallFa": "قید آغاز جمله یک جایگاه می‌گیرد؛ فاعل نباید بین آن و فعل صرف‌شده قرار گیرد.",
      "exampleDe": "Heute Abend treffe ich Anna.",
      "exampleFa": "امشب آنا را می‌بینم."
    },
    "locator": "کتاب درسی چاپی۶۳ · B4؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-046",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens برای آینده",
    "promptFa": "کدام جمله با Präsens، «دو هفتهٔ دیگر با هم به برن سفر می‌کنیم» را درست بیان می‌کند؟",
    "sentenceDe": "in zwei Wochen / wir / zusammen / nach Bern / reisen",
    "answer": "In zwei Wochen reisen wir zusammen nach Bern.",
    "options": [
      "In zwei Wochen reisen wir zusammen nach Bern.",
      "In zwei Wochen wir reisen zusammen nach Bern.",
      "In zwei Wochen reist wir zusammen nach Bern.",
      "In zwei Wochen reise wir zusammen nach Bern."
    ],
    "explanationFa": "گروه زمانی In zwei Wochen جایگاه اول را می‌گیرد؛ reisen برای wir در جایگاه دوم می‌آید.",
    "review": {
      "ruleFa": "اگر قید زمانی مانند morgen، nächste Woche یا in zwei Wochen آینده را روشن کند، می‌توان از Präsens استفاده کرد. صرف فعل با فاعل هماهنگ می‌ماند و در جملهٔ خبری، فعل صرف‌شده جایگاه دوم دارد.",
      "pitfallFa": "جایگاه اول می‌تواند چند واژه داشته باشد؛ فعل صرف‌شده پس از کل آن گروه می‌آید.",
      "exampleDe": "Am Samstag fahren wir zusammen nach Hause.",
      "exampleFa": "شنبه با هم به خانه می‌رویم."
    },
    "locator": "کتاب درسی چاپی۶۳ · B4؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-047",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens در زندگی‌نامه",
    "promptFa": "در روایت زندگی‌نامه با Präsens؛ صورت درست را انتخاب کن.",
    "sentenceDe": "1921 ___ er an einer Kunstschule. (unterrichten)",
    "answer": "unterrichtet",
    "options": [
      "unterrichtet",
      "unterrichten",
      "unterrichtest",
      "unterrichte"
    ],
    "explanationFa": "با er صورت سوم‌شخص مفرد unterrichtet لازم است؛ روایت زندگی‌نامه می‌تواند از Präsens استفاده کند.",
    "review": {
      "ruleFa": "در زندگی‌نامه یا روایت تاریخی می‌توان رویدادهای گذشته را با Präsens روایت کرد؛ تاریخ و زمینه زمان واقعی را مشخص می‌کنند. صرف فعل همچنان با فاعل هماهنگ است. این سؤال‌ها صریحاً Präsens روایی می‌خواهند؛ زمان گذشته در قالب مناسب دیگری معتبر است.",
      "pitfallFa": "این کاربرد، حالِ روایی است؛ تاریخ گذشته لزوماً به معنی نادرست‌بودن Präsens نیست. صورت گذشته در قالب دیگری می‌تواند معتبر باشد.",
      "exampleDe": "1930 reist der Maler nach Italien.",
      "exampleFa": "در سال ۱۹۳۰ نقاش به ایتالیا سفر می‌کند."
    },
    "locator": "کتاب درسی چاپی۶۴–۶۵ · C3؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-048",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens در زندگی‌نامه",
    "promptFa": "در روایت زندگی‌نامه با Präsens؛ صورت درست را انتخاب کن.",
    "sentenceDe": "1906 ___ er nach Bern. (reisen)",
    "answer": "reist",
    "options": [
      "reist",
      "reisen",
      "reise",
      "reistest"
    ],
    "explanationFa": "با er در Präsens از reist استفاده می‌کنیم؛ تاریخ، زمینهٔ گذشته را مشخص می‌کند.",
    "review": {
      "ruleFa": "در زندگی‌نامه یا روایت تاریخی می‌توان رویدادهای گذشته را با Präsens روایت کرد؛ تاریخ و زمینه زمان واقعی را مشخص می‌کنند. صرف فعل همچنان با فاعل هماهنگ است. این سؤال‌ها صریحاً Präsens روایی می‌خواهند؛ زمان گذشته در قالب مناسب دیگری معتبر است.",
      "pitfallFa": "این سؤال صریحاً Präsens روایی می‌خواهد؛ شکل گذشته را صرفاً در همهٔ بافت‌ها غلط ندان.",
      "exampleDe": "1910 lebt die Künstlerin in Berlin.",
      "exampleFa": "در سال ۱۹۱۰ هنرمند زن در برلین زندگی می‌کند."
    },
    "locator": "کتاب درسی چاپی۶۴–۶۵ · C3؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-049",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens در زندگی‌نامه",
    "promptFa": "در روایت زندگی‌نامه با Präsens؛ صورت درست را انتخاب کن.",
    "sentenceDe": "1940 ___ der Künstler. (sterben)",
    "answer": "stirbt",
    "options": [
      "stirbt",
      "sterben",
      "sterbe",
      "stirbst"
    ],
    "explanationFa": "sterben برای سوم‌شخص مفرد در Präsens به stirbt تبدیل می‌شود.",
    "review": {
      "ruleFa": "در زندگی‌نامه یا روایت تاریخی می‌توان رویدادهای گذشته را با Präsens روایت کرد؛ تاریخ و زمینه زمان واقعی را مشخص می‌کنند. صرف فعل همچنان با فاعل هماهنگ است. این سؤال‌ها صریحاً Präsens روایی می‌خواهند؛ زمان گذشته در قالب مناسب دیگری معتبر است.",
      "pitfallFa": "stirbst برای du است؛ e در این فعل برای er به i تبدیل می‌شود و پایانۀ t می‌گیرد.",
      "exampleDe": "In der Biografie stirbt die Figur am Ende.",
      "exampleFa": "در زندگی‌نامه، شخصیت در پایان می‌میرد."
    },
    "locator": "کتاب درسی چاپی۶۴–۶۵ · C3؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  },
  {
    "questionId": "a1-g07-050",
    "lessonId": "a1-lesson-07",
    "topicFa": "Präsens در زندگی‌نامه",
    "promptFa": "در روایت زندگی‌نامه با Präsens؛ صورت درست را انتخاب کن.",
    "sentenceDe": "1906 ___ die Malerin. (heiraten)",
    "answer": "heiratet",
    "options": [
      "heiratet",
      "heiraten",
      "heiratest",
      "heirate"
    ],
    "explanationFa": "با فاعل مفرد die Malerin، فعل heiratet می‌آید؛ روایت از Präsens استفاده می‌کند.",
    "review": {
      "ruleFa": "در زندگی‌نامه یا روایت تاریخی می‌توان رویدادهای گذشته را با Präsens روایت کرد؛ تاریخ و زمینه زمان واقعی را مشخص می‌کنند. صرف فعل همچنان با فاعل هماهنگ است. این سؤال‌ها صریحاً Präsens روایی می‌خواهند؛ زمان گذشته در قالب مناسب دیگری معتبر است.",
      "pitfallFa": "به‌دلیل پایان ریشهٔ heirat-، پیش از t پایانی یک e می‌آید: heiratet. این سؤال صرف روایی را می‌سنجد، نه انتخاب آزاد زمان فعل.",
      "exampleDe": "1912 heiratet der Künstler in Bern.",
      "exampleFa": "در سال ۱۹۱۲ هنرمند در برن ازدواج می‌کند."
    },
    "locator": "کتاب درسی چاپی۶۴–۶۵ · C3؛ پاسخ‌نامهٔ رسمی PDF5",
    "origin": "authored"
  }
]
