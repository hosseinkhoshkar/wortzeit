# قرارداد داده و مرزهای مشترک

قرارداد اجرایی `data-contract-v1` در [typeهای مشترک](../src/contracts/index.ts) منبع دقیق نام/شکل فیلدهاست. نسخهٔ ذخیره `schemaVersion: 1`، سیاست `learning-policy-v1` و نسخهٔ بسته مستقل‌اند. این نسخه پیشرفت تولیدشده از قرارداد قدیمی ندارد؛ نسخهٔ ناشناخته یا محتوای ناسازگار با خطای صریح حفظ می‌شود.

## محتوا

`ContentBundle` شامل sources، sourceRefs، lesson، entries و provenance است. درس A1 اول `coverage: partial` دارد. `Entry` شامل entryId ثابت، درس و ترتیب معرفی، lemma، نقش، معنی فارسی، تمام ارجاعات، occurrences، مثال‌های authored، جملهٔ cloze با یک `___` و acceptedAnswers و چهار شناسهٔ گزینهٔ معنی است. nounData فقط برای اسم، آرتیکل از گزیده و جمع نامعلوم با علت دارد. `reviewStatus: excerpt-checked` فقط تطبیق با فایل موجود را نشان می‌دهد.

مرجع منبع شامل نوع textbook/workbook/audioTranscript، عنوان و ویرایش معلوم یا null است؛ locator عین نشانی موجود حفظ می‌شود. مثال authored منبع نقل‌شده نیست. شناسه‌ها از شمارهٔ ردیف ساخته نمی‌شوند؛ اصلاح محتوا شناسه را عوض نمی‌کند.

## دادهٔ کاربر

`AppState` شامل revision، نسخه‌ها، settings با studyTimeZone و maxNewPerSession=5، progress براساس entryId، attempts و session است. محتوا در این snapshot کپی نمی‌شود.

- `EntryProgress`: معرفی، initialRecallPending، موعد UTC یا null، intervalIndex، آخرین تاریخ موفقیت، تاریخ‌های مرور مستقل، شمار درست/غلط و pendingError با شمارندهٔ سه پاسخ دیگر و شناسهٔ جلسه.
- `Attempt`: شناسهٔ یکتا، جلسه/سؤال/مدخل، نوع تمرین، جواب، نتیجه، independent و زمان/تاریخ مطالعه.
- `Session`: نسخهٔ محتوا، state فعال/متوقف/پایان، صف پایدار، cursor، معرفی‌های واقعی همین جلسه، draft و feedback. ترتیب تصادفی و جفت‌های پاسخ‌داده‌شده داخل task ذخیره می‌شوند.
- `LearningCommand`: شروع/ادامه، reveal-card، next، answer با attemptId، draft، pause و end-session. خروجی transition فقط state جدید است؛ موتور DOM، شبکه یا IndexedDB نمی‌خواند.

## ثبت اتمی و خطا

ذخیرهٔ یک snapshot در یک transaction IndexedDB باعث می‌شود Attempt، موعد، صف، cursor، feedback و revision با هم commit شوند. expectedRevision مانع بازنویسی state کهنه است. تکرار attemptId اثر دوباره ندارد؛ taskId کهنه به سؤال جدید اعمال نمی‌شود. UI تنها پس از commit نتیجهٔ موفق نشان می‌دهد؛ شکست، فرمان و متن را برای retry با همان شناسه نگه می‌دارد. draft نیز ماندگار می‌شود.

Web Locks مانع دو نویسندهٔ هم‌زمان است؛ تب دوم پیام و امکان تلاش دوباره دارد. نبود قابلیت مورد نیاز، ذخیرهٔ ناموفق یا schema/state ناسازگار خطای روشن دارد و reset خودکار ندارد. دادهٔ active در بازگشت برای ادامه آماده است؛ زمان غیبت آماری ایجاد نمی‌کند.

APIها: محتوا `validateContent`؛ موتور `createInitialState / transition / currentTask / getEntryStatus / getHomeStats / summarizeSession`؛ ذخیره `loadState / saveState`؛ رابط `WortzeitUIProps`؛ PWA آماده‌سازی و تأیید cache. جزئیات مالکیت در [handoff](phase-one-handoff.md).

timestampها ISO-8601 UTC، روز مطالعه YYYY-MM-DD در منطقهٔ ماندگار و هر فاصله دقیقاً ۲۴ ساعت است. تغییر ساعت دستگاه برای آزمون ممنوع؛ now تزریق شود. cache پوسته و محتوای کامپایل‌شده از IndexedDB پیشرفت مستقل‌اند. به‌روزرسانی cache پیشرفت را پاک نمی‌کند. اطلاعات فقط به همین origin/مرورگر تعلق دارد؛ پاک‌شدن داده‌های سایت یا eviction می‌تواند آن را حذف کند.
