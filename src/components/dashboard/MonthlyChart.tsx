"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlyStats } from "@/lib/data";

const formatY = (value: number) => {
  if (value >= 10000000) return `${(value / 10000000).toFixed(0)}천만`;
  if (value >= 10000) return `${(value / 10000).toFixed(0)}만`;
  return `${value}`;
};

export default function MonthlyChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">월별 거래 현황</h3>
          <p className="text-xs text-slate-500 mt-0.5">최근 6개월</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={monthlyStats} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a50f0" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#1a50f0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4d7aff" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4d7aff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis
            yAxisId="left"
            tickFormatter={formatY}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
            formatter={(value: number, name: string) => {
              if (name === "수익") return [`${value.toLocaleString()}원`, name];
              return [value, name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="수익"
            stroke="#1a50f0"
            strokeWidth={2}
            fill="url(#colorRevenue)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="거래건수"
            stroke="#4d7aff"
            strokeWidth={2}
            fill="url(#colorTx)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
