// "use client";

// import { useEffect } from "react";
// import { useAuth } from "@clerk/nextjs";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// export default function AuthSync() {
//   const { isSignedIn, getToken } = useAuth();

//   useEffect(() => {
//     if (!isSignedIn) return;

//     const syncUser = async () => {
//       try {
//         const token = await getToken();
//         if (!token) return;

//         await fetch(`${API_URL}/auth/sync`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       } catch (err) {
//         console.warn("Auth sync failed:", err);
//       }
//     };

//     syncUser();
//   }, [isSignedIn, getToken]);

//   return null;
// }

// 2

// "use client";

// import { useEffect } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { useRouter, usePathname } from "next/navigation";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// export default function AuthSync() {
//   const { isSignedIn, getToken } = useAuth();
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!isSignedIn) return;

//     const syncUser = async () => {
//       try {
//         const token = await getToken();
//         if (!token) return;

//         const res = await fetch(`${API_URL}/auth/sync`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) return;

//         const data = await res.json();
//         const role = data?.user?.role;

//         // Only redirect if user is on homepage or auth pages
//         const shouldRedirect =
//           pathname === "/" ||
//           pathname === "/sign-in" ||
//           pathname === "/sign-up";

//         if (shouldRedirect && role) {
//           if (role === "admin") {
//             router.push("/dashboard/admin");
//           } else if (role === "restaurant_owner") {
//             router.push("/dashboard/restaurant");
//           } else {
//             router.push("/dashboard/customer");
//           }
//         }
//       } catch (err) {
//         console.warn("Auth sync failed:", err);
//       }
//     };

//     syncUser();
//   }, [isSignedIn, getToken, pathname, router]);

//   return null;
// }

// 3

"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function AuthSync() {
  const { isSignedIn, getToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isSignedIn || hasSynced.current) return;

    const syncUser = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const res = await fetch(`${API_URL}/auth/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        const role = data?.user?.role;

        hasSynced.current = true;

        // Only redirect from homepage or auth pages
        const isAuthPage =
          pathname === "/" ||
          pathname.startsWith("/sign-in") ||
          pathname.startsWith("/sign-up");

        if (isAuthPage && role) {
          if (role === "admin") {
            router.push("/dashboard/admin");
          } else if (role === "restaurant_owner") {
            router.push("/dashboard/restaurant");
          } else {
            router.push("/dashboard/customer");
          }
        }
      } catch (err) {
        console.warn("Auth sync failed:", err);
      }
    };

    syncUser();
  }, [isSignedIn, getToken, pathname, router]);

  // Reset sync flag on logout
  useEffect(() => {
    if (!isSignedIn) {
      hasSynced.current = false;
    }
  }, [isSignedIn]);

  return null;
}