"use client";

import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing out WriteFlow AI's core capabilities.",
    features: [
      "2,000 AI words per month",
      "Access to 5+ basic templates",
      "Standard drafting agent",
      "Community support",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Best for professional creators and power users.",
    features: [
      "Unlimited AI generated words",
      "Access to all 30+ premium templates",
      "Advanced Tone Rewriting Engine",
      "Priority background execution agents",
      "24/7 Priority support",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$49",
    period: "/month",
    description: "Built for scaling teams and content agencies.",
    features: [
      "Everything in Pro plan",
      "Up to 5 team members workspace",
      "Custom AI agent training (Your brand voice)",
      "API Access for external tools",
      "Dedicated account manager",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container mx-auto px-4 py-16 lg:py-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Predictable Pricing, Scalable Plans
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Start for free and upgrade as your content workspace expands. No hidden fees.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`relative flex flex-col h-full transition-all duration-300 hover:shadow-md ${
              plan.popular ? "border-primary shadow-sm md:scale-105" : "border-border"
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-sm">
                <Sparkles className="h-3 w-3" /> Most Popular
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription className="min-h-[40px] mt-2">
                {plan.description}
              </CardDescription>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-4">
              <Button 
                variant={plan.buttonVariant} 
                className="w-full font-medium"
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}