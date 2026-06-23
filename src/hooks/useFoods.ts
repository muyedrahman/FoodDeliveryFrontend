// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { FoodItem } from "@/types/food.types";

// // Mock data to ensure the client is functional immediately in the browser
// const MOCK_FOODS: FoodItem[] = [
//   {
//     id: "1",
//     name: "Truffle Mushroom Burger",
//     description: "Gourmet wagyu beef patty topped with fresh black truffle shavings and melted swiss cheese.",
//     price: 18.99,
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
//     category: "Burgers",
//     rating: 4.9,
//     preparationTime: 15,
//     isAvailable: true,
//     restaurantId: "rest-1",
//     restaurantName: "The Burger Bistro",
//     isFeatured: true,
//     reviewsCount: 124,
//   },
//   {
//     id: "2",
//     name: "Spicy Tuna Crunch Roll",
//     description: "Premium bluefin tuna, cucumber, avocado, topped with crispy tempura flakes and spicy mayo.",
//     price: 14.50,
//     image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
//     category: "Sushi",
//     rating: 4.8,
//     preparationTime: 20,
//     isAvailable: true,
//     restaurantId: "rest-2",
//     restaurantName: "Sakura Sushi",
//     isFeatured: true,
//     reviewsCount: 98,
//   },
//   {
//     id: "3",
//     name: "Artisanal Margherita Pizza",
//     description: "San Marzano tomatoes, fresh buffalo mozzarella, organic basil, and extra virgin olive oil.",
//     price: 16.00,
//     image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60",
//     category: "Pizza",
//     rating: 4.7,
//     preparationTime: 12,
//     isAvailable: true,
//     restaurantId: "rest-3",
//     restaurantName: "Bella Italia",
//     isFeatured: true,
//     reviewsCount: 215,
//   }
// ];

// export function useFoods(search?: string, category?: string) {
//   return useQuery<FoodItem[]>({
//     queryKey: ["foods", { search, category }],
//     queryFn: async () => {
//       try {
//         const { data } = await api.get<FoodItem[]>("/foods", {
//           params: { search, category },
//         });
//         return data;
//       } catch (err) {
//         // Fallback to mock data if backend not running
//         console.warn("API query failed, falling back to mock data:", err);
//         return MOCK_FOODS.filter(food => {
//           const matchesSearch = !search || food.name.toLowerCase().includes(search.toLowerCase());
//           const matchesCategory = !category || food.category.toLowerCase() === category.toLowerCase();
//           return matchesSearch && matchesCategory;
//         });
//       }
//     },
//   });
// }

// export function useFoodDetails(id: string) {
//   return useQuery<FoodItem>({
//     queryKey: ["food", id],
//     queryFn: async () => {
//       try {
//         const { data } = await api.get<FoodItem>(`/foods/${id}`);
//         return data;
//       } catch {
//         // Fallback to mock data if backend not running
//         console.warn("API query failed, falling back to mock data for food ID:", id);
//         const item = MOCK_FOODS.find((f) => f.id === id);
//         if (!item) throw new Error("Food item not found");
//         return item;
//       }
//     },
//     enabled: !!id,
//   });
// }

// 2

// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { FoodItem } from "@/types/food.types";

// // Mock data to ensure the client is functional immediately in the browser
// const MOCK_FOODS: FoodItem[] = [
//   {
//     id: "1",
//     name: "Truffle Mushroom Burger",
//     description:
//       "Gourmet wagyu beef patty topped with fresh black truffle shavings and melted swiss cheese.",
//     price: 18.99,
//     image:
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
//     category: "Burger",
//     rating: 4.9,
//     preparationTime: 15,
//     isAvailable: true,
//     restaurantId: "rest-1",
//     restaurantName: "The Burger Bistro",
//     isFeatured: true,
//     reviewsCount: 124,
//   },
//   {
//     id: "2",
//     name: "Spicy Tuna Crunch Roll",
//     description:
//       "Premium bluefin tuna, cucumber, avocado, topped with crispy tempura flakes and spicy mayo.",
//     price: 14.5,
//     image:
//       "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
//     category: "Sushi",
//     rating: 4.8,
//     preparationTime: 20,
//     isAvailable: true,
//     restaurantId: "rest-2",
//     restaurantName: "Sakura Sushi",
//     isFeatured: true,
//     reviewsCount: 98,
//   },
//   {
//     id: "3",
//     name: "Artisanal Margherita Pizza",
//     description:
//       "San Marzano tomatoes, fresh buffalo mozzarella, organic basil, and extra virgin olive oil.",
//     price: 16.0,
//     image:
//       "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60",
//     category: "Pizza",
//     rating: 4.7,
//     preparationTime: 12,
//     isAvailable: true,
//     restaurantId: "rest-3",
//     restaurantName: "Bella Italia",
//     isFeatured: true,
//     reviewsCount: 215,
//   },
// ];

