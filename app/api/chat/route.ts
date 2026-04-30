import { NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json();
    const response = await getChatResponse(message, language);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}