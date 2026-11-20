export const CONTENT = {
  brand: { name:'[Planner Name]', city:'New Delhi, India', phone:'+91 98765 43210', email:'hello@plannername.in', instagram:'https://instagram.com/' },
  hero: { eyebrow:'Premium Indian Wedding Planning', title:'We plan it.\nYou live it.', body:'Thoughtful celebrations, beautifully orchestrated—from the first moodboard to the final farewell.', cta:'Plan my wedding', image:'https://raw.githubusercontent.com/saavi122/EvenAfter-A-Wedding-Planner-/main/frontend/src/assets/hero.png' },
  quiz: { questions:[
    {id:'venue',question:'Where do you see yourselves saying “I do”?', options:[['Palace','A grand, heritage setting'],['Resort','A lush destination escape'],['City','A polished urban celebration'],['Intimate','A private, personal setting']]},
    {id:'guests',question:'How many people are you inviting?', options:[['Under 100','Just our favourite people'],['100–250','An intimate crowd'],['250–500','A lively celebration'],['500+','The whole family tree']]},
    {id:'mood',question:'What should the celebration feel like?', options:[['Regal','Rich, dramatic, timeless'],['Romantic','Soft, floral, cinematic'],['Contemporary','Minimal, fashion-forward'],['Festive','Colourful, joyful, energetic']]},
    {id:'events',question:'Which moments matter most?', options:[['Wedding only','One unforgettable day'],['2–3 events','A considered wedding weekend'],['Full festivities','Every ritual, beautifully planned'],['Destination weekend','The whole escape']]},
    {id:'budget',question:'What feels comfortable for the celebration?', options:[['₹15–30L','Beautifully considered'],['₹30–60L','Elevated & expansive'],['₹60L–1Cr','High-touch luxury'],['₹1Cr+','Uncompromisingly bespoke']]},
  ]},
  budget:{ base: {1:1500000,2:2800000,3:4500000}, perGuest: {1:8500,2:12000,3:18000}, perEvent: {1:150000,2:250000,3:450000}, cityMultiplier:{tier1:1,tier2:.82,tier3:.68} }, note:'Indicative planning + production range only. Final pricing depends on venue, guest profile, design scope, travel and vendor selections.' },
  portfolio:[
    {title:'The Palace Edit',type:'Royal',image:'https://raw.githubusercontent.com/saavi122/EvenAfter-A-Wedding-Planner-/main/frontend/src/assets/luxury_wedding_setup.png'},
    {title:'Marigold in Jaipur',type:'Destination',image:'https://raw.githubusercontent.com/saavi122/EvenAfter-A-Wedding-Planner-/main/frontend/src/assets/hero.png'},
    {title:'Ivory Evenings',type:'Intimate',image:'https://raw.githubusercontent.com/saavi122/EvenAfter-A-Wedding-Planner-/main/frontend/src/assets/luxury_wedding_setup.png'},
    {title:'Rose & Silk',type:'Pastel',image:'https://raw.githubusercontent.com/saavi122/EvenAfter-A-Wedding-Planner-/main/frontend/src/assets/hero.png'},
  ],
  process:[['01','Consultation','We listen first: your people, priorities, traditions and the feeling you want.'],['02','Design','Moodboards, spatial concepts and a visual language that feels unmistakably yours.'],['03','Vendors','We curate and negotiate with a trusted network of specialists.'],['04','Planning','Timelines, logistics, guest experience and every tiny moving part.'],['05','Wedding Day','You stay present. We run the room, the clock and everything between.']],
  packages:[['Essential','For beautifully simple celebrations',['Planning roadmap','Vendor shortlisting','Wedding-day coordination']],['Signature','Our most balanced experience',['Full planning','Design direction','Vendor management','Guest experience']],['Luxury','For deeply bespoke celebrations',['End-to-end production','Custom design & styling','Destination logistics','Dedicated on-ground team']]],
  testimonials:[['Ananya & Rohan','Mumbai','“We never felt like we were managing a wedding. We were actually living ours.”'],['Meera & Arjun','Delhi','“Every detail felt intentional, but nothing felt overdone. Exactly what we wanted.”'],['Ishita & Kabir','Jaipur','“From the first moodboard to the last dance, they made the impossible look effortless.”']],
} as const
export type QuizAnswers = Record<string,string>
