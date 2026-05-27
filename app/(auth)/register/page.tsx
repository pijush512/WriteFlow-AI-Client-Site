"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, CheckCircle2, AlertCircle } from "lucide-react"; // AlertCircle আইকন যোগ করা হয়েছে

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [serverSuccess, setServerSuccess] = useState("");
  const [serverError, setServerError] = useState(""); // ব্যাকএন্ড এরর হ্যান্ডেল করার জন্য
  const [isLoading, setIsLoading] = useState(false);

  // ফর্ম ভ্যালিডেশন লজিক (ফ্রন্টএন্ড চেক)
  const validateForm = () => {
    const tempErrors: { name?: string; email?: string; password?: string } = {};
    if (!name.trim()) tempErrors.name = "Full name is required";
    
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Invalid email format";
    
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // সাবমিট হ্যান্ডলার (রিয়েল ব্যাকএন্ড কানেকশন)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerSuccess("");
    setServerError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // আমাদের তৈরি করা আসল রেজিস্ট্রেশন API-তে রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // ব্যাকএন্ড যদি কোনো এরর পাঠায় (যেমন: ইমেইল ডুপ্লিকেট হলে)
        throw new Error(data.error || "Something went wrong.");
      }

      // একাউন্ট তৈরি সফল হলে
      setServerSuccess("Account created successfully! Preparing your environment...");
      
      // ফর্ম ফিল্ডগুলো ক্লিয়ার করে দেওয়া
      setName("");
      setEmail("");
      setPassword("");

      // ১.৫ সেকেন্ড পর ইউজারকে কাস্টম লগইন পেজে পাঠিয়ে দেওয়া
      setTimeout(() => {
        router.push("/");
      }, 1500);

    } catch (err: any) {
      // সার্ভার বা নেটওয়ার্ক এরর ক্যাচ করা
      setServerError(err.message || "Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border shadow-lg bg-card text-card-foreground">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold tracking-tight text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Get started with your autonomous AI workspace today.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* সাকসেস মেসেজ অ্যালার্ট */}
        {serverSuccess && (
          <div className="flex items-center gap-2 p-3 text-xs bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> {serverSuccess}
          </div>
        )}

        {/* সার্ভার এরর মেসেজ অ্যালার্ট */}
        {serverError && (
          <div className="flex items-center gap-2 p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg font-medium">
            <AlertCircle className="h-4 w-4 shrink-0" /> {serverError}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
            {errors.name && <p className="text-[11px] text-destructive font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="text"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            {errors.email && <p className="text-[11px] text-destructive font-medium">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            {errors.password && <p className="text-[11px] text-destructive font-medium">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full gap-2 mt-2 font-medium" disabled={isLoading}>
            <UserPlus className="h-4 w-4" /> {isLoading ? "Creating Account..." : "Register Account"}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground font-medium">Or join with</span></div>
        </div>

        {/* Google Social Login */}
        <Button 
          variant="outline" 
          className="w-full gap-2 font-medium" 
          disabled={isLoading} 
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 2.47 2.18 5.46l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google Account
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-muted-foreground w-full">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}