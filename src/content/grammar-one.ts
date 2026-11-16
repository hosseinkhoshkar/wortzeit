export interface GrammarQuestion {
  questionId: string
  lessonId: string
  topicFa: string
  promptFa: string
  sentenceDe: string
  options: [string, string, string, string]
  answer: string
  explanationFa: string
  locator: string
  origin: 'authored'
}
export const grammarSource = {
  title: 'DaF kompakt A1–B1، درس۱: Ich und die anderen',
  url: 'https://plato.acadiau.ca/courses/germ/shared/Lehrwerke/676180_DaF%20kompakt%20A1-B1_LAB_Probeseiten_A1_Lektion1.pdf',
  noteFa: 'سؤال‌ها تألیفی‌اند؛ مباحث با نمونهٔ کتاب، صفحات چاپی۱۰ تا۱۷ تطبیق دارند.',
}
const rows: [string, string, string, [string, string, string, string], string, string][] = [
  ['فعل sein', 'Ich ___ Sara.', 'bin', ['bin', 'bist', 'ist', 'sind'], 'با ich، صورت فعل sein برابر bin است.', 'چاپی۱۰ و۱۷'],
  ['فعل sein', 'Du ___ im Team.', 'bist', ['bist', 'bin', 'seid', 'sind'], 'برای du از bist استفاده می‌کنیم.', 'چاپی۱۲ و۱۷'],
  ['فعل sein', 'Wir ___ aus Italien.', 'sind', ['sind', 'seid', 'ist', 'bin'], 'برای wir، صورت فعل sein برابر sind است.', 'چاپی۱۲ و۱۷'],
  ['فعل sein', 'Ihr ___ in Hamburg.', 'seid', ['seid', 'sind', 'bist', 'ist'], 'ضمیر ihr به صورت seid نیاز دارد.', 'چاپی۱۲ و۱۷'],
  ['صرف فعل', 'Ich ___ in Bonn.', 'wohne', ['wohne', 'wohnst', 'wohnt', 'wohnen'], 'فعل wohnen با ich پایانۀ e می‌گیرد: wohne.', 'چاپی۱۵ و۱۷'],
  ['صرف فعل', 'Du ___ aus Spanien.', 'kommst', ['kommst', 'komme', 'kommt', 'kommen'], 'فعل kommen برای du پایانۀ st می‌گیرد.', 'چاپی۱۲ و۱۷'],
  ['صرف فعل', 'Anna ___ in Berlin.', 'arbeitet', ['arbeitet', 'arbeiten', 'arbeitest', 'arbeite'], 'Anna سوم‌شخص مفرد است. برای arbeiten، به‌دلیل پایانۀ t در ریشه، صورت درست arbeitet است.', 'چاپی۱۲ و۱۷'],
  ['صرف فعل', 'Wir ___ zusammen.', 'arbeiten', ['arbeiten', 'arbeitet', 'arbeitest', 'arbeite'], 'برای wir، صورت فعل با en تمام می‌شود: arbeiten.', 'چاپی۱۲ و۱۷'],
  ['خطاب رسمی و دوستانه', 'Wie ___ du?', 'heißt', ['heißt', 'heiße', 'heißen', 'heißest'], 'در خطاب دوستانه با du، صورت درست heißt است؛ بعد از صدای s در ریشه، s دیگری اضافه نمی‌شود.', 'چاپی۱۲ و۱۷'],
  ['خطاب رسمی و دوستانه', 'Woher ___ Sie, Frau Lang?', 'kommen', ['kommen', 'kommst', 'kommt', 'komme'], 'در خطاب رسمی با Sie، فعل به صورت kommen می‌آید.', 'چاپی۱۰ و۱۷'],
  ['خطاب رسمی و دوستانه', 'Wo ___ du, Amir?', 'wohnst', ['wohnst', 'wohne', 'wohnt', 'wohnen'], 'با du، شکل درست wohnen برابر wohnst است.', 'چاپی۱۵ و۱۷'],
  ['خطاب رسمی و دوستانه', 'Wie ___ Sie, Herr Berg?', 'heißen', ['heißen', 'heißt', 'heiße', 'heißest'], 'با Sie رسمی، فعل heißen به همان صورت heißen صرف می‌شود.', 'چاپی۱۰ و۱۷'],
  ['ضمیرهای شخصی', 'Das ist Anna. ___ wohnt in Bonn.', 'Sie', ['Sie', 'Er', 'Wir', 'Ihr'], 'Anna یک زن است؛ در جملهٔ بعد برای اشاره به او از sie استفاده می‌کنیم. اینجا به‌دلیل شروع جمله، Sie با حرف بزرگ نوشته می‌شود.', 'چاپی۱۲ و۱۵'],
  ['ضمیرهای شخصی', 'Das ist Amir. ___ kommt aus dem Iran.', 'Er', ['Er', 'Sie', 'Wir', 'Ihr'], 'برای اشاره به یک مرد از er استفاده می‌کنیم.', 'چاپی۱۲ و۱۵'],
  ['ضمیرهای شخصی', 'Anna und ich arbeiten hier. ___ sind ein Team.', 'Wir', ['Wir', 'Ihr', 'Er', 'Du'], 'وقتی خودِ گوینده همراه فرد دیگری است، ضمیر wir به کار می‌رود.', 'چاپی۱۲'],
  ['ضمیرهای شخصی', 'Anna und Tom, ___ seid ein Team.', 'ihr', ['ihr', 'wir', 'du', 'er'], 'گوینده دو نفر را دوستانه خطاب می‌کند؛ ضمیر ihr است و با seid هماهنگی دارد.', 'چاپی۱۲ و۱۷'],
  ['پرسش‌واژه‌ها', '___ heißt du? — Ich heiße Sara.', 'Wie', ['Wie', 'Wo', 'Woher', 'Wer'], 'برای پرسیدن نام با فعل heißen از Wie استفاده می‌کنیم.', 'چاپی۱۱ و۱۷'],
  ['پرسش‌واژه‌ها', '___ wohnst du? — In Hamburg.', 'Wo', ['Wo', 'Wie', 'Woher', 'Wer'], 'Wo دربارهٔ مکان فعلی یا محل زندگی می‌پرسد؛ پاسخ با in آمده است.', 'چاپی۱۵ و۱۷'],
  ['پرسش‌واژه‌ها', '___ kommen Sie? — Aus Italien.', 'Woher', ['Woher', 'Wo', 'Wie', 'Wer'], 'Woher مبدأ را می‌پرسد و پاسخ معمولاً با aus می‌آید.', 'چاپی۱۱ و۱۷'],
  ['پرسش‌واژه‌ها', '___ ist das? — Das ist Anna.', 'Wer', ['Wer', 'Wo', 'Woher', 'Wie'], 'برای پرسیدن هویت یک شخص، Wer به معنی «چه کسی» است.', 'چاپی۱۴ و۱۵'],
  ['ترتیب جمله و سؤال', 'Ich / wohne / in Hamburg', 'Ich wohne in Hamburg.', ['Ich wohne in Hamburg.', 'Ich in Hamburg wohne.', 'Wohne ich in Hamburg.', 'Ich wohnen in Hamburg.'], 'در جملهٔ خبری، فعل صرف‌شده جایگاه دوم دارد: Ich / wohne / in Hamburg.', 'چاپی۱۱ و۱۷'],
  ['ترتیب جمله و سؤال', 'du / kommen / aus Italien — سؤال بله یا خیر', 'Kommst du aus Italien?', ['Kommst du aus Italien?', 'Du kommen aus Italien?', 'Kommen du aus Italien?', 'Aus du kommst Italien?'], 'در قالب سؤال بله/خیرِ این درس، فعل صرف‌شده ابتدا می‌آید: Kommst / du / … .', 'چاپی۱۳ و۱۷'],
  ['ترتیب جمله و سؤال', 'wo / wohnen / Sie — سؤال رسمی', 'Wo wohnen Sie?', ['Wo wohnen Sie?', 'Wo Sie wohnen?', 'Wohnen wo Sie?', 'Wo wohnst Sie?'], 'در W-Frage، پرسش‌واژه اول و فعل صرف‌شده دوم است؛ Sie رسمی به wohnen نیاز دارد.', 'چاپی۱۵ و۱۷'],
  ['ترتیب جمله و سؤال', 'ihr / arbeiten / zusammen — سؤال بله یا خیر', 'Arbeitet ihr zusammen?', ['Arbeitet ihr zusammen?', 'Arbeiten ihr zusammen?', 'Ihr zusammen arbeitet?', 'Arbeitest ihr zusammen?'], 'سؤال بله/خیر با فعل آغاز می‌شود و صورت فعل برای ihr برابر arbeitet است.', 'چاپی۱۲ و۱۳ و۱۷'],
]
export const grammarQuestions: GrammarQuestion[] = rows.map(([topicFa, sentenceDe, answer, options, explanationFa, locator], index) => ({
  questionId: `a1-g01-${String(index + 1).padStart(3, '0')}`,
  lessonId: 'a1-lesson-01', topicFa, sentenceDe, answer, options, explanationFa, locator,
  promptFa: topicFa === 'ترتیب جمله و سؤال' ? 'جملهٔ درست را با قالب خواسته‌شده انتخاب کن.' : 'گزینهٔ درست برای جای خالی را انتخاب کن.',
  origin: 'authored',
}))
