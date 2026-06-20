import OverviewCards from "@/components/dashboard/OverviewCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

const RECENT_ORDERS = [
  {
    id: "ORD-9843",
    restaurant: "The Burger Bistro",
    items: "1x Truffle Mushroom Burger, 1x Craft Fries",
    amount: "$22.98",
    status: "Preparing",
    date: "June 20, 2026",
    statusColor: "text-primary bg-primary/10",
  },
  {
    id: "ORD-8732",
    restaurant: "Sakura Sushi",
    items: "2x Spicy Tuna Crunch Roll",
    amount: "$29.00",
    status: "Delivered",
    date: "June 14, 2026",
    statusColor: "text-accent bg-accent/10",
  },
];

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Customer Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your orders, profile, and food preferences.</p>
      </div>

      <OverviewCards role="customer" />

      {/* Recent Orders Card */}
      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span>Recent Orders</span>
          </CardTitle>
          <Button asChild variant="ghost" size="sm" className="font-semibold text-primary hover:text-primary/95 flex items-center gap-1">
            <Link href="/dashboard/customer/orders">View All</Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {RECENT_ORDERS.map((order) => (
            <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-secondary dark:text-white">{order.restaurant}</span>
                  <span className="text-[10px] text-muted-foreground">{order.id}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{order.items}</p>
                <p className="text-[10px] text-muted-foreground/80 mt-1">{order.date}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <span className="font-bold text-sm text-primary">{order.amount}</span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
