import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // ডাটাবেজ থেকে ইউজার খোঁজা
    const result = await query('SELECT * FROM "User" WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ error: "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট নেই।" }, { status: 401 });
    }

    // পাসওয়ার্ড ভেরিফাই করা
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json({ error: "ভুল পাসওয়ার্ড!" }, { status: 401 });
    }

    // সব ঠিক থাকলে সাকসেস রেসপন্স
    return NextResponse.json({ 
      message: "লগইন সফল হয়েছে!", 
      user: { id: user.id, name: user.name, email: user.email } 
    });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "সার্ভারে সমস্যা হয়েছে।" }, { status: 500 });
  }
}