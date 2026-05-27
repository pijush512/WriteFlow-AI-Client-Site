import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // সরাসরি SQL কুয়েরি
    await query(
      "INSERT INTO \"User\" (id, name, email, password, \"createdAt\", \"updatedAt\") VALUES ($1, $2, $3, $4, NOW(), NOW())",
      [crypto.randomUUID(), name, email, hashedPassword]
    );
    return NextResponse.json({ message: "সফলভাবে রেজিস্ট্রেশন হয়েছে!" });
  } catch (error) {
    return NextResponse.json({ error: "ডাটাবেজে সমস্যা হয়েছে।" }, { status: 500 });
  }
}