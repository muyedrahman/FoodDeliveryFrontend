import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

const ORDERS = [
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
  {
    id: "ORD-7362",
    restaurant: "Bella Italia",
    items: "1x Margherita Pizza",
    amount: "$16.00",
    status: "Delivered",
    date: "June 08, 2026",
    statusColor: "text-accent bg-accent/10",
  },
];


// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ShoppingBag } from "lucide-react";

export default function CustomerOrders() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Order History</h1>
        <p className="text-muted-foreground mt-1">Review status and details of all your placed orders.</p>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span>All Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {ORDERS.map((order) => (
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

