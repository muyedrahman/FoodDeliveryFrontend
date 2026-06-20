import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function CustomerProfile() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border rounded-xl shadow-md lg:col-span-1 bg-card text-card-foreground">
          <CardHeader className="flex flex-col items-center gap-4">
            <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl">
              JD
            </div>
            <div className="text-center">
              <h2 className="font-bold text-lg text-secondary dark:text-white">John Doe</h2>
              <p className="text-xs text-muted-foreground">Gold Level Gourmet</p>
            </div>
          </CardHeader>
        </Card>

        <Card className="border rounded-xl shadow-md lg:col-span-2 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-base font-bold text-secondary dark:text-white">Contact & Address Info</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b pb-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Email Address</p>
                <p className="text-sm font-semibold">john.doe@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b pb-3">
              <Phone className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Phone Number</p>
                <p className="text-sm font-semibold">+1 (555) 234-5678</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase">Delivery Address</p>
                <p className="text-sm font-semibold">123 Culinary Drive, Apt 4B, San Francisco, CA 94103</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
