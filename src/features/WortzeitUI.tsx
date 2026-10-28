import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { ContentBundle, Entry, LearningCommand, SessionTask, WortzeitUIProps } from '../contracts/index.ts'
import '../App.css'

type Page = 'home' | 'words' | 'about' | 'session' | 'summary'
type IconName = 'arrow' | 'book' | 'home' | 'leaf' | 'spark' | 'clock' | 'check' | 'close' | 'flip' | 'pause' | 'link' | 'info'

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="m14 6-6 6 6 6M8 12h13" />,
    book: <path d="M12 6c-3-3-7-2-9-1v14c3-2 6-2 9 0 3-2 6-2 9 0V5c-2-1-6-2-9 1Zm0 0v13" />,
    home: <path d="m3 10 9-7 9 7v10H3Zm6 10v-7h6v7" />,
    leaf: <path d="M19 3C8 2 2 8 5 15c3 6 14 3 14-12ZM5 20 16 8" />,
    spark: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    flip: <path d="M4 9a8 8 0 0 1 14-3l2 3M20 4v5h-5M20 15a8 8 0 0 1-14 3l-2-3M4 20v-5h5" />,
    pause: <path d="M8 5v14M16 5v14" />,
    link: <path d="m9 15 6-6M8 17l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 0 1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7v.1" /></>,
  }
  return <svg className={`wz-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function GardenIllustration() {
  return <svg className="garden-illustration" viewBox="0 0 360 310" fill="none" aria-hidden="true">
    <path d="M34 262c-26-60 0-169 73-194 71-26 129 14 164 75 31 55 24 102-7 129" fill="#ECE5D6" />
    <path d="M28 276h302" stroke="#222F29" strokeWidth="2" strokeLinecap="round" />
    <path d="M179 261c-6-49 8-106 24-148" stroke="#274735" strokeWidth="4" strokeLinecap="round" />
    <path d="M187 197c-48 5-61-24-57-45 31 0 55 12 57 45Z" fill="#95B982" stroke="#274735" strokeWidth="2" />
    <path d="M190 174c43 2 65-19 60-43-28-1-52 17-60 43Z" fill="#2D6549" stroke="#274735" strokeWidth="2" />
    <path d="M200 138c-26-12-36-37-25-59 27 11 36 33 25 59Z" fill="#B5CC8F" stroke="#274735" strokeWidth="2" />
    <path d="m150 227 62 1-9 49h-44Z" fill="#F3A17B" stroke="#222F29" strokeWidth="2" /><path d="M146 226h70v12h-70z" fill="#E7784C" stroke="#222F29" strokeWidth="2" />
    <g transform="rotate(-12 92 138)"><rect x="32" y="79" width="112" height="124" rx="12" fill="#FFFBF0" stroke="#222F29" strokeWidth="2" /><rect x="45" y="92" width="86" height="8" rx="4" fill="#DCE9CE" /><text x="88" y="139" textAnchor="middle" fontFamily="Georgia,serif" fontSize="29" fill="#243B2D" lang="de" direction="ltr">Hallo!</text><path d="M67 161h43M75 172h28" stroke="#A1B493" strokeWidth="3" strokeLinecap="round" /></g>
    <g transform="rotate(14 272 167)"><rect x="224" y="112" width="91" height="111" rx="12" fill="#F4C75F" stroke="#222F29" strokeWidth="2" /><circle cx="269" cy="150" r="17" fill="#FFFBF0" stroke="#222F29" strokeWidth="2" /><path d="m262 150 5 5 9-10" stroke="#274735" strokeWidth="2" strokeLinecap="round" /><path d="M245 186h47M254 197h29" stroke="#917326" strokeWidth="3" strokeLinecap="round" /></g>
    <path d="m268 52 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="#E7784C" /><circle cx="70" cy="232" r="6" fill="#E7784C" /><path d="m123 42 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#2D6549" />
    <path d="M302 254c-7-15-6-30 3-39 9 13 9 27-3 39Z" fill="#B5CC8F" stroke="#274735" strokeWidth="2" /><path d="M302 276v-28" stroke="#274735" strokeWidth="2" />
  </svg>
}

const number = (value: number) => value.toLocaleString('fa-IR')
function dateLabel(value: string | null, now: string) {
  if (!value) return 'هنوز زمان‌بندی نشده'
  if (new Date(value).getTime() <= new Date(now).getTime()) return 'اکنون، آمادهٔ مرور'
  return new Intl.DateTimeFormat('fa-IR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))
}
function GermanWord({ entry }: { entry: Entry }) {
  return <span lang="de" dir="ltr" className="german-word">{entry.nounData && <span className="article">{entry.nounData.article} </span>}{entry.lemma}</span>
}
function Sources({ entry, bundle }: { entry: Entry; bundle: ContentBundle }) {
  return <details className="entry-sources"><summary>ارجاع این واژه</summary><ul>{entry.sourceRefIds.map(id => {
    const ref = bundle.sourceRefs.find(item => item.sourceRefId === id)
    if (!ref) return null
    const source = bundle.sources.find(item => item.sourceId === ref.sourceId)
    return <li key={id}>{source?.title} · {ref.locator}</li>
  })}</ul><p>تطبیق با گزیدهٔ موجود؛ اصل کتاب به‌طور جامع بررسی نشده است.</p></details>
}
function ExampleBlock({ entry }: { entry: Entry }) {
  return <div className="example-block"><span className="tiny-label">مثال تألیفی</span><p lang="de" dir="ltr">{entry.examples[0]?.de}</p><p>{entry.examples[0]?.fa}</p></div>
}

function TaskPanel({ task, props }: { task: SessionTask; props: WortzeitUIProps }) {
  const { bundle, state, busy, error, onCommand } = props
  const session = state.session!
  const feedback = session.feedback
  const [draft, setDraft] = useState(session.draft)
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [showBack, setShowBack] = useState(task.kind === 'flashcard' && task.revealed)
  const sending = useRef(false)
  const disabled = busy || !!error
  const entry = task.kind === 'match' ? null : bundle.entries.find(item => item.entryId === task.entryId)!
  async function send(command: LearningCommand) {
    if (sending.current || disabled) return
    sending.current = true
    try { await onCommand(command) } catch { /* The application owns the saved retry and error. */ } finally { sending.current = false }
  }
  function answer(value: string, entryId?: string) {
    void send({ type: 'answer', taskId: task.taskId, attemptId: crypto.randomUUID(), answer: value, ...(entryId ? { entryId } : {}) })
  }
  function next() {
    setSelectedLeft(null)
    void send({ type: 'next', taskId: task.taskId })
  }
  const feedbackEntry = feedback && bundle.entries.find(item => item.entryId === feedback.entryId)
  return <div className="task-content">
    {task.kind === 'flashcard' && entry && <>
      <div className="task-heading"><span className="eyebrow"><Icon name="book" /> یک واژهٔ تازه</span><h1>اول آشنا شو، بعد تمرین کن.</h1><p>کارت را بچرخان و معنی و مثال را ببین.</p></div>
      <button type="button" className={`flashcard ${showBack ? 'is-flipped' : ''}`} aria-label={showBack ? 'نمایش روی کارت' : 'چرخاندن کارت و نمایش معنی'} aria-pressed={showBack} disabled={disabled} onClick={async () => {
        if (!task.revealed) {
          try { await onCommand({ type: 'reveal-card', taskId: task.taskId }); setShowBack(true) } catch { /* Remain on the saved side. */ }
        } else setShowBack(value => !value)
      }}>
        <span className="flashcard-inner">
          <span className="card-face card-front" aria-hidden={showBack}><span className="tiny-label">واژهٔ آلمانی</span><span className="card-word"><GermanWord entry={entry} /></span><span className="flip-hint"><Icon name="flip" /> برای دیدن معنی، لمس کن</span></span>
          <span className="card-face card-back" aria-hidden={!showBack}><span className="tiny-label">معنی فارسی</span><strong className="card-meaning">{entry.meaningFa}</strong><span className="card-example-label">مثال تألیفی</span><span className="card-example-de" lang="de" dir="ltr">{entry.examples[0]?.de}</span><span className="card-example-fa">{entry.examples[0]?.fa}</span><span className="flip-hint"><Icon name="flip" /> برگشت به واژه</span></span>
        </span>
      </button>
      <p className="gentle-note">دیدن کارت، پاسخ درست محسوب نمی‌شود.</p>
      {task.revealed && <><Sources entry={entry} bundle={bundle} /><button type="button" className="primary-button wide" onClick={next} disabled={disabled}>برویم سراغ تمرین <Icon name="arrow" /></button></>}
    </>}
    {task.kind === 'choose-meaning' && entry && <>
      <div className="task-heading"><span className="eyebrow"><Icon name="spark" /> انتخاب معنی</span><h1>معنی درست کدام است؟</h1><p>یکی از چهار گزینه را انتخاب کن.</p></div>
      <div className="question-word"><GermanWord entry={entry} /></div>
      <div className="meaning-options">{task.optionIds.map((id, index) => {
        const option = bundle.entries.find(item => item.entryId === id)!
        const attempt = feedback && state.attempts.find(item => item.attemptId === feedback.attemptId)
        const selected = attempt?.answer === id
        const correctOption = !!feedback && id === entry.entryId
        return <button key={id} type="button" className={`meaning-option ${selected ? 'selected' : ''} ${correctOption ? 'answer-correct' : ''} ${selected && !feedback?.correct ? 'answer-wrong' : ''}`} disabled={disabled || !!feedback} onClick={() => answer(id)}><span className="option-number">{number(index + 1)}</span><span>{option.meaningFa}</span>{correctOption && <Icon name="check" />}{selected && !feedback?.correct && <Icon name="close" />}</button>
      })}</div>
    </>}
    {task.kind === 'cloze' && entry && <>
      <div className="task-heading"><span className="eyebrow"><Icon name="book" /> {task.cycleKind === 'scheduled' ? 'مرور موعدرسیده' : task.cycleKind === 'recovery' ? 'یک فرصت دیگر' : 'جای خالی'}</span><h1>جمله را کامل کن.</h1><p>واژهٔ مناسب را به آلمانی بنویس.</p></div>
      <div className="cloze-question"><span className="tiny-label">جملهٔ تألیفی</span><p lang="de" dir="ltr">{entry.cloze.sentence.split('___').map((part, i) => <span key={i}>{i > 0 && <span className="blank-mark" aria-label="جای خالی">…</span>}{part}</span>)}</p><p className="cloze-translation">{entry.cloze.translationFa}</p></div>
      <form onSubmit={event => { event.preventDefault(); if (draft.trim() && !feedback) answer(draft) }} className="answer-form">
        <label htmlFor="german-answer">پاسخ تو</label>
        <input id="german-answer" lang="de" dir="ltr" autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="Deine Antwort …" value={draft} disabled={!!feedback || !!error} onChange={event => {
          const value = event.target.value
          setDraft(value)
          void onCommand({ type: 'draft', taskId: task.taskId, value }).catch(() => {})
        }} />
        <p className="input-help">حروف بزرگ و کوچک و حروف آلمانی مثل ä و ß را رعایت کن.</p>
        {!feedback && <button className="primary-button wide" type="submit" disabled={disabled || !draft.trim()}>بررسی پاسخ <Icon name="check" /></button>}
      </form>
    </>}
    {task.kind === 'match' && <>
      <div className="task-heading"><span className="eyebrow"><Icon name="link" /> چهار جفت، یک بازی</span><h1>واژه‌ها را به معنی وصل کن.</h1><p>اول یک واژه، بعد معنی‌اش را لمس کن.</p></div>
      <div className="match-status"><span>{number(task.matchedEntryIds.length)} از ۴ جفت پیدا شده</span><span className="match-dots" aria-hidden="true">{[0, 1, 2, 3].map(index => <i key={index} className={index < task.matchedEntryIds.length ? 'found' : ''} />)}</span></div>
      <div className="match-board" dir="ltr">
        <div className="match-column"><span className="tiny-label" lang="de">Deutsch</span>{task.leftOrder.map(id => {
          const word = bundle.entries.find(item => item.entryId === id)!
          const matched = task.matchedEntryIds.includes(id)
          return <button className={`match-tile word-tile ${selectedLeft === id ? 'is-selected' : ''} ${matched ? 'is-matched' : ''}`} type="button" key={id} disabled={disabled || !!feedback || matched} aria-pressed={selectedLeft === id} onClick={() => setSelectedLeft(id)}><GermanWord entry={word} />{matched && <><Icon name="check" /><span className="sr-only">وصل شد</span></>}</button>
        })}</div>
        <div className="match-column" dir="rtl"><span className="tiny-label">فارسی</span>{task.rightOrder.map(id => {
          const word = bundle.entries.find(item => item.entryId === id)!
          const matched = task.matchedEntryIds.includes(id)
          return <button className={`match-tile ${matched ? 'is-matched' : ''}`} type="button" key={id} disabled={disabled || !!feedback || matched || !selectedLeft} onClick={() => selectedLeft && answer(id, selectedLeft)}>{word.meaningFa}{matched && <><Icon name="check" /><span className="sr-only">وصل شد</span></>}</button>
        })}</div>
      </div><p className="gentle-note">هر جفت جدا ثبت می‌شود؛ بازی به‌تنهایی پلهٔ مرور را بالا نمی‌برد.</p>
    </>}
    {feedback && <div className={`feedback ${feedback.correct ? 'feedback-correct' : 'feedback-wrong'}`} role="status" aria-live="polite">
      <div className="feedback-title"><span className="feedback-symbol"><Icon name={feedback.correct ? 'check' : 'close'} /></span><strong>{feedback.correct ? 'درست بود، آفرین!' : 'این بار درست نبود؛ با هم مرور کنیم.'}</strong></div>
      {!feedback.correct && <p className="correct-answer">پاسخ درست: <bdi lang={task.kind === 'cloze' ? 'de' : 'fa'} dir={task.kind === 'cloze' ? 'ltr' : 'rtl'}>{feedback.expectedAnswer}</bdi></p>}
      <p>{feedback.explanationFa}</p>
      {!feedback.correct && feedbackEntry && <ExampleBlock entry={feedbackEntry} />}
      <button className="primary-button wide" type="button" onClick={next} disabled={disabled}>{task.kind === 'match' && task.matchedEntryIds.length < 4 ? 'ادامهٔ بازی' : 'ادامه'}<Icon name="arrow" /></button>
    </div>}
  </div>
}

export function WortzeitUI(props: WortzeitUIProps) {
  const { bundle, state, stats, summary, statuses, busy, error, offlineStatus, now, onCommand, onRetry } = props
  const [page, setPage] = useState<Page>('home')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const session = state.session
  const task = session && session.state !== 'ended' ? session.queue[session.cursor] : null
  const effectivePage = page === 'session' && session?.state === 'ended' ? 'summary'
    : page === 'session' && session?.state === 'paused' ? 'home' : page
  const disabled = busy || !!error
  const total = bundle.entries.length
  async function start() {
    try { await onCommand({ type: 'start-session', sessionId: crypto.randomUUID(), seed: Math.floor(Math.random() * 0xffffffff) }); setPage('session') } catch { /* Root displays the persistent failure. */ }
  }
  async function pause() { try { await onCommand({ type: 'pause' }); setPage('home') } catch { /* Root owns retry and failure feedback. */ } }
  async function finish() { try { await onCommand({ type: 'end-session' }); setPage('summary') } catch { /* Keep the session visible until its end is saved. */ } }
  const navigation: { page: Page; label: string; icon: IconName }[] = [{ page: 'home', label: 'خانه', icon: 'home' }, { page: 'words', label: 'واژه‌ها', icon: 'book' }, { page: 'about', label: 'دربارهٔ درس', icon: 'info' }]
  const selectedWords = bundle.entries.filter(entry => (filter === 'all' || statuses[entry.entryId] === filter) && `${entry.lemma} ${entry.meaningFa}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  return <div className="wortzeit-app" dir="rtl" lang="fa">
    <header className="app-header"><button type="button" className="brand" aria-label="Wortzeit، خانه" onClick={() => setPage('home')}><span className="brand-mark"><Icon name="leaf" /></span><span><strong lang="de" dir="ltr">Wortzeit<span className="brand-dot">.</span></strong><small>وقتِ واژه‌هاست</small></span></button><nav className="desktop-nav" aria-label="ناوبری اصلی">{navigation.map(item => <button type="button" key={item.page} className={effectivePage === item.page ? 'active' : ''} onClick={() => setPage(item.page)}>{item.label}</button>)}</nav><div className={`offline-pill ${offlineStatus === 'ready' ? 'offline-ready' : ''}`} role="status"><span className="status-dot" />{offlineStatus === 'ready' ? 'آمادهٔ آفلاین' : offlineStatus === 'checking' ? 'آماده‌سازی آفلاین…' : 'آفلاین آماده نیست'}</div></header>
    <main className="app-main">
      {error && <div className="storage-error" role="alert"><Icon name="info" /><div><strong>ذخیره کامل نشد</strong><p>{error}</p></div><button type="button" className="text-button" onClick={onRetry} disabled={busy}>تلاش دوباره</button></div>}
      {effectivePage === 'home' && <>
        <div className="page-intro"><div><span className="eyebrow">هر روز، چند واژه نزدیک‌تر</span><h1>سلام، به وقتِ یادگیری خوش آمدی<span className="orange-dot">.</span></h1></div><span className="level-pill" lang="de" dir="ltr">A1 · Lektion 01</span></div>
        <div className="home-grid"><section className="hero-panel"><div className="hero-copy"><span className="eyebrow lesson-eyebrow"><span className="mini-line" /> درس اول · {bundle.lesson.titleFa}</span><h2 lang="de" dir="ltr">{bundle.lesson.titleDe}</h2><p>آلمانی را واژه‌به‌واژه بساز.<br />کمی آشنایی، کمی تمرین، یک قدم رو به جلو.</p><button type="button" className="primary-button hero-button" disabled={disabled} onClick={() => void start()}>ادامهٔ یادگیری<Icon name="arrow" /></button><span className="hero-caption">{session && session.state !== 'ended' ? 'جلسهٔ ناتمام تو از همان‌جا ادامه پیدا می‌کند.' : 'شروع یادگیری · حداکثر ۵ واژهٔ جدید در هر جلسه'}</span></div><GardenIllustration /></section>
          <aside className="today-panel"><span className="eyebrow"><Icon name="clock" /> نوبت مرور</span><div className="review-number">{number(stats.due)}<span>واژه</span></div><h2>{stats.due ? 'منتظر یک دیدار دوباره‌اند' : 'مرور عقب‌افتاده‌ای نداری'}</h2><p>{stats.due ? 'مرورهای موعدرسیده پیش از واژه‌های تازه می‌آیند.' : 'پس از تمرین، وقت مرور بعدی اینجا مشخص می‌شود.'}</p><div className="next-review"><Icon name="clock" /><span>مرور بعدی<strong>{dateLabel(stats.nextDueAt, now)}</strong></span></div></aside></div>
        <section className="progress-panel"><div><span className="eyebrow">ردِ قدم‌های تو</span><h2>پیشرفت در بستهٔ آغازین</h2><p>این بسته، گزیده‌ای از درس اول است.</p></div><div className="progress-overview"><div className="progress-count"><strong>{number(stats.introduced)}</strong><span>از {number(total)} واژه معرفی شده</span></div><div className="word-progress" role="progressbar" aria-label="واژه‌های معرفی‌شده در بسته" aria-valuemin={0} aria-valuemax={total} aria-valuenow={stats.introduced}><span style={{ width: `${total ? stats.introduced / total * 100 : 0}%` }} /></div><span className="progress-note">معرفی شدن با تسلط یکی نیست؛ مرورهای روزهای بعد مهم‌اند.</span></div><div className="answer-stat"><span className="stat-icon"><Icon name="check" /></span><strong>{number(stats.correct)} <small>از {number(stats.totalAnswers)}</small></strong><span>پاسخ درست</span></div></section>
        <section className="journey-section"><div className="section-title"><h2>یک جلسهٔ کوچک، چند جور تمرین</h2><span>با ریتم خودت پیش برو</span></div><div className="journey-cards">{[{ n: '۰۱', icon: 'flip' as IconName, title: 'آشنا شو', copy: 'واژه، معنی و یک مثال کوتاه', color: 'sage' }, { n: '۰۲', icon: 'spark' as IconName, title: 'به خاطر بیاور', copy: 'معنی را پیدا کن و جمله را بساز', color: 'peach' }, { n: '۰۳', icon: 'link' as IconName, title: 'جفت‌ها را پیدا کن', copy: 'چهار واژه، چهار معنی، یک بازی', color: 'yellow' }].map(item => <article className={`journey-card ${item.color}`} key={item.n}><span className="journey-number">{item.n}</span><span className="journey-icon"><Icon name={item.icon} /></span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
        <div className="home-footnote"><Icon name="leaf" /><p>پیشرفتت در همین مرورگر می‌ماند؛ هر وقت برگشتی، از همین‌جا ادامه بده.</p><button type="button" className="text-button" onClick={() => setPage('about')}>دربارهٔ محتوا و ذخیره</button></div>
      </>}
      {effectivePage === 'session' && <section className="session-page"><div className="session-toolbar"><button type="button" className="text-button" onClick={() => void pause()} disabled={disabled}><Icon name="pause" /> توقف و بازگشت</button><span>درس اول <span className="toolbar-dot">·</span> {number(summary.practiced)} واژه تمرین شده</span><button type="button" className="text-button finish-button" onClick={() => void finish()} disabled={disabled}>پایان جلسه</button></div><div className="session-progress"><span style={{ width: `${session?.queue.length ? Math.min(100, session.cursor / session.queue.length * 100) : 0}%` }} /></div>{task ? <TaskPanel key={task.taskId} task={task} props={props} /> : <div className="empty-state"><Icon name="check" /><h1>تمرین‌های این نوبت تمام شد.</h1><p>خلاصهٔ واقعی جلسه و وقت مرور بعدی را ببین.</p><button className="primary-button" type="button" onClick={() => void finish()} disabled={disabled}>دیدن خلاصه <Icon name="arrow" /></button></div>}</section>}
      {effectivePage === 'summary' && <section className="summary-page"><div className="summary-art"><Icon name="leaf" /><span className="summary-spark">✦</span></div><span className="eyebrow">یک قدم دیگر برداشتی</span><h1>این بود نوبتِ امروزت<span className="orange-dot">.</span></h1><p>هر برخورد با یک واژه، فرصتی برای یادگیری است.</p><div className="summary-stats"><div><strong>{number(summary.practiced)}</strong><span>واژهٔ تمرین‌شده</span></div><div><strong>{number(summary.correct)}<small> / {number(summary.totalAnswers)}</small></strong><span>پاسخ درست</span></div><div><strong>{number(summary.needsReview)}</strong><span>نیازمند مرور</span></div><div><strong>{number(summary.introduced)}</strong><span>واژهٔ معرفی‌شده</span></div></div><div className="summary-next"><Icon name="clock" /><div><strong>وقت دیدار دوباره</strong><p>{dateLabel(summary.nextDueAt, now)}</p></div></div>{summary.remaining > 0 && <p className="summary-unfinished">{number(summary.remaining)} تمرین ناتمام برای ادامه باقی مانده؛ انجام‌شده حساب نشده‌اند.</p>}<p className="summary-note">فاصلهٔ مرور با یادآوری موفق در روزهای جداگانه بیشتر می‌شود. این گزیده، پایان کل درس اول نیست.</p><div className="summary-actions"><button className="primary-button" type="button" disabled={disabled} onClick={() => void start()}>ادامهٔ یادگیری<Icon name="arrow" /></button><button className="secondary-button" type="button" onClick={() => setPage('home')}>بازگشت به خانه</button></div></section>}
      {effectivePage === 'words' && <section className="words-page"><div className="page-intro"><div><span className="eyebrow">واژه‌نامهٔ کوچک تو</span><h1>واژه‌های درس اول<span className="orange-dot">.</span></h1><p>{number(total)} مدخل از گزیدهٔ موجود؛ وضعیت‌ها براساس پیشرفت واقعی تو هستند.</p></div><span className="level-pill" lang="de" dir="ltr">A1</span></div><label className="word-search"><span className="sr-only">جست‌وجوی واژه یا معنی</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="واژه یا معنی‌اش را جست‌وجو کن…" /></label><div className="word-filters" aria-label="فیلتر وضعیت">{[{ id: 'all', label: 'همه' }, { id: 'new', label: 'جدید' }, { id: 'learning', label: 'در حال یادگیری' }, { id: 'due', label: 'موعد مرور' }].map(item => <button type="button" key={item.id} className={filter === item.id ? 'active' : ''} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}<span>{number(item.id === 'all' ? total : Object.values(statuses).filter(value => value === item.id).length)}</span></button>)}</div><div className="word-list">{selectedWords.map(entry => <details className="word-item" key={entry.entryId}><summary><span className="word-item-main"><GermanWord entry={entry} /><span>{entry.meaningFa}</span></span><span className={`word-status status-${statuses[entry.entryId]}`}><i />{statuses[entry.entryId] === 'due' ? 'موعد مرور' : statuses[entry.entryId] === 'learning' ? 'در حال یادگیری' : 'جدید'}</span><span className="details-chevron" aria-hidden="true">⌄</span></summary><div className="word-item-details"><ExampleBlock entry={entry} /><Sources entry={entry} bundle={bundle} />{state.progress[entry.entryId]?.nextDueAt && <p className="word-due">مرور بعدی: {dateLabel(state.progress[entry.entryId].nextDueAt, now)}</p>}</div></details>)}</div>{!selectedWords.length && <div className="empty-state"><Icon name="book" /><h2>واژه‌ای با این جست‌وجو پیدا نشد.</h2><button className="text-button" type="button" onClick={() => { setSearch(''); setFilter('all') }}>نمایش همهٔ واژه‌ها</button></div>}</section>}
      {effectivePage === 'about' && <section className="about-page"><span className="eyebrow">شفاف، ساده، روی همین دستگاه</span><h1>پشتِ این واژه‌ها<span className="orange-dot">.</span></h1><article className="about-card"><span className="about-icon"><Icon name="book" /></span><div><h2>یک گزیدهٔ کوچک برای شروع</h2><p>این بسته شامل {number(total)} مدخل از درس اول <bdi lang="de" dir="ltr">{bundle.lesson.titleDe}</bdi> است. معنی، آرتیکل و ارجاعات با فایل گزیده تطبیق داده شده‌اند.</p><p>{bundle.provenance.noteFa}</p><p>جمله‌ها و ترجمهٔ آن‌ها تألیفی‌اند و نقل‌قول از کتاب نیستند. ارجاع هر واژه در کارت و فهرست واژه‌ها در دسترس است.</p><span className="source-file" dir="ltr">{bundle.provenance.file}</span></div></article><article className="about-card"><span className="about-icon peach"><Icon name="clock" /></span><div><h2>یادگیری با فاصله</h2><p>نخستین یادآوری موفق، مرور را برای یک روز بعد برنامه‌ریزی می‌کند. با مرورهای موفقِ موعدرسیده در روزهای جدا، فاصله‌ها به ۳، ۷، ۱۴ و ۳۰ روز می‌رسند.</p><p>چند جواب درست در یک روز، چند پله را جلو نمی‌برد. کارت و بازی جای یادآوری مستقل را نمی‌گیرند. پاسخ غلط پس از چند سؤال دیگر دوباره تمرین می‌شود؛ اگر تمرین کافی نماند، برای جلسهٔ بعد محفوظ است.</p></div></article><article className="about-card"><span className="about-icon yellow"><Icon name="leaf" /></span><div><h2>پیشرفتت روی همین مرورگر</h2><p>پاسخ‌ها، موعد مرور و محل ادامهٔ جلسه در حافظهٔ محلی مرورگر این دستگاه ذخیره می‌شوند. حساب کاربری و همگام‌سازی ابری وجود ندارد.</p><p>تازه‌سازی و بستن عادی برنامه پیشرفت را حفظ می‌کنند. پاک‌کردن دادهٔ سایت یا حذف داده‌ها توسط مرورگر می‌تواند پیشرفت را پاک کند؛ پشتیبان خودکار وجود ندارد.</p><p>{offlineStatus === 'ready' ? 'پوسته و بستهٔ این نسخه بررسی شده‌اند و برای مطالعهٔ آفلاین آماده‌اند.' : 'آمادگی آفلاین هنوز تأیید نشده است؛ پس از آماده‌شدن، نشان بالای صفحه تغییر می‌کند.'}</p></div></article></section>}
    </main>
    <footer className="app-footer"><span lang="de" dir="ltr">Kleine Schritte. Neue Wörter.</span><span>واژه‌های کوچک، قدم‌های ماندگار.</span></footer>
    {effectivePage !== 'session' && <nav className="mobile-nav" aria-label="ناوبری اصلی موبایل">{navigation.map(item => <button type="button" key={item.page} className={effectivePage === item.page ? 'active' : ''} aria-current={effectivePage === item.page ? 'page' : undefined} onClick={() => setPage(item.page)}><Icon name={item.icon} /><span>{item.label}</span></button>)}</nav>}
  </div>
}
