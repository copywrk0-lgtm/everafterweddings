import { NextResponse } from 'next/server'
export async function POST(req:Request){const data=await req.json(); console.log('Wedding inquiry:',data); // TODO: connect email/Google Sheets/CRM
return NextResponse.json({ok:true})}
