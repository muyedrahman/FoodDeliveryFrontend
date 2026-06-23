// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Plus, Edit, Trash2 } from "lucide-react";

// // const MENU_ITEMS = [
// //   {
// //     id: "1",
// //     name: "Truffle Mushroom Burger",
// //     price: 18.99,
// //     category: "Burgers",
// //     isAvailable: true,
// //   },
// //   {
// //     id: "4",
// //     name: "Spicy Craft Fries",
// //     price: 5.50,
// //     category: "Sides",
// //     isAvailable: true,
// //   },
// //   {
// //     id: "5",
// //     name: "Double Stack Cheese Burger",
// //     price: 14.99,
// //     category: "Burgers",
// //     isAvailable: false,
// //   },
// // ];

// // export default function RestaurantMenu() {
// //   return (
// //     <div className="flex flex-col gap-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
// //         <div>
// //           <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Manage Menu</h1>
// //           <p className="text-muted-foreground mt-1">Configure your dish listings, pricing, and ingredients.</p>
// //         </div>
// //         <Button className="bg-primary hover:bg-primary/95 text-white font-semibold flex items-center gap-1.5 rounded-xl shadow-sm self-start sm:self-auto">
// //           <Plus className="h-4 w-4" />
// //           <span>Add Dish</span>
// //         </Button>
// //       </div>

// //       <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
// //         <CardHeader>
// //           <CardTitle className="text-base font-bold text-secondary dark:text-white">Active Catalog</CardTitle>
// //         </CardHeader>
// //         <CardContent className="overflow-x-auto">
// //           <table className="w-full text-left border-collapse min-w-[500px]">
// //             <thead>
// //               <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
// //                 <th className="py-3 px-4">Dish Name</th>
// //                 <th className="py-3 px-4">Category</th>
// //                 <th className="py-3 px-4">Price</th>
// //                 <th className="py-3 px-4">Status</th>
// //                 <th className="py-3 px-4 text-right">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {MENU_ITEMS.map((item) => (
// //                 <tr key={item.id} className="border-b last:border-b-0 hover:bg-muted/10">
// //                   <td className="py-4 px-4 font-semibold text-sm text-secondary dark:text-white">{item.name}</td>
// //                   <td className="py-4 px-4 text-xs text-muted-foreground">{item.category}</td>
// //                   <td className="py-4 px-4 text-sm font-semibold text-primary">${item.price.toFixed(2)}</td>
// //                   <td className="py-4 px-4">
// //                     <span
// //                       className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
// //                         item.isAvailable
// //                           ? "bg-accent/15 text-accent"
// //                           : "bg-destructive/15 text-destructive"
// //                       }`}
// //                     >
// //                       {item.isAvailable ? "Available" : "Sold Out"}
// //                     </span>
// //                   </td>
// //                   <td className="py-4 px-4 text-right flex justify-end gap-2">
// //                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-foreground/75">
// //                       <Edit className="h-4 w-4" />
// //                     </Button>
// //                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive">
// //                       <Trash2 className="h-4 w-4" />
// //                     </Button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// // 2

// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Plus, Trash2, Loader2 } from "lucide-react";
// import { useRestaurantMenu, useDeleteFood } from "@/hooks/useDashboard";

// export default function RestaurantMenu() {
//   const { data: items = [], isLoading, isError } = useRestaurantMenu();
//   const deleteFood = useDeleteFood();

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
//             Manage Menu
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Configure your dish listings, pricing, and ingredients.
//           </p>
//         </div>
//         <Button className="bg-primary hover:bg-primary/95 text-white font-semibold flex items-center gap-1.5 rounded-xl shadow-sm self-start sm:self-auto">
//           <Plus className="h-4 w-4" />
//           <span>Add Dish</span>
//         </Button>
//       </div>

