import { Search, ChefHat, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  {
    step: "01",
    title: "Select Your Meal",
    description: "Browse menu recommendations personalized for your palate by our AI, or search from local eateries.",
    icon: Search,
    color: "text-primary bg-primary/10",
  },
  {
    step: "02",
    title: "Chef Prepares",
    description: "Our partner restaurants prepare your dishes with high-quality, fresh ingredients under strict standards.",
    icon: ChefHat,
    color: "text-accent bg-accent/10",
  },
  {
    step: "03",
    title: "Fast Delivery",
    description: "Our logistics team ensures your gourmet food arrives hot, fresh, and on-time right to your doorstep.",
    icon: Truck,
    color: "text-blue-500 bg-blue-500/10",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-secondary">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Get your favorite gourmet meals delivered to your doorstep in three simple, seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 border-t border-dashed -z-10" />
          
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="border bg-card rounded-xl text-center shadow-sm relative overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center gap-4">
                  {/* Step Number Badge */}
                  <span className="absolute top-4 right-4 text-xs font-bold bg-muted px-2.5 py-1 rounded-full text-foreground/50">
                    {item.step}
                  </span>
                  
                  {/* Icon Wrapper */}
                  <div className={`p-4 rounded-full ${item.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl font-bold text-secondary mt-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
