// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import {
//   User,
//   ShoppingBag,
//   Home,
//   BarChart3,
//   UtensilsCrossed,
//   Users,
//   Building,
//   ArrowLeft,
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const { user } = useUser();
//   const role = (user?.publicMetadata?.role as string) || "customer";

//   // Navigation configurations based on user role
//   const getNavLinks = () => {
//     switch (role) {
//       case "admin":
//         return [
//           { href: "/dashboard/admin", label: "Overview", icon: BarChart3 },
//           { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
//           { href: "/dashboard/admin/restaurants", label: "Manage Eateries", icon: Building },
//           { href: "/dashboard/admin/orders", label: "Manage Orders", icon: ShoppingBag },
//           { href: "/dashboard/admin/analytics", label: "Deep Analytics", icon: BarChart3 },
//         ];
//       case "restaurant":
//         return [
//           { href: "/dashboard/restaurant", label: "Overview", icon: Home },
//           { href: "/dashboard/restaurant/menu", label: "Manage Menu", icon: UtensilsCrossed },
//           { href: "/dashboard/restaurant/orders", label: "Manage Orders", icon: ShoppingBag },
//           { href: "/dashboard/restaurant/analytics", label: "Sales Analytics", icon: BarChart3 },
//         ];
//       default: // customer
//         return [
//           { href: "/dashboard/customer", label: "Overview", icon: Home },
//           { href: "/dashboard/customer/orders", label: "My Orders", icon: ShoppingBag },
//           { href: "/dashboard/customer/profile", label: "My Profile", icon: User },
//         ];
//     }
//   };

//   const links = getNavLinks();

//   return (
//     <aside className="fixed bottom-0 left-0 z-20 flex h-16 w-full flex-row border-t bg-card text-card-foreground px-4 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:flex-col md:border-r md:border-t-0 md:py-6 md:px-6">
//       <div className="flex w-full items-center justify-around md:flex-col md:items-start md:justify-start md:gap-2">
//         <div className="hidden md:flex flex-col gap-1 mb-6">
//           <p className="text-xs font-bold uppercase tracking-wider text-primary">
//             {role} portal
//           </p>
//           <h2 className="text-lg font-bold text-secondary line-clamp-1 dark:text-white">
//             {user?.fullName || "User Panel"}
//           </h2>
//         </div>

//         {links.map((link) => {
//           const Icon = link.icon;
//           const isActive = pathname === link.href;

//           return (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:bg-primary/5 hover:text-primary w-full ${
//                 isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
//               }`}
//             >
//               <Icon className="h-5 w-5 shrink-0" />
//               <span className="hidden md:inline">{link.label}</span>
//             </Link>
//           );
//         })}

//         <hr className="hidden md:block my-4 w-full" />

//         <Link
//           href="/"
//           className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted w-full mt-auto"
//         >
//           <ArrowLeft className="h-5 w-5 shrink-0" />
//           <span className="hidden md:inline">Back to Marketplace</span>
//         </Link>
//       </div>
//     </aside>
//   );
// }

// 2

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useAuth, useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";
// import {
//   User,
//   ShoppingBag,
//   Home,
//   BarChart3,
//   UtensilsCrossed,
//   Users,
//   Building,
//   ArrowLeft,
// } from "lucide-react";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [role, setRole] = useState<string>("customer");

//   useEffect(() => {
//     const fetchRole = async () => {
//       try {
//         const token = await getToken();
//         if (!token) return;

//         const res = await fetch(`${API_URL}/users/profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!res.ok) return;

//         const data = await res.json();
//         if (data?.user?.role) {
//           setRole(data.user.role);
//         }
//       } catch {
//         // fallback to customer
//       }
//     };

//     fetchRole();
//   }, [getToken]);

//   const getNavLinks = () => {
//     switch (role) {
//       case "admin":
//         return [
//           { href: "/dashboard/admin", label: "Overview", icon: BarChart3 },
//           {
//             href: "/dashboard/admin/users",
//             label: "Manage Users",
//             icon: Users,
//           },
//           {
//             href: "/dashboard/admin/restaurants",
//             label: "Manage Eateries",
//             icon: Building,
//           },
//           {
//             href: "/dashboard/admin/orders",
//             label: "Manage Orders",
//             icon: ShoppingBag,
//           },
//           {
//             href: "/dashboard/admin/analytics",
//             label: "Deep Analytics",
//             icon: BarChart3,
//           },
//         ];
//       case "restaurant_owner":
//         return [
//           { href: "/dashboard/restaurant", label: "Overview", icon: Home },
//           {
//             href: "/dashboard/restaurant/menu",
//             label: "Manage Menu",
//             icon: UtensilsCrossed,
//           },
//           {
//             href: "/dashboard/restaurant/orders",
//             label: "Manage Orders",
//             icon: ShoppingBag,
//           },
//           {
//             href: "/dashboard/restaurant/analytics",
//             label: "Sales Analytics",
//             icon: BarChart3,
//           },
//         ];
//       default:
//         return [
//           { href: "/dashboard/customer", label: "Overview", icon: Home },
//           {
//             href: "/dashboard/customer/orders",
//             label: "My Orders",
//             icon: ShoppingBag,
//           },
//           {
//             href: "/dashboard/customer/profile",
//             label: "My Profile",
//             icon: User,
//           },
//         ];
//     }
//   };

//   const links = getNavLinks();