//       <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
//         <CardHeader>
//           <CardTitle className="text-base font-bold text-secondary dark:text-white">
//             Active Catalog ({items.length})
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           {isLoading ? (
//             <div className="flex justify-center py-12">
//               <Loader2 className="h-6 w-6 animate-spin text-primary" />
//             </div>
//           ) : isError ? (
//             <p className="text-center text-sm text-muted-foreground py-8">
//               Failed to load menu.
//             </p>
//           ) : items.length === 0 ? (
//             <p className="text-center text-sm text-muted-foreground py-8">
//               No menu items yet. Add your first dish!
//             </p>
//           ) : (
//             <table className="w-full text-left border-collapse min-w-[500px]">
//               <thead>
//                 <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
//                   <th className="py-3 px-4">Dish Name</th>
//                   <th className="py-3 px-4">Category</th>
//                   <th className="py-3 px-4">Price</th>
//                   <th className="py-3 px-4">Status</th>
//                   <th className="py-3 px-4 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map(
//                   (item: {
//                     _id: string;
//                     name: string;
//                     category: string;
//                     price: number;
//                     isAvailable: boolean;
//                   }) => (
//                     <tr
//                       key={item._id}
//                       className="border-b last:border-b-0 hover:bg-muted/10"
//                     >
//                       <td className="py-4 px-4 font-semibold text-sm text-secondary dark:text-white">
//                         {item.name}
//                       </td>
//                       <td className="py-4 px-4 text-sm text-muted-foreground">
//                         {item.category}
//                       </td>
//                       <td className="py-4 px-4 text-sm font-bold text-primary">
//                         ${item.price?.toFixed(2)}
//                       </td>
//                       <td className="py-4 px-4">
//                         <span
//                           className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
//                             item.isAvailable
//                               ? "bg-accent/15 text-accent"
//                               : "bg-rose-500/15 text-rose-500"
//                           }`}
//                         >
//                           {item.isAvailable ? "Available" : "Unavailable"}
//                         </span>
//                       </td>
//                       <td className="py-4 px-4 text-right">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-8 w-8 rounded-lg text-rose-500 hover:bg-rose-500/10"
//                           onClick={() => deleteFood.mutate(item._id)}
//                           disabled={deleteFood.isPending}
//                           title="Delete item"
//                         >
//                           {deleteFood.isPending ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <Trash2 className="h-4 w-4" />
//                           )}
//                         </Button>
//                       </td>
//                     </tr>
//                   ),
//                 )}
//               </tbody>
//             </table>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// 2

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UtensilsCrossed } from "lucide-react";
import {
  useRestaurantOrders,
  useUpdateOrderStatus,
} from "@/hooks/useDashboard";

const STATUS_COLORS: Record<string, string> = {
  delivered: "bg-accent/15 text-accent",
  preparing: "bg-primary/15 text-primary",
  pending: "bg-yellow-500/15 text-yellow-500",
  confirmed: "bg-blue-500/15 text-blue-500",
  cancelled: "bg-rose-500/15 text-rose-500",
};

export default function RestaurantOrders() {
  const { data: orders = [], isLoading, isError } = useRestaurantOrders();
  const updateStatus = useUpdateOrderStatus();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
          Kitchen Orders
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage and update incoming customer orders.
        </p>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-base font-bold text-secondary dark:text-white flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <span>Live Order Queue ({orders.length})</span>
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
              No orders yet.
            </p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(
                  (o: {
                    _id: string;
                    customerId: { name: string } | string;
                    items: { name: string; quantity: number }[];
                    totalAmount: number;
                    status: string;
                  }) => (
                    <tr
                      key={o._id}
                      className="border-b last:border-b-0 hover:bg-muted/10"
                    >
                      <td className="py-4 px-4 font-bold text-xs text-muted-foreground">
                        #{o._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground/80">
                        {typeof o.customerId === "object"
                          ? o.customerId.name
                          : "—"}
                      </td>
                      <td className="py-4 px-4 text-xs text-muted-foreground max-w-[180px] truncate">
                        {o.items
                          .map((i) => `${i.quantity}x ${i.name}`)
                          .join(", ")}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-primary">
                        ${o.totalAmount?.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${STATUS_COLORS[o.status] ?? "bg-muted text-foreground"}`}
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