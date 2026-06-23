"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function CartPage() {
  const router = useRouter();
  const { isSignedIn, getToken } = useAuth();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getGrandTotal,
  } = useCartStore();
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setPlacing(true);
    setError("");

    try {
      const token = await getToken();

      // Group by restaurant — for simplicity place one order for first restaurant
      const restaurantId = items[0].food.restaurantId;

      const orderPayload = {
        restaurantId,
        items: items.map((i) => ({
          foodId: i.food.id,
          quantity: i.quantity,
        })),
        address,
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to place order");
      }

      clearCart();
      router.push("/dashboard/customer/orders?success=1");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10 bg-neutral/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </button>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#2D3748] dark:text-white mb-8 flex items-center gap-2">
            <ShoppingBag className="h-7 w-7 text-primary" />
            Your Cart
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
              <p className="text-muted-foreground font-semibold">
                Your cart is empty.
              </p>
              <Link
                href="/foods"
                className="text-primary font-bold hover:underline text-sm"
              >
                Browse our menu →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.food.id}
                    className="flex items-center gap-4 bg-card border rounded-xl p-4 shadow-sm"
                  >
                    <img
                      src={item.food.image}
                      alt={item.food.name}
                      className="h-20 w-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-[#2D3748] dark:text-white truncate">
                        {item.food.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        ${item.food.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.food.id, item.quantity - 1)
                          }
                          className="h-7 w-7 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.food.id, item.quantity + 1)
                          }
                          className="h-7 w-7 rounded-full border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-primary text-sm">
                        ${(item.food.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.food.id)}
                        className="text-rose-500 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex flex-col gap-4">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h2 className="font-bold text-base text-[#2D3748] dark:text-white mb-4">
                    Order Summary
                  </h2>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery Fee</span>
                      <span>
                        {getDeliveryFee() === 0 ? (
                          <span className="text-[#48BB78] font-semibold">
                            Free
                          </span>
                        ) : (
                          `$${getDeliveryFee().toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-[#2D3748] dark:text-white text-base">
                      <span>Total</span>
                      <span className="text-primary">
                        ${getGrandTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                      Delivery Address *
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full delivery address..."
                      rows={3}
                      className="w-full text-sm border rounded-xl p-3 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-rose-500 font-medium mt-2">
                      {error}
                    </p>
                  )}

                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="mt-4 w-full rounded-xl bg-primary hover:bg-primary/95 text-white font-bold py-3 text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {placing ? "Placing Order..." : "Place Order"}
                  </button>

                  {!isSignedIn && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      <Link
                        href="/sign-in"
                        className="text-primary font-semibold hover:underline"
                      >
                        Sign in
                      </Link>
                      to place your order
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
