'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Chatbot } from '@/components/ui/Chatbot'

const WA = '919167411088'
const OWNER = 'Yuga'

const stories = [
  { names: 'Nikki & Ravi', venue: 'Sofitel Bahrain Zallaq Thalassa Sea & Spa', place: 'Bahrain', image: '/images/0006-2be554e6.webp', alt: 'Wedding celebration with floral stage and warm golden lighting' },
  { names: 'Yugandhara & Ninad', venue: 'Mumbai, India', place: 'Mumbai', image: '/images/0002-d2a5b732.webp', alt: 'Indian wedding celebration with couple and guests' },
  { names: 'Gitika & Anish', venue: 'Radisson Blu Udaipur Palace Resort & Spa', place: 'Udaipur', image: '/images/0007-227c860a.webp', alt: 'Outdoor floral wedding ceremony overlooking the lake' },
]

const events = [
  { t: 6, short: 'Setup', title: 'Before anyone is awake', body: 'The production team is already on site. Florals, lighting and the stage take shape quietly.' },
  { t: 10, short: 'Haldi', title: 'Haldi', body: 'Family gathers and the morning stays loose. Nobody is checking a schedule.' },
  { t: 13, short: 'Lunch', title: 'A long lunch', body: 'Nothing is timed. Guests rest, eat and catch up.' },
  { t: 16.5, short: 'Getting ready', title: 'Getting ready', body: 'Rooms stay calm while we handle every vendor and every cue.' },
  { t: 18.5, short: 'Baraat', title: 'The baraat arrives', body: 'Sound, light and timing line up so the arrival feels effortless.' },
  { t: 20.5, short: 'Pheras', title: 'The ceremony', body: 'The ritual moves at its own pace, and everything around it follows.' },
  { t: 22.5, short: 'Dancing', title: 'Dinner and dancing', body: 'Music, food and your people. Watching the clock is our job, not yours.' },
]

const questions = [
  { key: 'setting', q: 'Where does it feel right?', opts: [['Sea', 'Salt air and open horizons'], ['Palace', 'Courtyards and lamplight'], ['City', 'A skyline and a grand room'], ['Garden', 'Lawns, trees and long tables']] },
  { key: 'pace', q: 'How should the days move?', opts: [['Unhurried', 'Room to breathe between rituals'], ['Lively', 'Music, movement and late nights'], ['A bit of both', 'Quiet by day, louder by night']] },
  { key: 'people', q: 'Who is in the room?', opts: [['Intimate', 'A few dozen of your closest people'], ['Family, all of it', 'Every relative and every ritual'], ['A big gathering', 'Hundreds, planned to still feel personal']] },
] as const

function waLink(text: string) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
}

function pad(n: number) { return String(n).padStart(2, '0') }
function fmt(t: number) {
  let h = Math.floor(t)
  let m = Math.round((t - h) * 60)
  if (m === 60) { h += 1; m = 0 }
  return `${pad(h)}:${pad(m)}`
}

function skyAt(t: number) {
  const stops: [number, string, string, string][] = [
    [6, '#2b3352', '#8a7194', '#f2a77a'], [9, '#78aed4', '#b9d7e6', '#f7e6c4'], [13, '#4a97d0', '#9ccbe8', '#e0eff4'],
    [17, '#6aa0c8', '#e6cfa2', '#f4b66e'], [18.7, '#3a3a6c', '#cb6a7a', '#f4a85a'], [20.5, '#151e3c', '#2d3060', '#70506f'], [23.5, '#070d1c', '#101b35', '#1c2549'],
  ]
  let i = 0
  while (i < stops.length - 2 && t > stops[i + 1][0]) i++
  const a = stops[i], b = stops[i + 1]
  const mix = (x: string, y: string, p: number) => {
    const hx = x.replace('#', ''), hy = y.replace('#', '')
    return `rgb(${[0,2,4].map(k => Math.round(parseInt(hx.slice(k,k+2),16) + (parseInt(hy.slice(k,k+2),16)-parseInt(hx.slice(k,k+2),16))*p)).join(',')})`
  }
  const p = Math.min(1, Math.max(0, (t-a[0])/(b[0]-a[0])))
  return [mix(a[1],b[1],p), mix(a[2],b[2],p), mix(a[3],b[3],p)]
}

