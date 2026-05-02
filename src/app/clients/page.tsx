"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { clients, Client } from "@/lib/data";
import { formatKRW } from "@/lib/utils";
import {
  Search,
  Plus,
  Phone,
  Mail,
  User,
  Filter,
  UserX,
  MoreHorizontal,
} from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  상담중: "info",
  계약진행: "warning",
  계약완료: "success",
  이탈: "danger",
};

const typeVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral" | "default"> = {
  매수인: "default",
  매도인: "success",
  임차인: "info",
  임대인: "warning",
};

const typeColors: Record<string, string> = {
  매수인: "bg-brand-100 text-brand-700",
  매도인: "bg-emerald-100 text-emerald-700",
  임차인: "bg-sky-100 text-sky-700",
  임대인: "bg-amber-100 text-amber-700",
};

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
            {client.name[0]}
          </div>
          <div>
            <p className="font-semibold text-slate-800">{client.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[client.type]}`}>
              {client.type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant[client.status] || "neutral"}>{client.status}</Badge>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone size={13} className="text-slate-400" />
          {client.phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail size={13} className="text-slate-400" />
          {client.email}
        </div>
      </div>

      {client.budget > 0 && (
        <div className="flex items-center justify-between py-2 border-t border-slate-100">
          <span className="text-xs text-slate-500">예산</span>
          <span className="text-sm font-semibold text-brand-600">{formatKRW(client.budget)}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-1 mt-2">
        {client.interest.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-400">담당: {client.agent}</span>
        <span className="text-xs text-slate-400">{client.registeredAt}</span>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [filterAgent, setFilterAgent] = useState("전체");

  const types = ["전체", "매수인", "매도인", "임차인", "임대인"];
  const statuses = ["전체", "상담중", "계약진행", "계약완료", "이탈"];
  const agentList = ["전체", "김철수", "이영희", "박민준"];

  const filtered = clients.filter((c) => {
    if (search && !c.name.includes(search) && !c.phone.includes(search)) return false;
    if (filterType !== "전체" && c.type !== filterType) return false;
    if (filterStatus !== "전체" && c.status !== filterStatus) return false;
    if (filterAgent !== "전체" && c.agent !== filterAgent) return false;
    return true;
  });

  const summaryStats = [
    { label: "전체 고객", value: clients.length, color: "text-slate-800" },
    { label: "상담중", value: clients.filter((c) => c.status === "상담중").length, color: "text-sky-600" },
    { label: "계약 진행", value: clients.filter((c) => c.status === "계약진행").length, color: "text-amber-600" },
    { label: "계약 완료", value: clients.filter((c) => c.status === "계약완료").length, color: "text-emerald-600" },
  ];

  return (
    <DashboardLayout title="고객 관리" subtitle="등록된 고객을 관리합니다">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-5 py-4 text-center">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}명</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="이름, 연락처 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {types.map((t) => <option key={t}>{t}</option>)}
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
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition-colors">
            <Plus size={15} />
            고객 등록
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-3">
        총 <strong className="text-slate-800">{filtered.length}명</strong>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c) => <ClientCard key={c.id} client={c} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <UserX size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">조건에 맞는 고객이 없습니다.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
