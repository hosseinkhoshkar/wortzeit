import { buildExcerptLesson, type ExcerptPedagogy } from './excerpt-lesson.ts'
import { lessonElevenSourceRows } from './lesson-eleven-source.ts'

// Authored examples and cues keyed by the fixed source row ID.
const pedagogy: Record<number, ExcerptPedagogy> = {
  1: ['adjective', 'Die Liste ist noch aktuell.', 'فهرست هنوز به‌روز است.', 'صفتِ اطلاعاتی که برای زمان حال معتبر و به‌روز است.'],
  2: ['verb', 'Das Zentrum möchte mehr Sprachkurse anbieten.', 'مرکز می‌خواهد دوره‌های زبان بیشتری ارائه کند.', 'مصدر فعل جداشدنیِ عرضه‌کردن کالا یا ارائهٔ خدمات.'],
  3: ['noun', 'Bis zur Ankunft des Busses bleiben wir hier.', 'تا رسیدن اتوبوس اینجا می‌مانیم.', 'اسمِ رسیدن به مقصد، بدون آرتیکل.'],
  4: ['verb', 'Vor dem Besuch müssen wir die Wohnung aufräumen.', 'پیش از آمدن مهمان‌ها باید خانه را مرتب کنیم.', 'مصدر فعل جداشدنیِ مرتب‌کردن جا یا وسایل.'],
  5: ['noun', 'Das linke Auge ist rot.', 'چشم چپ قرمز است.', 'اسمِ عضو بینایی، مفرد و بدون آرتیکل.'],
  6: ['noun', 'Nach zwei Jahren im Ausland kommt er zurück.', 'پس از دو سال زندگی در خارج از کشور برمی‌گردد.', 'اسمِ خارج از کشور در برابر داخل کشور، بدون آرتیکل.'],
  7: ['noun', 'Bei diesem Wort ist die Aussprache schwierig.', 'تلفظ این واژه دشوار است.', 'اسمِ شیوهٔ اداکردن یک واژه، بدون آرتیکل.'],
  8: ['adjective', 'Das Museum ist für seine Sammlung bekannt.', 'موزه به‌خاطر مجموعه‌اش شناخته‌شده است.', 'صفتِ کسی یا چیزی که دیگران آن را می‌شناسند.'],
  9: ['adjective', 'Dieser Treffpunkt ist bei Studierenden sehr beliebt.', 'این محل قرار بین دانشجوها خیلی محبوب است.', 'صفتِ کسی یا چیزی که افراد زیادی دوستش دارند.'],
  10: ['noun', 'Die Bibliothek bleibt am Montag geschlossen.', 'کتابخانه دوشنبه بسته می‌ماند.', 'اسمِ محل مطالعه و امانت‌گرفتن کتاب، بدون آرتیکل.'],
  11: ['noun', 'Ein Bürger der Stadt hat die Frage gestellt.', 'یکی از شهروندان مردِ شهر این پرسش را مطرح کرد.', 'اسمِ شهروند مرد، به صورت مفرد و بدون آرتیکل.'],
  12: ['noun', 'Eine Bürgerin hat das Projekt vorgeschlagen.', 'یکی از شهروندان زن این طرح را پیشنهاد داد.', 'اسمِ شهروند زن، به صورت مفرد و بدون آرتیکل.'],
  13: ['noun', 'Für diese Aufgabe braucht man Erfahrung.', 'برای این کار به تجربه نیاز است.', 'اسمِ تجربه‌ای که از انجام کار یا زندگی به دست می‌آید، بدون آرتیکل.'],
  14: ['verb', 'In Köln kann man viel Neues erleben.', 'در کلن می‌توان چیزهای تازهٔ زیادی تجربه کرد.', 'مصدر فعلِ تجربه‌کردن یک رویداد یا از سر گذراندن آن.'],
  15: ['noun', 'In diesem Fach schreiben wir morgen einen Test.', 'فردا در این درس امتحان کتبی داریم.', 'اسمِ درس یا رشتهٔ تخصصی که معنی محفظه هم دارد، بدون آرتیکل.'],
  16: ['adjective', 'Am ersten Tag war mir hier noch alles fremd.', 'روز اول هنوز همه‌چیز اینجا برایم ناآشنا بود.', 'صفتِ چیزی که با آن آشنا نیستی یا برایت بیگانه است.'],
  17: ['noun', 'In der Schule lernen wir eine zweite Fremdsprache.', 'در مدرسه یک زبان خارجی دوم یاد می‌گیریم.', 'اسم مرکبِ زبان خارجی، مفرد و بدون آرتیکل.'],
  18: ['noun', 'Ihre Freude über die Nachricht war groß.', 'او از شنیدن خبر خیلی خوشحال شد.', 'اسمِ احساس شادی و خوشحالی، بدون آرتیکل.'],
  19: ['noun', 'Für den neuen Ausweis fällt eine Gebühr an.', 'برای کارت شناسایی جدید باید هزینه‌ای پرداخت کرد.', 'اسمِ مبلغی که بابت دریافت یک خدمت می‌پردازیم، بدون آرتیکل.'],
  20: ['noun', 'Unser Geschirrspüler ist seit gestern kaputt.', 'ماشین ظرف‌شویی ما از دیروز خراب است.', 'اسم مرکبِ دستگاه شستن ظرف‌ها، بدون آرتیکل.'],
  21: ['other', 'Ich sagte „Gesundheit!“, als Paul niesen musste.', 'وقتی پاول عطسه کرد، گفتم «عافیت باشد!»', 'واژه‌ای که در واکنش به عطسه می‌گویند. فقط خود واژه را بنویس.'],
  22: ['noun', 'Gesundheit ist wichtiger als Geld.', 'سلامتی از پول مهم‌تر است.', 'اسمِ سلامتی به معنی تندرستی، بدون آرتیکل.'],
  23: ['verb', 'Das kann ich kaum glauben.', 'به‌سختی می‌توانم این را باور کنم.', 'مصدر فعلِ باورداشتن یا گمان‌کردن.'],
  24: ['noun', 'Im Kurs sprechen wir über das Grundgesetz.', 'در کلاس دربارهٔ قانون اساسی آلمان صحبت می‌کنیم.', 'اسمِ قانون اساسی آلمان، بدون آرتیکل.'],
  25: ['noun', 'An der Hochschule gibt es einen Infotag.', 'در مؤسسهٔ آموزش عالی یک روز برای آشنایی و اطلاع‌رسانی برگزار می‌شود.', 'اسمِ مؤسسه‌ای برای تحصیلات عالی، بدون آرتیکل.'],
  26: ['noun', 'Der Husten ist nach ein paar Tagen besser geworden.', 'سرفه بعد از چند روز بهتر شده است.', 'اسمِ سرفه، بدون آرتیکل.'],
  27: ['noun', 'Ich möchte auch deine Meinung hören.', 'می‌خواهم نظر تو را هم بشنوم.', 'اسمِ نظر یا دیدگاه شخص دربارهٔ چیزی، بدون آرتیکل.'],
  28: ['adverb', 'Für die Anmeldung brauchst du mindestens zwei Dokumente.', 'برای ثبت‌نام دست‌کم دو مدرک لازم داری.', 'قیدِ نشان‌دهندهٔ حداقل تعداد یا مقدار.'],
  29: ['noun', 'Im Garten finde ich nach der Arbeit Ruhe.', 'پس از کار در باغ آرامش پیدا می‌کنم.', 'اسمِ آرامش یا سکوت، بدون آرتیکل.'],
  30: ['noun', 'Das nächste Semester endet im Juli.', 'نیمسال تحصیلی بعدی در ماه ژوئیه پایان می‌یابد.', 'اسمِ نیمسال تحصیلی، مفرد و بدون آرتیکل.'],
  31: ['verb', 'Nach dem langen Flug möchte sie sich erholen.', 'او می‌خواهد بعد از پرواز طولانی تجدید قوا کند.', 'مصدر فعلِ تجدید قوا یا بهبودی، همراه با ضمیر انعکاسی سوم‌شخص.'],
  32: ['verb', 'Wie wird sie sich fühlen, wenn sie allein in der neuen Stadt ist?', 'وقتی در شهر جدید تنها باشد، چه احساسی خواهد داشت؟', 'مصدر فعلِ احساس‌کردن دربارهٔ حال خود، همراه با ضمیر انعکاسی سوم‌شخص.'],
  33: ['verb', 'Um die Anmeldung muss er sich kümmern.', 'او باید به کار ثبت‌نام رسیدگی کند.', 'مصدر فعلِ رسیدگی‌کردن به کار یا کسی، همراه با ضمیر انعکاسی سوم‌شخص.'],
  34: ['noun', 'Für ihr Studium zieht sie nach Köln.', 'برای تحصیل دانشگاهی به کلن نقل مکان می‌کند.', 'اسمِ دورهٔ تحصیل دانشگاهی، بدون آرتیکل.'],
  35: ['noun', 'Vor dem Umzug packen wir die Bücher ein.', 'پیش از اسباب‌کشی کتاب‌ها را بسته‌بندی می‌کنیم.', 'اسمِ اسباب‌کشی یا رژه، بدون آرتیکل.'],
  36: ['noun', 'Der Unterschied zwischen den beiden Kursen ist klein.', 'تفاوت میان دو دوره کم است.', 'اسمِ تفاوت بین دو چیز، بدون آرتیکل.'],
  37: ['verb', 'Neue Erfahrungen können einen Menschen verändern.', 'تجربه‌های تازه می‌توانند آدم را تغییر دهند.', 'مصدر فعلِ تغییردادن با پیشوندِ جدانشدنیِ سه‌حرفی.'],
  38: ['adjective', 'Um sechs Uhr war ich schon wach.', 'ساعت شش دیگر بیدار بودم.', 'صفتِ کسی که خواب نیست.'],
}

