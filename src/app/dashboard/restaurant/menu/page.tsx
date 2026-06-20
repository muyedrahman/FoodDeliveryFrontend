import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";

const MENU_ITEMS = [
  {
    id: "1",
    name: "Truffle Mushroom Burger",
    price: 18.99,
    category: "Burgers",
    isAvailable: true,
  },
  {
    id: "4",
    name: "Spicy Craft Fries",
    price: 5.50,
    category: "Sides",
    isAvailable: true,
  },
  {
    id: "5",
    name: "Double Stack Cheese Burger",
    price: 14.99,
    category: "Burgers",
    isAvailable: false,
  },
];

export default function RestaurantMenu() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Manage Menu</h1>
          <p className="text-muted-foreground mt-1">Configure your dish listings, pricing, and ingredients.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/95 text-white font-semibold flex items-center gap-1.5 rounded-xl shadow-sm self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          <span>Add Dish</span>
        </Button>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-base font-bold text-secondary dark:text-white">Active Catalog</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
                <th className="py-3 px-4">Dish Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MENU_ITEMS.map((item) => (
                <tr key={item.id} className="border-b last:border-b-0 hover:bg-muted/10">
                  <td className="py-4 px-4 font-semibold text-sm text-secondary dark:text-white">{item.name}</td>
                  <td className="py-4 px-4 text-xs text-muted-foreground">{item.category}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-primary">${item.price.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isAvailable
                          ? "bg-accent/15 text-accent"
                          : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Sold Out"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-foreground/75">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
