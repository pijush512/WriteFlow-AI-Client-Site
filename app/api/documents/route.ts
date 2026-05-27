import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// আপনার কানেকশন স্ট্রিংটি এখানে বসাবেন
const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: Request) {
  try {
    // ডাটাবেজ থেকে সমস্ত ডকুমেন্ট নিয়ে আসা
    const documents = await sql`SELECT * FROM "Document" ORDER BY "createdAt" DESC`;
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}