// "use client";

// import { useFoods } from "@/hooks/useFoods";
// import FoodCard from "@/components/shared/FoodCard";
// import SkeletonCard from "@/components/shared/SkeletonCard";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function FeaturedFoods() {
//   const { data: foods, isLoading } = useFoods();

//   // Show only featured foods, limit to 3 items for homepage
//   const featuredFoods = foods ? foods.filter((f) => f.isFeatured).slice(0, 3) : [];

//   return (
//     <section className="py-16 bg-neutral/40 border-y">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
//           <div className="max-w-xl flex flex-col gap-2">
//             <h2 className="text-3xl font-bold tracking-tight text-secondary">
//               Featured Dishes
//             </h2>
//             <p className="text-muted-foreground">
//               These are the highest-rated gourmet selections of the week, highly recommended by our AI engine.
//             </p>
//           </div>
//           <Button asChild variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/5 font-semibold">
//             <Link href="/foods">View Full Menu</Link>
//           </Button>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//           </div>
//         ) : featuredFoods.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {featuredFoods.map((food) => (
//               <FoodCard key={food.id} food={food} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground">No featured dishes available at this moment.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// 2
"use client";

import { useFoods } from "@/hooks/useFoods";
import FoodCard from "@/components/shared/FoodCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedFoods() {
  const { data: foods, isLoading } = useFoods();

  // (f: any) ব্যবহার করে TypeScript এরর ফিক্স করা হলো যেন build সফল হয়
  const featuredFoods = foods
    ? foods.filter((f: any) => f.isFeatured).slice(0, 3)
    : [];

  return (
    <section className="py-16 bg-neutral/40 border-y">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-secondary">
              Featured Dishes
            </h2>
            <p className="text-muted-foreground">
              These are the highest-rated gourmet selections of the week, highly
              recommended by our AI engine.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-xl border-primary text-primary hover:bg-primary/5 font-semibold"
          >
            <Link href="/foods">View Full Menu</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : featuredFoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No featured dishes available at this moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}