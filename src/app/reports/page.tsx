"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { monthlyStats, propertyTypeStats, dealTypeStats, agents, transactions } from "@/lib/data";
import { formatKRW } from "@/lib/utils";
import { TrendingUp, Award, Wallet, Building2 } from "lucide-react";

const formatMillions = (v: number) => {
  if (v >= 10000000) return `${(v / 10000000).toFixed(0)}천만`;
  if (v >= 10000) return `${(v / 10000).toFixed(0)}만`;
  return `${v}`;
};

const districtData = [
  { name: "포항 남구", 건수: 4, 금액: 1870000000 },
  { name: "포항 북구", 건수: 3, 금액: 650000000 },
];

const quarterlyData = [
  { quarter: "2025 Q3", 매출: 42000000, 건수: 18 },
  { quarter: "2025 Q4", 매출: 55000000, 건수: 24 },
  { quarter: "2026 Q1", 매출: 68300000, 건수: 29 },
  { quarter: "2026 Q2", 매출: 24500000, 건수: 10 },
];

export default function ReportsPage() {
  const totalRevenue = transactions.filter((t) => t.status === "완료").reduce((s, t) => s + t.commission, 0);
  const totalTxCount = transactions.filter((t) => t.status === "완료").length;
  const avgCommission = totalTxCount > 0 ? totalRevenue / totalTxCount : 0;
  const totalTxValue = transactions.filter((t) => t.status === "완료").reduce((s, t) => s + t.price, 0);

  return (
    <DashboardLayout title="보고서" subtitle="업무 실적 분석 및 통계">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "총 중개 수익",
            value: formatKRW(totalRevenue),
            sub: "완료 거래 기준",
            icon: Wallet,
            iconBg: "bg-violet-50",
            iconColor: "text-violet-600",
          },
          {
            label: "완료 거래 건수",
            value: `${totalTxCount}건`,
            sub: "계약 완료 기준",
            icon: TrendingUp,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
          },
          {
            label: "평균 수수료",
            value: formatKRW(Math.round(avgCommission)),
            sub: "건당 평균",
            icon: Award,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
          },
          {
            label: "총 거래 금액",
            value: formatKRW(totalTxValue),
            sub: "완료 거래 합산",
            icon: Building2,
            iconBg: "bg-brand-50",
            iconColor: "text-brand-600",
          },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-slate-500">{item.label}</p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.iconBg}`}>
                <item.icon size={18} className={item.iconColor} />
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900">{item.value}</p>
            <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Monthly Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">월별 수익 현황</h3>
          <p className="text-xs text-slate-500 mb-4">최근 6개월 수익 추이</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyStats} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatMillions} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={(v: number) => [`${v.toLocaleString()}원`, "수익"]}
              />
              <Bar dataKey="수익" fill="#1a50f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quarterly Line Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">분기별 거래 추이</h3>
          <p className="text-xs text-slate-500 mb-4">분기별 매출 및 거래 건수</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={quarterlyData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tickFormatter={formatMillions} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                formatter={(v: number, name: string) => {
                  if (name === "매출") return [`${v.toLocaleString()}원`, name];
                  return [v, name];
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="매출" stroke="#1a50f0" strokeWidth={2} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="건수" stroke="#4d7aff" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Property Type Pie */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">매물 유형 분포</h3>
          <p className="text-xs text-slate-500 mb-4">전체 매물 유형 비율</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={propertyTypeStats} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value">
                {propertyTypeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v: number) => [`${v}%`, "비율"]}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Type Pie */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">거래 유형 분포</h3>
          <p className="text-xs text-slate-500 mb-4">매매 · 전세 · 월세 비율</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={dealTypeStats} cx="50%" cy="50%" outerRadius={70} paddingAngle={3} dataKey="value">
                {dealTypeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
                formatter={(v: number) => [`${v}%`, "비율"]}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* District Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-800 mb-1">지역별 거래 현황</h3>
          <p className="text-xs text-slate-500 mb-4">구별 거래 건수 및 금액</p>
          <div className="space-y-4 mt-6">
            {districtData.map((d) => (
              <div key={d.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700">{d.name}</span>
                  <span className="text-slate-500">{d.건수}건</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${(d.건수 / 7) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">{formatKRW(d.금액)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="font-semibold text-slate-800 mb-1">공인중개사별 실적</h3>
        <p className="text-xs text-slate-500 mb-4">누적 실적 현황</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {["순위", "담당자", "매물 건수", "거래 건수", "수익 합계", "건당 평균 수익", "점유율"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agents
                .sort((a, b) => b.commission - a.commission)
                .map((agent, i) => {
                  const totalC = agents.reduce((s, a) => s + a.commission, 0);
                  const share = ((agent.commission / totalC) * 100).toFixed(1);
                  const avg = Math.round(agent.commission / agent.transactions);
                  return (
                    <tr key={agent.name} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                          ${i === 0 ? "bg-amber-400" : i === 1 ? "bg-slate-400" : "bg-amber-700"}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold">
                            {agent.name[0]}
                          </div>
                          <span className="text-sm font-medium text-slate-800">{agent.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{agent.properties}건</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{agent.transactions}건</td>
                      <td className="px-4 py-3 text-sm font-semibold text-violet-600">{formatKRW(agent.commission)}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{formatKRW(avg)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-brand-500 rounded-full"
                              style={{ width: `${share}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 w-10">{share}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
