// export interface FoodReview {
//   id: string;
//   userId: string;
//   userName: string;
//   rating: number;
//   comment: string;
//   createdAt: string;
// }

// export interface FoodItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   rating: number;
//   preparationTime: number; // in minutes
//   isAvailable: boolean;
//   restaurantId: string;
//   restaurantName: string;
//   isFeatured: boolean;
//   reviewsCount: number;
//   reviews?: FoodReview[];
// }

// export interface Category {
//   id: string;
//   name: string;
//   icon: string; // lucide icon name
//   slug: string;
// }

export type FoodCategory =
  | "Burger"
  | "Pizza"
  | "Rice"
  | "Drinks"
  | "Dessert"
  | "Chicken";

export interface FoodReview {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FoodItem {
  id: string;
  name: string;
  restaurantName: string;
  restaurantId: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: FoodCategory;
  image: string;
  description: string;
  prepTimeMinutes: number;
  calories: number;
  ingredients: string[];
  reviews: FoodReview[];
  isFeatured?: boolean; //
}

export type SortOption = "popular" | "price-asc" | "price-desc" | "rating";

export interface FoodFilters {
  search: string;
  category: FoodCategory | "All";
  priceRange: "all" | "under-100" | "100-200" | "200-300" | "above-300";
  sort: SortOption;
}