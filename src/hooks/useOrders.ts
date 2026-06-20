import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Order } from "@/types/order.types";

export function useOrders(userId?: string) {
  return useQuery<Order[]>({
    queryKey: ["orders", { userId }],
    queryFn: async () => {
      const { data } = await api.get<Order[]>("/orders", {
        params: { userId },
      });
      return data;
    },
    enabled: !!userId,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, Omit<Order, "id" | "createdAt" | "updatedAt">>({
    mutationFn: async (newOrder) => {
      const { data } = await api.post<Order>("/orders", newOrder);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation<Order, Error, { orderId: string; status: string }>({
    mutationFn: async ({ orderId, status }) => {
      const { data } = await api.patch<Order>(`/orders/${orderId}`, { status });
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", data.id] });
    },
  });
}
