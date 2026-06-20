import Link from "next/link";
import { Utensils, Share2, MessageCircle, Camera, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-secondary text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <Utensils className="h-6 w-6 stroke-[2.5]" />
              <span>FoodieAI</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Order gourmet meals curated by artificial intelligence from top restaurants. Healthy, delicious, and delivered within minutes.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Camera className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/foods" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Browse Menu
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Popular Restaurants
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Latest Blog Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cookie Preferences
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Contact Us</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>100 AI Boulevard, Suite 500, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+1 (800) 555-FOOD</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>support@foodieai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FoodieAI Inc. All rights reserved.</p>
          <p>Designed with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  );
}
