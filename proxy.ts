// proxy.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // কুকি থেকে রোল চেক (আপনি যদি কুকি ব্যবহার না করে থাকেন, তবে এটি ইগনোর করতে পারেন)
  const userRole = request.cookies.get("user_role")?.value;

  // অ্যাডমিন প্যানেল সুরক্ষা
  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // ইউজার ড্যাশবোর্ড সুরক্ষা
  if (pathname.startsWith("/dashboard")) {
    // এখানে সেশন চেক করার লজিক দেবেন
  }

  return NextResponse.next();
}