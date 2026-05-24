import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Sparkles, FileText, Users } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Autonomous Writing Ecosystem</h2>
        <p className="mt-4 text-muted-foreground">Traditional software suggests words. WriteFlow agents carry out autonomous tasks end-to-end.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="p-3 bg-primary/10 w-fit rounded-lg mb-4 text-primary"><Sparkles className="h-6 w-6" /></div>
            <CardTitle>AI Drafting Agent</CardTitle>
            <CardDescription>Generates full-length structured blogs, comprehensive email campaigns, and marketing copies from a single prompt.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="p-3 bg-primary/10 w-fit rounded-lg mb-4 text-primary"><FileText className="h-6 w-6" /></div>
            <CardTitle>Tone Rewriting Engine</CardTitle>
            <CardDescription>Instantly convert formal whitepapers to witty social feeds, adjust structural readability, or optimize for SEO keywords.</CardDescription>
          </CardHeader>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="p-3 bg-primary/10 w-fit rounded-lg mb-4 text-primary"><Users className="h-6 w-6" /></div>
            <CardTitle>Team Collaboration Workspace</CardTitle>
            <CardDescription>Assign specific AI agents to review workspace copy, leave embedded feedback, and coordinate directly with creators.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
}