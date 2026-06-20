"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Sun, Moon, Menu, X, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/foods", label: "Browse Food" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isSignedIn, user } = useUser();
  const { getTotalItems } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Utensils className="h-6 w-6 stroke-[2.5]" />
          <span>FoodieAI</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggler */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Cart Icon */}
          <Link href="/foods" className="relative p-2 text-foreground/80 hover:text-primary transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Clerk Auth Buttons */}
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href={
                  user?.publicMetadata?.role === "admin"
                    ? "/dashboard/admin"
                    : user?.publicMetadata?.role === "restaurant"
                    ? "/dashboard/restaurant"
                    : "/dashboard/customer"
                }
                className="text-xs font-semibold hover:underline text-foreground/70"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button size="sm" className="rounded-xl font-semibold bg-primary hover:bg-primary/95 text-white">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Link href="/foods" className="relative p-2 mr-1">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 pb-6 pt-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-1 transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <hr className="my-2" />
            {isSignedIn ? (
              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/dashboard/customer"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-primary"
                >
                  Go to Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className="w-full bg-primary text-white rounded-xl py-2">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
