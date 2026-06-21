import Sidebar from "@/components/dashboard/Sidebar";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="customer" />
      <div className="flex flex-1 flex-col">
        <DashboardNav role="customer" />
        <main className="flex-1 bg-gray-50 p-4 dark:bg-[#171f2e] md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
