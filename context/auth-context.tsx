// context/auth-context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ইউজারের ডাটা টাইপ (TypeScript এর জন্য)
interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
}

// কনটেক্সটের ভেতরের ফাংশন ও স্টেটের টাইপ
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // অ্যাপ প্রথমবার লোড হওয়ার সময় ব্রাউজারের localStorage থেকে ইউজার সেশন চেক করা
  useEffect(() => {
    const savedUser = localStorage.getItem("writeflow_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // লগইন ফাংশন (লগইন সফল হলে ফ্রন্টএন্ড ফর্ম থেকে এটিকে কল করা হবে)
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("writeflow_user", JSON.stringify(userData));
    router.push("/dashboard"); // লগইন হওয়ার সাথে সাথে ড্যাশবোর্ডে নিয়ে যাবে
  };

  // লগআউট ফাংশন
  const logout = () => {
    setUser(null);
    localStorage.removeItem("writeflow_user");
    router.push("/"); // লগআউট হলে লগইন পেজে ব্যাক করাবে
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// কাস্টম হুক: এটি ব্যবহার করে অ্যাপের যেকোনো পেজ থেকে এক লাইনে ইউজারের ডাটা রিড করা যাবে
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth অবশ্যই AuthProvider এর ভেতরে ব্যবহার করতে হবে।");
  }
  return context;
}