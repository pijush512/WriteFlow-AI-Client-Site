"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = ["Blog Posts", "Social Captions", "Email Copy", "High-Converting Content"];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-4 py-20 lg:py-32 flex flex-col items-center text-center justify-center min-h-[70vh]">
      <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-muted rounded-full mb-6">
        <Zap className="h-4 w-4 text-primary animate-pulse" /> Next-Gen Agentic AI Platform
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl h-32 md:h-40">
        Scale Content Creation Seamlessly for <br />
        <span className="text-primary transition-all duration-500 block mt-2">
          {headlines[headlineIndex]}
        </span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
        WriteFlow AI introduces background autonomous agents that build outlines, research data, and draft publication-ready content based on minimal inputs.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="gap-2">
          Start Writing Free <ArrowRight className="h-5 w-5" />
        </Button>
        <Button size="lg" variant="outline">Watch Demo Video</Button>
      </div>
    </section>
  );
}