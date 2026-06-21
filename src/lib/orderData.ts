import { Order } from "@/types/order.types";

export const CUSTOMER_ORDERS: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Muyed Rahman",
    restaurantName: "Burger House",
    items: [
      { foodId: "1", name: "Chicken Burger", price: 4.99, quantity: 2 },
      { foodId: "8", name: "Lemon Tea", price: 1.99, quantity: 1 },
    ],
    totalAmount: 11.97,
    status: "delivered",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    createdAt: "2026-06-18T14:30:00Z",
  },
  {
    id: "ORD-1002",
    customerName: "Muyed Rahman",
    restaurantName: "Pizza Palace",
    items: [{ foodId: "2", name: "Pepperoni Pizza", price: 9.99, quantity: 1 }],
    totalAmount: 9.99,
    status: "preparing",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    createdAt: "2026-06-20T19:10:00Z",
  },
  {
    id: "ORD-1003",
    customerName: "Muyed Rahman",
    restaurantName: "Rice & Spice",
    items: [
      { foodId: "16", name: "Chicken Biryani", price: 6.99, quantity: 1 },
      { foodId: "3", name: "Beef Fried Rice", price: 6.49, quantity: 1 },
    ],
    totalAmount: 13.48,
    status: "confirmed",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    createdAt: "2026-06-21T09:05:00Z",
  },
  {
    id: "ORD-1004",
    customerName: "Muyed Rahman",
    restaurantName: "Sweet Dreams",
    items: [{ foodId: "5", name: "Chocolate Cake", price: 4.49, quantity: 1 }],
    totalAmount: 4.49,
    status: "pending",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    createdAt: "2026-06-21T11:45:00Z",
  },
  {
    id: "ORD-1005",
    customerName: "Muyed Rahman",
    restaurantName: "Burger House",
    items: [{ foodId: "12", name: "Spicy Wings", price: 6.99, quantity: 2 }],
    totalAmount: 13.98,
    status: "cancelled",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    createdAt: "2026-06-15T18:20:00Z",
  },
  {
    id: "ORD-1006",
    customerName: "Muyed Rahman",
    restaurantName: "Pizza Palace",
    items: [
      { foodId: "10", name: "Margherita Pizza", price: 7.99, quantity: 1 },
    ],
    totalAmount: 7.99,
    status: "delivered",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    createdAt: "2026-06-12T20:00:00Z",
  },
];

export const STATUS_STYLES: Record<
  Order["status"],
  { label: string; classes: string }
> = {
  pending: {
    label: "Pending",
    classes:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  confirmed: {
    label: "Confirmed",
    classes: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  preparing: {
    label: "Preparing",
    classes:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  },
  delivered: {
    label: "Delivered",
    classes:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  cancelled: {
    label: "Cancelled",
    classes: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};
