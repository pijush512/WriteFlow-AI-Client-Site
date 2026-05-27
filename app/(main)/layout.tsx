// import React from "react";
// import { Navbar } from "../../components/landing/navbar";
// import { Footer } from "../../components/landing/footer";
// import { SessionProvider } from "next-auth/react";

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col min-h-screen bg-background text-foreground">
//       <Navbar />
//       <SessionProvider>
//       <main className="flex-1">{children}</main>
//       </SessionProvider>
//       <Footer />
//     </div>
//   );
// }


import React from "react";
import { Navbar } from "../../components/landing/navbar";
import { Footer } from "../../components/landing/footer";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    // SessionProvider কে সবার উপরে (Navbar-এরও উপরে) নিয়ে আসুন
    <SessionProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}