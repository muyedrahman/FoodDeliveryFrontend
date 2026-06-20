// "use client";

// import Link from "next/link";
// import { Star, Clock, ShoppingBag } from "lucide-react";
// import { FoodItem } from "@/types/food.types";
// import { useCartStore } from "@/store/cartStore";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// interface FoodCardProps {
//   food: FoodItem;
// }

// export default function FoodCard({ food }: FoodCardProps) {
//   const { addItem } = useCartStore();

//   return (
//     <Card className="overflow-hidden border bg-card text-card-foreground rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
//       {/* Food Image */}
//       <div className="relative h-48 w-full bg-muted">
//         <img
//           src={food.image}
//           alt={food.name}
//           className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
//         />
//         <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-foreground flex items-center gap-1 border">
//           <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
//           <span>{food.rating}</span>
//         </div>
//       </div>

//       <CardHeader className="p-4 pb-2">
//         <div className="flex items-center justify-between gap-2">
//           <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
//             {food.category}
//           </span>
//           <span className="text-xs text-muted-foreground flex items-center gap-1">
//             <Clock className="h-3 w-3" />
//             <span>{food.preparationTime} mins</span>
//           </span>
//         </div>
//         <h3 className="font-bold text-lg leading-tight mt-1 line-clamp-1">
//           <Link href={`/foods/${food.id}`} className="hover:text-primary transition-colors">
//             {food.name}
//           </Link>
//         </h3>
//       </CardHeader>

//       <CardContent className="p-4 pt-0 pb-3">
//         <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
//           {food.description}
//         </p>
//         <p className="text-xs font-medium text-foreground/70 mt-2 line-clamp-1">
//           From {food.restaurantName}
//         </p>
//       </CardContent>

//       <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-2">
//         <span className="font-bold text-lg text-primary">${food.price.toFixed(2)}</span>
//         <Button
//           onClick={() => addItem(food, 1)}
//           size="sm"
//           className="bg-primary hover:bg-primary/95 text-white font-semibold flex items-center gap-1.5 rounded-xl shadow-sm"
//         >
//           <ShoppingBag className="h-4 w-4" />
//           <span>Add to Cart</span>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

import Link from "next/link";
import { Star } from "lucide-react";
import { FoodItem } from "@/types/food.types";

export default function FoodCard({ food }: { food: FoodItem }) {
  return (
    <div className="flex h-[380px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-transform hover:-translate-y-1 dark:border-gray-700 dark:bg-[#2D3748]">
      <div className="h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={food.image}
          alt={food.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-base font-bold text-[#2D3748] dark:text-white">
              {food.name}
            </h3>
            <span className="shrink-0 rounded-full bg-[#FF6B35]/10 px-2 py-0.5 text-xs font-semibold text-[#FF6B35]">
              {food.category}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {food.restaurantName}
          </p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-[#2D3748] dark:text-gray-200">
              {food.rating}
            </span>
            <span className="text-gray-400">({food.reviewCount})</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-[#FF6B35]">
            ৳{food.price}
          </span>
        </div>

        <Link
          href={`/foods/${food.id}`}
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#FF6B35] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e85c2a]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}