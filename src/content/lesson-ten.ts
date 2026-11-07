import { buildExcerptLesson, type ExcerptPedagogy } from './excerpt-lesson.ts'
import { lessonTenSourceRows } from './lesson-ten-source.ts'

// Authored examples and writing cues keyed by the fixed source row ID.
const pedagogy: Record<number, ExcerptPedagogy> = {
  "1": [
    "noun",
    "Der Abschied von den Nachbarn fällt uns schwer.",
    "خداحافظی با همسایه‌ها برایمان سخت است.",
    "اسمِ جداشدن و خداحافظی هنگام رفتن؛ بدون آرتیکل."
  ],
  "2": [
    "verb",
    "Vor dem Umzug müssen wir unsere Adresse ändern.",
    "پیش از اسباب‌کشی باید نشانی‌مان را تغییر بدهیم.",
    "فعلِ تغییردادن چیزی؛ مصدر و بدون ضمیر."
  ],
  "3": [
    "noun",
    "Mit dem Aufzug kommen wir bequem in den fünften Stock.",
    "با آسانسور راحت به طبقهٔ پنجم می‌رسیم.",
    "اسمِ وسیلهٔ جابه‌جایی عمودی بین طبقه‌ها؛ بدون آرتیکل."
  ],
  "4": [
    "verb",
    "Bitte das Formular vollständig ausfüllen.",
    "لطفاً فرم را کامل پر کنید.",
    "فعل جداشدنیِ پرکردن فرم؛ مصدر کامل."
  ],
  "5": [
    "noun",
    "Die Bank überweist das Geld noch heute.",
    "بانک همین امروز پول را منتقل می‌کند.",
    "اسمِ بانک یا نیمکت؛ واژهٔ مشترک این دو معنی، بدون آرتیکل."
  ],
  "6": [
    "noun",
    "Hinter dem Dorf liegt ein hoher Berg.",
    "پشت روستا کوه بلندی هست.",
    "اسمِ برآمدگی بلند طبیعی زمین؛ بدون آرتیکل."
  ],
  "7": [
    "noun",
    "Auf dem Boden liegen noch leere Kartons.",
    "هنوز کارتن‌های خالی روی زمین افتاده‌اند.",
    "اسمِ کف اتاق یا سطح زمین؛ بدون آرتیکل."
  ],
  "8": [
    "noun",
    "Mit dieser Wohnung bekommen wir eine neue Chance.",
    "با این خانه فرصت تازه‌ای به دست می‌آوریم.",
    "اسمِ شانس یا فرصت؛ بدون آرتیکل."
  ],
  "9": [
    "noun",
    "Nach dem Sturm müssen wir das Dach reparieren.",
    "بعد از توفان باید بام را تعمیر کنیم.",
    "اسمِ پوشش بیرونی بالای ساختمان، معمولاً شیب‌دار؛ بدون آرتیکل."
  ],
  "10": [
    "noun",
    "Die Decke im Schlafzimmer streichen wir weiß.",
    "سقف اتاق خواب را سفید رنگ می‌کنیم.",
    "اسمِ سقف داخلی اتاق که پتو هم معنی می‌دهد؛ بدون آرتیکل."
  ],
  "11": [
    "noun",
    "Im Erdgeschoss wohnt eine Familie mit zwei Kindern.",
    "در طبقهٔ همکف خانواده‌ای با دو فرزند زندگی می‌کند.",
    "اسمِ طبقهٔ هم‌سطح ورودی ساختمان؛ بدون آرتیکل."
  ],
  "12": [
    "adjective",
    "Seit zwei Jahren ist er geschieden.",
    "دو سال است که او طلاق گرفته است.",
    "صفتِ وضعیت تأهل کسی که طلاق گرفته؛ همان صورت، نه مصدر."
  ],
  "13": [
    "noun",
    "Von der Haltestelle bis zum Haus sind es fünf Minuten.",
    "از ایستگاه اتوبوس یا تراموا تا خانه پنج دقیقه راه است.",
    "اسمِ ایستگاه اتوبوس یا تراموا؛ بدون آرتیکل."
  ],
  "14": [
    "noun",
    "Am Hauptbahnhof treffen wir die Umzugshelfer.",
    "در ایستگاه مرکزی قطار با کمک‌کنندگان اسباب‌کشی دیدار می‌کنیم.",
    "اسم مرکبِ ایستگاه اصلی قطار یک شهر؛ بدون آرتیکل."
  ],
  "15": [
    "adjective",
    "Durch die großen Fenster ist die Küche sehr hell.",
    "آشپزخانه به‌خاطر پنجره‌های بزرگ خیلی روشن است.",
    "صفتِ اتاقی با نور زیاد؛ صورت پایه."
  ],
  "16": [
    "noun",
    "Der Herd in der neuen Küche funktioniert gut.",
    "اجاق آشپزخانهٔ جدید خوب کار می‌کند.",
    "اسمِ وسیلهٔ پخت‌وپز با شعله یا صفحهٔ برقی؛ بدون آرتیکل."
  ],
  "17": [
    "other",
    "Der Garten liegt hinter dem Haus.",
    "باغ پشت خانه قرار دارد.",
    "حرف اضافهٔ مکان به معنی پشت؛ با حرف کوچک."
  ],
  "18": [
    "adverb",
    "Für den Umzug brauchen wir insgesamt zehn Kartons.",
    "برای اسباب‌کشی در مجموع ده کارتن لازم داریم.",
    "قیدِ در مجموع برای بیان جمع کل."
  ],
  "19": [
    "noun",
    "Die Kaltmiete ist niedriger als in unserer alten Wohnung.",
    "اجارهٔ بدون هزینه‌های جانبی از خانهٔ قبلی‌مان کمتر است.",
    "اسمِ اجارهٔ پایه بدون هزینهٔ گرمایش و هزینه‌های جانبی؛ بدون آرتیکل."
  ],
  "20": [
    "noun",
    "Unsere Katze versteckt sich zwischen den Kartons.",
    "گربهٔ ما بین کارتن‌ها پنهان می‌شود.",
    "اسمِ حیوان خانگیِ گربه؛ بدون آرتیکل."
  ],
  "21": [
    "noun",
    "Im Kaufhaus suchen wir neue Lampen.",
    "در فروشگاه بزرگ دنبال چراغ‌های جدید می‌گردیم.",
    "اسم مرکبِ فروشگاه بزرگ با بخش‌های مختلف؛ بدون آرتیکل."
  ],
  "22": [
    "noun",
    "Die Kaution zahlen wir vor der Schlüsselübergabe.",
    "ودیعه را پیش از تحویل کلید می‌پردازیم.",
    "اسمِ مبلغ ضمانت یا ودیعهٔ اجاره؛ بدون آرتیکل."
  ],
  "23": [
    "noun",
    "Im Keller bewahren wir die Fahrräder auf.",
    "دوچرخه‌ها را در زیرزمین نگه می‌داریم.",
    "اسمِ بخش ساختمان زیر سطح زمین؛ بدون آرتیکل."
  ],
  "24": [
    "noun",
    "Das Kinderzimmer bekommt einen bunten Teppich.",
    "برای اتاق کودک یک فرش رنگارنگ می‌گذاریم.",
    "اسم مرکبِ اتاق مخصوص کودک؛ بدون آرتیکل."
  ],
  "25": [
    "verb",
    "Vor der Unterschrift solltest du alle Angaben kontrollieren.",
    "پیش از امضا بهتر است همهٔ اطلاعات را بررسی کنی.",
    "فعلِ بررسی یا کنترل‌کردن اطلاعات؛ مصدر."
  ],
  "26": [
    "noun",
    "Der Kühlschrank passt genau in diese Ecke.",
    "یخچال دقیقاً در این گوشه جا می‌شود.",
    "اسمِ وسیلهٔ سرد نگه‌داشتن مواد غذایی؛ بدون آرتیکل."
  ],
  "27": [
    "adjective",
    "Auf dem Formular steht bei Familienstand: ledig.",
    "در فرم، جلوی وضعیت تأهل نوشته شده: مجرد.",
    "صفتِ وضعیت تأهلِ کسی که ازدواج نکرده؛ صورت پایه."
  ],
  "28": [
    "noun",
    "Nach dem Auspacken bringen wir den Müll nach draußen.",
    "بعد از بازکردن بسته‌ها زباله را بیرون می‌بریم.",
    "اسمِ زباله یا دورریختنی‌ها؛ بدون آرتیکل."
  ],
  "29": [
    "noun",
    "Ein Nachteil der Wohnung ist die kleine Küche.",
    "یکی از عیب‌های خانه آشپزخانهٔ کوچک آن است.",
    "اسمِ عیب یا نکتهٔ منفی، در برابر مزیت؛ بدون آرتیکل."
  ],
  "30": [
    "other",
    "Den kleinen Tisch stellen wir neben das Sofa.",
    "میز کوچک را کنار مبل می‌گذاریم.",
    "حرف اضافهٔ مکان به معنی کنار؛ با حرف کوچک."
  ],
  "31": [
    "noun",
    "Die Nebenkosten werden einmal im Jahr abgerechnet.",
    "هزینه‌های جانبی سالی یک‌بار تسویه می‌شوند.",
    "اسمِ هزینه‌های جانبی خانه؛ صورت جمعِ منبع و بدون آرتیکل."
  ],
  "32": [
    "noun",
    "Den Parkplatz hinter dem Haus können wir mitbenutzen.",
    "می‌توانیم از جای پارک پشت خانه هم استفاده کنیم.",
    "اسم مرکبِ محل پارک خودرو؛ بدون آرتیکل."
  ],
  "33": [
    "noun",
    "Während der Probezeit wohnt sie noch bei Freunden.",
    "در دورهٔ آزمایشی هنوز پیش دوستانش زندگی می‌کند.",
    "اسم مرکبِ دورهٔ آزمایشی آغاز کار؛ بدون آرتیکل."
  ],
  "34": [
    "noun",
    "Das Schlafzimmer liegt auf der ruhigen Seite des Hauses.",
    "اتاق خواب در سمت آرام ساختمان قرار دارد.",
    "اسم مرکبِ اتاق مخصوص خواب؛ بدون آرتیکل."
  ],
  "35": [
    "noun",
    "Den zweiten Schlüssel bekommt meine Schwester.",
    "کلید دوم را خواهرم می‌گیرد.",
    "اسمِ وسیلهٔ بازکردن قفل؛ مفرد و بدون آرتیکل."
  ],
  "36": [
    "noun",
    "Für die Sicherheit im Haus sind alle verantwortlich.",
    "همه مسئول ایمنی در ساختمان هستند.",
    "اسمِ امنیت یا ایمنی؛ بدون آرتیکل."
  ],
  "37": [
    "noun",
    "Den Spiegel hängen wir neben die Tür.",
    "آینه را کنار در آویزان می‌کنیم.",
    "اسمِ سطحی که تصویر خود را در آن می‌بینیم؛ بدون آرتیکل."
  ],
  "38": [
    "adjective",
    "Der Bus zur Arbeit fährt täglich.",
    "اتوبوس محل کار هر روز حرکت می‌کند.",
    "واژهٔ وصفیِ روزانه یا هرروزه؛ صورت پایه."
  ],
  "39": [
    "noun",
    "Der Teppich macht das Wohnzimmer gemütlicher.",
    "فرش اتاق نشیمن را دنج‌تر می‌کند.",
    "اسمِ فرش یا زیرانداز پارچه‌ایِ کف؛ بدون آرتیکل."
  ],
  "40": [
    "noun",
    "Auf der Terrasse frühstücken wir im Sommer.",
    "تابستان در تراس صبحانه می‌خوریم.",
    "اسمِ فضای باز و هموارِ کنار خانه یا آپارتمان؛ بدون آرتیکل."
  ],
  "41": [
    "verb",
    "In diesem Haus müssen alle ihren Abfall trennen.",
    "در این ساختمان همه باید زباله‌هایشان را تفکیک کنند.",
    "فعلِ جداکردن یا تفکیک‌کردن؛ مصدر و بدون ضمیر."
  ],
  "42": [
    "noun",
    "Die Treppe zum Keller ist ziemlich steil.",
    "پله‌های زیرزمین نسبتاً پرشیب‌اند.",
    "اسمِ راه‌پله برای رفتن بین طبقه‌ها؛ صورت منبع و بدون آرتیکل."
  ],
  "43": [
    "verb",
    "Nächsten Monat möchten wir in eine größere Wohnung umziehen.",
    "می‌خواهیم ماه آینده به خانهٔ بزرگ‌تری اسباب‌کشی کنیم.",
    "فعل جداشدنیِ اسباب‌کشی‌کردن که لباس عوض‌کردن هم معنی می‌دهد؛ مصدر کامل."
  ],
  "44": [
    "verb",
    "Den neuen Vertrag können Sie morgen unterschreiben.",
    "می‌توانید قرارداد جدید را فردا امضا کنید.",
    "فعلِ امضاکردن یک سند؛ مصدر کامل."
  ],
  "45": [
    "adjective",
    "Die beiden sind seit letztem Sommer verheiratet.",
    "آن دو از تابستان گذشته با هم ازدواج کرده‌اند.",
    "صفتِ وضعیت تأهلِ کسی که همسر دارد؛ همان صورت، نه مصدر."
  ],
  "46": [
    "noun",
    "Am frühen Morgen ist der Verkehr noch ruhig.",
    "صبح زود رفت‌وآمد هنوز آرام است.",
    "اسمِ ترافیک یا رفت‌وآمد وسایل نقلیه؛ بدون آرتیکل."
  ],
  "47": [
    "verb",
    "Die Eigentümer möchten die Wohnung ab Mai vermieten.",
    "مالکان می‌خواهند از ماه مه خانه را اجاره بدهند.",
    "فعلِ اجاره‌دادن ملک از طرف صاحب آن، نه اجاره‌گرفتن؛ مصدر."
  ],
  "48": [
    "noun",
    "Den Vertrag lesen wir vor der Unterschrift genau.",
    "قرارداد را پیش از امضا با دقت می‌خوانیم.",
    "اسمِ توافق رسمی و معمولاً مکتوب بین طرف‌ها؛ بدون آرتیکل."
  ],
  "49": [
    "adjective",
    "Meine Nachbarin ist seit einigen Jahren verwitwet.",
    "همسایهٔ زنِ من چند سال است که همسرش را از دست داده است.",
    "صفتِ وضعیت تأهلِ کسی که همسرش فوت کرده؛ همان صورت، نه مصدر."
  ],
  "50": [
    "noun",
    "Ein Vorteil der Lage ist der kurze Weg zur Arbeit.",
    "یکی از مزیت‌های موقعیت خانه راه کوتاه تا محل کار است.",
    "اسمِ مزیت یا نکتهٔ مثبت، در برابر عیب؛ بدون آرتیکل."
  ],
  "51": [
    "noun",
    "An dieser Wand ist genug Platz für das Regal.",
    "روی این دیوار برای قفسه جای کافی هست.",
    "اسمِ دیوار قائم اتاق یا ساختمان؛ بدون آرتیکل."
  ]
}

