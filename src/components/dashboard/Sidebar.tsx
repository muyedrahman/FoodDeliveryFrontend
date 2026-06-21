"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
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

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as string) || "customer";

  // Navigation configurations based on user role
  const getNavLinks = () => {
    switch (role) {
      case "admin":
        return [
          { href: "/dashboard/admin", label: "Overview", icon: BarChart3 },
          { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
          { href: "/dashboard/admin/restaurants", label: "Manage Eateries", icon: Building },
          { href: "/dashboard/admin/orders", label: "Manage Orders", icon: ShoppingBag },
          { href: "/dashboard/admin/analytics", label: "Deep Analytics", icon: BarChart3 },
        ];
      case "restaurant":
        return [
          { href: "/dashboard/restaurant", label: "Overview", icon: Home },
          { href: "/dashboard/restaurant/menu", label: "Manage Menu", icon: UtensilsCrossed },
          { href: "/dashboard/restaurant/orders", label: "Manage Orders", icon: ShoppingBag },
          { href: "/dashboard/restaurant/analytics", label: "Sales Analytics", icon: BarChart3 },
        ];
      default: // customer
        return [
          { href: "/dashboard/customer", label: "Overview", icon: Home },
          { href: "/dashboard/customer/orders", label: "My Orders", icon: ShoppingBag },
          { href: "/dashboard/customer/profile", label: "My Profile", icon: User },
        ];
    }
  };

  const links = getNavLinks();

  return (
    <aside className="fixed bottom-0 left-0 z-20 flex h-16 w-full flex-row border-t bg-card text-card-foreground px-4 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:flex-col md:border-r md:border-t-0 md:py-6 md:px-6">
      <div className="flex w-full items-center justify-around md:flex-col md:items-start md:justify-start md:gap-2">
        <div className="hidden md:flex flex-col gap-1 mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            {role} portal
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
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
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

// 2

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   User,
//   UtensilsCrossed,
//   BarChart3,
//   Users,
//   Store,
//   Settings,
//   LucideIcon,
// } from "lucide-react";

// export type DashboardRole = "customer" | "restaurant" | "admin";

// interface MenuItem {
//   label: string;
//   href: string;
//   icon: LucideIcon;
// }

// const MENUS: Record<DashboardRole, MenuItem[]> = {
//   customer: [
//     { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
//     {
//       label: "My Orders",
//       href: "/dashboard/customer/orders",
//       icon: ShoppingBag,
//     },
//     { label: "Profile", href: "/dashboard/customer/profile", icon: User },
//   ],
//   restaurant: [
//     { label: "Overview", href: "/dashboard/restaurant", icon: LayoutDashboard },
//     {
//       label: "Menu",
//       href: "/dashboard/restaurant/menu",
//       icon: UtensilsCrossed,
//     },
//     {
//       label: "Orders",
//       href: "/dashboard/restaurant/orders",
//       icon: ShoppingBag,
//     },
//     {
//       label: "Analytics",
//       href: "/dashboard/restaurant/analytics",
//       icon: BarChart3,
//     },
//   ],
//   admin: [
//     { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
//     { label: "Users", href: "/dashboard/admin/users", icon: Users },
//     { label: "Restaurants", href: "/dashboard/admin/restaurants", icon: Store },
//     { label: "Orders", href: "/dashboard/admin/orders", icon: ShoppingBag },
//     { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
//     { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
//   ],
// };

// const ROLE_LABEL: Record<DashboardRole, string> = {
//   customer: "Customer Panel",
//   restaurant: "Restaurant Panel",
//   admin: "Admin Panel",
// };

// export default function Sidebar({ role }: { role: DashboardRole }) {
//   const pathname = usePathname();
//   const menuItems = MENUS[role];

//   return (
//     <aside className="hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-[#1A202C] md:flex md:flex-col">
//       <div className="px-6 py-5">
//         <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//           {ROLE_LABEL[role]}
//         </p>
//       </div>

//       <nav className="flex-1 space-y-1 px-3">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive =
//             pathname === item.href ||
//             (item.href !== `/dashboard/${role}` &&
//               pathname?.startsWith(item.href));

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
//                 isActive
//                   ? "bg-[#FF6B35] text-white"
//                   : "text-[#2D3748] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//               }`}
//             >
//               <Icon className="h-4 w-4" />
//               {item.label}
//             </Link>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }