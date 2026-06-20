// "use client";

// import { useSearchParams } from "next/navigation";
// import { useFoods } from "@/hooks/useFoods";
// import FoodCard from "@/components/shared/FoodCard";
// import SkeletonCard from "@/components/shared/SkeletonCard";
// import Navbar from "@/components/shared/Navbar";
// import Footer from "@/components/shared/Footer";
// import { Search } from "lucide-react";

// export default function FoodsPage() {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search") || "";
//   const category = searchParams.get("category") || "";

//   const { data: foods, isLoading } = useFoods(search, category);

//   return (
//     <div className="flex min-h-screen flex-col">
//       <Navbar />
//       <main className="flex-1 py-12 bg-neutral/30">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-4 mb-8">
//             <h1 className="text-3xl font-extrabold tracking-tight text-secondary">
//               {category
//                 ? `${category.charAt(0).toUpperCase() + category.slice(1)} Menu`
//                 : "Browse Gourmet Food"}
//             </h1>
//             <p className="text-muted-foreground">
//               {search
//                 ? `Showing search results for &ldquo;${search}&rdquo;`
//                 : "Personalized meals curated by our AI from premier local kitchens."}
//             </p>
//           </div>

//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <SkeletonCard />
//               <SkeletonCard />
//               <SkeletonCard />
//             </div>
//           ) : foods && foods.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {foods.map((food) => (
//                 <FoodCard key={food.id} food={food} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
//               <div className="p-4 rounded-full bg-muted text-muted-foreground">
//                 <Search className="h-8 w-8" />
//               </div>
//               <h3 className="font-bold text-lg text-secondary">
//                 No Dishes Found
//               </h3>
//               <p className="text-sm text-muted-foreground max-w-xs">
//                 We couldn&apos;t find any dishes matching your query. Try
//                 broadening your keywords.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Search, SlidersHorizontal } from "lucide-react";
// import FoodCard from "@/components/shared/FoodCard";
// import SkeletonCard from "@/components/shared/SkeletonCard";
// import { useDebounce } from "@/hooks/useDebounce";
// import { FOOD_ITEMS } from "@/lib/foodData";
// import { FoodCategory, SortOption } from "@/types/food.types";

// const CATEGORIES: (FoodCategory | "All")[] = [
//   "All",
//   "Burger",
//   "Pizza",
//   "Rice",
//   "Drinks",
//   "Dessert",
//   "Chicken",
// ];

// const PRICE_RANGES: { label: string; value: string }[] = [
//   { label: "All Prices", value: "all" },
//   { label: "Under ৳100", value: "under-100" },
//   { label: "৳100 - ৳200", value: "100-200" },
//   { label: "৳200 - ৳300", value: "200-300" },
//   { label: "Above ৳300", value: "above-300" },
// ];

// const SORT_OPTIONS: { label: string; value: SortOption }[] = [
//   { label: "Most Popular", value: "popular" },
//   { label: "Price: Low to High", value: "price-asc" },
//   { label: "Price: High to Low", value: "price-desc" },
//   { label: "Highest Rated", value: "rating" },
// ];

// const ITEMS_PER_PAGE = 8;

// function matchesPriceRange(price: number, range: string): boolean {
//   switch (range) {
//     case "under-100":
//       return price < 100;
//     case "100-200":
//       return price >= 100 && price <= 200;
//     case "200-300":
//       return price > 200 && price <= 300;
//     case "above-300":
//       return price > 300;
//     default:
//       return true;
//   }
// }

// export default function FoodsPage() {
//   const [searchInput, setSearchInput] = useState("");
//   const debouncedSearch = useDebounce(searchInput, 500);

//   const [category, setCategory] = useState<FoodCategory | "All">("All");
//   const [priceRange, setPriceRange] = useState("all");
//   const [sort, setSort] = useState<SortOption>("popular");
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);

//   // Simulate loading whenever filters change
//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => setIsLoading(false), 700);
//     return () => clearTimeout(timer);
//   }, [debouncedSearch, category, priceRange, sort, page]);

//   // Reset to page 1 whenever a filter changes
//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearch, category, priceRange, sort]);

//   const filteredFoods = useMemo(() => {
//     let result = FOOD_ITEMS.filter((food) => {
//       const matchesSearch = food.name
//         .toLowerCase()
//         .includes(debouncedSearch.toLowerCase());
//       const matchesCategory = category === "All" || food.category === category;
//       const matchesPrice = matchesPriceRange(food.price, priceRange);
//       return matchesSearch && matchesCategory && matchesPrice;
//     });

//     switch (sort) {
//       case "price-asc":
//         result = [...result].sort((a, b) => a.price - b.price);
//         break;
//       case "price-desc":
//         result = [...result].sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result = [...result].sort((a, b) => b.rating - a.rating);
//         break;
//       case "popular":
//       default:
//         result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
//         break;
//     }

//     return result;
//   }, [debouncedSearch, category, priceRange, sort]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredFoods.length / ITEMS_PER_PAGE),
//   );
//   const paginatedFoods = filteredFoods.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE,
//   );

//   return (
//     <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-[#2D3748] dark:text-white md:text-4xl">
//           Explore Our Menu
//         </h1>
//         <p className="mt-2 text-gray-500 dark:text-gray-400">
//           Search, filter, and find your next favorite meal.
//         </p>
//       </div>

