import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const POSTS = [
  {
    id: 1,
    title: "How AI is Reshaping Culinary Design and Personalized Diets",
    summary: "Discover how machine learning algorithms recommend meals tailored specifically to your macro-nutrition needs.",
    date: "June 18, 2026",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Top 10 Gourmet Superfoods to Boost Your Work-from-Home Focus",
    summary: "Fuel your workday with these delicious, chef-prepared options that maximize productivity and mental clarity.",
    date: "June 15, 2026",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=60",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-neutral/20 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-secondary">
              Latest Culinary Insights
            </h2>
            <p className="text-muted-foreground">
              Stay updated with our curated articles on nutrition science, kitchen innovations, and gourmet recipes.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/5 font-semibold">
            <Link href="/blog">Read All Articles</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POSTS.map((post) => (
            <Card key={post.id} className="overflow-hidden border bg-card rounded-xl shadow-md transition-all hover:shadow-lg flex flex-col sm:flex-row">
              <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0 bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3 font-semibold">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg leading-snug line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link href={`/blog`} className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
