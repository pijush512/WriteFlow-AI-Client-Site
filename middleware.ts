import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // যারা লগইন করেনি, তাদের ড্যাশবোর্ড বা অন্যান্য প্রাইভেট পেজ থেকে সরিয়ে লগইনে পাঠাবে
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/workspace");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // লগইন করা ইউজাররা আবার লগইন পেজে যেতে পারবে না
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// কোন কোন পেজে এই সিকিউরিটি কার্যকর হবে
export const config = {
  matcher: ["/dashboard/:path*", "/workspace/:path*", "/login"],
};