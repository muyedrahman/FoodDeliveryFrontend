// 2

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import type { DashboardRole } from "./Sidebar"; // মডার্ন 'import type' ব্যবহার করা হলো
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  UtensilsCrossed,
  BarChart3,
  Users,
  Store,
  Settings,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const MENUS: Record<DashboardRole, MenuItem[]> = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    {
      label: "My Orders",
      href: "/dashboard/customer/orders",
      icon: ShoppingBag,
    },
    { label: "Profile", href: "/dashboard/customer/profile", icon: User },
  ],
  restaurant: [
    { label: "Overview", href: "/dashboard/restaurant", icon: LayoutDashboard },
    {
      label: "Menu",
      href: "/dashboard/restaurant/menu",
      icon: UtensilsCrossed,
    },
    {
      label: "Orders",
      href: "/dashboard/restaurant/orders",
      icon: ShoppingBag,
    },
    {
      label: "Analytics",
      href: "/dashboard/restaurant/analytics",
      icon: BarChart3,
    },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Restaurants", href: "/dashboard/admin/restaurants", icon: Store },
    { label: "Orders", href: "/dashboard/admin/orders", icon: ShoppingBag },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
};

interface Props {
  role: DashboardRole;
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ role, open, onClose }: Props) {
  const pathname = usePathname();
  const menuItems = MENUS[role] || [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute left-0 top-0 h-full w-64 bg-white p-4 dark:bg-[#1A202C]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-bold text-[#2D3748] dark:text-white">
            Menu
          </span>
          <button onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5 text-[#2D3748] dark:text-white" />
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-[#FF6B35] text-white"
                    : "text-[#2D3748] hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}