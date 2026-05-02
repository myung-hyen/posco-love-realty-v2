"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { transactions } from "@/lib/data";
import { formatKRW } from "@/lib/utils";
import {
  Search,
  Filter,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpDown,
} from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  완료: "success",
  진행중: "info",
  취소: "danger",
  대기: "warning",
};

const dealTypeColor: Record<string, string> = {
  매매: "text-brand-600 bg-brand-50 border-brand-100",
  전세: "text-emerald-600 bg-emerald-50 border-emerald-100",
  월세: "text-amber-600 bg-amber-50 border-amber-100",
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filterDeal, setFilterDeal] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [filterAgent, setFilterAgent] = useState("전체");
  const [sortBy, setSortBy] = useState<"contractDate" | "price" | "commission">("contractDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const dealTypes = ["전체", "매매", "전세", "월세"];
  const statuses = ["전체", "완료", "진행중", "취소", "대기"];
  const agentList = ["전체", "김철수", "이영희", "박민준"];

  const filtered = transactions
    .filter((t) => {
      if (search && !t.propertyTitle.includes(search) && !t.seller.includes(search) && !t.buyer.includes(search)) return false;
      if (filterDeal !== "전체" && t.dealType !== filterDeal) return false;
      if (filterStatus !== "전체" && t.status !== filterStatus) return false;
      if (filterAgent !== "전체" && t.agent !== filterAgent) return false;
      return true;
    })
    .sort((a, b) => {
      let valA: number | string = a[sortBy];
      let valB: number | string = b[sortBy];
      if (typeof valA === "string" && typeof valB === "string") {
        return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDir === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });

  const totalCommission = filtered.filter((t) => t.status === "완료").reduce((sum, t) => sum + t.commission, 0);
  const completedCount = filtered.filter((t) => t.status === "완료").length;
  const inProgressCount = filtered.filter((t) => t.status === "진행중").length;
  const canceledCount = filtered.filter((t) => t.status === "취소").length;

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortDir("desc"); }
  };

  return (
    <DashboardLayout title="거래 내역" subtitle="모든 거래 내역을 관리합니다">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <TrendingUp size={20} className="text-slate-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">전체 거래</p>
            <p className="text-xl font-bold text-slate-800">{transactions.length}건</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">완료</p>
            <p className="text-xl font-bold text-emerald-600">{completedCount}건</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
            <Clock size={20} className="text-sky-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">진행중</p>
            <p className="text-xl font-bold text-sky-600">{inProgressCount}건</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
            <TrendingUp size={20} className="text-violet-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500">수익 합계</p>
            <p className="text-xl font-bold text-violet-600">{formatKRW(totalCommission)}</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="매물명, 매도인, 매수인 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select
              value={filterDeal}
              onChange={(e) => setFilterDeal(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {dealTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {statuses.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {agentList.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-3">총 <strong className="text-slate-800">{filtered.length}건</strong></p>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">거래 ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">매물명</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">거래 유형</th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort("price")}
                >
                  <span className="flex items-center gap-1">거래가격 <ArrowUpDown size={11} /></span>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort("commission")}
                >
                  <span className="flex items-center gap-1">수수료 <ArrowUpDown size={11} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">매도인</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">매수인</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">담당자</th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase cursor-pointer hover:text-slate-800"
                  onClick={() => toggleSort("contractDate")}
                >
                  <span className="flex items-center gap-1">계약일 <ArrowUpDown size={11} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-slate-400">{tx.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800 max-w-[180px] truncate">{tx.propertyTitle}</p>
                      <p className="text-xs text-slate-500">{tx.district}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-medium border rounded ${dealTypeColor[tx.dealType]}`}>
                      {tx.dealType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-slate-800">{formatKRW(tx.price)}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-violet-600">{formatKRW(tx.commission)}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{tx.seller}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{tx.buyer}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{tx.agent}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{tx.contractDate}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[tx.status] || "neutral"}>{tx.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <XCircle size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">조건에 맞는 거래 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
