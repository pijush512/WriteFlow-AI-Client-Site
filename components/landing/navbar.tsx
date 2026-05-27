// "use client";

// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import { ThemeToggle } from "../theme-toggle";
// import { Sparkles, Menu, X } from "lucide-react";
// import { Sparkles, Menu, X, LogOut } from "lucide-react";
// import Link from "next/link";

// export function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
//           <Sparkles className="h-6 w-6 text-primary" />
//           <span>WriteFlow AI</span>
//         </div>

//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//           <a href="/" className="transition-colors hover:text-primary">Home</a>
//           <a href="/explore" className="transition-colors hover:text-primary">Explore</a>
//           <a href="/blog" className="transition-colors hover:text-primary">Blog</a>
//           <a href="/contact" className="transition-colors hover:text-primary">Contact</a>
//         </nav>

//         <div className="hidden md:flex items-center space-x-4">
//           <ThemeToggle />
//           <a href="/login"><Button variant="ghost" size="sm">Login</Button></a>
//           <a href="/register"><Button size="sm">Start Writing Free</Button></a>
//         </div>

//         <div className="flex items-center space-x-2 md:hidden">
//           <ThemeToggle />
//           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
//             {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {mobileMenuOpen && (
//         <div className="md:hidden border-b bg-background p-4 space-y-4 flex flex-col">
//           <a href="/" onClick={() => setMobileMenuOpen(false)} className="font-medium">Home</a>
//           <a href="/explore" onClick={() => setMobileMenuOpen(false)} className="font-medium">Explore</a>
//           <a href="/blog" onClick={() => setMobileMenuOpen(false)} className="font-medium">Blog</a>
//           <a href="/contact" onClick={() => setMobileMenuOpen(false)} className="font-medium">Contact</a>
//           <hr />
//           <link href="/login" className="w-full"><Button variant="outline" className="w-full">Login</Button> </link>
//           <link href="/register" className="w-full"><Button className="w-full">Start Writing Free</Button></link>
//         </div>
//       )}
//     </header>
//   );
// }




"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, Menu, X, LogOut, User, LayoutDashboard, Settings } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight">
          <Sparkles className="h-6 w-6 text-primary" />
          <span>WriteFlow AI</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/explore" className="transition-colors hover:text-primary">Explore</Link>
          {isLoggedIn && <Link href="/dashboard" className="transition-colors hover:text-primary">Dashboard</Link>}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/profile"><User className="mr-2 h-4 w-4" /> Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link href="/register"><Button size="sm">Start Writing Free</Button></Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}