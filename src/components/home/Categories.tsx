"use client";

import Link from "next/link";
import { Pizza, Sandwich, Fish, IceCream, Salad, Egg } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  { name: "Burgers", slug: "burgers", icon: Sandwich, color: "bg-orange-500/10 text-orange-500" },
  { name: "Pizza", slug: "pizza", icon: Pizza, color: "bg-red-500/10 text-red-500" },
  { name: "Sushi", slug: "sushi", icon: Fish, color: "bg-cyan-500/10 text-cyan-500" },
  { name: "Vegan", slug: "vegan", icon: Salad, color: "bg-emerald-500/10 text-emerald-500" },
  { name: "Desserts", slug: "desserts", icon: IceCream, color: "bg-pink-500/10 text-pink-500" },
  { name: "Breakfast", slug: "breakfast", icon: Egg, color: "bg-amber-500/10 text-amber-500" },
];

export default function Categories() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-secondary">
            Explore by Category
          </h2>
          <p className="text-muted-foreground">
            Search your favorite foods by categories crafted to satisfy every craving.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/foods?category=${category.slug}`}>
                <Card className="group border bg-card rounded-xl transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                    <div className={`p-4 rounded-full transition-transform group-hover:scale-115 ${category.color}`}>
                      <Icon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
