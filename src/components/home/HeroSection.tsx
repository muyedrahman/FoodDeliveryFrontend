"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/foods?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/foods");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral to-background py-20 lg:py-32">
      {/* Background Graphic Decor */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-accent/5 blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Text Content */}
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
              <span>Smart Delivery Powered by AI</span>
              <ArrowRight className="h-4 w-4" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-secondary">
              Gourmet Food, <br className="hidden sm:inline" />
              <span className="text-primary">Curated by AI</span>, <br className="hidden sm:inline" />
              Delivered in Minutes.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              FoodieAI connects you with the finest culinary creations from local chefs. Our smart recommendation engine matches your unique flavor profile with the perfect dish.
            </p>

            {/* Search Bar Form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 bg-card p-2 rounded-xl shadow-md border w-full">
              <div className="relative flex-1 w-full flex items-center">
                <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Craving burgers, sushi, or vegan?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base w-full bg-transparent"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-white font-semibold py-6 px-8 rounded-xl flex items-center gap-2 shadow-sm">
                <span>Find Food</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>

            {/* Badges / Highlights */}
            <div className="flex items-center gap-6 mt-4 text-xs font-semibold text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                <span>500+ Active Kitchens</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                <span>Avg. Delivery 22 Mins</span>
              </div>
            </div>
          </div>

          {/* Graphical/Hero Image Side */}
          <div className="relative flex justify-center items-center">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-2xl overflow-hidden shadow-2xl bg-muted border-4 border-card">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80"
                alt="Gourmet dish presentation"
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Pop-up Cards for Aesthetics */}
            <div className="absolute top-10 -left-6 bg-card border shadow-lg rounded-xl p-4 flex items-center gap-3 animate-bounce duration-[4s]">
              <div className="p-2.5 rounded-lg bg-accent/15 text-accent">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Fast Delivery</p>
                <p className="text-sm font-bold">San Francisco, CA</p>
              </div>
            </div>

            <div className="absolute bottom-10 -right-6 bg-card border shadow-lg rounded-xl p-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs border-2 border-card">A</div>
                <div className="h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs border-2 border-card">B</div>
                <div className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs border-2 border-card">C</div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Happy Customers</p>
                <p className="text-sm font-bold">4.9/5 (12K+ reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
