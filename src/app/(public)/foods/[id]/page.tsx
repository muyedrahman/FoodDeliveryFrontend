"use client";

import { useFoodDetails } from "@/hooks/useFoods";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Star, Clock, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function FoodDetailPage() {
  const { id } = useParams() as { id: string };
  const { data: food, isLoading, error } = useFoodDetails(id);
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground font-semibold">Loading details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-destructive font-semibold">Dish not found</p>
          <Button asChild>
            <Link href="/foods">Back to Menu</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-neutral/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Link href="/foods" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Menu</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-card border rounded-xl p-6 sm:p-10 shadow-md">
            {/* Image Col */}
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-muted">
              <img
                src={food.image}
                alt={food.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info Col */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {food.category}
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-secondary mt-1">
                  {food.name}
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Prepared by <span className="font-semibold">{food.restaurantName}</span>
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-sm font-semibold">
                  <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                  <span>{food.rating} ({food.reviewsCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full text-sm font-semibold">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{food.preparationTime} mins prep</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {food.description}
              </p>

              <hr />

              {/* Price & Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">${food.price.toFixed(2)}</span>
                <div className="flex items-center border rounded-xl bg-muted overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 font-bold hover:bg-foreground/10 transition-colors">-</button>
                  <span className="px-4 py-1.5 text-sm font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 font-bold hover:bg-foreground/10 transition-colors">+</button>
                </div>
              </div>

              <Button
                onClick={() => {
                  addItem(food, quantity);
                  setQuantity(1);
                }}
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart — ${(food.price * quantity).toFixed(2)}</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
