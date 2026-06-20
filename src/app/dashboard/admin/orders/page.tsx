import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ALL_ORDERS = [
  { id: "ORD-9843", restaurant: "The Burger Bistro", customer: "John Doe", total: "$22.98", status: "Preparing" },
  { id: "ORD-8732", restaurant: "Sakura Sushi", customer: "Michael Chen", total: "$29.00", status: "Delivered" },
  { id: "ORD-7362", restaurant: "Bella Italia", customer: "Jane Smith", total: "$16.00", status: "Delivered" },
];

export default function AdminOrders() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Manage Orders</h1>
        <p className="text-muted-foreground mt-1">Review active, completed, and canceled transactions.</p>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-base font-bold text-secondary dark:text-white">Global Ledger</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Eatery</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {ALL_ORDERS.map((o) => (
                <tr key={o.id} className="border-b last:border-b-0 hover:bg-muted/10">
                  <td className="py-4 px-4 font-bold text-xs text-muted-foreground">{o.id}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-secondary dark:text-white">{o.restaurant}</td>
                  <td className="py-4 px-4 text-sm text-foreground/80">{o.customer}</td>
                  <td className="py-4 px-4 text-sm font-bold text-primary">{o.total}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        o.status === "Delivered"
                          ? "bg-accent/15 text-accent"
                          : "bg-primary/15 text-primary"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
