// components/dashboard/header.tsx
"use client";

import { useAuth } from "@/context/auth-context";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
      <h2 className="font-semibold text-gray-700">Dashboard</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.name || "User"}</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 border" />
      </div>
    </header>
  );
}