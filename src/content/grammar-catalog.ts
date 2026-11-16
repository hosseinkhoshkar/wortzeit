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
]
export const grammarQuestions = [...lessonOneQuestions, ...grammarTwoQuestions, ...grammarThreeQuestions]