//       {/* Search bar */}
//       <div className="relative mb-6">
//         <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           placeholder="Search for burgers, pizza, rice..."
//           className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-[#2D3748] outline-none ring-[#FF6B35] focus:ring-2 dark:border-gray-700 dark:bg-[#2D3748] dark:text-white"
//         />
//       </div>

//       {/* Filters row */}
//       <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#2D3748] md:flex-row md:items-center md:justify-between">
//         <div className="flex items-center gap-2 text-sm font-semibold text-[#2D3748] dark:text-white">
//           <SlidersHorizontal className="h-4 w-4" />
//           Filters
//         </div>

//         <div className="flex flex-1 flex-wrap gap-3">
//           <select
//             value={category}
//             onChange={(e) =>
//               setCategory(e.target.value as FoodCategory | "All")
//             }
//             className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D3748] outline-none dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
//           >
//             {CATEGORIES.map((c) => (
//               <option key={c} value={c}>
//                 {c === "All" ? "All Categories" : c}
//               </option>
//             ))}
//           </select>

//           <select
//             value={priceRange}
//             onChange={(e) => setPriceRange(e.target.value)}
//             className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D3748] outline-none dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
//           >
//             {PRICE_RANGES.map((p) => (
//               <option key={p.value} value={p.value}>
//                 {p.label}
//               </option>
//             ))}
//           </select>

//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value as SortOption)}
//             className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D3748] outline-none dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
//           >
//             {SORT_OPTIONS.map((s) => (
//               <option key={s.value} value={s.value}>
//                 {s.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Results count */}
//       <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
//         Showing {paginatedFoods.length} of {filteredFoods.length} items
//       </p>

//       {/* Grid */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       ) : filteredFoods.length === 0 ? (
//         <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
//           <span className="text-5xl">🍽️</span>
//           <h3 className="mt-4 text-lg font-semibold text-[#2D3748] dark:text-white">
//             No items found
//           </h3>
//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             Try adjusting your search or filters.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {paginatedFoods.map((food) => (
//             <FoodCard key={food.id} food={food} />
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {!isLoading && filteredFoods.length > 0 && (
//         <div className="mt-10 flex items-center justify-center gap-2">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-[#2D3748] disabled:opacity-40 dark:border-gray-700 dark:text-white"
//           >
//             Previous
//           </button>

//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
//                 page === i + 1
//                   ? "bg-[#FF6B35] text-white"
//                   : "border border-gray-200 text-[#2D3748] dark:border-gray-700 dark:text-white"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-[#2D3748] disabled:opacity-40 dark:border-gray-700 dark:text-white"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }

// 3

"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import FoodCard from "@/components/shared/FoodCard";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { useDebounce } from "@/hooks/useDebounce";
import { FOOD_ITEMS } from "@/lib/foodData";
import { FoodCategory, SortOption } from "@/types/food.types";

const CATEGORIES: (FoodCategory | "All")[] = [
  "All",
  "Burger",
  "Pizza",
  "Rice",
  "Drinks",
  "Dessert",
  "Chicken",
];

const PRICE_RANGES: { label: string; value: string }[] = [
  { label: "All Prices", value: "all" },
  { label: "Under $3", value: "under-3" },
  { label: "$3 - $6", value: "3-6" },
  { label: "$6 - $9", value: "6-9" },
  { label: "Above $9", value: "above-9" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

const ITEMS_PER_PAGE = 8;

function matchesPriceRange(price: number, range: string): boolean {
  switch (range) {
    case "under-3":
      return price < 3;
    case "3-6":
      return price >= 3 && price <= 6;
    case "6-9":
      return price > 6 && price <= 9;
    case "above-9":
      return price > 9;
    default:
      return true;
  }
}

export default function FoodsPage() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const [category, setCategory] = useState<FoodCategory | "All">("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState<SortOption>("popular");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading whenever filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [debouncedSearch, category, priceRange, sort, page]);

  // Reset to page 1 whenever a filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, priceRange, sort]);

  const filteredFoods = useMemo(() => {
    let result = FOOD_ITEMS.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesCategory = category === "All" || food.category === category;
      const matchesPrice = matchesPriceRange(food.price, priceRange);
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [debouncedSearch, category, priceRange, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFoods.length / ITEMS_PER_PAGE),
  );
  const paginatedFoods = filteredFoods.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2D3748] dark:text-white md:text-4xl">
          Explore Our Menu
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Search, filter, and find your next favorite meal.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for burgers, pizza, rice..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-[#2D3748] outline-none ring-[#FF6B35] focus:ring-2 dark:border-gray-700 dark:bg-[#2D3748] dark:text-white"
        />
      </div>

      {/* Filters row */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-[#2D3748] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2D3748] dark:text-white">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </div>

        <div className="flex flex-1 flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as FoodCategory | "All")
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D3748] outline-none dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D3748] outline-none dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
          >
            {PRICE_RANGES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#2D3748] outline-none dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {paginatedFoods.length} of {filteredFoods.length} items
      </p>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-20 text-center dark:border-gray-700">
          <span className="text-5xl">🍽️</span>
          <h3 className="mt-4 text-lg font-semibold text-[#2D3748] dark:text-white">
            No items found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && filteredFoods.length > 0 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-[#2D3748] disabled:opacity-40 dark:border-gray-700 dark:text-white"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                page === i + 1
                  ? "bg-[#FF6B35] text-white"
                  : "border border-gray-200 text-[#2D3748] dark:border-gray-700 dark:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-[#2D3748] disabled:opacity-40 dark:border-gray-700 dark:text-white"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}