"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface DashboardGuardProps {
  allowedRole: "customer" | "restaurant_owner" | "admin";
  children: React.ReactNode;
}

export default function DashboardGuard({
  allowedRole,
  children,
}: DashboardGuardProps) {
  const { isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    const checkRole = async () => {
      try {
        const token = await getToken();
        if (!token) {
          router.push("/sign-in");
          return;
        }

        const res = await fetch(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          router.push("/");
          return;
        }

        const data = await res.json();
        const userRole = data?.user?.role;

        // Admin can access everything
        if (userRole === "admin") {
          setAllowed(true);
          setChecking(false);
          return;
        }

        if (userRole === allowedRole) {
          setAllowed(true);
        } else {
          // Redirect to correct dashboard
          if (userRole === "restaurant_owner") {
            router.push("/dashboard/restaurant");
          } else {
            router.push("/dashboard/customer");
          }
        }
      } catch {
        router.push("/");
      } finally {
        setChecking(false);
      }
    };

    checkRole();
  }, [isSignedIn, getToken, allowedRole, router, pathname]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}
