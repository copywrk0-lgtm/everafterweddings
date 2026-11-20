import Link from 'next/link'
import { notFound } from 'next/navigation'

const data: Record<string,{names:string;place:string;venue:string;image:string;intro:string;details:string[]}> = {
 'nikki-ravi':{names:'Nikki & Ravi',place:'Bahrain',venue:'Sofitel Bahrain Zallaq Thalassa Sea & Spa',image:'/images/0006-2be554e6.webp',intro:'A celebration by the water, built around warm light, generous hospitality and a room that never felt over-produced.',details:['A destination celebration with family arriving from different corners of the world.','The design kept the sea, sunset and the people at the centre of the experience.','Every transition was planned to feel natural rather than announced.']},
 'yugandhara-ninad':{names:'Yugandhara & Ninad',place:'Mumbai',venue:'Mumbai, India',image:'/images/0002-d2a5b732.webp',intro:'A Mumbai wedding with the energy of a full family gathering and the intimacy of a day that still belonged to two people.',details:['Rituals were given room to breathe while the production stayed quietly precise.','Colour, flowers and movement were layered without competing for attention.','The guest experience carried the same care as the visual design.']},
 'gitika-anish':{names:'Gitika & Anish',place:'Udaipur',venue:'Radisson Blu Udaipur Palace Resort & Spa',image:'/images/0007-227c860a.webp',intro:'A palace celebration in Udaipur where the scale was grand, but the feeling stayed personal.',details:['The setting became part of the design rather than a backdrop to it.','Guest movement, ceremony and dinner were choreographed as one continuous story.','Details were chosen for how they would feel in the room, not just how they would photograph.']},
}

export function generateStaticParams(){ return Object.keys(data).map(slug=>({slug})) }

export default async function StoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params
 const s=data[slug]
 if(!s) notFound()
 return <main className="inner-page story-detail">
  <header className="site-header"><div className="wrap bar"><Link className="mark" href="/"><b>E<i>∞</i>A</b><span>Ever After Weddings</span></Link><nav className="nav"><Link href="/celebrations">Celebrations</Link><Link href="/approach">Approach</Link><Link href="/feel">Find your feeling</Link><Link className="btn" href="/plan">Plan with us</Link></nav></div></header>
  <section className="detail-hero"><div className="wrap detail-grid"><div><Link className="back" href="/celebrations">← All celebrations</Link><p className="eyebrow">{s.place} · {s.venue}</p><h1>{s.names}</h1><p className="lead">{s.intro}</p></div><div className="detail-image"><img src={s.image} alt={s.names}/></div></div></section>
  <section className="detail-body"><div className="wrap detail-body-grid"><p className="eyebrow">The feeling</p><div>{s.details.map((d,i)=><p className="big-detail" key={i}>{d}</p>)}<Link className="btn" href="/plan">Plan something of your own ↗</Link></div></div></section>
 </main>
}