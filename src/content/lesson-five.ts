import type { ContentBundle, Entry, SourceRef } from '../contracts/index.ts'
import { lessonFiveSourceRows } from './lesson-five-source.ts'
import { textbookStudyOrder } from './textbook-study-order.ts'

const lessonId = 'lesson-05'
type Pedagogy = readonly [partOfSpeech: Entry['partOfSpeech'], exampleDe: string, exampleFa: string, cueFa: string]

// Original authored learning sentences, not quotations from the source books.
// Stable source-row IDs own the pedagogy; editing a headword never reallocates an ID.
const pedagogy: Record<string, Pedagogy> = {
  'a1-l05-001': ['verb', 'Ich möchte dich am Bahnhof abholen.', 'می‌خواهم در ایستگاه قطار بیایم دنبالت.', 'فعل جداشدنی برای رفتن دنبال کسی در محل قرار؛ مصدر کامل را بنویس.'],
  'a1-l05-002': ['noun', 'Das Adjektiv beschreibt das Zimmer.', 'صفت، اتاق را توصیف می‌کند.', 'اسم خنثی برای نقش دستوریِ بیان ویژگی؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-003': ['phrase', 'Alles Gute für deine Reise!', 'بهترین آرزوها را برای سفرت دارم!', 'عبارت دوواژه‌ایِ آرزوی همهٔ خوبی‌ها؛ همان صورتِ آغازشده با حرف بزرگ در درس.'],
  'a1-l05-004': ['verb', 'Wir müssen den Vermieter anrufen.', 'باید به موجر تلفن کنیم.', 'فعل جداشدنی برای تلفن‌کردن به کسی؛ مصدر کامل را بنویس.'],
  'a1-l05-005': ['verb', 'Kannst du bitte die Tür aufmachen?', 'می‌توانی لطفاً در را باز کنی؟', 'فعل جداشدنیِ این درس برای بازکردن در؛ مصدر کامل را بنویس.'],
  'a1-l05-006': ['verb', 'Ich muss vor dem Duschen die Kleidung ausziehen.', 'باید قبل از دوش‌گرفتن لباس‌هایم را درآورم.', 'فعل جداشدنیِ از تن درآوردن که برای ترک خانه هم به کار می‌رود؛ مصدر کامل.'],
  'a1-l05-007': ['noun', 'Das Bad hat ein Fenster.', 'حمام یک پنجره دارد.', 'اسم خنثیِ کوتاه و سه‌حرفی برای حمام؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-008': ['noun', 'Die Badewanne ist weiß.', 'وان سفید است.', 'اسم مؤنث برای وان حمام؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-009': ['noun', 'Das Badezimmer ist neben der Küche.', 'حمام کنار آشپزخانه است.', 'اسم خنثیِ مرکب برای اتاق حمام؛ صورت بلندترِ این درس، حالت پایه و بدون آرتیکل.'],
  'a1-l05-010': ['noun', 'Der Balkon ist groß und sonnig.', 'بالکن بزرگ و آفتاب‌گیر است.', 'اسم مذکر برای بالکن؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-011': ['adjective', 'Dieser Stuhl ist billig.', 'این صندلی ارزان است.', 'صفتِ کم‌بودن قیمت؛ شکل پایه را بنویس.'],
  'a1-l05-012': ['verb', 'Heute möchten wir zu Hause bleiben.', 'امروز می‌خواهیم در خانه بمانیم.', 'فعلِ ماندن در یک جا؛ حالت مصدر را بنویس.'],
  'a1-l05-013': ['adjective', 'Der Eingang ist breit.', 'ورودی پهن است.', 'صفتِ زیادبودن عرض؛ شکل پایه را بنویس.'],
  'a1-l05-014': ['noun', 'Der Briefkasten ist vor dem Haus.', 'صندوق پست جلوی خانه است.', 'اسم مذکر برای صندوق دریافت نامه؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-015': ['verb', 'Kannst du mir ein Glas Wasser bringen?', 'می‌توانی یک لیوان آب برایم بیاوری؟', 'فعل سادهٔ آوردن چیزی نزد کسی؛ بدون پیشوند همراهی یا رفتن دنبال آن، حالت مصدر.'],
  'a1-l05-016': ['noun', 'Das Büro ist im ersten Stock.', 'دفتر کار در طبقهٔ اول است.', 'اسم خنثی برای دفتر کار؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-017': ['verb', 'Die Fahrt kann eine Stunde dauern.', 'این سفر ممکن است یک ساعت طول بکشد.', 'فعلِ طول‌کشیدن یک کار یا سفر؛ حالت مصدر را بنویس.'],
  'a1-l05-018': ['verb', 'Wir denken oft an unsere Familie.', 'ما اغلب به خانواده‌مان فکر می‌کنیم.', 'فعلِ فکرکردن؛ حالت مصدر را بنویس.'],
  'a1-l05-019': ['noun', 'Die Dusche ist neu.', 'دوش نو است.', 'اسم مؤنث برای دوش حمام؛ حالت پایه و بدون آرتیکل، نه فعل انجام آن.'],
  'a1-l05-020': ['verb', 'Ich möchte jetzt duschen.', 'می‌خواهم الان دوش بگیرم.', 'فعلِ دوش‌گرفتن؛ حالت مصدر را بنویس.'],
  'a1-l05-021': ['noun', 'Der Eingang ist neben dem Briefkasten.', 'ورودی کنار صندوق پست است.', 'اسم مذکر برای محل ورود به ساختمان؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-022': ['verb', 'Wir können morgen einziehen.', 'ما می‌توانیم فردا به خانهٔ جدید نقل مکان کنیم.', 'فعل جداشدنی برای وارد خانهٔ جدید شدن و ساکن‌شدن؛ مصدر کامل را بنویس.'],
  'a1-l05-023': ['noun', 'Der Erfolg ist für uns wichtig.', 'موفقیت برای ما مهم است.', 'اسم مذکر برای نتیجهٔ موفقِ یک کار؛ حالت پایه و بدون آرتیکل، نه عبارت آرزوی موفقیت.'],
  'a1-l05-024': ['noun', 'Meine Erkältung dauert schon drei Tage.', 'سرماخوردگی من تا حالا سه روز طول کشیده است.', 'اسم مؤنث برای بیماریِ سرماخوردگی؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-025': ['verb', 'Wir können den Bahnhof zu Fuß erreichen.', 'می‌توانیم پیاده به ایستگاه قطار برسیم.', 'فعلِ رسیدن به یک مقصد یا دسترسی‌یافتن به کسی؛ حالت مصدر را بنویس.'],
  'a1-l05-026': ['phrase', 'Es geht, danke.', 'بد نیستم، ممنون.', 'پاسخ کوتاه دوواژه‌ای برای حالِ نه خوب و نه بد؛ همان صورتِ آغازشده با حرف بزرگ در درس.'],
  'a1-l05-027': ['noun', 'Das Fieber ist heute weg.', 'امروز تب برطرف شده است.', 'اسم خنثی برای بالارفتن دمای بدن هنگام بیماری؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-028': ['noun', 'Der Flur ist hell.', 'راهرو روشن است.', 'اسم مذکر برای راهروی داخل خانه؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-029': ['noun', 'Das Geld liegt auf dem Tisch.', 'پول روی میز است.', 'اسم خنثی برای پول؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-030': ['noun', 'Das Glück ist heute auf unserer Seite.', 'امروز شانس با ماست.', 'اسم خنثی برای شانس یا خوشبختی؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-031': ['noun', 'Die Größe der Küche ist für mich wichtig.', 'اندازهٔ آشپزخانه برای من مهم است.', 'اسم مؤنث برای اندازه یا قد؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-032': ['phrase', 'Gute Besserung, lieber Paul!', 'پل عزیز، امیدوارم زود خوب شوی!', 'عبارت دوواژه‌ایِ آرزوی بهبودی برای بیمار؛ همان صورتِ آغازشده با حرف بزرگ در درس.'],
  'a1-l05-033': ['noun', 'Die Heizung im Büro ist neu.', 'سیستم گرمایشی دفتر کار نو است.', 'اسم مؤنث برای وسیله یا سیستم گرمایشی؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-034': ['adjective', 'Die Wand ist drei Meter hoch.', 'ارتفاع دیوار سه متر است.', 'صفتِ زیادبودن ارتفاع؛ شکل پایه را بنویس.'],
  'a1-l05-035': ['verb', 'Ich muss noch Milch holen.', 'هنوز باید بروم شیر بیاورم.', 'فعل سادهٔ پنج‌حرفی برای رفتن و آوردن چیزی؛ بدون پیشوند، حالت مصدر.'],
  'a1-l05-036': ['verb', 'Wir müssen die Mieter informieren.', 'باید به مستأجران اطلاع بدهیم.', 'فعلِ اطلاع‌دادن به دیگران؛ حالت مصدر را بنویس.'],
  'a1-l05-037': ['noun', 'Das Internet funktioniert heute nicht.', 'اینترنت امروز کار نمی‌کند.', 'اسم خنثی برای اینترنت؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-038': ['adjective', 'Ohne Heizung ist das Zimmer kalt.', 'بدون وسیلهٔ گرمایشی، اتاق سرد است.', 'صفتِ پایین‌بودن دما؛ شکل پایه را بنویس.'],
  'a1-l05-039': ['adjective', 'Die Lampe im Flur ist kaputt.', 'چراغ راهرو خراب است.', 'صفتِ از کار افتادن یا شکسته‌بودن یک وسیله؛ شکل پایه را بنویس.'],
  'a1-l05-040': ['noun', 'Die Kommode hat drei Schubladen.', 'دراور سه کشو دارد.', 'اسم مؤنث برای کمد کشودارِ کوتاه یا دراور؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-041': ['adjective', 'Mein Mitbewohner ist krank.', 'هم‌خانهٔ من بیمار است.', 'صفتِ بیمار بودنِ شخص؛ شکل پایه را بنویس.'],
  'a1-l05-042': ['noun', 'Die Küche ist sehr modern.', 'آشپزخانه بسیار مدرن است.', 'اسم مؤنث برای اتاق پخت‌وپز؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-043': ['noun', 'Die Lampe steht auf der Kommode.', 'چراغ روی دراور است.', 'اسم مؤنث برای چراغ؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-044': ['adjective', 'Der Schrank ist noch leer.', 'کمد هنوز خالی است.', 'صفتِ نبودن چیزی در یک ظرف یا فضا؛ شکل پایه را بنویس.'],
  'a1-l05-045': ['adverb', 'Wir spielen manchmal im Garten.', 'ما گاهی در باغ بازی می‌کنیم.', 'قیدِ تکرار گاه‌به‌گاه و نه همیشه؛ صورت آموخته‌شدهٔ این درس.'],
  'a1-l05-046': ['noun', 'Die Miete beträgt fünfhundert Euro.', 'اجاره‌بها پانصد یورو است.', 'اسم مؤنث برای مبلغی که هر ماه بابت خانه می‌پردازند؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-047': ['verb', 'Wir wollen ein Zimmer mieten.', 'می‌خواهیم یک اتاق اجاره کنیم.', 'فعلِ اجاره‌کردن برای استفادهٔ خود؛ حالت مصدر، نه اجاره‌دادن به دیگری.'],
  'a1-l05-048': ['noun', 'Der Mieter sucht den Briefkasten.', 'مستأجر مرد دنبال صندوق پست می‌گردد.', 'اسم مذکر برای مردی که خانه را از مالک اجاره می‌کند؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-049': ['noun', 'Die Mieterin wohnt im zweiten Stock.', 'مستأجر زن در طبقهٔ دوم زندگی می‌کند.', 'اسم مؤنث برای زنی که خانه را از مالک اجاره می‌کند؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-050': ['noun', 'Der Mietvertrag liegt im Büro.', 'قرارداد اجاره در دفتر کار است.', 'اسم مذکرِ مرکب برای قرارداد اجاره؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-051': ['noun', 'Mein Mitbewohner studiert in Berlin.', 'هم‌خانهٔ مرد من در برلین در دانشگاه تحصیل می‌کند.', 'اسم مذکر برای مردی که با او در یک خانه زندگی می‌کنی؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-052': ['verb', 'Kannst du deine Lampe mitbringen?', 'می‌توانی چراغت را همراه خود بیاوری؟', 'فعل جداشدنیِ همراه خود آوردن هنگام آمدن؛ مصدر کامل را بنویس.'],
  'a1-l05-053': ['noun', 'Die Möbel sind sehr bequem.', 'مبلمان بسیار راحت است.', 'اسمِ جمع برای وسایل خانه مانند میز و مبل؛ همان صورت جمعِ درس و بدون آرتیکل.'],
  'a1-l05-054': ['adjective', 'Unsere Heizung ist modern.', 'سیستم گرمایشی ما مدرن است.', 'صفتِ امروزی و مطابق شیوه‌های تازه؛ شکل پایهٔ آموخته‌شدهٔ این درس.'],
  'a1-l05-055': ['noun', 'Die Nachricht kommt von meinem Mitbewohner.', 'پیام از طرف هم‌خانهٔ من است.', 'اسم مؤنث برای پیام یا خبر؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-056': ['adjective', 'Die Decke im Flur ist niedrig.', 'سقف راهرو کم‌ارتفاع است.', 'صفتِ کم‌بودن ارتفاع؛ شکل پایه را بنویس.'],
  'a1-l05-057': ['adverb', 'Wir sprechen persönlich mit der Vermieterin.', 'ما حضوری با موجر زن صحبت می‌کنیم.', 'واژهٔ بیانِ ملاقات حضوری با خود شخص، نه تلفنی؛ شکل پایهٔ آموخته‌شدهٔ این درس.'],
  'a1-l05-058': ['noun', 'Das Regal ist aus Holz.', 'قفسه از چوب است.', 'اسم خنثی برای قفسهٔ باز؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-059': ['verb', 'Wir müssen die Dusche reparieren.', 'باید دوش را تعمیر کنیم.', 'فعلِ تعمیرکردن وسیلهٔ خراب؛ حالت مصدر را بنویس.'],
  'a1-l05-060': ['adjective', 'Der Balkon ist zu schmal für das Sofa.', 'بالکن برای این مبل بیش از حد باریک است.', 'صفتِ کم‌بودن عرض؛ شکل پایه را بنویس.'],
  'a1-l05-061': ['noun', 'Der Schrank hat zwei Türen.', 'کمد دو در دارد.', 'اسم مذکر برای کمدِ دردار؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-062': ['adjective', 'Meine Lampe ist schwarz.', 'چراغ من سیاه است.', 'نام رنگِ سیاه؛ شکل پایه با حرف کوچک را بنویس.'],
  'a1-l05-063': ['noun', 'Der Sessel ist neben dem Sofa.', 'مبل تک‌نفره کنار مبل راحتی است.', 'اسم مذکر برای مبل تک‌نفره؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-064': ['verb', 'Wir möchten auf dem Balkon sitzen.', 'می‌خواهیم در بالکن بنشینیم.', 'فعلِ نشسته‌بودن؛ حالت مصدر را بنویس.'],
  'a1-l05-065': ['adverb', 'Die Vermieterin antwortet sofort.', 'موجر زن فوراً جواب می‌دهد.', 'قیدِ انجام کار بی‌درنگ و بدون تأخیر؛ صورت آموخته‌شدهٔ این درس.'],
  'a1-l05-066': ['adverb', 'Heute komme ich spät nach Hause.', 'امروز دیر به خانه می‌آیم.', 'قیدِ زمان برای دیر رسیدن، در برابر زود؛ شکل پایه را بنویس.'],
  'a1-l05-067': ['noun', 'Im ersten Stock wohnt meine Freundin.', 'دوست من در طبقهٔ اول زندگی می‌کند.', 'اسم مذکر برای طبقهٔ ساختمان که معنی چوب‌دستی هم دارد؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-068': ['noun', 'Der Stuhl steht vor dem Schreibtisch.', 'صندلی جلوی میز تحریر است.', 'اسم مذکر برای صندلی؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-069': ['noun', 'Die Toilette hat ein kleines Fenster.', 'توالت یک پنجرهٔ کوچک دارد.', 'اسم مؤنث برای توالت؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-070': ['noun', 'Die Überraschung ist für meine Schwester.', 'این غافلگیری برای خواهر من است.', 'اسم مؤنث برای اتفاق یا هدیهٔ غیرمنتظره؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-071': ['verb', 'Wir dürfen den Mietvertrag nicht vergessen.', 'نباید قرارداد اجاره را فراموش کنیم.', 'فعلِ فراموش‌کردن؛ حالت مصدر را بنویس.'],
  'a1-l05-072': ['noun', 'Der Vermieter repariert die Lampe.', 'موجر مرد چراغ را تعمیر می‌کند.', 'اسم مذکر برای مردی که خانه را به مستأجر اجاره می‌دهد؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-073': ['noun', 'Die Vermieterin bringt den Mietvertrag.', 'موجر زن قرارداد اجاره را می‌آورد.', 'اسم مؤنث برای زنی که خانه را به مستأجر اجاره می‌دهد؛ حالت پایه و بدون آرتیکل.'],
  'a1-l05-074': ['phrase', 'Viel Erfolg beim Deutschlernen!', 'در یادگیری آلمانی موفق باشی!', 'عبارت دوواژه‌ایِ آرزوی موفقیت در یک کار؛ همان صورتِ آغازشده با حرف بزرگ در درس.'],
  'a1-l05-075': ['adjective', 'Eine gute Heizung ist im Winter wichtig.', 'سیستم گرمایشی خوب در زمستان مهم است.', 'صفتِ دارای اهمیت؛ شکل پایه را بنویس.'],
  'a1-l05-076': ['noun', 'Die Wohngemeinschaft hat vier Zimmer.', 'خانهٔ اشتراکی چهار اتاق دارد.', 'اسم مؤنث برای خانه‌ای که چند نفر مشترکاً در آن زندگی می‌کنند؛ صورت کامل و بدون آرتیکل.'],
}

// Explicit alternatives reviewed for keyboard input; never generated by the grader.
const keyboardAlternatives: Record<string, string[]> = {
  Büro: ['Buero'], Erkältung: ['Erkaeltung'], Glück: ['Glueck'], Größe: ['Groesse', 'Grösse'],
  Küche: ['Kueche'], Möbel: ['Moebel'], persönlich: ['persoenlich'], spät: ['spaet'], Überraschung: ['Ueberraschung'],
}

function sourceIdFor(locator: string): string {
  if (locator.startsWith('کتاب درسی:')) return 'source-textbook'
  if (locator.startsWith('کتاب تمرین:')) return 'source-workbook'
  if (locator.startsWith('متن گفت‌وگوهای صوتی:')) return 'source-audio-transcript'
  throw new Error(`Unknown lesson-five source: ${locator}`)
}

const sourceRefs: SourceRef[] = lessonFiveSourceRows.flatMap(row => row.refs.map((locator, index) => ({
  sourceRefId: `${row.entryId}-ref-${index + 1}`, sourceId: sourceIdFor(locator), lessonId, locator,
})))

const studyOrder = textbookStudyOrder(lessonFiveSourceRows)

// Do not ask learners to distinguish near-equivalent bathroom/fetching meanings.
const overlappingGroups = [['das Bad', 'das Badezimmer'], ['abholen', 'holen', 'bringen', 'mitbringen']]
const entries: Entry[] = lessonFiveSourceRows.map((row, index) => {
  const [partOfSpeech, exampleDe, exampleFa, cueFa] = pedagogy[row.entryId]
  const nounMatch = row.headword.match(/^(der|die|das) (.+)$/)
  const article = nounMatch?.[1] as 'der' | 'die' | 'das' | undefined
  const lemma = nounMatch?.[2] ?? row.headword
  const answers = [lemma, ...(keyboardAlternatives[lemma] ?? [])]
  const sourceRefIds = sourceRefs.filter(ref => ref.sourceRefId.startsWith(`${row.entryId}-ref-`)).map(ref => ref.sourceRefId)
  if (!exampleDe.includes(lemma)) throw new Error(`Example must contain canonical headword: ${row.entryId}`)
  const excluded = overlappingGroups.find(group => group.includes(row.headword)) ?? []
  const candidates = lessonFiveSourceRows.filter(other => other.entryId !== row.entryId && !excluded.includes(other.headword) && other.meaningFa !== row.meaningFa)
  const sameRole = candidates.filter(other => pedagogy[other.entryId][0] === partOfSpeech)
  const otherRole = candidates.filter(other => pedagogy[other.entryId][0] !== partOfSpeech)
  const optionPool = [...new Map((sameRole.length >= 3 ? sameRole : [...sameRole, ...otherRole]).map(other => [other.meaningFa, other])).values()]
  const options = [0, 1, 2].map(offset => optionPool[(index + offset) % optionPool.length].entryId)
  return {
    entryId: row.entryId, introducedInLessonId: lessonId, introductionOrder: studyOrder.get(row.entryId)!,
    lemma, partOfSpeech, meaningFa: row.meaningFa,
    ...(article ? { nounData: { article, plural: null, pluralNote: lemma === 'Möbel'
      ? 'این مدخل در فایل به‌صورت جمع آمده است؛ صورت مفرد ارائه نشده است.'
      : 'جمع در فایل واژگان ارائه نشده است؛ صورت جمع حدس زده نشده است.' } } : {}),
    sourceRefIds, occurrences: [{ lessonId, sourceRefIds: [...sourceRefIds] }],
    examples: [{ exampleId: `${row.entryId}-example`, de: exampleDe, fa: exampleFa, origin: 'authored' }],
    cloze: { sentence: exampleDe.replace(lemma, '___'), translationFa: exampleFa, acceptedAnswers: [...answers], exampleId: `${row.entryId}-example` },
    writing: { promptFa: row.meaningFa, cueFa, acceptedAnswers: [...answers], caseSensitive: false },
    meaningOptionEntryIds: [row.entryId, ...options],
    enabledExercises: ['flashcard', 'choose-meaning', 'cloze', 'match', 'write-word', ...(article ? ['choose-article' as const] : [])],
    reviewStatus: 'excerpt-checked',
  }
})

export const lessonFiveBundle: ContentBundle = {
  contentVersion: 'lesson-05-excerpt-v1',
  sources: [
    { sourceId: 'source-textbook', kind: 'textbook', title: 'DaF kompakt A1–B1 — کتاب درسی', edition: null },
    { sourceId: 'source-workbook', kind: 'workbook', title: 'DaF kompakt A1–B1 — کتاب تمرین', edition: null },
    { sourceId: 'source-audio-transcript', kind: 'audioTranscript', title: 'DaF kompakt A1–B1 — متن گفت‌وگوهای صوتی', edition: null },
  ],
  sourceRefs,
  lesson: { lessonId, titleDe: 'Endlich ein Zimmer!', titleFa: 'بالاخره یک اتاق!', level: 'A1', coverage: 'partial', introducedEntryIds: [...studyOrder.keys()] },
  entries,
  provenance: {
    file: 'reference/vocabulary/Lesson-05-A1.txt', reviewStatus: 'excerpt-checked',
    noteFa: 'هر ۷۶ مدخل فایل واژگان درس پنجم با معنی، آرتیکل و تمام ارجاع‌های درج‌شده حفظ شده‌اند. تطبیق این گزیده تأیید جامع اصل کتاب نیست. تمام مثال‌ها و جمله‌های تمرین تألیفی‌اند؛ صورت‌های ارائه‌نشده و ویرایش کتاب حدس زده نشده‌اند.',
  },
}
