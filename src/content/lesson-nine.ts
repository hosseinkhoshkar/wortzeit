import { buildExcerptLesson, type ExcerptPedagogy } from './excerpt-lesson.ts'
import { lessonNineSourceRows } from './lesson-nine-source.ts'

// Authored examples and writing cues keyed by the fixed source row ID.
const pedagogy: Record<number, ExcerptPedagogy> = {
  "1": [
    "noun",
    "Eine Ausnahme ist heute leider nicht möglich.",
    "متأسفانه امروز استثنا ممکن نیست.",
    "اسمِ موردی که از قاعدهٔ عمومی پیروی نمی‌کند؛ بدون آرتیکل."
  ],
  "2": [
    "noun",
    "Der Baum im Garten trägt viele Äpfel.",
    "درخت باغ سیب‌های زیادی دارد.",
    "اسمِ گیاه بزرگ با تنه و شاخه؛ بدون آرتیکل."
  ],
  "3": [
    "noun",
    "Den Bericht über das Fest lese ich morgen.",
    "گزارش مربوط به جشن را فردا می‌خوانم.",
    "اسمِ متن یا شرح یک رویداد؛ بدون آرتیکل."
  ],
  "4": [
    "verb",
    "Für die Reise möchten wir ein kleines Hotel buchen.",
    "می‌خواهیم برای سفر یک هتل کوچک رزرو کنیم.",
    "فعلِ رزروکردن سفر، بلیت یا اقامت؛ مصدر."
  ],
  "5": [
    "noun",
    "Das Dorf liegt zwischen zwei Bergen.",
    "روستا بین دو کوه قرار دارد.",
    "اسمِ آبادی کوچک‌تر از شهر؛ بدون آرتیکل."
  ],
  "6": [
    "noun",
    "Die Feier beginnt nach dem Abendessen.",
    "مراسم جشن بعد از شام شروع می‌شود.",
    "اسمِ مراسمی برای جشن‌گرفتن یک مناسبت؛ بدون آرتیکل."
  ],
  "7": [
    "verb",
    "Bei der Feier darfst du ohne Blitz fotografieren.",
    "در جشن اجازه داری بدون فلاش عکس بگیری.",
    "فعلِ عکس‌گرفتن با دوربین؛ مصدر."
  ],
  "8": [
    "noun",
    "Nach der Geburt bleibt die Mutter noch im Krankenhaus.",
    "مادر بعد از زایمان هنوز در بیمارستان می‌ماند.",
    "اسمِ رویداد به‌دنیا‌آمدن، نه سالگرد آن؛ بدون آرتیکل."
  ],
  "9": [
    "other",
    "Die Gäste kommen gegen sieben Uhr.",
    "مهمان‌ها حدود ساعت هفت می‌آیند.",
    "حرف اضافهٔ به معنی علیه یا حدودِ یک ساعت؛ با حرف کوچک."
  ],
  "10": [
    "adjective",
    "Die ganze Familie feiert gemeinsam.",
    "تمام خانواده با هم جشن می‌گیرند.",
    "واژهٔ وصفی برای کاری که با هم انجام می‌دهند؛ صورت پایه."
  ],
  "11": [
    "adjective",
    "Mit den Kerzen ist das Zimmer sehr gemütlich.",
    "اتاق با شمع‌ها خیلی دنج و دلپذیر است.",
    "صفتِ فضای دنج و راحت؛ صورت پایه."
  ],
  "12": [
    "noun",
    "Das Geschäft an der Ecke verkauft Blumen.",
    "مغازهٔ سر کوچه گل می‌فروشد.",
    "اسمِ مغازه یا کسب‌وکار؛ بدون آرتیکل."
  ],
  "13": [
    "noun",
    "Ein Haar liegt auf meiner Jacke.",
    "یک تار مو روی کتم است.",
    "اسمِ یک تار مو؛ مفرد و بدون آرتیکل."
  ],
  "14": [
    "noun",
    "Mein Herz schlägt vor Freude schneller.",
    "قلبم از خوشحالی تندتر می‌زند.",
    "اسمِ اندامی که خون را پمپ می‌کند؛ بدون آرتیکل."
  ],
  "15": [
    "noun",
    "Am Abend wird der Himmel langsam dunkel.",
    "عصر آسمان کم‌کم تاریک می‌شود.",
    "اسمِ فضای بالای سر که ابرها در آن دیده می‌شوند؛ بدون آرتیکل."
  ],
  "16": [
    "verb",
    "Wir können nur auf besseres Wetter hoffen.",
    "فقط می‌توانیم به هوای بهتر امیدوار باشیم.",
    "فعلِ امیدداشتن به رخ‌دادن چیزی؛ مصدر، نه اسمِ امید."
  ],
  "17": [
    "noun",
    "Die Hoffnung auf ein Wiedersehen bleibt.",
    "امید به دیدار دوباره باقی می‌ماند.",
    "اسمِ احساس امید به آینده؛ بدون آرتیکل، نه فعل."
  ],
  "18": [
    "noun",
    "Der Ingenieur erklärt uns den neuen Plan.",
    "مهندس مرد نقشهٔ جدید را برایمان توضیح می‌دهد.",
    "اسمِ مردی با حرفهٔ مهندسی؛ بدون آرتیکل."
  ],
  "19": [
    "noun",
    "Neben der Kirche gibt es einen kleinen Platz.",
    "کنار کلیسا میدان کوچکی هست.",
    "اسمِ ساختمان عبادت مسیحیان؛ بدون آرتیکل."
  ],
  "20": [
    "noun",
    "Wegen einer Krankheit kann er nicht mitfeiern.",
    "به‌دلیل یک بیماری نمی‌تواند در جشن شرکت کند.",
    "اسمِ وضعیت بیمار‌بودن؛ بدون آرتیکل."
  ],
  "21": [
    "noun",
    "Unser Nachbar hilft beim Aufbau der Tische.",
    "همسایهٔ مردِ ما در چیدن میزها کمک می‌کند.",
    "اسمِ مردی که نزدیک خانهٔ ما زندگی می‌کند؛ بدون آرتیکل."
  ],
  "22": [
    "other",
    "Zu Ostern besuchen wir unsere Verwandten.",
    "در عید پاک به دیدن بستگانمان می‌رویم.",
    "نامِ عید پاک؛ با حرف بزرگ و بدون آرتیکل."
  ],
  "23": [
    "noun",
    "Im Unterricht sprechen wir über Religion.",
    "در کلاس دربارهٔ دین صحبت می‌کنیم.",
    "اسمِ دین یا آیین مذهبی؛ بدون آرتیکل."
  ],
  "24": [
    "verb",
    "Wir möchten ihr zum Geburtstag Blumen schenken.",
    "می‌خواهیم برای تولدش به او گل هدیه بدهیم.",
    "فعلِ دادن چیزی به‌عنوان هدیه؛ مصدر."
  ],
  "25": [
    "adjective",
    "Bitte bestätigen Sie die Einladung schriftlich.",
    "لطفاً دعوت را به‌صورت کتبی تأیید کنید.",
    "صفتِ کتبی در برابر شفاهی؛ صورت پایه."
  ],
  "26": [
    "verb",
    "An diesen schönen Tag wird man sich erinnern.",
    "آدم این روز زیبا را به یاد خواهد آورد.",
    "فعل انعکاسیِ به‌یادآوردن؛ با ضمیر انعکاسی سوم‌شخص و مصدر کامل."
  ],
  "27": [
    "verb",
    "Über so eine Einladung kann man sich freuen.",
    "آدم می‌تواند از چنین دعوتی خوشحال شود.",
    "فعل انعکاسیِ خوشحال‌شدن؛ با ضمیر انعکاسی سوم‌شخص و مصدر کامل."
  ],
  "28": [
    "other",
    "An Silvester bleiben die Kinder länger wach.",
    "شب سال نو میلادی بچه‌ها بیشتر بیدار می‌مانند.",
    "نامِ شب پایان سال میلادی؛ با حرف بزرگ و بدون آرتیکل."
  ],
  "29": [
    "other",
    "Wir feiern nicht draußen, sondern im Wohnzimmer.",
    "بیرون جشن نمی‌گیریم، بلکه در اتاق نشیمن جشن می‌گیریم.",
    "حرف ربطِ بلکه که پس از نفی می‌آید."
  ],
  "30": [
    "noun",
    "Der Staat organisiert die öffentlichen Schulen.",
    "دولت مدرسه‌های دولتی را سازمان‌دهی می‌کند.",
    "اسمِ کشور یا دولت به‌عنوان ساختار سیاسی؛ بدون آرتیکل."
  ],
  "31": [
    "other",
    "Sie bringt Blumen statt einer Torte mit.",
    "او به‌جای کیک خامه‌ای گل می‌آورد.",
    "حرف اضافهٔ به‌جای؛ صورت تک‌واژه‌ای."
  ],
  "32": [
    "noun",
    "Diese Tradition gibt es in unserer Familie seit Jahren.",
    "این سنت سال‌هاست در خانوادهٔ ما وجود دارد.",
    "اسمِ سنت یا رسم منتقل‌شده بین نسل‌ها؛ واژهٔ بین‌المللی و بدون آرتیکل."
  ],
  "33": [
    "adjective",
    "Dieses Essen ist typisch für die Region.",
    "این غذا از خوراک‌های شاخص این منطقه است.",
    "صفتِ شاخص یا معمولِ یک منطقه یا گروه؛ صورت پایه."
  ],
  "34": [
    "adverb",
    "Die Feier dauert ungefähr drei Stunden.",
    "جشن تقریباً سه ساعت طول می‌کشد.",
    "قیدِ تقریب برای عدد یا مقدار، نه بیان احتمال."
  ],
  "35": [
    "verb",
    "Mit diesen Übungen kannst du deine Aussprache verbessern.",
    "با این تمرین‌ها می‌توانی تلفظت را بهتر کنی.",
    "فعلِ بهترکردن چیزی؛ مصدر و بدون ضمیر."
  ],
  "36": [
    "adjective",
    "Unsere Vorstellungen vom Fest sind verschieden.",
    "تصورهای ما از جشن متفاوت‌اند.",
    "صفتِ متفاوت یا گوناگون؛ صورت پایه و بدون پسوند صرفی."
  ],
  "37": [
    "verb",
    "Darf ich einen anderen Termin vorschlagen?",
    "اجازه دارم زمان دیگری پیشنهاد بدهم؟",
    "فعل جداشدنیِ پیشنهاد‌دادن؛ مصدر کامل."
  ],
  "38": [
    "adverb",
    "Sie kommt wahrscheinlich erst nach acht Uhr.",
    "او احتمالاً تازه بعد از ساعت هشت می‌آید.",
    "قیدِ بیان احتمال، نه تقریبِ عدد و مقدار."
  ],
  "39": [
    "other",
    "Vor Weihnachten schmücken wir die Fenster.",
    "پیش از کریسمس پنجره‌ها را تزیین می‌کنیم.",
    "نامِ جشن کریسمس؛ با حرف بزرگ و بدون آرتیکل."
  ],
  "40": [
    "other",
    "Wir bleiben zu Hause, weil unser Kind krank ist.",
    "در خانه می‌مانیم چون فرزندمان بیمار است.",
    "حرف ربطِ چون یا زیرا که جملهٔ وابسته می‌سازد."
  ],
  "41": [
    "noun",
    "Im Wohnzimmer ist genug Platz für alle Gäste.",
    "در اتاق نشیمن برای همهٔ مهمان‌ها جای کافی هست.",
    "اسمِ اتاقی برای نشستن و پذیرایی؛ بدون آرتیکل."
  ],
  "42": [
    "noun",
    "Dieser Zahn tut beim Essen weh.",
    "این دندان هنگام غذاخوردن درد می‌کند.",
    "اسمِ یکی از اندام‌های سختِ دهان برای جویدن؛ مفرد و بدون آرتیکل."
  ],
  "43": [
    "noun",
    "Der Zug nach Hamburg fährt von Gleis vier ab.",
    "قطار هامبورگ از سکوی چهار حرکت می‌کند.",
    "اسمِ وسیلهٔ نقلیهٔ ریلی؛ بدون آرتیکل."
  ]
}

export const lessonNineBundle = buildExcerptLesson({
  lesson: { lessonId: 'lesson-09', titleDe: "Feste feiern, wie sie fallen", titleFa: "جشن‌ها و مناسبت‌ها", level: 'A2', coverage: 'partial' },
  contentVersion: 'lesson-09-excerpt-v1',
  rows: lessonNineSourceRows,
  pedagogy: entryId => pedagogy[Number(entryId.slice(-3))],
  keyboardAlternatives: {"gemütlich":["gemuetlich"],"Geschäft":["Geschaeft"],"ungefähr":["ungefaehr"]},
  overlappingGroups: [["hoffen","die Hoffnung"],["Ostern","Silvester","Weihnachten"],["ungefähr","wahrscheinlich"]],
  provenance: {
    file: 'reference/vocabulary/Lesson-09-A2.txt', reviewStatus: 'excerpt-checked',
    noteFa: 'هر 43 مدخل فایل واژگان درس نهم با معنی، آرتیکل و ارجاع‌های درج‌شده آمده‌اند. سطح A2 مطابق همین منبع است. تطبیق گزیده تأیید جامع اصل کتاب نیست؛ مثال‌ها و جمله‌های تمرین تألیفی‌اند.',
  },
})
