import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import BlogSection from "@/components/home/BlogSection";

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-neutral/30 border-b py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-secondary">
              FoodieAI Blog
            </h1>
            <p className="text-muted-foreground mt-2">
              Stay updated with food trends, AI personal diets, and recipe highlights from our partner chefs.
            </p>
          </div>
        </div>
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
