"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Zap, ChevronDown, Sparkles, FileText, Bot } from "lucide-react";

export function Hero() {
  // --- ১. টাইপিং ইফেক্ট (Typing Effect) এর লজিক ---
  const words = ["Blog Posts.", "Social Captions.", "Email Campaigns.", "SEO Articles."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleTyping = () => {
      const fullWord = words[currentWordIndex];
      
      if (!isDeleting) {
        // টাইপ হচ্ছে
        setCurrentText(fullWord.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullWord) {
          // পুরো শব্দ টাইপ শেষ হলে ২ সেকেন্ড পজ থাকবে
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // ডিলিট হচ্ছে
        setCurrentText(fullWord.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // --- ২. স্ক্রল ডাউন করার ফাংশন ---
  const scrollToFeatures = () => {
    const nextSection = document.getElementById("features");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative container mx-auto px-4 flex flex-col items-center justify-center min-h-[65vh] lg:min-h-[70vh] overflow-hidden pt-12">
      
      {/* মেইন কনটেন্ট গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full max-w-6xl z-10">
        
        {/* বামপাশ: টেক্সট এবং CTA */}
        <div className="lg:col-span-7 text-left flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full w-fit mb-6">
            <Zap className="h-3.5 w-3.5 animate-pulse" /> Next-Gen Agentic AI Platform
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight min-h-[120px] sm:min-h-[150px]">
            Scale Content Creation <br className="hidden sm:inline" />
            Seamlessly for{" "}
            <span className="text-primary border-r-2 border-primary animate-blink pr-1">
              {currentText}
            </span>
          </h1>
          
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
            WriteFlow AI introduces background autonomous agents that build outlines, research data, and draft publication-ready content with minimal inputs.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-2 font-medium h-12 px-6 text-base shadow-lg shadow-primary/20 hover:shadow-none transition-all">
              Start Writing Free <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 text-base">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* ডানপাশ: ইন্টারেক্টিভ ফ্লোটিং কার্ড (Interactive Floating Card) */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
          <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
          
          <div className="w-full max-w-[360px] p-6 bg-card border border-border rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">WriteFlow Agent</h3>
                  <p className="text-[11px] text-green-500 flex items-center gap-1 font-medium">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" /> Live Executing
                  </p>
                </div>
              </div>
              <Sparkles className="h-4 w-4 text-amber-500 group-hover:rotate-12 transition-transform" />
            </div>

            {/* সিমুলেটেড টাস্ক প্রোগ্রেস */}
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Researching Keywords</span>
                  <span className="text-primary">100%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Generating Outline</span>
                  <span className="text-primary">100%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Drafting Article Copy</span>
                  <span className="text-primary animate-pulse">75%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[75%] transition-all duration-1000 animate-pulse" />
                </div>
              </div>
            </div>

            {/* ফ্লোটিং মিনি ব্যাজ */}
            <div className="absolute -bottom-4 -left-4 bg-popover border border-border px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2 text-xs font-medium animate-bounce delay-300">
              <FileText className="h-3.5 w-3.5 text-blue-500" /> SEO Optimized
            </div>
          </div>
        </div>

      </div>

      {/* নিচের সেকশনে যাওয়ার ক্লিয়ার ভিজ্যুয়াল ফ্লো (Scroll Down Indicator) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <button 
          onClick={scrollToFeatures}
          className="flex flex-col items-center text-xs text-muted-foreground hover:text-primary transition-colors gap-1 group"
        >
          <span>Explore Features</span>
          <ChevronDown className="h-4 w-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

    </section>
  );
}