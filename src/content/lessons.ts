import { lessonOneBundle } from './lesson-one.ts'
import { lessonFourBundle } from './lesson-four.ts'

/** One registry for enabled lessons; source-only lesson catalogs remain independent. */
export const lessonBundles = [lessonOneBundle, lessonFourBundle]
