// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ShoppingBag } from "lucide-react";

// const ORDERS = [
//   {
//     id: "ORD-9843",
//     restaurant: "The Burger Bistro",
//     items: "1x Truffle Mushroom Burger, 1x Craft Fries",
//     amount: "$22.98",
//     status: "Preparing",
//     date: "June 20, 2026",
//     statusColor: "text-primary bg-primary/10",
//   },
//   {
//     id: "ORD-8732",
//     restaurant: "Sakura Sushi",
//     items: "2x Spicy Tuna Crunch Roll",
//     amount: "$29.00",
//     status: "Delivered",
//     date: "June 14, 2026",
//     statusColor: "text-accent bg-accent/10",
//   },
//   {
//     id: "ORD-7362",
//     restaurant: "Bella Italia",
//     items: "1x Margherita Pizza",
//     amount: "$16.00",
//     status: "Delivered",
//     date: "June 08, 2026",
//     statusColor: "text-accent bg-accent/10",
//   },
// ];

// export default function CustomerOrders() {
//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Order History</h1>
//         <p className="text-muted-foreground mt-1">Review status and details of all your placed orders.</p>
//       </div>

//       <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
//         <CardHeader>
//           <CardTitle className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2">
//             <ShoppingBag className="h-5 w-5 text-primary" />
//             <span>All Orders</span>
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-4">
//           {ORDERS.map((order) => (
//             <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0 gap-3">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <span className="font-bold text-sm text-secondary dark:text-white">{order.restaurant}</span>
//                   <span className="text-[10px] text-muted-foreground">{order.id}</span>
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-1">{order.items}</p>
//                 <p className="text-[10px] text-muted-foreground/80 mt-1">{order.date}</p>
//               </div>
//               <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
//                 <span className="font-bold text-sm text-primary">{order.amount}</span>
//                 <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${order.statusColor}`}>
//                   {order.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

//  2
"use client";

import Link from "next/link";
import { ShoppingBag, DollarSign, Clock, Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import OverviewCards, {
  StatCardData,
} from "@/components/dashboard/OverviewCards";
import {
  SpendingLineChart,
  CategorySpendPieChart,
} from "@/components/dashboard/Charts";
import { CUSTOMER_ORDERS, STATUS_STYLES } from "@/lib/orderData";

const SPENDING_DATA = [
  { month: "Jan", amount: 28 },
  { month: "Feb", amount: 35 },
  { month: "Mar", amount: 22 },
  { month: "Apr", amount: 41 },
  { month: "May", amount: 38 },
  { month: "Jun", amount: 47 },
];

const CATEGORY_SPEND = [
  { name: "Burger", value: 32 },
  { name: "Pizza", value: 28 },
  { name: "Rice", value: 21 },
  { name: "Dessert", value: 9 },
];

export default function CustomerOverviewPage() {
  const { user } = useUser();
  const totalSpent = CUSTOMER_ORDERS.reduce(
    (sum, o) => sum + (o.status !== "cancelled" ? o.totalAmount : 0),
    0,
  );
  const activeOrders = CUSTOMER_ORDERS.filter(
    (o) =>
      o.status === "pending" ||
      o.status === "confirmed" ||
      o.status === "preparing",
  ).length;

  const cards: StatCardData[] = [
    {
      label: "Total Orders",
      value: String(CUSTOMER_ORDERS.length),
      icon: ShoppingBag,
      trend: "+2 this week",
      trendUp: true,
    },
    {
      label: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: DollarSign,
      trend: "+$11.97 this month",
      trendUp: true,
    },
    {
      label: "Active Orders",
      value: String(activeOrders),
      icon: Clock,
    },
    {
      label: "Avg. Rating Given",
      value: "4.8",
      icon: Star,
    },
  ];

  const recentOrders = CUSTOMER_ORDERS.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2D3748] dark:text-white">
          Welcome back, {user?.firstName ?? "there"} 👋
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your orders.
        </p>
      </div>

      <OverviewCards cards={cards} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpendingLineChart data={SPENDING_DATA} />
        <CategorySpendPieChart data={CATEGORY_SPEND} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-[#2D3748]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#2D3748] dark:text-white">
            Recent Orders
          </h3>
          <Link
            href="/dashboard/customer/orders"
            className="text-sm font-medium text-[#FF6B35] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 dark:border-gray-700">
                <th className="pb-2 font-medium">Order ID</th>
                <th className="pb-2 font-medium">Restaurant</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 last:border-0 dark:border-gray-800"
                >
                  <td className="py-3 font-medium text-[#2D3748] dark:text-white">
                    {order.id}
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">
                    {order.restaurantName}
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[order.status].classes}`}
                    >
                      {STATUS_STYLES[order.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}