import React from "react";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-4">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" /> WriteFlow AI
        </div>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
          <a href="/terms" className="hover:text-foreground">Terms of Service</a>
        </div>
        <div>© {new Date().getFullYear()} WriteFlow AI Inc. All rights reserved.</div>
      </div>
    </footer>
  );
}