"use client";

import { useSearchParams } from "next/navigation";
import { useFoods } from "@/hooks/useFoods";
import FoodCard from "@/components/shared/FoodCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Search } from "lucide-react";

export default function FoodsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const { data: foods, isLoading } = useFoods(search, category);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-neutral/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-secondary">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Menu` : "Browse Gourmet Food"}
            </h1>
            <p className="text-muted-foreground">
              {search
                ? `Showing search results for &ldquo;${search}&rdquo;`
                : "Personalized meals curated by our AI from premier local kitchens."}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : foods && foods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {foods.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
              <div className="p-4 rounded-full bg-muted text-muted-foreground">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg text-secondary">No Dishes Found</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                We couldn&apos;t find any dishes matching your query. Try broadening your keywords.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
