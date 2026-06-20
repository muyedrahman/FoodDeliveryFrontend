"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Utensils, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardNav() {
  const pathname = usePathname();

  // Helper to generate breadcrumbs from path
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((seg, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      const label = seg.charAt(0).toUpperCase() + seg.slice(1);
      return { href, label };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Brand logo (visible on mobile) */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex md:hidden items-center gap-1.5 text-primary font-bold text-lg">
          <Utensils className="h-5 w-5" />
          <span>FoodieAI</span>
        </Link>

        {/* Desktop Breadcrumbs */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          {breadcrumbs.map((bc, idx) => (
            <span key={bc.href} className="flex items-center gap-1">
              <span>/</span>
              <Link
                href={bc.href}
                className={`hover:text-primary transition-colors ${
                  idx === breadcrumbs.length - 1 ? "text-foreground font-semibold" : ""
                }`}
              >
                {bc.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden sm:block w-48 lg:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search dashboard..."
            className="pl-8 h-9 rounded-xl border bg-muted/40 focus-visible:ring-primary focus-visible:ring-offset-0"
          />
        </div>

        {/* Notifications Icon */}
        <button className="relative p-2 text-foreground/80 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        {/* Profile Button */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
