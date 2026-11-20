import Link from 'next/link'

const stories = [
  { slug:'nikki-ravi', names:'Nikki & Ravi', place:'Bahrain', venue:'Sofitel Bahrain Zallaq Thalassa Sea & Spa', image:'/images/0006-2be554e6.webp', copy:'A celebration framed by the sea, warm light and a generous sense of occasion.' },
  { slug:'yugandhara-ninad', names:'Yugandhara & Ninad', place:'Mumbai', venue:'Mumbai, India', image:'/images/0002-d2a5b732.webp', copy:'A Mumbai celebration where family, colour and ritual carried the day.' },
  { slug:'gitika-anish', names:'Gitika & Anish', place:'Udaipur', venue:'Radisson Blu Udaipur Palace Resort & Spa', image:'/images/0007-227c860a.webp', copy:'An Udaipur wedding shaped around palatial scale, intimate details and the lake.' },
]

export default function CelebrationsPage(){
 return <main className="inner-page">
  <header className="site-header"><div className="wrap bar"><Link className="mark" href="/"><b>E<i>∞</i>A</b><span>Ever After Weddings</span></Link><nav className="nav"><Link href="/celebrations">Celebrations</Link><Link href="/approach">Approach</Link><Link href="/feel">Find your feeling</Link><Link className="btn" href="/plan">Plan with us</Link></nav></div></header>
  <section className="inner-hero"><div className="wrap"><p className="eyebrow">Selected celebrations</p><h1>Stories we <em>hold close.</em></h1><p className="lead">A few of the days, places and people that remind us why we do this.</p></div></section>
  <section className="story-archive"><div className="wrap archive-grid">{stories.map(s=><Link href={`/celebrations/${s.slug}`} className="archive-card" key={s.slug}><div className="archive-image"><img src={s.image} alt={s.names}/></div><div className="archive-copy"><p className="eyebrow">{s.place}</p><h2>{s.names}</h2><p>{s.venue}</p><span>Read the story ↗</span></div></Link>)}</div></section>
  <footer className="foot"><div className="wrap"><div className="tiny"><span>© 2026 Ever After Weddings</span><Link href="/">Back home ↗</Link></div></div></footer>
 </main>
}