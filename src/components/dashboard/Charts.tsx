"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const REVENUE_DATA = [
  { name: "Mon", revenue: 4000, orders: 24 },
  { name: "Tue", revenue: 3000, orders: 18 },
  { name: "Wed", revenue: 5000, orders: 30 },
  { name: "Thu", revenue: 2780, orders: 15 },
  { name: "Fri", revenue: 1890, orders: 10 },
  { name: "Sat", revenue: 6390, orders: 45 },
  { name: "Mon/Sun", revenue: 8490, orders: 50 },
];

export function RevenueChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="border rounded-xl shadow-md h-[350px] flex items-center justify-center bg-card">
        <span className="text-sm text-muted-foreground">Loading Revenue Analytics...</span>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-base font-bold text-secondary dark:text-white">Revenue Analysis</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#FF6B35" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function OrdersChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="border rounded-xl shadow-md h-[350px] flex items-center justify-center bg-card">
        <span className="text-sm text-muted-foreground">Loading Order Analytics...</span>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="text-base font-bold text-secondary dark:text-white">Order Frequency</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#48BB78" radius={[4, 4, 0, 0]} name="Orders Filled" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
