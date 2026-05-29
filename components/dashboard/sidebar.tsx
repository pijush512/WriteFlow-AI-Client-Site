"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import {
  LayoutDashboard,
  FileText,
  User,
  History,
  Users,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (path: string) => pathname === path;

  // লিঙ্ক ক্লাস ফাংশন - পাথ ঠিকভাবে চেক করবে
  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 border-r h-screen p-4 flex flex-col bg-white">
      <div className="mb-8 px-4">
        <h1 className="text-2xl font-bold text-blue-600">WriteFlow AI</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {/* আপডেট করা লিঙ্কগুলো */}
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link
          href="/dashboard/documents"
          className={linkClass("/dashboard/documents")}
        >
          <FileText size={20} /> My Documents
        </Link>
        <Link href="/dashboard/write" className={linkClass("/dashboard/write")}>
          <Sparkles size={20} /> Write New
        </Link>
        <Link
          href="/dashboard/profile"
          className={linkClass("/dashboard/profile")}
        >
          <User size={20} /> My Profile
        </Link>
        <Link
          href="/dashboard/history"
          className={linkClass("/dashboard/history")}
        >
          <History size={20} /> AI History
        </Link>

        {user?.role === "admin" && (
          <div className="mt-8">
            <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Admin Area
            </p>
            <div className="space-y-1">
              <Link
                href="/dashboard/admin/users"
                className={linkClass("/dashboard/admin/users")}
              >
                <Users size={20} /> Manage Users
              </Link>
              <Link
                href="/dashboard/admin/templates"
                className={linkClass("/dashboard/admin/templates")}
              >
                <Settings size={20} /> Manage Templates
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="border-t pt-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
