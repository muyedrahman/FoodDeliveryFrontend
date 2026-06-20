import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Food Enthusiast",
    location: "San Francisco, CA",
    text: "The AI recommendation matched my flavor profile perfectly. The truffle mushroom burger was spectacular and it arrived steaming hot in less than 20 minutes!",
    rating: 5,
    avatar: "S",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    location: "San Jose, CA",
    text: "FoodieAI has completely redefined lunch during work. The ordering flow is seamless, and the delivery times are incredibly consistent. Highly recommended!",
    rating: 5,
    avatar: "M",
  },
  {
    name: "Elena Rodriguez",
    role: "Local Food Blogger",
    location: "Oakland, CA",
    text: "I love finding new restaurants, and this platform makes it so easy. The food options are curated wonderfully, and the UI is beautiful and premium.",
    rating: 5,
    avatar: "E",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-neutral/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight text-secondary">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">
            Read real feedback from food lovers who use our AI-powered delivery marketplace daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <Card key={idx} className="border bg-card rounded-xl shadow-sm relative hover:shadow-md transition-shadow">
              <CardContent className="p-8 flex flex-col gap-6">
                <Quote className="h-8 w-8 text-primary/20 absolute top-6 left-6" />
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed italic z-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                <hr />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-secondary">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role} • {t.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
