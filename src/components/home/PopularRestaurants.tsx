import Link from "next/link";
import { Star, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RESTAURANTS = [
  {
    id: "rest-1",
    name: "The Burger Bistro",
    description: "Sizzling wagyu beef and craft ingredients prepared by award-winning chefs.",
    rating: 4.9,
    deliveryTime: "15-25",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60",
    cuisine: "Burgers, Fast Food",
  },
  {
    id: "rest-2",
    name: "Sakura Sushi",
    description: "Authentic sashimi, sushi rolls, and traditional Japanese bento boxes.",
    rating: 4.8,
    deliveryTime: "20-30",
    deliveryFee: "$2.99",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60",
    cuisine: "Japanese, Seafood",
  },
  {
    id: "rest-3",
    name: "Bella Italia",
    description: "Wood-fired artisanal pizzas and rich hand-rolled pasta dishes.",
    rating: 4.7,
    deliveryTime: "15-20",
    deliveryFee: "Free",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=500&auto=format&fit=crop&q=60",
    cuisine: "Italian, Pizza",
  },
];

export default function PopularRestaurants() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-secondary">
              Popular Restaurants
            </h2>
            <p className="text-muted-foreground">
              Order from the top-rated local eateries with high safety standards and excellent cuisine.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/5 font-semibold">
            <Link href="/restaurants">Explore All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESTAURANTS.map((r) => (
            <Card key={r.id} className="overflow-hidden border bg-card rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative h-48 w-full bg-muted">
                <img
                  src={r.image}
                  alt={r.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-foreground flex items-center gap-1 border">
                  <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{r.rating}</span>
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {r.cuisine}
                </span>
                <h3 className="font-bold text-lg leading-tight mt-1">
                  {r.name}
                </h3>
              </CardHeader>

              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {r.description}
                </p>
                <div className="flex items-center gap-4 text-xs font-semibold text-foreground/80 mt-4 pt-4 border-t">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    <span>{r.deliveryTime} mins</span>
                  </span>
                  <span>•</span>
                  <span>Delivery: {r.deliveryFee}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
