// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const RESTAURANTS = [
//   { id: "1", name: "The Burger Bistro", owner: "Marc Burger", status: "Verified" },
//   { id: "2", name: "Sakura Sushi", owner: "Ken Sakura", status: "Verified" },
//   { id: "3", name: "Bella Italia", owner: "Luigi Bella", status: "Verification Pending" },
// ];

// export default function AdminRestaurants() {
//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Manage Eateries</h1>
//         <p className="text-muted-foreground mt-1">Verify kitchen partners, modify commissions, and view reviews.</p>
//       </div>

//       <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
//         <CardHeader>
//           <CardTitle className="text-base font-bold text-secondary dark:text-white">Active Partners</CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[500px]">
//             <thead>
//               <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
//                 <th className="py-3 px-4">Brand</th>
//                 <th className="py-3 px-4">Owner</th>
//                 <th className="py-3 px-4">Status</th>
//                 <th className="py-3 px-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {RESTAURANTS.map((r) => (
//                 <tr key={r.id} className="border-b last:border-b-0 hover:bg-muted/10">
//                   <td className="py-4 px-4 font-semibold text-sm text-secondary dark:text-white">{r.name}</td>
//                   <td className="py-4 px-4 text-sm text-muted-foreground">{r.owner}</td>
//                   <td className="py-4 px-4">
//                     <span
//                       className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
//                         r.status === "Verified"
//                           ? "bg-accent/15 text-accent"
//                           : "bg-amber-500/15 text-amber-500"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 text-right flex justify-end gap-2">
//                     {r.status !== "Verified" ? (
//                       <Button size="sm" className="bg-primary hover:bg-primary/95 text-white font-semibold rounded-lg px-3 py-1 text-xs">
//                         Approve
//                       </Button>
//                     ) : (
//                       <Button size="sm" variant="outline" className="font-semibold rounded-lg px-3 py-1 text-xs text-destructive border-destructive hover:bg-destructive/5">
//                         Suspend
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// 2

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import { useAdminRestaurants } from "@/hooks/useDashboard";

export default function AdminRestaurants() {
  const { data: restaurants = [], isLoading, isError } = useAdminRestaurants();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
          Manage Eateries
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and manage all registered restaurants on the platform.
        </p>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-base font-bold text-secondary dark:text-white">
            All Restaurants ({restaurants.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              Failed to load restaurants.
            </p>
          ) : restaurants.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No restaurants registered yet.
            </p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Cuisine</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map(
                  (r: {
                    _id: string;
                    name: string;
                    cuisine: string;
                    ownerId: { name: string } | string;
                    rating: number;
                    isActive: boolean;
                  }) => (
                    <tr
                      key={r._id}
                      className="border-b last:border-b-0 hover:bg-muted/10"
                    >
                      <td className="py-4 px-4 font-semibold text-sm text-secondary dark:text-white">
                        {r.name}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {r.cuisine}
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground/80">
                        {typeof r.ownerId === "object" ? r.ownerId.name : "—"}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-primary flex items-center gap-1">
                        <Star className="h-3 w-3 fill-primary" />
                        {r.rating?.toFixed(1)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${r.isActive ? "bg-accent/15 text-accent" : "bg-rose-500/15 text-rose-500"}`}
                        >
                          {r.isActive ? "Active" : "Inactive"}
                        </span>
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