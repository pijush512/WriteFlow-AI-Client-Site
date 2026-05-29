import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search } from "lucide-react";

// ডামি ডেটা (পরে ডাটাবেস থেকে লোড করবেন)
const templates = [
  { id: 1, title: "Blog Post", category: "Writing", rating: 4.8, usage: "1.2k" },
  { id: 2, title: "Social Media Ad", category: "Marketing", rating: 4.5, usage: "850" },
  { id: 3, title: "Email Outreach", category: "Sales", rating: 4.9, usage: "2.1k" },
  { id: 4, title: "Product Description", category: "E-commerce", rating: 4.7, usage: "900" },
];

export default function ExplorePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Explore Templates</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="search" placeholder="Search templates..." className="pl-9" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <span className="mr-4">{template.rating}</span>
                <span>{template.usage} uses</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Use Template</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}