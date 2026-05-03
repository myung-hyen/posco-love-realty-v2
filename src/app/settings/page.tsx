"use client";

import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { agents as defaultAgents } from "@/lib/data";
import {
  User, Bell, Shield, Building2, Palette, Database,
  X, Plus, Trash2, Pencil, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ───────────────────────────────────────────
// Types
// ───────────────────────────────────────────
interface Agent {
  id: string;
  name: string;
  title: string;
  role: "대표" | "공인중개사" | "사무장" | "인턴";
  active: boolean;
  properties: number;
  transactions: number;
  commission: number;
}

const STORAGE_KEY = "posco_agents_v1";

const initialAgents: Agent[] = defaultAgents.map((a, i) => ({
  id: String(i + 1),
  name: a.name,
  title: i === 0 ? "대표 공인중개사" : "공인중개사",
  role: i === 0 ? "대표" : "공인중개사",
  active: true,
  properties: a.properties,
  transactions: a.transactions,
  commission: a.commission,
}));

// ───────────────────────────────────────────
// Sub-components
// ───────────────────────────────────────────
function SettingSection({
  title, icon: Icon, children,
}: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Icon size={18} className="text-brand-500" />
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function SettingRow({
  label, sublabel, children,
}: { label: string; sublabel?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        {sublabel && <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        checked ? "bg-brand-500" : "bg-slate-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

// ───────────────────────────────────────────
// Modals
// ───────────────────────────────────────────
interface EditModalProps {
  agent: Agent;
  onSave: (updated: Pick<Agent, "name" | "title" | "role">) => void;
  onClose: () => void;
}

function EditModal({ agent, onSave, onClose }: EditModalProps) {
  const [name, setName] = useState(agent.name);
  const [title, setTitle] = useState(agent.title);
  const [role, setRole] = useState(agent.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;
    onSave({ name: name.trim(), title: title.trim(), role });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">직원 정보 수정</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">직책</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">권한</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Agent["role"])}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="대표">대표</option>
              <option value="공인중개사">공인중개사</option>
              <option value="사무장">사무장</option>
              <option value="인턴">인턴</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface AddModalProps {
  onSave: (agent: Omit<Agent, "id" | "properties" | "transactions" | "commission">) => void;
  onClose: () => void;
}

function AddModal({ onSave, onClose }: AddModalProps) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState<Agent["role"]>("공인중개사");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;
    onSave({ name: name.trim(), title: title.trim(), role, active: true });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800">직원 추가</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X size={18} className="text-slate-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">이름 <span className="text-red-500">*</span></label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">직책 <span className="text-red-500">*</span></label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공인중개사"
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1.5">권한</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Agent["role"])}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="대표">대표</option>
              <option value="공인중개사">공인중개사</option>
              <option value="사무장">사무장</option>
              <option value="인턴">인턴</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────
// Toast
// ───────────────────────────────────────────
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-800 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg">
      <Check size={15} className="text-emerald-400" />
      {message}
    </div>
  );
}

// ───────────────────────────────────────────
// Main Page
// ───────────────────────────────────────────
const ROLE_BADGE: Record<Agent["role"], string> = {
  대표: "bg-amber-100 text-amber-700",
  공인중개사: "bg-brand-100 text-brand-700",
  사무장: "bg-violet-100 text-violet-700",
  인턴: "bg-slate-100 text-slate-600",
};

export default function SettingsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [editTarget, setEditTarget] = useState<Agent | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setAgents(stored ? JSON.parse(stored) : initialAgents);
    } catch {
      setAgents(initialAgents);
    }
  }, []);

  const save = useCallback((updated: Agent[]) => {
    setAgents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const showToast = (msg: string) => setToast(msg);

  const toggleActive = (id: string) => {
    const updated = agents.map((a) =>
      a.id === id ? { ...a, active: !a.active } : a
    );
    save(updated);
    const agent = updated.find((a) => a.id === id)!;
    showToast(`${agent.name} 계정이 ${agent.active ? "활성화" : "비활성화"}되었습니다.`);
  };

  const handleEdit = (data: Pick<Agent, "name" | "title" | "role">) => {
    if (!editTarget) return;
    const updated = agents.map((a) =>
      a.id === editTarget.id ? { ...a, ...data } : a
    );
    save(updated);
    setEditTarget(null);
    showToast("직원 정보가 수정되었습니다.");
  };

  const handleAdd = (data: Omit<Agent, "id" | "properties" | "transactions" | "commission">) => {
    const newAgent: Agent = {
      ...data,
      id: Date.now().toString(),
      properties: 0,
      transactions: 0,
      commission: 0,
    };
    save([...agents, newAgent]);
    setShowAdd(false);
    showToast(`${newAgent.name} 직원이 추가되었습니다.`);
  };

  const handleDelete = (id: string) => {
    const agent = agents.find((a) => a.id === id)!;
    const updated = agents.filter((a) => a.id !== id);
    save(updated);
    setDeleteId(null);
    showToast(`${agent.name} 직원이 삭제되었습니다.`);
  };

  return (
    <DashboardLayout title="설정" subtitle="시스템 환경 설정">
      <div className="max-w-3xl">

        {/* Agency Info */}
        <SettingSection title="업체 정보" icon={Building2}>
          <SettingRow label="업체명" sublabel="공인중개사무소 상호명">
            <input defaultValue="포스코사랑공인중개사" className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </SettingRow>
          <SettingRow label="등록번호" sublabel="공인중개사 등록 번호">
            <input defaultValue="중구-1609" className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </SettingRow>
          <SettingRow label="사무소 주소" sublabel="대전 중구 목동">
            <input defaultValue="대전 중구 목동로 22번길 16" className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </SettingRow>
          <SettingRow label="대표 전화" sublabel="사무소 연락처">
            <input defaultValue="042-223-2300" className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </SettingRow>
        </SettingSection>

        {/* Account Management */}
        <SettingSection title="계정 관리" icon={User}>
          <div className="divide-y divide-slate-50">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-opacity",
                    agent.active ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-400"
                  )}>
                    {agent.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={cn("text-sm font-medium", agent.active ? "text-slate-800" : "text-slate-400 line-through")}>
                        {agent.name}
                      </p>
                      <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", ROLE_BADGE[agent.role])}>
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{agent.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("text-xs font-medium", agent.active ? "text-emerald-600" : "text-slate-400")}>
                      {agent.active ? "활성" : "비활성"}
                    </span>
                    <Toggle checked={agent.active} onChange={() => toggleActive(agent.id)} />
                  </div>
                  <button
                    onClick={() => setEditTarget(agent)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-brand-600 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    <Pencil size={12} />
                    수정
                  </button>
                  <button
                    onClick={() => setDeleteId(agent.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={12} />
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="mt-3 w-full py-2 text-sm text-brand-600 border border-brand-200 border-dashed rounded-lg hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={15} />
            직원 추가
          </button>
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="알림 설정" icon={Bell}>
          {[
            { label: "계약 체결 알림", sublabel: "새로운 계약 체결 시 알림", defaultChecked: true },
            { label: "일정 리마인더", sublabel: "상담 1시간 전 알림", defaultChecked: true },
            { label: "매물 문의 알림", sublabel: "매물 신규 문의 시 알림", defaultChecked: true },
            { label: "이메일 알림", sublabel: "주간 실적 이메일 발송", defaultChecked: false },
          ].map((n) => {
            const [checked, setChecked] = useState(n.defaultChecked);
            return (
              <SettingRow key={n.label} label={n.label} sublabel={n.sublabel}>
                <Toggle checked={checked} onChange={setChecked} />
              </SettingRow>
            );
          })}
        </SettingSection>

        {/* Security */}
        <SettingSection title="보안 설정" icon={Shield}>
          <SettingRow label="비밀번호 변경" sublabel="마지막 변경: 2026-01-15">
            <button className="text-sm text-brand-600 border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50">변경</button>
          </SettingRow>
          <SettingRow label="2단계 인증" sublabel="로그인 시 추가 인증 요구">
            {(() => {
              const [checked, setChecked] = useState(false);
              return <Toggle checked={checked} onChange={setChecked} />;
            })()}
          </SettingRow>
          <SettingRow label="세션 타임아웃" sublabel="비활성 후 자동 로그아웃">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>30분</option><option>1시간</option><option>2시간</option><option>4시간</option>
            </select>
          </SettingRow>
        </SettingSection>

        {/* Data */}
        <SettingSection title="데이터 관리" icon={Database}>
          <SettingRow label="데이터 백업" sublabel="마지막 백업: 2026-05-01 03:00">
            <button
              onClick={() => showToast("백업이 완료되었습니다.")}
              className="text-sm text-brand-600 border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50"
            >
              지금 백업
            </button>
          </SettingRow>
          <SettingRow label="데이터 내보내기" sublabel="거래 내역 및 고객 정보 CSV">
            <button
              onClick={() => showToast("데이터 내보내기가 시작되었습니다.")}
              className="text-sm text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              내보내기
            </button>
          </SettingRow>
        </SettingSection>

        {/* Appearance */}
        <SettingSection title="화면 설정" icon={Palette}>
          <SettingRow label="테마" sublabel="화면 색상 모드">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>라이트 모드</option><option>다크 모드</option><option>시스템 설정</option>
            </select>
          </SettingRow>
          <SettingRow label="언어" sublabel="시스템 표시 언어">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>한국어</option><option>English</option>
            </select>
          </SettingRow>
        </SettingSection>

        <div className="flex justify-end gap-3">
          <button className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">취소</button>
          <button
            onClick={() => showToast("설정이 저장되었습니다.")}
            className="px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
          >
            저장하기
          </button>
        </div>
      </div>

      {/* Modals */}
      {editTarget && (
        <EditModal
          agent={editTarget}
          onSave={handleEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
      {showAdd && (
        <AddModal
          onSave={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (() => {
        const target = agents.find((a) => a.id === deleteId)!;
        return (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 size={22} className="text-red-500" />
              </div>
              <h3 className="text-center font-semibold text-slate-800 mb-1">직원 삭제</h3>
              <p className="text-center text-sm text-slate-500 mb-6">
                <strong>{target?.name}</strong> 직원을 삭제하시겠습니까?<br />이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  취소
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </DashboardLayout>
  );
}
