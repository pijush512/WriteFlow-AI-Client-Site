"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

export default function DashboardPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে ডাটা ফেচ করা
  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch("/api/documents");
        const data = await res.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching docs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">My Documents</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Create New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* ডকুমেন্ট টেবিল */}
      <div className="border rounded-lg bg-card">
        {loading ? (
          <p className="p-10 text-center">Loading...</p>
        ) : documents.length > 0 ? (
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created At</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc: any) => (
                <tr key={doc.id} className="border-t">
                  <td className="p-4 font-medium">{doc.title}</td>
                  <td className="p-4 capitalize">{doc.status}</td>
                  <td className="p-4">{new Date(doc.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-10">
            No documents yet. Start creating your first content!
          </p>
        )}
      </div>
    </div>
  );
}