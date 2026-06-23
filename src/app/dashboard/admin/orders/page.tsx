// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const ALL_ORDERS = [
//   { id: "ORD-9843", restaurant: "The Burger Bistro", customer: "John Doe", total: "$22.98", status: "Preparing" },
//   { id: "ORD-8732", restaurant: "Sakura Sushi", customer: "Michael Chen", total: "$29.00", status: "Delivered" },
//   { id: "ORD-7362", restaurant: "Bella Italia", customer: "Jane Smith", total: "$16.00", status: "Delivered" },
// ];

// export default function AdminOrders() {
//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Manage Orders</h1>
//         <p className="text-muted-foreground mt-1">Review active, completed, and canceled transactions.</p>
//       </div>

//       <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
//         <CardHeader>
//           <CardTitle className="text-base font-bold text-secondary dark:text-white">Global Ledger</CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[500px]">
//             <thead>
//               <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
//                 <th className="py-3 px-4">Order ID</th>
//                 <th className="py-3 px-4">Eatery</th>
//                 <th className="py-3 px-4">Customer</th>
//                 <th className="py-3 px-4">Total</th>
//                 <th className="py-3 px-4">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ALL_ORDERS.map((o) => (
//                 <tr key={o.id} className="border-b last:border-b-0 hover:bg-muted/10">
//                   <td className="py-4 px-4 font-bold text-xs text-muted-foreground">{o.id}</td>
//                   <td className="py-4 px-4 text-sm font-semibold text-secondary dark:text-white">{o.restaurant}</td>
//                   <td className="py-4 px-4 text-sm text-foreground/80">{o.customer}</td>
//                   <td className="py-4 px-4 text-sm font-bold text-primary">{o.total}</td>
//                   <td className="py-4 px-4">
//                     <span
//                       className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
//                         o.status === "Delivered"
//                           ? "bg-accent/15 text-accent"
//                           : "bg-primary/15 text-primary"
//                       }`}
//                     >
//                       {o.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// 2

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/useDashboard";

const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-accent/15 text-accent",
  preparing: "bg-primary/15 text-primary",
  pending: "bg-yellow-500/15 text-yellow-500",
  confirmed: "bg-blue-500/15 text-blue-500",
  cancelled: "bg-rose-500/15 text-rose-500",
};

export default function AdminOrders() {
  const { data: orders = [], isLoading, isError } = useAdminOrders();
  const updateStatus = useUpdateOrderStatus();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
          Manage Orders
        </h1>
        <p className="text-muted-foreground mt-1">
          Review active, completed, and canceled transactions.
        </p>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-base font-bold text-secondary dark:text-white">
            Global Ledger ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
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
              No orders found.
            </p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Eatery</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(
                  (o: {
                    _id: string;
                    restaurantId: { name: string } | string;
                    customerId: { name: string } | string;
                    totalAmount: number;
                    status: string;
                  }) => (
                    <tr
                      key={o._id}
                      className="border-b last:border-b-0 hover:bg-muted/10"
                    >
                      <td className="py-4 px-4 font-bold text-xs text-muted-foreground">
                        {o._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-secondary dark:text-white">
                        {typeof o.restaurantId === "object"
                          ? o.restaurantId.name
                          : "—"}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground/80">
                        {typeof o.customerId === "object"
                          ? o.customerId.name
                          : "—"}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-primary">
                        ${o.totalAmount?.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            STATUS_COLORS[o.status] ??
                            "bg-muted text-foreground"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            updateStatus.mutate({
                              id: o._id,
                              status: e.target.value,
                            })
                          }
                          className="text-xs border rounded-lg px-2 py-1 bg-background"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}