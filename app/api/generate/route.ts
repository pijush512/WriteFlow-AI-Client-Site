import { NextResponse } from 'next/server';
import Groq from "groq-sdk";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json();

    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    // AI থেকে কন্টেন্ট জেনারেট করা
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      // response_format লাইনটি মুছে ফেলা হয়েছে যাতে যেকোনো টেক্সট কাজ করে
    });

    const aiContent = chatCompletion.choices[0]?.message?.content || "{}";

    // ডাটাবেসে ডকুমেন্ট সেভ করা
    const newDoc = await prisma.document.create({
      data: {
        title: prompt.substring(0, 50),
        content: aiContent, // যেহেতু এখন টেক্সট, তাই JSON.stringify করার প্রয়োজন নেই
        userId: userId || "anonymous",
      },
    });

    return NextResponse.json({ content: aiContent, docId: newDoc.id });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}