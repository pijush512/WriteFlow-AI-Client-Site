import React from "react";
import { Hero } from "../../components/landing/hero";
import { Features } from "../../components/landing/features";
import { Pricing } from "@/components/landing/pricing";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Hero />
      <hr className="container mx-auto opacity-30" />
      <Features />
      <Pricing></Pricing>
      
    </div>
  );
}