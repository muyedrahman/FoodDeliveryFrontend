import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/home/HeroSection";
import Categories from "@/components/home/Categories";
import FeaturedFoods from "@/components/home/FeaturedFoods";
import HowItWorks from "@/components/home/HowItWorks";
import Statistics from "@/components/home/Statistics";
import Testimonials from "@/components/home/Testimonials";
import PopularRestaurants from "@/components/home/PopularRestaurants";
import BlogSection from "@/components/home/BlogSection";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import ChatAssistant from "@/components/ai/ChatAssistant";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Categories />
        <FeaturedFoods />
        <HowItWorks />
        <Statistics />
        <PopularRestaurants />
        <Testimonials />
        <BlogSection />
        <Newsletter />
        <FAQ />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}
