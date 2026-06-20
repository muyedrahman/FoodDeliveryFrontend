import Link from "next/link";
import { Utensils, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral text-center px-4">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <div className="p-4 rounded-full bg-primary/10 text-primary">
          <Utensils className="h-12 w-12" />
        </div>
        
        <div>
          <h1 className="text-6xl font-extrabold text-secondary">404</h1>
          <h2 className="text-xl font-bold text-secondary/80 mt-2">Page Not Found</h2>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            The gourmet dish you are looking for has been devoured or doesn&apos;t exist. Let&apos;s get you back to the marketplace.
          </p>
        </div>

        <Button asChild className="bg-primary hover:bg-primary/95 text-white font-semibold py-6 px-8 rounded-xl flex items-center gap-2 shadow-md mt-4">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Homepage</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
