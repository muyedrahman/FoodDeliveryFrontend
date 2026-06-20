"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-neutral/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12 flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-secondary">
              Contact FoodieAI
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Have questions about signing up as a kitchen, tracking deliveries, or resolving issues? Get in touch with us!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Col */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <Card className="border rounded-xl shadow-sm bg-card text-card-foreground">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-secondary">Email Support</h4>
                    <p className="text-xs text-muted-foreground mt-1">support@foodieai.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border rounded-xl shadow-sm bg-card text-card-foreground">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-secondary">Call Support</h4>
                    <p className="text-xs text-muted-foreground mt-1">+1 (800) 555-FOOD</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border rounded-xl shadow-sm bg-card text-card-foreground">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-secondary">Main Office</h4>
                    <p className="text-xs text-muted-foreground mt-1">100 AI Boulevard, San Francisco, CA</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form Col */}
            <Card className="lg:col-span-2 border rounded-xl shadow-sm bg-card text-card-foreground">
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-10 flex flex-col items-center gap-3">
                    <div className="p-4 rounded-full bg-accent/10 text-accent font-bold">✓</div>
                    <h3 className="font-bold text-lg text-secondary">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Your Name</label>
                        <Input required type="text" placeholder="John Doe" className="rounded-xl border bg-muted/20" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Email Address</label>
                        <Input required type="email" placeholder="john@example.com" className="rounded-xl border bg-muted/20" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Subject</label>
                      <Input required type="text" placeholder="How can we help?" className="rounded-xl border bg-muted/20" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">Message</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write your request details here..."
                        className="w-full text-sm border rounded-xl p-3 bg-muted/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                      />
                    </div>

                    <Button type="submit" className="bg-primary hover:bg-primary/95 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 shadow-sm mt-2">
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