export const lessonElevenBundle = buildExcerptLesson({
  lesson: { lessonId: 'lesson-11', titleDe: 'Neu in Köln', titleFa: 'تازه‌وارد در کلن', level: 'A2', coverage: 'partial' },
  contentVersion: 'lesson-11-excerpt-v1',
  rows: lessonElevenSourceRows,
  pedagogy: entryId => pedagogy[Number(entryId.slice(-3))],
  keyboardAlternatives: {
    aufräumen: ['aufraeumen'], Bürger: ['Buerger'], Bürgerin: ['Buergerin'],
    Gebühr: ['Gebuehr'], Geschirrspüler: ['Geschirrspueler'],
    'sich fühlen': ['sich fuehlen'], 'sich kümmern': ['sich kuemmern'],
  },
  overlappingGroups: [
    ['Gesundheit', 'die Gesundheit'], ['der Bürger', 'die Bürgerin'],
    ['bekannt', 'beliebt'], ['die Hochschule', 'das Studium', 'das Fach', 'das Semester'],
  ],
  provenance: {
    file: 'reference/vocabulary/Lesson-11-A2.txt', reviewStatus: 'excerpt-checked',
    noteFa: '۳۸ مدخل گزیدهٔ درس یازدهم با معنی، آرتیکل و تمام ارجاع‌های ثبت‌شده آمده‌اند. سطح A2 از فایل مرجع است. مثال‌ها و جمله‌های تمرین تألیفی‌اند.',
  },
})
