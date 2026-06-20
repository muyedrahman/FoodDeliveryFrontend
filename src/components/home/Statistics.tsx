import { CheckCircle, Users, Utensils, Star } from "lucide-react";

const STATS = [
  { value: "500+", label: "Restaurant Partners", icon: Utensils, color: "text-primary" },
  { value: "12K+", label: "Happy Customers", icon: Users, color: "text-accent" },
  { value: "150K+", label: "Delivered Orders", icon: CheckCircle, color: "text-blue-500" },
  { value: "4.9", label: "Average Rating", icon: Star, color: "text-amber-500" },
];

export default function Statistics() {
  return (
    <section className="bg-secondary text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center text-center gap-2 p-4">
                <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-gray-400">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
