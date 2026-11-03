import type { ContentBundle } from '../contracts/index.ts'
import { lessonBundles } from './lessons.ts'
import { extendEntryExamples } from './extend-examples.ts'

export { lessonBundles }

/** The original lesson IDs and all twenty existing entry identities stay unchanged. */
export const courseBundle: ContentBundle = {
  contentVersion: 'course-a1-lessons-01-04-v1',
  lesson: lessonBundles[0].lesson,
  lessons: lessonBundles.map(bundle => bundle.lesson),
  sources: [...new Map(lessonBundles.flatMap(bundle => bundle.sources).map(source => [source.sourceId, source])).values()],
  sourceRefs: lessonBundles.flatMap(bundle => bundle.sourceRefs),
  entries: lessonBundles.flatMap(bundle => bundle.entries).map(extendEntryExamples),
  provenance: {
    file: 'reference/vocabulary/Lesson-01-A1.txt؛ reference/vocabulary/Lesson-04-A1.txt',
    reviewStatus: 'excerpt-checked',
    noteFa: 'درس اول شامل همان ۲۰ مدخل قبلی است. درس چهارم تمام ۸۴ مدخل فایل گزیدهٔ درس چهارم را دارد. معنی، آرتیکل و ارجاع‌ها با همین فایل‌ها تطبیق داده شده‌اند؛ تأیید جامع اصل کتاب نیست. مثال‌ها و جمله‌های تمرین تألیفی‌اند.',
  },
}
