import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const INCOMING_ORDERS = [
  {
    id: "ORD-9843",
    customer: "John Doe",
    address: "123 Culinary Drive, Apt 4B, San Francisco, CA",
    items: "1x Truffle Mushroom Burger, 1x Craft Fries",
    amount: "$22.98",
    status: "Preparing",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    id: "ORD-9840",
    customer: "Jane Smith",
    address: "456 Pizza Lane, San Francisco, CA",
    items: "1x Artisanal Margherita Pizza",
    amount: "$16.00",
    status: "Pending",
    statusColor: "bg-amber-500/10 text-amber-500",
  },
];

export default function RestaurantOrders() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Kitchen Orders</h1>
        <p className="text-muted-foreground mt-1">Manage live order requests and update prep tickets.</p>
      </div>

      <div className="flex flex-col gap-4">
        {INCOMING_ORDERS.map((order) => (
          <Card key={order.id} className="border rounded-xl shadow-md bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-start sm:items-center justify-between pb-3 border-b gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-secondary dark:text-white">{order.customer}</span>
                  <span className="text-xs text-muted-foreground">{order.id}</span>
                </div>
                <p className="text-xs text-muted-foreground/80 mt-0.5">{order.address}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${order.statusColor}`}>
                {order.status}
              </span>
            </CardHeader>
            <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-secondary dark:text-white">{order.items}</p>
                <p className="text-sm font-bold text-primary mt-2">Total Amount: {order.amount}</p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {order.status === "Pending" ? (
                  <>
                    <Button size="sm" className="bg-accent hover:bg-accent/95 text-white font-semibold rounded-xl w-full sm:w-auto">
                      Accept Order
                    </Button>
                    <Button size="sm" variant="destructive" className="font-semibold rounded-xl w-full sm:w-auto">
                      Decline
                    </Button>
                  </>
                ) : (
                  <Button size="sm" className="bg-primary hover:bg-primary/95 text-white font-semibold rounded-xl w-full sm:w-auto">
                    Mark as Delivered
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
