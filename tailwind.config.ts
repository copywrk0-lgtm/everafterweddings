import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: { colors: { ivory:'#FAF6EF', maroon:'#5A1A24', gold:'#B8975A', charcoal:'#2B2B2B' }, fontFamily: { display:['var(--font-cormorant)'], sans:['var(--font-inter)'] } } },
  plugins: [],
}
export default config
