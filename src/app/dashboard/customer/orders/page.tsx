// 2
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useCustomerOrders } from "@/hooks/useDashboard";

const STATUS_COLORS: Record<string, string> = {
  delivered: "text-accent bg-accent/10",
  preparing: "text-primary bg-primary/10",
  pending: "text-yellow-500 bg-yellow-500/10",
  confirmed: "text-blue-500 bg-blue-500/10",
  cancelled: "text-rose-500 bg-rose-500/10",
};

export default function CustomerOrders() {
  const { data: orders = [], isLoading, isError } = useCustomerOrders();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
          Order History
        </h1>
        <p className="text-muted-foreground mt-1">
          Review status and details of all your placed orders.
        </p>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span>All Orders ({orders.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              Failed to load orders.
            </p>
          ) : orders.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No orders yet. Start ordering from our food menu!
            </p>
          ) : (
            orders.map(
              (order: {
                _id: string;
                restaurantId: { name: string } | string;
                items: { name: string; quantity: number }[];
                totalAmount: number;
                status: string;
                createdAt: string;
              }) => (
                <div
                  key={order._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0 gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-secondary dark:text-white">
                        {typeof order.restaurantId === "object"
                          ? order.restaurantId.name
                          : "Restaurant"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        #{order._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.items
                        .map((i) => `${i.quantity}x ${i.name}`)
                        .join(", ")}
                    </p>
                    <p className="text-[10px] text-muted-foreground/80 mt-1">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <span className="font-bold text-sm text-primary">
                      ${order.totalAmount?.toFixed(2)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${
                        STATUS_COLORS[order.status] ??
                        "bg-muted text-foreground"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ),
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}  