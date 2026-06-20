import { RevenueChart, OrdersChart } from "@/components/dashboard/Charts";

export default function RestaurantAnalytics() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Store Analytics</h1>
        <p className="text-muted-foreground mt-1">Review weekly sales metrics and dispatch numbers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <OrdersChart />
      </div>
    </div>
  );
}