//   const roleLabel =
//     role === "admin"
//       ? "Admin Portal"
//       : role === "restaurant_owner"
//         ? "Restaurant Portal"
//         : "Customer Portal";

//   return (
//     <aside className="fixed bottom-0 left-0 z-20 flex h-16 w-full flex-row border-t bg-card text-card-foreground px-4 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:flex-col md:border-r md:border-t-0 md:py-6 md:px-6">
//       <div className="flex w-full items-center justify-around md:flex-col md:items-start md:justify-start md:gap-2">
//         <div className="hidden md:flex flex-col gap-1 mb-6">
//           <p className="text-xs font-bold uppercase tracking-wider text-primary">
//             {roleLabel}
//           </p>
//           <h2 className="text-lg font-bold text-secondary line-clamp-1 dark:text-white">
//             {user?.fullName || "User Panel"}
//           </h2>
//         </div>

//         {links.map((link) => {
//           const Icon = link.icon;
//           const isActive = pathname === link.href;

//           return (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:bg-primary/5 hover:text-primary w-full ${
//                 isActive
//                   ? "bg-primary/10 text-primary"
//                   : "text-muted-foreground"
//               }`}
//             >
//               <Icon className="h-5 w-5 shrink-0" />
//               <span className="hidden md:inline">{link.label}</span>
//             </Link>
//           );
//         })}

//         <hr className="hidden md:block my-4 w-full" />

//         <Link
//           href="/"
//           className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted w-full mt-auto"
//         >
//           <ArrowLeft className="h-5 w-5 shrink-0" />
//           <span className="hidden md:inline">Back to Marketplace</span>
//         </Link>
//       </div>
//     </aside>
//   );
// }

// 3

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  User,
  ShoppingBag,
  Home,
  BarChart3,
  UtensilsCrossed,
  Users,
  Building,
  ArrowLeft,
} from "lucide-react";

// গ্লোবাল স্ট্যান্ডার্ড অনুযায়ী টাইপ এক্সপোর্ট করা হলো
export type DashboardRole = "customer" | "restaurant" | "admin";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [role, setRole] = useState<DashboardRole>("customer"); // টাইপ সেফ করা হলো

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const res = await fetch(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const data = await res.json();

        // ডাটাবেজের 'restaurant_owner' কে ফ্রন্টএন্ডের 'restaurant' এর সাথে ম্যাপ করা হলো
        if (data?.user?.role) {
          const fetchedRole = data.user.role;
          if (fetchedRole === "restaurant_owner") {
            setRole("restaurant");
          } else {
            setRole(fetchedRole as DashboardRole);
          }
        }
      } catch {
        // fallback to customer
        setRole("customer");
      }
    };

    fetchRole();
  }, [getToken]);

  const getNavLinks = () => {
    switch (role) {
      case "admin":
        return [
          { href: "/dashboard/admin", label: "Overview", icon: BarChart3 },
          {
            href: "/dashboard/admin/users",
            label: "Manage Users",
            icon: Users,
          },
          {
            href: "/dashboard/admin/restaurants",
            label: "Manage Eateries",
            icon: Building,
          },
          {
            href: "/dashboard/admin/orders",
            label: "Manage Orders",
            icon: ShoppingBag,
          },
          {
            href: "/dashboard/admin/analytics",
            label: "Deep Analytics",
            icon: BarChart3,
          },
        ];
      case "restaurant":
        return [
          { href: "/dashboard/restaurant", label: "Overview", icon: Home },
          {
            href: "/dashboard/restaurant/menu",
            label: "Manage Menu",
            icon: UtensilsCrossed,
          },
          {
            href: "/dashboard/restaurant/orders",
            label: "Manage Orders",
            icon: ShoppingBag,
          },
          {
            href: "/dashboard/restaurant/analytics",
            label: "Sales Analytics",
            icon: BarChart3,
          },
        ];
      default:
        return [
          { href: "/dashboard/customer", label: "Overview", icon: Home },
          {
            href: "/dashboard/customer/orders",
            label: "My Orders",
            icon: ShoppingBag,
          },
          {
            href: "/dashboard/customer/profile",
            label: "My Profile",
            icon: User,
          },
        ];
    }
  };

  const links = getNavLinks();

  const roleLabel =
    role === "admin"
      ? "Admin Portal"
      : role === "restaurant"
        ? "Restaurant Portal"
        : "Customer Portal";

  return (
    <aside className="fixed bottom-0 left-0 z-20 flex h-16 w-full flex-row border-t bg-card text-card-foreground px-4 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:flex-col md:border-r md:border-t-0 md:py-6 md:px-6">
      <div className="flex w-full items-center justify-around md:flex-col md:items-start md:justify-start md:gap-2">
        <div className="hidden md:flex flex-col gap-1 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {roleLabel}
          </p>
          <h2 className="text-lg font-bold text-secondary line-clamp-1 dark:text-white">
            {user?.fullName || "User Panel"}
          </h2>
        </div>

        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:bg-primary/5 hover:text-primary w-full ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden md:inline">{link.label}</span>
            </Link>
          );
        })}

        <hr className="hidden md:block my-4 w-full" />

        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted w-full mt-auto"
        >
          <ArrowLeft className="h-5 w-5 shrink-0" />
          <span className="hidden md:inline">Back to Marketplace</span>
        </Link>
      </div>
    </aside>
  );
}