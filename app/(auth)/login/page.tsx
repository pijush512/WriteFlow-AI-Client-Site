"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, ShieldAlert, CheckCircle2, User, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cookie সেট করার ফাংশন
  const setAuthCookie = () => {
    document.cookie = "writeflow_user=true; path=/; max-age=86400";
  };

  const validateForm = () => {
    const tempErrors: { email?: string; password?: string } = {};
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Invalid email format";
    
    if (!password) tempErrors.password = "Password is required";
    else if (password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed.");

      setServerSuccess("Login successful!");
      setAuthCookie();
      
      setTimeout(() => {
        login(data.user);
        router.push("/");
      }, 1000);
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: "user" | "admin") => {
    setIsLoading(true);
    const targetEmail = role === "user" ? "user@writeflow.com" : "admin@writeflow.com";
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, password: "123456" }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Demo login failed.");

      setAuthCookie(); 
      login(data.user);
      router.push("/");
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-sm border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Login to your workspace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {serverError && <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">{serverError}</div>}
          
          <form onSubmit={handleLogin} className="space-y-3">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" onClick={() => handleDemoLogin("user")}>User Demo</Button>
            <Button variant="secondary" size="sm" onClick={() => handleDemoLogin("admin")}>Admin Demo</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}