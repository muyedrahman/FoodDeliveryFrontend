// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DollarSign, ShoppingBag, Clock, Heart, Users, Star, Layers } from "lucide-react";

// interface OverviewCardsProps {
//   role: "customer" | "restaurant" | "admin";
// }

// export default function OverviewCards({ role }: OverviewCardsProps) {
//   // Stats configurations
//   const getCards = () => {
//     switch (role) {
//       case "admin":
//         return [
//           {
//             title: "Total Platform Revenue",
//             value: "$142,384.50",
//             description: "+18.2% from last month",
//             icon: DollarSign,
//             color: "text-emerald-500 bg-emerald-500/10",
//           },
//           {
//             title: "Active Users",
//             value: "12,482",
//             description: "+5.4% week over week",
//             icon: Users,
//             color: "text-primary bg-primary/10",
//           },
//           {
//             title: "Registered Eateries",
//             value: "542",
//             description: "+12 new this week",
//             icon: Layers,
//             color: "text-blue-500 bg-blue-500/10",
//           },
//           {
//             title: "Total Orders Delived",
//             value: "148,930",
//             description: "+22.4% year over year",
//             icon: ShoppingBag,
//             color: "text-amber-500 bg-amber-500/10",
//           },
//         ];
//       case "restaurant":
//         return [
//           {
//             title: "Total Revenue",
//             value: "$8,245.00",
//             description: "+12.5% from last month",
//             icon: DollarSign,
//             color: "text-emerald-500 bg-emerald-500/10",
//           },
//           {
//             title: "Incoming Orders",
//             value: "28",
//             description: "4 currently in kitchen",
//             icon: ShoppingBag,
//             color: "text-primary bg-primary/10",
//           },
//           {
//             title: "Average Prep Time",
//             value: "18 mins",
//             description: "-2 mins from yesterday",
//             icon: Clock,
//             color: "text-blue-500 bg-blue-500/10",
//           },
//           {
//             title: "Average Rating",
//             value: "4.8 / 5.0",
//             description: "124 total reviews",
//             icon: Star,
//             color: "text-amber-500 bg-amber-500/10",
//           },
//         ];
//       default: // customer
//         return [
//           {
//             title: "Total Spent",
//             value: "$342.80",
//             description: "12 orders placed total",
//             icon: DollarSign,
//             color: "text-emerald-500 bg-emerald-500/10",
//           },
//           {
//             title: "Active Orders",
//             value: "1",
//             description: "Delivering to your location",
//             icon: ShoppingBag,
//             color: "text-primary bg-primary/10",
//           },
//           {
//             title: "Average Delivery Time",
//             value: "22 mins",
//             description: "Fastest option selected",
//             icon: Clock,
//             color: "text-blue-500 bg-blue-500/10",
//           },
//           {
//             title: "Favorite Dish",
//             value: "Truffle Burger",
//             description: "Ordered 4 times",
//             icon: Heart,
//             color: "text-rose-500 bg-rose-500/10",
//           },
//         ];
//     }
//   };

//   const cards = getCards();

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//       {cards.map((card, index) => {
//         const Icon = card.icon;
//         return (
//           <Card key={index} className="border rounded-xl shadow-md bg-card text-card-foreground">
//             <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//               <CardTitle className="text-sm font-semibold tracking-tight text-muted-foreground">
//                 {card.title}
//               </CardTitle>
//               <div className={`rounded-xl p-2 ${card.color}`}>
//                 <Icon className="h-4 w-4" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-secondary dark:text-white">{card.value}</div>
//               <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }

// 2
import { LucideIcon } from "lucide-react";

export interface StatCardData {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function OverviewCards({ cards }: { cards: StatCardData[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-[#2D3748]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {card.label}
              </span>
              <div className="rounded-lg bg-[#FF6B35]/10 p-2">
                <Icon className="h-4 w-4 text-[#FF6B35]" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-[#2D3748] dark:text-white">
              {card.value}
            </p>
            {card.trend && (
              <p
                className={`mt-1 text-xs font-medium ${
                  card.trendUp ? "text-[#48BB78]" : "text-red-500"
                }`}
              >
                {card.trend}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

