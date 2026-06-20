"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FAQS = [
  {
    question: "How does the AI recommendation work?",
    answer: "Our engine analyzes your favorite flavor tags, past orders, and review scores to match your palate with specific dishes from local partner kitchens. The more you order, the more tailored your menu becomes.",
  },
  {
    question: "What are the delivery hours?",
    answer: "FoodieAI partners with kitchens that operate from 7:00 AM until 11:30 PM daily. Delivery services are active during these operating hours.",
  },
  {
    question: "Is there a minimum order amount?",
    answer: "Most restaurant partners have a minimum order value of $10.00, though this can vary by establishment. You can find each restaurant's policy on their profile card.",
  },
  {
    question: "How can I update my order status?",
    answer: "You can track your order in real-time by navigating to your Customer Dashboard under the Orders section. You will also receive notification emails at key stages of preparation.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-12 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-secondary">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Have questions about ordering, delivery details, or recommendations? Here are some quick answers.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Card key={idx} className="border bg-card rounded-xl overflow-hidden cursor-pointer" onClick={() => toggle(idx)}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-6 font-bold text-base text-secondary hover:text-primary transition-colors">
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-2 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
