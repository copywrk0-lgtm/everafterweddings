'use client'

import { FormEvent, useState } from 'react'

const quick = ['Packages', 'Budget', 'What do you plan?', 'Talk to EverAfter']
function reply(q:string){const s=q.toLowerCase();if(s.includes('package')||s.includes('price')||s.includes('cost'))return 'EverAfter keeps the experience bespoke rather than forcing you into a fixed package. Tell us your guest count, city and number of events and we can shape the right scope.';if(s.includes('budget'))return 'We can give you an indicative range based on guest count, events, city and production ambition. The best next step is a quick conversation with the team.';if(s.includes('plan')||s.includes('service'))return 'We handle the whole journey: planning, creative direction, vendor curation, production, guest experience and the wedding-day pace.';if(s.includes('talk')||s.includes('whatsapp')||s.includes('book'))return 'Absolutely. WhatsApp the team with your date, city and approximate guest count and Yuga can take it from there.';return 'I can help with planning, budgets, destination celebrations and getting you in touch with EverAfter.'}

export function Chatbot(){
 const [open,setOpen]=useState(false);const [input,setInput]=useState('');const [messages,setMessages]=useState([{from:'bot',text:'Welcome to EverAfter. I’m your wedding concierge. How can I help?'}])
 function send(text=input){if(!text.trim())return;setMessages(m=>[...m,{from:'user',text},{from:'bot',text:reply(text)}]);setInput('')}
 function submit(e:FormEvent){e.preventDefault();send()}
 const wa=`https://wa.me/919167411088?text=${encodeURIComponent('Hi EverAfter, I found you through the website and would love to discuss my wedding.')}`
 return <>
  <button className="concierge-trigger" onClick={()=>setOpen(v=>!v)} aria-label="Open EverAfter Concierge">{open?'×':'E∞A'}<span>{open?'Close':'Concierge'}</span></button>
  {open&&<section className="concierge-panel" aria-label="EverAfter Concierge">
   <div className="concierge-head"><div><div className="concierge-title">EverAfter Concierge</div><div className="concierge-kicker">A QUIET PLACE TO START</div></div><button onClick={()=>setOpen(false)} aria-label="Close">×</button></div>
   <div className="concierge-messages">{messages.map((m,i)=><div key={i} className={`c-msg ${m.from}`}>{m.text}</div>)}</div>
   <div className="concierge-quick">{quick.map(q=><button key={q} onClick={()=>send(q)}>{q}</button>)}</div>
   <form onSubmit={submit} className="concierge-form"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about your wedding…"/><button>↗</button></form>
   <a className="concierge-wa" href={wa} target="_blank" rel="noopener">Prefer WhatsApp? Talk to the team ↗</a>
  </section>}
 </>
}
