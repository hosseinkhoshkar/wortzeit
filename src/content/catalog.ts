import type { ContentBundle } from '../contracts/index.ts'
import { lessonOneBundle } from './lesson-one.ts'
import { lessonFourBundle } from './lesson-four.ts'

export const lessonBundles = [lessonOneBundle, lessonFourBundle]

/** The original lesson IDs and all twenty existing entry identities stay unchanged. */
export const courseBundle: ContentBundle = {
  contentVersion: 'course-a1-lessons-01-04-v1',
  lesson: lessonOneBundle.lesson,
  lessons: [lessonOneBundle.lesson, lessonFourBundle.lesson],
  sources: [...new Map([...lessonOneBundle.sources, ...lessonFourBundle.sources].map(source => [source.sourceId, source])).values()],
  sourceRefs: [...lessonOneBundle.sourceRefs, ...lessonFourBundle.sourceRefs],
  entries: [...lessonOneBundle.entries, ...lessonFourBundle.entries],
  provenance: {
    file: 'reference/vocabulary/Lesson-01-A1.txt؛ reference/vocabulary/Lesson-04-A1.txt',
    reviewStatus: 'excerpt-checked',
    noteFa: 'درس اول شامل همان ۲۰ مدخل قبلی است. درس چهارم تمام ۸۴ مدخل فایل گزیدهٔ درس چهارم را دارد. معنی، آرتیکل و ارجاع‌ها با همین فایل‌ها تطبیق داده شده‌اند؛ تأیید جامع اصل کتاب نیست. مثال‌ها و جمله‌های تمرین تألیفی‌اند.',
  },
}
