import { grammarSixQuestions, grammarSixSource } from './grammar-six.ts'
import { grammarFourQuestions, grammarFourSource } from './grammar-four.ts'
import { grammarThreeQuestions, grammarThreeSource } from './grammar-three.ts'
import { grammarQuestions as lessonOneQuestions, grammarSource } from './grammar-one.ts'
import { grammarTwoQuestions, grammarTwoSource } from './grammar-two.ts'

export const grammarLessons = [
  { lessonId: 'a1-lesson-01', labelFa: 'گرامر درس۱', titleDe: 'Ich und die anderen', titleFa: 'گرامر درس اول',
    descriptionFa: 'صرف فعل، ضمیرها، پرسش‌واژه‌ها و ترتیب جمله؛ هر نوبت۵ سؤال چهارگزینه‌ای.',
    rulesFa: 'در جملهٔ خبری و سؤال W، فعل جایگاه دوم دارد؛ سؤال بله/خیر با فعل شروع می‌شود.',
    source: grammarSource },
  { lessonId: 'a1-lesson-02', labelFa: 'گرامر درس۲', titleDe: 'Termine, Termine', titleFa: 'گرامر درس دوم',
    descriptionFa: 'زمان و ساعت، آرتیکل، آکوزاتیو، منفی‌سازی، جایگاه فعل، ضمیر مفعولی و haben؛ هر نوبت۵ سؤال چهارگزینه‌ای.',
    rulesFa: 'ساعت با um و روز هفته با am می‌آید. آرتیکل مذکر در آکوزاتیو den/einen/keinen است؛ فعل صرف‌شده در جملهٔ خبری جایگاه دوم دارد.',
    source: grammarTwoSource },
  { lessonId: 'a1-lesson-03', labelFa: 'گرامر درس3', titleDe: 'Unternehmen Familie', titleFa: 'گرامر درس سوم',
    descriptionFa: 'فعل‌های کمکی können، müssen، möchten؛ جمله با فعل کمکی، ملکی‌ها، kein و und؛ ۵۰ سؤال چهارگزینه‌ای، هر نوبت۵ سؤال.',
    rulesFa: 'پس از انتخاب پاسخ، توضیح فارسی قاعده و صورت درست نمایش داده می‌شود.',
    source: grammarThreeSource },
  { lessonId: 'a1-lesson-04', labelFa: 'گرامر درس۴', titleDe: 'Spiel und Spaß', titleFa: 'گرامر درس چهارم',
    descriptionFa: 'فعل‌های با تغییر واکه، گذشتهٔ sein/haben، mögen/wollen/dürfen، پیوندهای aber/oder/denn و پرفکت فعل‌های باقاعده؛ ۵۰ سؤال چهارگزینه‌ای، هر نوبت۵ سؤال.',
    rulesFa: 'پس از انتخاب پاسخ، توضیح فارسی قاعده و صورت درست نمایش داده می‌شود.',
    source: grammarFourSource },
  { lessonId: 'a1-lesson-06', labelFa: 'گرامر درس۶', titleDe: 'Kleider machen Freunde', titleFa: 'گرامر درس ششم',
    descriptionFa: 'امر رسمی Sie، پیشنهاد با wir، امر du/ihr، امرهای بی‌قاعده، پیشوندهای جداشدنی و پیشنهاد با sollen/wollen؛ ۵۰ سؤال چهارگزینه‌ای، هر نوبت۵ سؤال.',
    rulesFa: 'پس از انتخاب پاسخ، توضیح فارسی قاعده و صورت درست نمایش داده می‌شود.',
    source: grammarSixSource },
]
export const grammarQuestions = [...lessonOneQuestions, ...grammarTwoQuestions, ...grammarThreeQuestions, ...grammarFourQuestions, ...grammarSixQuestions]
