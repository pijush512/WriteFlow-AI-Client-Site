"use client";

import React from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Sparkles, HelpCircle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ডের সুন্দর গ্লো ইফেক্ট */}
      <div className="absolute w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 top-1/4 left-1/4 animate-pulse" />
      <div className="absolute w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 bottom-1/4 right-1/4 animate-pulse delay-700" />

      <div className="text-center max-w-md w-full space-y-6 z-10">
        
        {/* ৪MD ব্র্যান্ডিং বা লোগো আইকন */}
        <div className="relative mx-auto w-24 h-24 bg-muted/50 rounded-2xl flex items-center justify-center border border-border group hover:border-primary/50 transition-colors">
          <HelpCircle className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
          <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-primary animate-bounce" />
        </div>

        {/* টেক্সট এরিয়া */}
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-tighter text-primary">
            404
          </h1>
          <h2 className="text-2xl font-bold tracking-tight">
            Oops! Content Workspace Lost
          </h2>
          <p className="text-sm text-muted-foreground">
            The page you are looking for doesn&apos;t exist or our AI writing agents couldn&apos;t draft it yet. Let&apos;s get you back on track!
          </p>
        </div>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Button 
            variant="outline" 
            onClick={() => router.back()} 
            className="gap-2 font-medium h-11"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
          
          <Button 
            onClick={() => router.push("/")} 
            className="gap-2 font-medium h-11 shadow-md shadow-primary/10"
          >
            <Home className="h-4 w-4" /> Return Home
          </Button>
        </div>

      </div>

      {/* নিচের ছোট ফুটার টেক্সট */}
      <div className="absolute bottom-6 text-xs text-muted-foreground font-mono">
        Error Code: ERR_WRITEFLOW_ROUTE_NOT_FOUND
      </div>
      
    </div>
  );
}