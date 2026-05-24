"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please provide your email address.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please input a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setSuccess("A password recovery link has been pushed to your email box!");
      setIsLoading(false);
    }, 1200);
  };

  return (
    <Card className="border-border shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold tracking-tight text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your workspace email below to receive a secure recovery link.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg font-medium">
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 p-3 text-xs bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> {success}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-3">
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
          </div>

          <Button type="submit" className="w-full gap-2 mt-2 font-medium" disabled={isLoading}>
            <Mail className="h-4 w-4" /> {isLoading ? "Sending recovery link..." : "Send Password Recovery Link"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <a href="/login" className="text-xs font-medium text-muted-foreground hover:text-primary flex items-center gap-1.5 mx-auto justify-center transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to login screen
        </a>
      </CardFooter>
    </Card>
  );
}