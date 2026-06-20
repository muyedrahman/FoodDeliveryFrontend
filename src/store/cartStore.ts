import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FoodItem } from "@/types/food.types";

export interface CartItem {
  food: FoodItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (food: FoodItem, quantity?: number) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getGrandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (food, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.food.id === food.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.food.id === food.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { food, quantity }] });
        }
      },
      removeItem: (foodId) => {
        set({ items: get().items.filter((item) => item.food.id !== foodId) });
      },
      updateQuantity: (foodId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(foodId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.food.id === foodId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.food.price * item.quantity, 0);
      },
      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal > 50 ? 0 : 3.99; // Free delivery over $50
      },
      getGrandTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      },
    }),
    {
      name: "foodie-cart-storage",
    }
  )
);