// export function useFoods(search?: string, category?: string) {
//   return useQuery<FoodItem[]>({
//     queryKey: ["foods", { search, category }],
//     queryFn: async () => {
//       try {
//         const { data } = await api.get<{ items: FoodItem[] }>("/foods", {
//           params: { search, category },
//         });
//         return data.items;
//       } catch (err) {
//         console.warn("API query failed, falling back to mock data:", err);
//         return MOCK_FOODS.filter((food) => {
//           const matchesSearch =
//             !search || food.name.toLowerCase().includes(search.toLowerCase());
//           const matchesCategory =
//             !category || food.category.toLowerCase() === category.toLowerCase();
//           return matchesSearch && matchesCategory;
//         });
//       }
//     },
//   });
// }

// export function useFoodDetails(id: string) {
//   return useQuery<FoodItem>({
//     queryKey: ["food", id],
//     queryFn: async () => {
//       try {
//         const { data } = await api.get<FoodItem>(`/foods/${id}`);
//         return data;
//       } catch {
//         console.warn(
//           "API query failed, falling back to mock data for food ID:",
//           id,
//         );
//         const item = MOCK_FOODS.find((f) => f.id === id);
//         if (!item) throw new Error("Food item not found");
//         return item;
//       }
//     },
//     enabled: !!id,
//   });
// }

// 3  varcel error

// import { useQuery } from "@tanstack/react-query";
// import api from "@/lib/axios";
// import { FoodItem } from "@/types/food.types";

// // Mock data to ensure the client is functional immediately in the browser
// const MOCK_FOODS: FoodItem[] = [
//   {
//     id: "1",
//     name: "Truffle Mushroom Burger",
//     description:
//       "Gourmet wagyu beef patty topped with fresh black truffle shavings and melted swiss cheese.",
//     price: 18.99,
//     image:
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
//     category: "Burger",
//     rating: 4.9,
//     isAvailable: true,
//     restaurantId: "rest-1",
//     restaurantName: "The Burger Bistro",
//     isFeatured: true,
//     reviewsCount: 124,
//   },
//   {
//     id: "2",
//     name: "Spicy Tuna Crunch Roll",
//     description:
//       "Premium bluefin tuna, cucumber, avocado, topped with crispy tempura flakes and spicy mayo.",
//     price: 14.5,
//     image:
//       "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
//     category: "Sushi",
//     rating: 4.8,
//     isAvailable: true,
//     restaurantId: "rest-2",
//     restaurantName: "Sakura Sushi",
//     isFeatured: true,
//     reviewsCount: 98,
//   },
//   {
//     id: "3",
//     name: "Artisanal Margherita Pizza",
//     description:
//       "San Marzano tomatoes, fresh buffalo mozzarella, organic basil, and extra virgin olive oil.",
//     price: 16.0,
//     image:
//       "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60",
//     category: "Pizza",
//     rating: 4.7,
//     isAvailable: true,
//     restaurantId: "rest-3",
//     restaurantName: "Bella Italia",
//     isFeatured: true,
//     reviewsCount: 215,
//   },
// ];

// export function useFoods(search?: string, category?: string) {
//   return useQuery<FoodItem[]>({
//     queryKey: ["foods", { search, category }],
//     queryFn: async () => {
//       try {
//         const { data } = await api.get<{ items: FoodItem[] }>("/foods", {
//           params: { search, category },
//         });
//         return data.items;
//       } catch (err) {
//         console.warn("API query failed, falling back to mock data:", err);
//         return MOCK_FOODS.filter((food) => {
//           const matchesSearch =
//             !search || food.name.toLowerCase().includes(search.toLowerCase());
//           const matchesCategory =
//             !category || food.category.toLowerCase() === category.toLowerCase();
//           return matchesSearch && matchesCategory;
//         });
//       }
//     },
//   });
// }

// export function useFoodDetails(id: string) {
//   return useQuery<FoodItem>({
//     queryKey: ["food", id],
//     queryFn: async () => {
//       try {
//         const { data } = await api.get<FoodItem>(`/foods/${id}`);
//         return data;
//       } catch {
//         console.warn(
//           "API query failed, falling back to mock data for food ID:",
//           id,
//         );
//         const item = MOCK_FOODS.find((f) => f.id === id);
//         if (!item) throw new Error("Food item not found");
//         return item;
//       }
//     },
//     enabled: !!id,
//   });
// }

// 4  varcel error

