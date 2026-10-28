# قرارداد داده و ذخیرهٔ نسخهٔ۲

منبع دقیق typeها [contracts/index.ts](../src/contracts/index.ts) و قرارداد منجمد قدیمی [legacy-v1.ts](../src/contracts/legacy-v1.ts) است. schema=2، policy=learning-policy-v2، normalization=answer-normalization-v2 و content=lesson-01-excerpt-v2 مستقل‌اند. شناسه‌های همان ۲۰ مدخل ثابت‌اند.

## محتوا

Entry علاوه بر معنی/نقش/منابع/مثال authored و cloze، فیلد writing با promptFa، cueFa، acceptedAnswers صریح و caseSensitive دارد. پاسخ اول صورت معیار است. جایگزین‌ها از فهرست بازبینی‌شده می‌آیند. choose-article فقط برای nounData دارای آرتیکل معلوم فعال است. هیچ مثال به کتاب نسبت داده نشده و coverage=partial باقی است.

## پیشرفت و جلسه

AppState شامل progress، attempts، session، assistanceEvents، dailyActivity و activityEventIds است؛ settings منطقهٔ مطالعه، سقف۵ و targetActiveMs=1200000 را دارد. محتوا در snapshot کپی نمی‌شود.

- EntryProgress موعد، پله، تاریخ‌های مرور مستقل و pendingError با reason و شمارندهٔ سه پاسخ دیگر دارد. skills شامل meaning، writing و articleِ قابل اعمال است؛ هر مهارت correct/wrong/assisted/unassistedCorrect/lastAttemptAt دارد.
- Attempt پاسخ خام، نتیجه، independent، assisted، normalizationVersion، سؤال/جلسه/مدخل و زمان/روز را حفظ می‌کند. قدیمی‌ها normalization-v1 می‌مانند و دوباره نمره‌دهی نمی‌شوند.
- AssistanceEvent با eventId پایدار، سؤال/جلسه/مدخل و kind جدا ثبت می‌شود؛ کمک غلطِ ساختگی نیست.
- Session صف/ترتیب تصادفی، cursor، draft، feedback، activeMs و تأیید هدف با targetAcknowledged/targetAcknowledgedDate دارد؛ تأیید ادامه فقط برای همان روز مطالعه است. فلشکارت، معنی، جای خالی، نوشتن، آرتیکل و اتصال با قابلیت داده انتخاب می‌شوند. وضعیت assisted سؤال ماندگار است.
- فعالیت با eventId، sessionId، from/to و elapsedMs یکتا commit می‌شود. ساعت monotonic فقط زمان فعال و قابل مشاهده را نمونه‌برداری می‌کند؛ موتور با ورودی زمان و منطقه، سهم روزها را محاسبه می‌کند. زمان بسته‌بودن از timestamp قدیمی استنتاج نمی‌شود.

## مالکیت و commit

APIهای محتوا، موتور و ذخیرهٔ مرحلهٔ۱ حفظ می‌شوند. موتور خالص و بدون DOM/شبکه/IndexedDB است. ui فقط command و visibility ارائه می‌کند. controller زمان و صف commit/retry را مدیریت می‌کند. تمام پاسخ و موعد و cursor/feedback در یک snapshot transaction IndexedDB ثبت می‌شوند. revision و expectedRevision مانع بازنویسی state کهنه‌اند؛ eventId/attemptId تکراری اثر دوباره ندارد.

قفل Web Locks تا پایان صف writer حفظ می‌شود؛ shutdown کار تازه را رد و صف پذیرفته‌شده را جمع می‌کند. probe اولیه ifAvailable و retry صریح signalدار و صف‌شونده است؛ این دو option با هم استفاده نمی‌شوند. نتیجهٔ دیررس startup لغوشده writer نمی‌سازد. pagehide/cleanup تکراری idempotent است.

## مهاجرت و ناسازگاری

validator نسخهٔ۱ در [storage/legacy-v1.ts](../src/storage/legacy-v1.ts) منجمد است. loadState فقط نسخهٔ۱ شناخته‌شده را پس از validation و نگاشت هویت به۲ ارتقا می‌دهد: پاسخ‌ها، شناسه‌ها، موعد/پله/تاریخ‌ها، صف/cursor/draft/feedback حفظ؛ فقط فیلدهای جدید افزوده و مهارت‌ها از تاریخچهٔ موجود استخراج می‌شوند. زمان قدیمی حدس زده نمی‌شود. migration با revision+1 در همان transaction نوشته می‌شود؛ شکست، دادهٔ قدیمی را دست‌نخورده باقی می‌گذارد. کلید پشتیبان یا قابلیت export/import اضافه نمی‌شود.

نسخهٔ۲ در load بعدی دوباره مهاجرت نمی‌کند. دادهٔ خراب یا ناشناخته حفظ و صریحاً رد می‌شود. abort پیش از commit مسیر برگشت است؛ reader نسخهٔ۱ پس از ثبت۲ باید fail-closed باشد، نه reset یا نوشتن دادهٔ قدیمی. بازگشت اجرایی به reader۱ بدون تبدیل معکوس پشتیبانی نمی‌شود.

cache مستقل از پیشرفت است. آمادگی cache باید با شناسهٔ buildِ همین کد تطبیق یابد. داده به origin و پروفایل همین مرورگر تعلق دارد و حذف دادهٔ سایت/eviction می‌تواند آن را حذف کند.
