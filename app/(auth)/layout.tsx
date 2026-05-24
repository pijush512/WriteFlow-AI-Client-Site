"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background text-foreground">
      
      {/* বামপাশ: একটি সুন্দর মিনিমালিস্ট ব্র্যান্ড প্যানেল (শুধুমাত্র বড় স্ক্রিনে দেখাবে) */}
      <div className="hidden lg:flex lg:col-span-5 bg-muted/40 border-r flex-col justify-between p-10 relative overflow-hidden">
        {/* ব্যাকগ্রাউন্ড গ্লো */}
        <div className="absolute w-80 h-80 bg-primary/5 rounded-full blur-3xl -top-20 -left-20 animate-pulse" />
        
        {/* টপ লোগো */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight z-10">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>WriteFlow AI</span>
        </Link>

        {/* মাঝখানের টেক্সট */}
        <div className="space-y-4 z-10">
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            The Hub for Autonomous Content Creation.
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            Deploy background AI agents to build outlines, research materials, and craft fine-tuned drafts instantly.
          </p>
        </div>

        {/* বটম টেক্সট */}
        <div className="text-xs text-muted-foreground z-10">
          © WriteFlow AI Inc. All rights reserved.
        </div>
      </div>

      {/* ডানপাশ: এখানে আমাদের আসল লগইন/রেজিস্ট্রেশন ফর্মগুলো সেন্টারে লোড হবে */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-4 sm:p-8 relative">
        {/* ছোট স্ক্রিনের জন্য উপরে লোগো ব্যাকআপ */}
        <div className="absolute top-6 left-6 flex items-center space-x-2 font-bold text-lg lg:hidden">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>WriteFlow AI</span>
        </div>

        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>

    </div>
  );
}