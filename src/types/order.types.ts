// export type OrderStatus = "pending" | "preparing" | "delivered" | "cancelled";
// export type PaymentStatus = "pending" | "paid" | "failed";

// export interface OrderItem {
//   id: string;
//   foodId: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// export interface Order {
//   id: string;
//   customerId: string;
//   customerName: string;
//   restaurantId: string;
//   restaurantName: string;
//   items: OrderItem[];
//   totalAmount: number;
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   deliveryAddress: string;
//   phone: string;
//   createdAt: string;
//   updatedAt: string;
// }

// 2 varcel
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface OrderItem {
  id: string;
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerId?: string; // Optional
  customerName: string;
  restaurantId?: string; // Optional
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus?: PaymentStatus; // Optional
  address: string;
  phone?: string; // Optional
  createdAt: string;
  updatedAt?: string; // Optional
}