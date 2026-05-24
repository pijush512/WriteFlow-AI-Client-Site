"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import { Sparkles, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>WriteFlow AI</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="/" className="transition-colors hover:text-primary">Home</a>
          <a href="/explore" className="transition-colors hover:text-primary">Explore</a>
          <a href="/blog" className="transition-colors hover:text-primary">Blog</a>
          <a href="/contact" className="transition-colors hover:text-primary">Contact</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <a href="/login"><Button variant="ghost" size="sm">Login</Button></a>
          <a href="/register"><Button size="sm">Start Writing Free</Button></a>
        </div>

        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b bg-background p-4 space-y-4 flex flex-col">
          <a href="/" onClick={() => setMobileMenuOpen(false)} className="font-medium">Home</a>
          <a href="/explore" onClick={() => setMobileMenuOpen(false)} className="font-medium">Explore</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="font-medium">Blog</a>
          <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="font-medium">Contact</a>
          <hr />
          <a href="/login" className="w-full"><Button variant="outline" className="w-full">Login</Button></a>
          <a href="/register" className="w-full"><Button className="w-full">Start Writing Free</Button></a>
        </div>
      )}
    </header>
  );
}