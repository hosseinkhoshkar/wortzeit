import { buildExcerptLesson, type ExcerptPedagogy } from './excerpt-lesson.ts'
import { lessonThirtySourceRows } from './lesson-thirty-source.ts'

// Authored examples and cues; source identities and locators stay separate.
const pedagogy: Record<number, ExcerptPedagogy> = {
  1: ['noun', 'Der Austausch zwischen den beiden Schulen beginnt im Herbst.', 'تبادل بین دو مدرسه در پاییز آغاز می‌شود.', 'اسمِ تبادل یا ارتباط متقابل بین افراد یا گروه‌ها؛ بدون آرتیکل.'],
  2: ['noun', 'Auch ein kleiner Fortschritt macht mir Mut.', 'حتی یک پیشرفت کوچک به من دلگرمی می‌دهد.', 'اسمِ بهترشدن یا جلو رفتن در یک کار؛ مفرد و بدون آرتیکل.'],
  3: ['other', 'Wir möchten teilnehmen, haben jedoch noch keine Zeit.', 'می‌خواهیم شرکت کنیم، اما هنوز وقت نداریم.', 'واژهٔ پیونددهندهٔ با این حال یا اما؛ صورت تک‌واژه‌ای و با حرف کوچک.'],
  4: ['noun', 'Eine sprachliche Minderheit lebt in dieser Region.', 'یک اقلیت زبانی در این منطقه زندگی می‌کند.', 'اسمِ گروهی که شمارش از گروه اصلی کمتر است؛ بدون آرتیکل.'],
  5: ['noun', 'Diese Traube schmeckt besonders süß.', 'این حبهٔ انگور به‌ویژه شیرین است.', 'اسمِ انگور یا خوشه؛ صورت مفردِ مدخل، نه صورت جمعِ دیده‌شده در متن؛ بدون آرتیکل.'],
}

export const lessonThirtyBundle = buildExcerptLesson({
  lesson: { lessonId: 'lesson-30', titleDe: 'Hauptperson Deutsch', titleFa: 'زبان آلمانی در کانون توجه', level: 'B1', coverage: 'partial' },
  contentVersion: 'lesson-30-excerpt-v1',
  rows: lessonThirtySourceRows,
  pedagogy: entryId => pedagogy[Number(entryId.slice(-3))],
  keyboardAlternatives: {},
  overlappingGroups: [],
  provenance: {
    file: 'reference/vocabulary/Lesson-30-B1.txt', reviewStatus: 'excerpt-checked',
    noteFa: 'پنج مدخل جدیدِ غیرتکراری درس سی‌ام مطابق بانک فعلی، با معنی، آرتیکل و تمام ارجاع‌های منبع آمده‌اند. سطح B1 مطابق فایل مرجع است؛ این گزیده پوشش جامع تمام واژگان صفحات کتاب نیست. مثال‌ها و جمله‌های تمرین تألیفی‌اند.',
  },
})
