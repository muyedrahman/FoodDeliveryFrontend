"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Get 20% Off Your First Order
          </h2>
          <p className="text-white/80 max-w-lg mx-auto leading-relaxed">
            Subscribe to our weekly food digest and receive special promotions, chef suggestions, and exclusive discounts.
          </p>

          {subscribed ? (
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-md mx-auto mt-6 animate-fade-in">
              <p className="font-semibold text-white">🎉 Welcome to the food club! Check your inbox for your 20% coupon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto w-full mt-6">
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-secondary rounded-xl py-6 px-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 w-full"
              />
              <Button type="submit" className="w-full sm:w-auto bg-secondary hover:bg-secondary/95 text-white font-semibold py-6 px-6 rounded-xl flex items-center justify-center gap-2 shrink-0">
                <span>Subscribe</span>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