export default function Home() {
  const months = useMemo(() => Array.from({ length: 24 }, (_, i) => new Date(new Date().getFullYear(), new Date().getMonth()+i, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' })), [])
  const [time, setTime] = useState(18.5)
  const [playing, setPlaying] = useState(false)
  const [story, setStory] = useState(0)
  const [quizStep, setQuizStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const [sent, setSent] = useState(false)
  const [dateMonth, setDateMonth] = useState('')
  const [dateCity, setDateCity] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [month, setMonth] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setTime(v => v >= 23.5 ? 6 : Math.min(23.5, v + .075)), 50)
    return () => window.clearInterval(id)
  }, [playing])

  useEffect(() => { if (time >= 23.5 && playing) setPlaying(false) }, [time, playing])

  const sky = skyAt(time)
  const eventIndex = events.reduce((acc, e, i) => time >= e.t ? i : acc, 0)
  const p = (time - 6) / 13
  const sunX = 40 + 280 * Math.max(0, Math.min(1, p))
  const sunY = 330 - Math.sin(Math.PI * Math.max(0, Math.min(1, p))) * 250
  const sunOn = time <= 19.6
  const moonP = Math.max(0, Math.min(1, (time - 18.5) / 5))
  const moonX = 60 + 240 * moonP
  const moonY = 330 - (1 - Math.pow(1 - moonP, 2)) * 220
  const moonOn = time >= 18.5

  const dateHref = waLink(`Hi ${OWNER}, we’re thinking of ${dateMonth || 'a date we haven’t set yet'}${dateCity ? ` in ${dateCity}` : ''}. Could you tell us if you’re available?`)

  function answer(value: string) {
    const key = questions[quizStep].key
    const next = { ...answers, [key]: value }
    setAnswers(next)
    if (quizStep < questions.length - 1) setQuizStep(quizStep + 1)
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSent(true)
  }

  const enquiryHref = waLink(`Hi ${OWNER}, I’m ${name}. We’re planning a wedding${city ? ` in ${city}` : ''}${month ? ` around ${month}` : ''}.${note ? ` ${note}` : ''}${phone ? ` You can reach me on ${phone}.` : ''}`)

  return (
    <>
      <header className="site-header">
        <div className="wrap bar">
          <a className="mark" href="#top" aria-label="Ever After Weddings, home"><b>E<i>∞</i>A</b><span>Ever After Weddings</span></a>
          <nav className="nav" aria-label="Main"><a href="/celebrations">Celebrations</a><a href="/approach">Approach</a><a href="/feel">Find your feeling</a><a className="btn" href="/plan">Plan with us</a></nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Wedding planning &amp; design · Mumbai · Bahrain</p>
              <h1>More Than<br/>A <em>Wedding</em></h1>
              <p className="lead">Celebrations that feel natural, meaningful and distinctly personal.</p>
              <div className="datecheck" role="group" aria-label="Check your date">
                <label><span>Wedding month</span><select value={dateMonth} onChange={e=>setDateMonth(e.target.value)}><option value="">Choose a month</option>{months.map(m=><option key={m}>{m}</option>)}</select></label>
                <label><span>City</span><input value={dateCity} onChange={e=>setDateCity(e.target.value)} type="text" placeholder="City or venue" /></label>
                <a className="btn" href={dateHref} target="_blank" rel="noopener">Check your date ↗</a>
              </div>
              <p className="reply-note">Opens WhatsApp with your details ready to send. We reply personally.</p>
            </div>

            <div className="day">
              <svg className="arch-svg" viewBox="-12 -12 384 492" role="img" aria-label="A sky over the sea that changes with the time of day">
                <defs>
                  <clipPath id="arch-clip"><path d="M0 480V180A180 180 0 0 1 360 180V480Z"/></clipPath>
                  <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={sky[0]}/><stop offset=".55" stopColor={sky[1]}/><stop offset="1" stopColor={sky[2]}/></linearGradient>
                  <linearGradient id="g-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#294b5c"/><stop offset="1" stopColor="#07151f"/></linearGradient>
                </defs>
                <g clipPath="url(#arch-clip)">
                  <rect width="360" height="480" fill="url(#g-sky)"/>
                  {Array.from({length:34},(_,i)=><circle key={i} cx={(i*71)%360} cy={(i*37)%230+6} r=".7" fill="#fff" opacity={Math.max(0, Math.min(1,(time-19.3)/2))*.7}/>) }
                  <circle cx={sunX} cy={sunY} r="64" fill="#ffd9a0" opacity={sunOn?.25:0}/>
                  <circle cx={sunX} cy={sunY} r="26" fill="#ffd09a" opacity={sunOn?1:0}/>
                  <circle cx={moonX} cy={moonY} r="40" fill="#f3efe0" opacity={moonOn?.16:0}/>
                  <circle cx={moonX} cy={moonY} r="16" fill="#f3efe0" opacity={moonOn?1:0}/>
                  <rect y="330" width="360" height="150" fill="url(#g-sea)"/>
                  <ellipse cx={sunX} cy="352" rx="22" ry="5" fill="#ffd9a0" opacity={sunOn?.35:0}/>
                  <ellipse cx={moonX} cy="352" rx="16" ry="4" fill="#f3efe0" opacity={moonOn?.35:0}/>
                  <g stroke="#fff" strokeOpacity=".12" strokeWidth="1"><path d="M10 372h60M120 384h90M250 370h80M40 400h70M170 414h100M300 398h50M20 436h90M200 446h110"/></g>
                  <g fill={sky[2]} opacity=".9"><rect x="116" y="322" width="128" height="8"/><rect x="122" y="286" width="5" height="36"/><rect x="152" y="286" width="5" height="36"/><rect x="203" y="286" width="5" height="36"/><rect x="233" y="286" width="5" height="36"/><path d="M112 286h136L180 256Z"/><path d="M150 262c8-18 52-18 60 0Z"/><rect x="178" y="236" width="4" height="22"/></g>
                  <path d="M-4 120Q180 200 364 120" fill="none" stroke="#fff" strokeOpacity={.2+.2*Math.max(0,Math.min(1,(time-17.4)/1.6))}/>
                </g>
                <path className="arch-outline" d="M-8 480V180A188 188 0 0 1 368 180V480"/>
              </svg>
              <div className="scrub">
                <div className="scrub-top"><span className="clock">{fmt(time)}</span><button className="play" type="button" onClick={()=>setPlaying(v=>!v)}>{playing?'Pause':'Play the day'}</button></div>
                <input type="range" min="6" max="23.5" step=".25" value={time} onChange={e=>{setPlaying(false);setTime(Number(e.target.value))}} aria-label="Time of day on the wedding day"/>
                <h2 className="ev-title">{events[eventIndex].title}</h2><p className="ev-body">{events[eventIndex].body}</p>
                <div className="stops">{events.map(e=><button key={e.t} className="stop" aria-pressed={eventIndex===events.indexOf(e)} onClick={()=>{setPlaying(false);setTime(e.t)}}>{fmt(e.t)} {e.short}</button>)}</div>
                <p className="sample-note">A sample run of show. Every real day is built around your rituals.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="belief"><div className="wrap belief-grid"><p className="eyebrow">We believe</p><div><p className="big">The most memorable celebrations aren’t defined by how grand they are, but by how <em>seamlessly</em> they unfold.</p><p className="sub">Intuitive planning. Intentional design. A day beautifully lived.</p></div></div></section>

        <section className="stories" id="celebrations"><div className="wrap"><div className="sec-head"><div><p className="eyebrow">Selected celebrations</p><h2>Stories we <em>hold close</em></h2></div><a className="btn ghost" href="/celebrations">View all celebrations ↗</a></div>
          <div className="story-grid"><div className="story-list">{stories.map((s,i)=><a key={s.names} className={`story ${story===i?'active':''}`} href={`/celebrations/${s.names === "Nikki & Ravi" ? "nikki-ravi" : s.names === "Yugandhara & Ninad" ? "yugandhara-ninad" : "gitika-anish"}`} onMouseEnter={()=>setStory(i)} onFocus={()=>setStory(i)}><span className="thumb"><div className="art"><img src={s.image} alt={s.alt}/></div></span><span><span className="names">{s.names}</span><span className="where">{s.place} · {s.venue}</span></span><span className="go">↗</span></a>)}</div>
            <aside className="preview" aria-hidden="true"><div className="frame">{stories.map((s,i)=><div className={`pv ${story===i?'on':''}`} key={s.names}><div className="art"><img src={s.image} alt=""/></div></div>)}</div><p className="cap">{stories[story].venue}</p></aside>
          </div>
        </div></section>

        <section className="approach" id="approach"><div className="wrap approach-grid"><div className="stick"><p className="eyebrow">Our approach</p><h2>From first thought to <em>final farewell.</em></h2><p>Clarity in the beautiful complexity. We plan with intuition and design with intention, bringing every moving part into harmony so that you and your people can simply experience the moment.</p></div><div className="steps"><div className="step"><p className="eyebrow">First</p><h3>Listen closely</h3><p>We begin with the two of you: your history, priorities and the feeling you want your wedding to hold.</p></div><div className="step"><p className="eyebrow">Then</p><h3>Design with intention</h3><p>A cohesive creative direction shapes every touchpoint, from the first welcome to the last dance.</p></div><div className="step"><p className="eyebrow">Finally</p><h3>Bring it all together</h3><p>We lead the people, production and pace so every element arrives exactly where it should.</p></div></div></div></section>

        <section className="quiz" id="feel"><div className="wrap quiz-grid"><div className="intro"><p className="eyebrow">Before we speak</p><h2>What should your day <em>feel</em> like?</h2><p>Three quick questions. There are no prices and no packages here, just a first picture of the celebration you are imagining, which you can share with us.</p></div><div>
          {quizStep < questions.length ? <><div className="q-progress"><span>Question {quizStep+1} of 3</span>{questions.map((_,i)=><i key={i} className={i<quizStep?'done':''}></i>)}</div><h3 className="q-title">{questions[quizStep].q}</h3><div className={`opts ${quizStep>0?'three':''}`}>{questions[quizStep].opts.map(([a,b])=><button key={a} className="opt" type="button" onClick={()=>answer(a)}><b>{a}</b><small>{b}</small></button>)}</div>{quizStep>0&&<button className="q-back" onClick={()=>setQuizStep(v=>v-1)}>Back</button>}</> : <div className="result"><div className="tags">{Object.values(answers).map(v=><span key={v}>{v}</span>)}</div><h3>{answers.setting === 'Sea' ? 'Salt air and open horizons' : answers.setting === 'Palace' ? 'Courtyards and lamplight' : answers.setting === 'City' ? 'The city, dressed for the night' : 'Open sky and long tables'}</h3><p className="l2">{answers.pace === 'Lively' ? 'Music that finds its own momentum.' : answers.pace === 'A bit of both' ? 'Quiet by day, louder by night.' : 'Slow mornings, long lunches, nothing rushed.'}</p><p className="l3">{answers.people === 'Intimate' ? 'Held close, with the people who matter most.' : answers.people === 'Family, all of it' ? 'Every relative and every ritual, each given its time.' : 'A large room, planned so it still feels personal.'}</p><div className="actions"><a className="btn" href={waLink(`Hi ${OWNER}, we took your quiz. We’re imagining ${answers.setting}, ${answers.pace}, ${answers.people}. Could we talk about our date?`)} target="_blank" rel="noopener">Share this with {OWNER} ↗</a><button className="btn ghost" onClick={()=>{setQuizStep(0);setAnswers({})}}>Start again</button></div></div>}
        </div></div></section>

        <section className="quote"><div className="wrap"><p>“What remains is not the planning, but the feeling of a day <em>beautifully lived.</em>”</p><span className="mark-inf">E∞A</span></div></section>

        <section className="enquire" id="enquire"><div className="wrap enq-grid"><div className="enq-copy"><p className="eyebrow">Begin your story</p><h2>Tell us what <em>you’re imagining.</em></h2><p>Share the basics and we’ll respond personally within two working days to arrange a first conversation.</p><dl className="direct"><div><dt>WhatsApp and phone</dt><dd>+91 91674 11088</dd></div><div><dt>Email</dt><dd>yuga@everafter.ind.in</dd></div><div><dt>Based in</dt><dd>Mumbai · Bahrain · Worldwide</dd></div></dl></div>
          <form className="form" onSubmit={submit} noValidate><div className="field"><label>Your name</label><input value={name} onChange={e=>setName(e.target.value)} required/><span className="err">{!name.trim() && sent ? 'Please add your name so we know who to reply to.' : ''}</span></div><div className="field"><label>Phone / WhatsApp</label><input value={phone} onChange={e=>setPhone(e.target.value)} type="tel"/></div><div className="field"><label>Wedding location</label><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City or venue"/></div><div className="field"><label>Wedding month</label><select value={month} onChange={e=>setMonth(e.target.value)}><option value="">Not decided yet</option>{months.map(m=><option key={m}>{m}</option>)}</select></div><div className="field full"><label>Tell us about your celebration</label><textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Rituals, guest count, the feeling you want"/></div><div className="form-foot"><button className="btn" type="submit">Start the conversation ↗</button><small>Your details stay private and are only used to respond to your enquiry.</small></div>{sent&&name.trim()&&<div className="sent"><h3>Your message is ready</h3><p>It opens in WhatsApp with your details filled in. Nothing is sent until you press send there.</p><a className="btn" href={enquiryHref} target="_blank" rel="noopener">Open WhatsApp ↗</a></div>}</form>
        </div></section>
      </main>

      <footer className="foot"><div className="wrap"><div className="foot-grid"><div><a className="mark" href="#top"><b>E<i>∞</i>A</b><span>Ever After Weddings</span></a><p style={{marginTop:14,color:'var(--ink-soft)',maxWidth:'22em'}}>Intuitive wedding planning and design for celebrations in Mumbai, Bahrain and beyond.</p></div><div><h4>Explore</h4><ul><li><a href="#celebrations">Celebrations</a></li><li><a href="/approach">Our approach</a></li><li><a href="/feel">Find your feeling</a></li><li><a href="/plan">Plan with us</a></li></ul></div><div><h4>Say hello</h4><ul><li className="addr">yuga@everafter.ind.in</li><li className="addr">+91 91674 11088</li><li><a href="https://www.instagram.com/everafter.ind.in/" target="_blank" rel="noopener">Instagram ↗</a></li></ul></div></div><div className="tiny"><span>© 2026 Ever After Weddings</span><span>Concept by Copywrk</span></div></div></footer>

      <a className="wa-float" href={waLink(`Hi ${OWNER}, I’d like to discuss planning our wedding.`)} target="_blank" rel="noopener" aria-label="Chat with Ever After on WhatsApp"><span className="wa-icon">◔</span> WhatsApp</a>
      <Chatbot />
    </>
  )
}
