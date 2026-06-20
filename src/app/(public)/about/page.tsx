import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Bot, Heart, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-neutral/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl flex flex-col gap-12">
          {/* Header */}
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-secondary">
              About FoodieAI
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are on a mission to personalize the food delivery experience through machine learning, helping local kitchens thrive and giving customers the perfect meal every time.
            </p>
          </div>

          {/* Graphic Section */}
          <div className="h-64 sm:h-96 rounded-xl overflow-hidden bg-muted border">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&auto=format&fit=crop&q=80"
              alt="Kitchen workspace"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border rounded-xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="p-3.5 rounded-full bg-primary/10 text-primary">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-secondary">Smart Matching</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our advanced AI recommendation system matches meals to your flavor profiles.
                </p>
              </CardContent>
            </Card>

            <Card className="border rounded-xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="p-3.5 rounded-full bg-accent/10 text-accent">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-secondary">Culinary Passion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We empower local restaurants and home chefs to focus on cooking amazing meals.
                </p>
              </CardContent>
            </Card>

            <Card className="border rounded-xl shadow-sm">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="p-3.5 rounded-full bg-blue-500/10 text-blue-500">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-secondary">Eco Logistics</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our delivery routes are optimized for reduced emissions and speed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
