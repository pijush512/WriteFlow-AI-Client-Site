"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context"; // আমাদের কাস্টমuseAuth হুক ইমপোর্ট করা হলো
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, ShieldAlert, CheckCircle2, User, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // প্রোভাইডার থেকে login ফাংশনটি আনা হলো
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form Validation Logic
  const validateForm = () => {
    const tempErrors: { email?: string; password?: string } = {};
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Invalid email format";
    
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler (রিয়েল ব্যাকএন্ড কানেকশন)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setServerSuccess("");

    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password.");
      }

      setServerSuccess("Login successful! Redirecting to workspace...");
      
      // এই এক লাইনে ইউজার গ্লোবাল স্টেট ও LocalStorage-এ সেভ হবে এবং ড্যাশবোর্ডে চলে যাবে
      setTimeout(() => {
        login(data.user);
        router.push("/");
      }, 1000);

    } catch (err: any) {
      setServerError(err.message || "Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Demo Login One-Click Handler (ডাটাবেজে থাকা টেস্ট ক্রেডেনশিয়াল সেট করার জন্য)
  const handleDemoLogin = (role: "user" | "admin") => {
    setServerError("");
    setServerSuccess("");
    // আপনার ডাটাবেজে যে ডেমো ইমেইলগুলো দিয়ে অ্যাকাউন্ট ক্রিয়েট করবেন, সেগুলো এখানে বসিয়ে দিতে পারেন
    const targetEmail = role === "user" ? "user@writeflow.com" : "admin@writeflow.com";
    setEmail(targetEmail);
    setPassword("123456");
    setErrors({});
  };

  return (
    <Card className="border-border shadow-lg bg-card text-card-foreground">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold tracking-tight text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Login to manage your autonomous AI content workspace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Success and Error Alerts */}
        {serverError && (
          <div className="flex items-center gap-2 p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg font-medium">
            <ShieldAlert className="h-4 w-4 shrink-0" /> {serverError}
          </div>
        )}
        {serverSuccess && (
          <div className="flex items-center gap-2 p-3 text-xs bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> {serverSuccess}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3">
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
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <a href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </div>
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
            <LogIn className="h-4 w-4" /> {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span></div>
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
          Google
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-dashed" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-primary font-semibold flex items-center gap-1">⚡ Instant Test Drive</span></div>
        </div>

        {/* Demo Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="sm" className="gap-1.5 text-xs font-medium" onClick={() => handleDemoLogin("user")} disabled={isLoading}>
            <User className="h-3.5 w-3.5" /> User Demo
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5 text-xs font-medium" onClick={() => handleDemoLogin("admin")} disabled={isLoading}>
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Admin Demo
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-center text-muted-foreground w-full">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-primary font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}