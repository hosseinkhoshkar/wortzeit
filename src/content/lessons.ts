import { lessonOneBundle } from './lesson-one.ts'
import { lessonFourBundle } from './lesson-four.ts'
import { lessonFiveBundle } from './lesson-five.ts'
import { lessonSixBundle } from './lesson-six.ts'
import { lessonSevenBundle } from './lesson-seven.ts'
import { lessonEightBundle } from './lesson-eight.ts'
import { lessonNineBundle } from './lesson-nine.ts'
import { lessonTenBundle } from './lesson-ten.ts'
import { lessonThirtyBundle } from './lesson-thirty.ts'
import { withTextbookStudyOrder } from './textbook-study-order.ts'

/** One registry for enabled lessons; source-only lesson catalogs remain independent. */
export const lessonBundles = [lessonOneBundle, lessonFourBundle, lessonFiveBundle, lessonSixBundle, lessonSevenBundle, lessonEightBundle, lessonNineBundle, lessonTenBundle, lessonThirtyBundle].map(withTextbookStudyOrder)
