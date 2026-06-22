// page.tsx;
import OverviewCards from "@/components/dashboard/OverviewCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const PLATFORM_ALERTS = [
  {
    id: "ALT-1",
    message: "New kitchen partner 'Bella Italia' request verification.",
    type: "Verification Pending",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    id: "ALT-2",
    message: "Payment gateway latency detected (avg 2.4s).",
    type: "System Notice",
    color: "text-rose-500 bg-rose-500/10",
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
          Platform Administrator
        </h1>
        <p className="text-muted-foreground mt-1">
          Review global platform activities, payments, and system health.
        </p>
      </div>

      <OverviewCards role="admin" />

      {/* Platform Notifications/Alerts Card */}
      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-secondary dark:text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span>Critical Platform Log</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {PLATFORM_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 last:border-b-0 last:pb-0 gap-3"
            >
              <div>
                <span className="font-bold text-sm text-secondary dark:text-white">
                  {alert.message}
                </span>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  ID: {alert.id}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${alert.color}`}
              >
                {alert.type}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
