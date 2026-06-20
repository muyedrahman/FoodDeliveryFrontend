export type UserRole = "customer" | "restaurant" | "admin";

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  phone?: string;
  address?: UserAddress;
  createdAt: string;
}

export interface RestaurantProfile {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  cuisineType: string[];
  rating: number;
  reviewsCount: number;
  deliveryTime: number; // average delivery time
  deliveryFee: number;
  minOrder: number;
  address: UserAddress;
  isFeatured: boolean;
  isOpen: boolean;
}
