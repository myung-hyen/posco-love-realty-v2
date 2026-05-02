"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { properties, Property } from "@/lib/data";
import { formatKRW } from "@/lib/utils";
import {
  Search,
  Plus,
  MapPin,
  Home,
  Maximize2,
  Filter,
  Building2,
  SlidersHorizontal,
} from "lucide-react";

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  매물등록: "success",
  계약진행: "info",
  계약완료: "neutral",
  매물취소: "danger",
  대기: "warning",
};

const dealTypeColor: Record<string, string> = {
  매매: "bg-brand-500",
  전세: "bg-emerald-500",
  월세: "bg-amber-500",
};

function PropertyCard({ property }: { property: Property }) {
  const priceDisplay = () => {
    if (property.dealType === "월세") {
      return `${formatKRW(property.deposit ?? 0)} / ${(property.monthly ?? 0).toLocaleString()}원`;
    }
    return formatKRW(property.price);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
        <Building2 size={48} className="text-brand-300" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded ${dealTypeColor[property.dealType]}`}>
            {property.dealType}
          </span>
          <span className="px-2 py-0.5 text-xs font-medium bg-white/90 text-slate-700 rounded">
            {property.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={statusVariant[property.status] || "neutral"}>{property.status}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate">{property.title}</h3>
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
          <MapPin size={11} />
          <span className="truncate">{property.address}</span>
        </div>
        <p className="text-lg font-bold text-brand-700 mb-3">{priceDisplay()}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Maximize2 size={11} />
            {property.area}㎡
          </span>
          <span className="flex items-center gap-1">
            <Home size={11} />
            방 {property.rooms}개
          </span>
          <span>{property.floor}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">담당: {property.agent}</span>
          <span className="text-xs text-slate-400">{property.listedAt}</span>
        </div>
      </div>
    </div>
  );
}

function PropertyRow({ property }: { property: Property }) {
  const priceDisplay = () => {
    if (property.dealType === "월세") {
      return `${formatKRW(property.deposit ?? 0)} / ${(property.monthly ?? 0).toLocaleString()}원`;
    }
    return formatKRW(property.price);
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded ${dealTypeColor[property.dealType]}`}>
            {property.dealType}
          </span>
          <div>
            <p className="text-sm font-medium text-slate-800">{property.title}</p>
            <p className="text-xs text-slate-500">{property.address}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{property.type}</td>
      <td className="px-4 py-3 text-sm font-semibold text-brand-700">{priceDisplay()}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{property.area}㎡</td>
      <td className="px-4 py-3 text-sm text-slate-600">{property.floor}</td>
      <td className="px-4 py-3">
        <Badge variant={statusVariant[property.status] || "neutral"}>{property.status}</Badge>
      </td>
      <td className="px-4 py-3 text-sm text-slate-500">{property.agent}</td>
      <td className="px-4 py-3 text-sm text-slate-500">{property.listedAt}</td>
    </tr>
  );
}

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("전체");
  const [filterDeal, setFilterDeal] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const propertyTypes = ["전체", "아파트", "오피스텔", "빌라", "상가", "단독주택"];
  const dealTypes = ["전체", "매매", "전세", "월세"];
  const statuses = ["전체", "매물등록", "계약진행", "계약완료", "매물취소", "대기"];

  const filtered = properties.filter((p) => {
    if (search && !p.title.includes(search) && !p.address.includes(search)) return false;
    if (filterType !== "전체" && p.type !== filterType) return false;
    if (filterDeal !== "전체" && p.dealType !== filterDeal) return false;
    if (filterStatus !== "전체" && p.status !== filterStatus) return false;
    return true;
  });

  return (
    <DashboardLayout title="매물 관리" subtitle="등록된 매물을 관리합니다">
      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "전체 매물", value: properties.length, color: "text-slate-800" },
          { label: "등록 중", value: properties.filter((p) => p.status === "매물등록").length, color: "text-emerald-600" },
          { label: "계약 진행", value: properties.filter((p) => p.status === "계약진행").length, color: "text-brand-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-5 py-4 text-center">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}건</p>
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
              placeholder="매물명, 주소 검색..."
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
              {propertyTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
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
          </div>

          <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm transition-colors ${viewMode === "grid" ? "bg-brand-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              카드
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 text-sm transition-colors ${viewMode === "table" ? "bg-brand-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}
            >
              목록
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition-colors">
            <Plus size={15} />
            매물 등록
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-3">총 <strong className="text-slate-800">{filtered.length}건</strong> 검색됨</p>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["매물명", "유형", "가격", "면적", "층", "상태", "담당자", "등록일"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => <PropertyRow key={p.id} property={p} />)}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <SlidersHorizontal size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">조건에 맞는 매물이 없습니다.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
