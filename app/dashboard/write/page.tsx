"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

export default function WritePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt, 
          userId: "cmpqs61uk0000va0skefj5k37" 
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.content) {
        setResult(data.content);
      } else {
        alert("Error: " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      console.error("Generation Error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">AI Content Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="আপনি কী তৈরি করতে চান?"
        className="w-full h-32 p-4 border rounded-lg focus:outline-blue-500"
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
        Generate
      </Button>

      {result && (
        <div className="bg-gray-50 p-6 rounded-lg border mt-6">
          <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}


