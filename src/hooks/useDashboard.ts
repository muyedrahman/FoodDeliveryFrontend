"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// ─── Generic authenticated fetch 
export function useAuthFetch() {
  const { getToken } = useAuth();

  const authFetch = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const token = await getToken();
      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return res.json();
    },
    [getToken],
  );

  return authFetch;
}

// ─── Admin: Users  
export function useAdminUsers() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: () => authFetch("/users"),
  });
}

export function useUpdateUserRole() {
  const authFetch = useAuthFetch();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      authFetch(`/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}

// Admin: Dashboard Stats  
export function useAdminStats() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => authFetch("/dashboard/admin"),
  });
}

// Admin: All Orders 
export function useAdminOrders() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const data = await authFetch("/orders");
      return data?.orders ?? [];
    },
  });
}

// Admin: All Restaurants ─ 
export function useAdminRestaurants() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["admin-restaurants"],
    queryFn: async () => {
      const data = await authFetch("/restaurants");
      return data?.restaurants ?? [];
    },
  });
}

// ─ Restaurant Owner: Stats  
export function useRestaurantStats() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["restaurant-stats"],
    queryFn: () => authFetch("/dashboard/restaurant"),
  });
}

//  Restaurant Owner: Orders ─ 
export function useRestaurantOrders() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["restaurant-orders"],
    queryFn: async () => {
      const data = await authFetch("/orders");
      return data?.orders ?? [];
    },
  });
}

// ─  Restaurant Owner: Menu (Foods) ── 
export function useRestaurantMenu() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["restaurant-menu"],
    queryFn: async () => {
      const data = await authFetch("/foods");
      return data?.items ?? [];
    },
  });
}

export function useDeleteFood() {
  const authFetch = useAuthFetch();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => authFetch(`/foods/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["restaurant-menu"] }),
  });
}

//    Update Order Status (Restaurant + Admin) 
export function useUpdateOrderStatus() {
  const authFetch = useAuthFetch();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      authFetch(`/orders/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["restaurant-orders"] });
      qc.invalidateQueries({ queryKey: ["customer-orders"] });
    },
  });
}

//  Customer: Orders  
export function useCustomerOrders() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["customer-orders"],
    queryFn: async () => {
      const data = await authFetch("/orders");
      return data?.orders ?? [];
    },
  });
}

//  Customer: Dashboard Stats  
export function useCustomerStats() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["customer-stats"],
    queryFn: () => authFetch("/dashboard/customer"),
  });
}

//  User Profile 
export function useUserProfile() {
  const authFetch = useAuthFetch();
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () => authFetch("/users/profile"),
  });
}