export const lessonTenBundle = buildExcerptLesson({
  lesson: { lessonId: 'lesson-10', titleDe: "Umziehen, ausziehen, einziehen", titleFa: "اسباب‌کشی و خانهٔ تازه", level: 'A2', coverage: 'partial' },
  contentVersion: 'lesson-10-excerpt-v1',
  rows: lessonTenSourceRows,
  pedagogy: entryId => pedagogy[Number(entryId.slice(-3))],
  keyboardAlternatives: {"ändern":["aendern"],"ausfüllen":["ausfuellen"],"Kühlschrank":["Kuehlschrank"],"Müll":["Muell"],"Schlüssel":["Schluessel"],"täglich":["taeglich"]},
  overlappingGroups: [["das Dach","die Decke"],["die Kaltmiete","die Nebenkosten","die Kaution"],["geschieden","ledig","verheiratet","verwitwet"],["der Aufzug","die Treppe"],["der Nachteil","der Vorteil"]],
  pluralNotes: { Nebenkosten: 'صورت جمع در منبع آمده است؛ مفرد حدس زده نشده است.' },
  provenance: {
    file: 'reference/vocabulary/Lesson-10-A2.txt', reviewStatus: 'excerpt-checked',
    noteFa: 'هر 51 مدخل فایل واژگان درس دهم با معنی، آرتیکل و ارجاع‌های درج‌شده آمده‌اند. سطح A2 مطابق همین منبع است. تطبیق گزیده تأیید جامع اصل کتاب نیست؛ مثال‌ها و جمله‌های تمرین تألیفی‌اند.',
  },
})
