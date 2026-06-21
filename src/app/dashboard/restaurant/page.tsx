import OverviewCards from "@/components/dashboard/OverviewCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

const PENDING_ORDERS = [
  {
    id: "ORD-9843",
    customer: "John Doe",
    items: "1x Truffle Mushroom Burger, 1x Craft Fries",
    amount: "$22.98",
    status: "Preparing",
    statusColor: "text-primary bg-primary/10",
  },
  {
    id: "ORD-9840",
    customer: "Jane Smith",
    items: "1x Artisanal Margherita Pizza",
    amount: "$16.00",
    status: "Pending",
    statusColor: "text-amber-500 bg-amber-500/10",
  },
];

export default function RestaurantDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
          Restaurant Manager
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor sales, incoming orders, and menu availability.
        </p>
      </div>

      <OverviewCards role="restaurant" />

      {/* Incoming Orders Card */}
      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span>Active Kitchen Orders</span>
          </CardTitle>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="font-semibold text-primary hover:text-primary/95"
          >
            <Link
              href="/dashboard/restaurant/orders"
              className="flex items-center gap-1"
            >
              Manage Orders
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {/* <Button asChild variant="ghost" size="sm" className="font-semibold text-primary hover:text-primary/95 flex items-center gap-1">
            <Link href="/dashboard/restaurant/orders">Manage Orders</Link>
            <ArrowRight className="h-4 w-4" />
          </Button> */}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {PENDING_ORDERS.map((order) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0 gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-secondary dark:text-white">
                    {order.customer}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {order.id}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {order.items}
                </p>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <span className="font-bold text-sm text-primary">
                  {order.amount}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${order.statusColor}`}
                >
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
