"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { properties as initialProperties, Property, PropertyType, DealType } from "@/lib/data";
import { formatKRW } from "@/lib/utils";
import {
  Search, Plus, MapPin, Home, Maximize2,
  Filter, Building2, SlidersHorizontal, X, ChevronRight,
} from "lucide-react";

const PROPERTY_TYPES: PropertyType[] = ["아파트", "오피스텔", "빌라", "상가", "단독주택"];
const DEAL_TYPES: DealType[] = ["매매", "전세", "월세"];
const STATUSES = ["매물등록", "계약진행", "계약완료", "매물취소", "대기"] as const;
type StatusType = typeof STATUSES[number];

const statusVariant: Record<string, "success" | "warning" | "danger" | "info" | "neutral"> = {
  매물등록: "success", 계약진행: "info", 계약완료: "neutral", 매물취소: "danger", 대기: "warning",
};
const dealTypeColor: Record<string, string> = {
  매매: "bg-brand-500", 전세: "bg-emerald-500", 월세: "bg-amber-500",
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
          <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded ${dealTypeColor[property.dealType]}`}>{property.dealType}</span>
          <span className="px-2 py-0.5 text-xs font-medium bg-white/90 text-slate-700 rounded">{property.type}</span>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={statusVariant[property.status] ?? "neutral"}>{property.status}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 text-sm mb-1 truncate">{property.title}</h3>
        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
          <MapPin size={11} /><span className="truncate">{property.address}</span>
        </div>
        <p className="text-lg font-bold text-brand-700 mb-3">{priceDisplay()}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1"><Maximize2 size={11} />{property.area}㎡</span>
          <span className="flex items-center gap-1"><Home size={11} />방 {property.rooms}개</span>
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
          <span className={`px-2 py-0.5 text-xs font-semibold text-white rounded ${dealTypeColor[property.dealType]}`}>{property.dealType}</span>
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
      <td className="px-4 py-3"><Badge variant={statusVariant[property.status] ?? "neutral"}>{property.status}</Badge></td>
      <td className="px-4 py-3 text-sm text-slate-500">{property.agent}</td>
      <td className="px-4 py-3 text-sm text-slate-500">{property.listedAt}</td>
    </tr>
  );
}

interface FormData {
  title: string; type: PropertyType; dealType: DealType; status: StatusType;
  address: string; price: string; deposit: string; monthly: string;
  area: string; rooms: string; floor: string; agent: string; memo: string;
}

const DEFAULT_FORM: FormData = {
  title: "", type: "아파트", dealType: "매매", status: "매물등록",
  address: "", price: "", deposit: "", monthly: "",
  area: "", rooms: "", floor: "", agent: "", memo: "",
};

const STEPS = ["기본 정보", "가격 정보", "상세 정보"];

function PropertyModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (f: FormData) => void }) {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (key: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const err: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.title.trim()) err.title = "매물명을 입력하세요";
      if (!form.address.trim()) err.address = "주소를 입력하세요";
    }
    if (step === 1) {
      if (form.dealType === "월세") {
        if (!form.deposit) err.deposit = "보증금을 입력하세요";
        if (!form.monthly) err.monthly = "월세를 입력하세요";
      } else {
        if (!form.price) err.price = "가격을 입력하세요";
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };
  const submit = () => { if (validate()) onSubmit(form); };

  const cls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-colors";
  const lbl = "block text-xs font-medium text-slate-600 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-800">매물 등록</h2>
            <p className="text-xs text-slate-400 mt-0.5">새로운 매물 정보를 입력하세요</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
        </div>

        <div className="flex items-center px-6 py-3 bg-slate-50 border-b border-slate-100">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${i < step ? "bg-brand-500 text-white" : i === step ? "bg-brand-500 text-white ring-4 ring-brand-100" : "bg-slate-200 text-slate-400"}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium ${i === step ? "text-brand-600" : i < step ? "text-slate-500" : "text-slate-300"}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="mx-2 text-slate-300" />}
            </div>
          ))}
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[55vh] overflow-y-auto">
          {step === 0 && (
            <>
              <div>
                <label className={lbl}>매물명 *</label>
                <input className={cls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="예: 포스코더샵 102동 1502호" />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>거래 유형</label>
                  <select className={cls} value={form.dealType} onChange={(e) => set("dealType", e.target.value as DealType)}>
                    {DEAL_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>매물 유형</label>
                  <select className={cls} value={form.type} onChange={(e) => set("type", e.target.value as PropertyType)}>
                    {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={lbl}>주소 *</label>
                <input className={cls} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="예: 경북 포항시 남구 지곡동 394" />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className={lbl}>상태</label>
                <select className={cls} value={form.status} onChange={(e) => set("status", e.target.value as StatusType)}>
                  {STATUSES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              {form.dealType === "월세" ? (
                <>
                  <div>
                    <label className={lbl}>보증금 (만원) *</label>
                    <input className={cls} type="number" value={form.deposit} onChange={(e) => set("deposit", e.target.value)} placeholder="예: 1000" />
                    {errors.deposit && <p className="text-xs text-red-500 mt-1">{errors.deposit}</p>}
                  </div>
                  <div>
                    <label className={lbl}>월세 (원) *</label>
                    <input className={cls} type="number" value={form.monthly} onChange={(e) => set("monthly", e.target.value)} placeholder="예: 550000" />
                    {errors.monthly && <p className="text-xs text-red-500 mt-1">{errors.monthly}</p>}
                  </div>
                </>
              ) : (
                <div>
                  <label className={lbl}>{form.dealType === "매매" ? "매매가" : "전세가"} (만원) *</label>
                  <input className={cls} type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="예: 65000" />
                  {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                  {form.price && <p className="text-xs text-slate-400 mt-1">= {Number(form.price).toLocaleString()}만원</p>}
                </div>
              )}
              {(form.price || form.deposit) && (
                <div className="bg-brand-50 rounded-lg px-4 py-3 border border-brand-100">
                  <p className="text-xs text-brand-500 font-medium mb-1">입력된 가격</p>
                  <p className="text-lg font-bold text-brand-700">
                    {form.dealType === "월세"
                      ? `${Number(form.deposit).toLocaleString()}만원 / ${Number(form.monthly).toLocaleString()}원`
                      : `${Number(form.price).toLocaleString()}만원`}
                  </p>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={lbl}>면적 (㎡)</label>
                  <input className={cls} type="number" value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="84.9" />
                </div>
                <div>
                  <label className={lbl}>방 개수</label>
                  <input className={cls} type="number" value={form.rooms} onChange={(e) => set("rooms", e.target.value)} placeholder="3" />
                </div>
                <div>
                  <label className={lbl}>층</label>
                  <input className={cls} value={form.floor} onChange={(e) => set("floor", e.target.value)} placeholder="15층" />
                </div>
              </div>
              <div>
                <label className={lbl}>담당자</label>
                <input className={cls} value={form.agent} onChange={(e) => set("agent", e.target.value)} placeholder="담당자 이름" />
              </div>
              <div>
                <label className={lbl}>메모</label>
                <textarea className={`${cls} resize-none`} rows={3} value={form.memo} onChange={(e) => set("memo", e.target.value)} placeholder="특이사항, 추가 정보 등..." />
              </div>
              <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200 space-y-1.5">
                <p className="text-xs font-semibold text-slate-600 mb-2">등록 정보 확인</p>
                {([
                  ["매물명", form.title],
                  ["거래/유형", `${form.dealType} · ${form.type}`],
                  ["주소", form.address],
                  ["가격", form.dealType === "월세"
                    ? `${Number(form.deposit).toLocaleString()}만원 / ${Number(form.monthly).toLocaleString()}원`
                    : `${Number(form.price).toLocaleString()}만원`],
                  ["상태", form.status],
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-slate-700 font-medium">{value || "-"}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} className="flex-1 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-white transition-colors">
              이전
            </button>
          )}
          <button onClick={step < STEPS.length - 1 ? next : submit}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
            {step < STEPS.length - 1 ? "다음" : "✓ 매물 등록 완료"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  const [list, setList] = useState<Property[]>(initialProperties);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("전체");
  const [filterDeal, setFilterDeal] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = list.filter((p) => {
    if (search && !p.title.includes(search) && !p.address.includes(search)) return false;
    if (filterType !== "전체" && p.type !== filterType) return false;
    if (filterDeal !== "전체" && p.dealType !== filterDeal) return false;
    if (filterStatus !== "전체" && p.status !== filterStatus) return false;
    return true;
  });

  const handleSubmit = (form: FormData) => {
    const today = new Date().toISOString().slice(0, 10);
    const newProp: Property = {
      id: `prop-${Date.now()}`,
      title: form.title,
      type: form.type,
      dealType: form.dealType,
      status: form.status,
      address: form.address,
      district: "",
      price: form.dealType !== "월세" ? Number(form.price) * 10000 : 0,
      deposit: form.deposit ? Number(form.deposit) * 10000 : undefined,
      monthly: form.monthly ? Number(form.monthly) : undefined,
      area: form.area ? Number(form.area) : 0,
      rooms: form.rooms ? Number(form.rooms) : 0,
      bathrooms: 1,
      floor: form.floor || "",
      agent: form.agent || "미지정",
      listedAt: today,
      images: [],
      description: form.memo || "",
    };
    setList((prev) => [newProp, ...prev]);
    setShowModal(false);
    setToast(`"${form.title}" 매물이 등록되었습니다.`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <DashboardLayout title="매물 관리" subtitle="등록된 매물을 관리합니다">
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <span>✓</span>{toast}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "전체 매물", value: list.length, color: "text-slate-800" },
          { label: "등록 중", value: list.filter((p) => p.status === "매물등록").length, color: "text-emerald-600" },
          { label: "계약 진행", value: list.filter((p) => p.status === "계약진행").length, color: "text-brand-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-5 py-4 text-center">
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}건</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="매물명, 주소 검색..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              {["전체", ...PROPERTY_TYPES].map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={filterDeal} onChange={(e) => setFilterDeal(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              {["전체", ...DEAL_TYPES].map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
              {["전체", ...STATUSES].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm transition-colors ${viewMode === "grid" ? "bg-brand-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>카드</button>
            <button onClick={() => setViewMode("table")}
              className={`px-3 py-2 text-sm transition-colors ${viewMode === "table" ? "bg-brand-500 text-white" : "text-slate-500 hover:bg-slate-50"}`}>목록</button>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition-colors">
            <Plus size={15} />매물 등록
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
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
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

      {showModal && <PropertyModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}
    </DashboardLayout>
  );
}
