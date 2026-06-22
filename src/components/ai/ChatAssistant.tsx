// "use client";

// import { useState } from "react";
// import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// interface Message {
//   sender: "user" | "ai";
//   text: string;
// }

// export default function ChatAssistant() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { sender: "ai", text: "Hello! I am your FoodieAI assistant. Looking for dinner recommendations or want to track an order?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;

//     const userMessage = input.trim();
//     setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
//     setInput("");
//     setLoading(true);

//     // Simulate AI response stream
//     setTimeout(() => {
//       let aiResponse = "I can help with that. Let me look up options!";
//       if (userMessage.toLowerCase().includes("burger")) {
//         aiResponse = "I highly recommend the Truffle Mushroom Burger from 'The Burger Bistro'. It currently holds a 4.9 rating!";
//       } else if (userMessage.toLowerCase().includes("sushi")) {
//         aiResponse = "The Spicy Tuna Crunch Roll from 'Sakura Sushi' is a favorite today! Prepared in just 20 minutes.";
//       } else if (userMessage.toLowerCase().includes("status") || userMessage.toLowerCase().includes("order")) {
//         aiResponse = "To check your order, please open your customer dashboard. It appears your last order is 'preparing'!";
//       }

//       setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
//       {/* Expanded Chat Dialog */}
//       {isOpen && (
//         <Card className="w-80 sm:w-96 border rounded-xl shadow-xl bg-card text-card-foreground mb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
//           <CardHeader className="p-4 bg-primary text-white flex flex-row items-center justify-between">
//             <CardTitle className="text-sm font-bold flex items-center gap-2">
//               <Bot className="h-5 w-5" />
//               <span>FoodieAI Assistant</span>
//             </CardTitle>
//             <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full h-8 w-8">
//               <X className="h-4 w-4" />
//             </Button>
//           </CardHeader>

//           <CardContent className="p-4 h-80 overflow-y-auto flex flex-col gap-3">
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                 <div
//                   className={`rounded-xl p-3 text-xs max-w-[80%] leading-relaxed ${
//                     msg.sender === "user"
//                       ? "bg-primary text-white"
//                       : "bg-muted text-foreground"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-muted text-foreground rounded-xl p-3 text-xs flex items-center gap-1.5">
//                   <Sparkles className="h-3 w-3 animate-spin text-primary" />
//                   <span>AI is thinking...</span>
//                 </div>
//               </div>
//             )}
//           </CardContent>

//           <CardFooter className="p-3 border-t bg-muted/40">
//             <form onSubmit={handleSend} className="flex items-center gap-2 w-full">
//               <Input
//                 type="text"
//                 placeholder="Ask for recommendations..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 className="bg-card text-xs rounded-xl h-9 border focus-visible:ring-primary focus-visible:ring-offset-0"
//               />
//               <Button type="submit" size="icon" className="h-9 w-9 bg-primary hover:bg-primary/95 text-white shrink-0 rounded-xl">
//                 <Send className="h-4 w-4" />
//               </Button>
//             </form>
//           </CardFooter>
//         </Card>
//       )}

//       {/* Floating Toggle Button */}
//       <Button
//         onClick={() => setIsOpen(!isOpen)}
//         className="h-14 w-14 rounded-full bg-primary hover:bg-primary/95 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105"
//         aria-label="Open chat assistant"
//       >
//         {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
//       </Button>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Message {
  sender: "user" | "ai";
  text: string;
}

// history shape the backend expects
interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am your FoodieAI assistant 🍕 Ask me for food recommendations, or help tracking your order!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const buildHistory = (): HistoryMessage[] => {
    // skip the first welcome message, convert the rest
    return messages.slice(1).map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: buildHistory(),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const json = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: json.reply || "Sorry, I could not get a response.",
        },
      ]);
    } catch {
      // Fallback to smart rule-based response so the UI never breaks
      let fallback =
        "I can help with food recommendations! Try asking about burgers, pizza, or sushi. 🍣";
      const lower = userText.toLowerCase();
      if (lower.includes("burger"))
        fallback =
          "🍔 I recommend the Truffle Mushroom Burger from The Burger Bistro — rated 4.9 stars!";
      else if (lower.includes("pizza"))
        fallback =
          "🍕 The Artisanal Margherita from Bella Italia is a crowd favourite — only $16!";
      else if (lower.includes("sushi"))
        fallback =
          "🍣 Try the Spicy Tuna Crunch Roll from Sakura Sushi — ready in 20 minutes!";
      else if (lower.includes("order") || lower.includes("track"))
        fallback =
          "📦 To track your order, open your Customer Dashboard → My Orders.";
      else if (lower.includes("cheap") || lower.includes("budget"))
        fallback =
          "💰 Our most affordable options start at $1.99. Check the Foods page and filter by price!";

      setMessages((prev) => [...prev, { sender: "ai", text: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Dialog */}
      {isOpen && (
        <Card className="w-80 sm:w-96 border rounded-xl shadow-xl bg-card text-card-foreground mb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <CardHeader className="p-4 bg-primary text-white flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span>FoodieAI Assistant</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-4 h-80 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl p-3 text-xs max-w-[80%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-xl p-3 text-xs flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 animate-spin text-primary" />
                  <span>AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-muted/40">
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 w-full"
            >
              <Input
                type="text"
                placeholder="Ask for recommendations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="bg-card text-xs rounded-xl h-9 border focus-visible:ring-primary focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="h-9 w-9 bg-primary hover:bg-primary/95 text-white shrink-0 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-primary hover:bg-primary/95 text-white shadow-xl flex items-center justify-center transition-all hover:scale-105"
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}