// const MOCK_FOODS: FoodItem[] = [
//   {
//     id: "1",
//     name: "Truffle Mushroom Burger",
//     restaurantName: "The Burger Bistro",
//     restaurantId: "rest-1",
//     price: 18.99,
//     rating: 4.9,
//     reviewCount: 124,
//     category: "Burger",
//     image:
//       "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
//     description:
//       "Gourmet wagyu beef patty topped with fresh black truffle shavings and melted swiss cheese.",
//     prepTimeMinutes: 15,
//     calories: 850,
//     ingredients: ["Wagyu beef", "Black truffle", "Swiss cheese", "Brioche bun"],
//     reviews: [],
//     isFeatured: true,
//   },
//   {
//     id: "2",
//     name: "Spicy Tuna Crunch Roll",
//     restaurantName: "Sakura Sushi",
//     restaurantId: "rest-2",
//     price: 14.5,
//     rating: 4.8,
//     reviewCount: 98,
//     category: "Burger", // লক্ষ্য করুন: আপনার টাইপ অনুযায়ী এখানে শুধু নির্ধারিত ক্যাটাগরিই বসানো যাবে
//     image:
//       "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
//     description:
//       "Premium bluefin tuna, cucumber, avocado, topped with crispy tempura flakes and spicy mayo.",
//     prepTimeMinutes: 20,
//     calories: 400,
//     ingredients: ["Bluefin tuna", "Cucumber", "Avocado", "Tempura flakes"],
//     reviews: [],
//     isFeatured: true,
//   },
//   {
//     id: "3",
//     name: "Artisanal Margherita Pizza",
//     restaurantName: "Bella Italia",
//     restaurantId: "rest-3",
//     price: 16.0,
//     rating: 4.7,
//     reviewCount: 215,
//     category: "Pizza",
//     image:
//       "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60",
//     description:
//       "San Marzano tomatoes, fresh buffalo mozzarella, organic basil, and extra virgin olive oil.",
//     prepTimeMinutes: 12,
//     calories: 600,
//     ingredients: [
//       "San Marzano tomatoes",
//       "Buffalo mozzarella",
//       "Basil",
//       "Olive oil",
//     ],
//     reviews: [],
//     isFeatured: true,
//   },
// ];

// 5 varcel

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { FoodItem } from "@/types/food.types";

const MOCK_FOODS: FoodItem[] = [
  {
    id: "1",
    name: "Truffle Mushroom Burger",
    restaurantName: "The Burger Bistro",
    restaurantId: "rest-1",
    price: 18.99,
    rating: 4.9,
    reviewCount: 124,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    description:
      "Gourmet wagyu beef patty topped with fresh black truffle shavings and melted swiss cheese.",
    prepTimeMinutes: 15,
    calories: 850,
    ingredients: ["Wagyu beef", "Black truffle", "Swiss cheese", "Brioche bun"],
    reviews: [],
    isFeatured: true,
  },
  {
    id: "2",
    name: "Spicy Tuna Crunch Roll",
    restaurantName: "Sakura Sushi",
    restaurantId: "rest-2",
    price: 14.5,
    rating: 4.8,
    reviewCount: 98,
    category: "Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
    description:
      "Premium bluefin tuna, cucumber, avocado, topped with crispy tempura flakes and spicy mayo.",
    prepTimeMinutes: 20,
    calories: 400,
    ingredients: ["Bluefin tuna", "Cucumber", "Avocado", "Tempura flakes"],
    reviews: [],
    isFeatured: true,
  },
  {
    id: "3",
    name: "Artisanal Margherita Pizza",
    restaurantName: "Bella Italia",
    restaurantId: "rest-3",
    price: 16.0,
    rating: 4.7,
    reviewCount: 215,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&auto=format&fit=crop&q=60",
    description:
      "San Marzano tomatoes, fresh buffalo mozzarella, organic basil, and extra virgin olive oil.",
    prepTimeMinutes: 12,
    calories: 600,
    ingredients: [
      "San Marzano tomatoes",
      "Buffalo mozzarella",
      "Basil",
      "Olive oil",
    ],
    reviews: [],
    isFeatured: true,
  },
];

export function useFoods(search?: string, category?: string) {
  return useQuery<FoodItem[]>({
    queryKey: ["foods", { search, category }],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ items: FoodItem[] }>("/foods", {
          params: { search, category },
        });
        return data.items;
      } catch (err) {
        console.warn("API query failed, falling back to mock data:", err);
        return MOCK_FOODS.filter((food) => {
          const matchesSearch =
            !search || food.name.toLowerCase().includes(search.toLowerCase());
          const matchesCategory =
            !category ||
            category === "All" ||
            food.category.toLowerCase() === category.toLowerCase();
          return matchesSearch && matchesCategory;
        });
      }
    },
  });
}

export function useFoodDetails(id: string) {
  return useQuery<FoodItem>({
    queryKey: ["food", id],
    queryFn: async () => {
      try {
        const { data } = await api.get<FoodItem>(`/foods/${id}`);
        return data;
      } catch {
        const item = MOCK_FOODS.find((f) => f.id === id);
        if (!item) throw new Error("Food item not found");
        return item;
      }
    },
    enabled: !!id,
  });
}