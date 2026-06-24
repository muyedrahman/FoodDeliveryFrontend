// 3 

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
            ${food.price.toFixed(2)}
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

