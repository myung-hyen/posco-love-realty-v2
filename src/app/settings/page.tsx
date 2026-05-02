import DashboardLayout from "@/components/layout/DashboardLayout";
import { agents } from "@/lib/data";
import { User, Bell, Shield, Building2, Palette, Database } from "lucide-react";

function SettingSection({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
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

function SettingRow({ label, sublabel, children }: { label: string; sublabel?: string; children?: React.ReactNode }) {
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

export default function SettingsPage() {
  return (
    <DashboardLayout title="설정" subtitle="시스템 환경 설정">
      <div className="max-w-3xl">
        {/* Agency Info */}
        <SettingSection title="업체 정보" icon={Building2}>
          <SettingRow label="업체명" sublabel="공인중개사무소 상호명">
            <input
              defaultValue="포스코사랑공인중개사"
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </SettingRow>
          <SettingRow label="등록번호" sublabel="공인중개사 등록 번호">
            <input
              defaultValue="2024-경북포항-0012"
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </SettingRow>
          <SettingRow label="사무소 주소" sublabel="포항시 남구 지곡동">
            <input
              defaultValue="경북 포항시 남구 지곡동 394"
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </SettingRow>
          <SettingRow label="대표 전화" sublabel="사무소 연락처">
            <input
              defaultValue="054-279-1234"
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </SettingRow>
        </SettingSection>

        {/* Account */}
        <SettingSection title="계정 관리" icon={User}>
          <div className="space-y-1">
            {agents.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-sm">
                    {agent.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{agent.name}</p>
                    <p className="text-xs text-slate-400">공인중개사</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full font-medium">활성</span>
                  <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">수정</button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full py-2 text-sm text-brand-600 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors">
            + 직원 추가
          </button>
        </SettingSection>

        {/* Notifications */}
        <SettingSection title="알림 설정" icon={Bell}>
          {[
            { label: "계약 체결 알림", sublabel: "새로운 계약 체결 시 알림" },
            { label: "일정 리마인더", sublabel: "상담 1시간 전 알림" },
            { label: "매물 문의 알림", sublabel: "매물 신규 문의 시 알림" },
            { label: "이메일 알림", sublabel: "주간 실적 이메일 발송" },
          ].map((n) => (
            <SettingRow key={n.label} label={n.label} sublabel={n.sublabel}>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-brand-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </SettingRow>
          ))}
        </SettingSection>

        {/* Security */}
        <SettingSection title="보안 설정" icon={Shield}>
          <SettingRow label="비밀번호 변경" sublabel="마지막 변경: 2026-01-15">
            <button className="text-sm text-brand-600 border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50">
              변경
            </button>
          </SettingRow>
          <SettingRow label="2단계 인증" sublabel="로그인 시 추가 인증 요구">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-brand-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
            </label>
          </SettingRow>
          <SettingRow label="세션 타임아웃" sublabel="비활성 후 자동 로그아웃">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>30분</option>
              <option>1시간</option>
              <option>2시간</option>
              <option>4시간</option>
            </select>
          </SettingRow>
        </SettingSection>

        {/* Data */}
        <SettingSection title="데이터 관리" icon={Database}>
          <SettingRow label="데이터 백업" sublabel="마지막 백업: 2026-05-01 03:00">
            <button className="text-sm text-brand-600 border border-brand-200 px-3 py-1.5 rounded-lg hover:bg-brand-50">
              지금 백업
            </button>
          </SettingRow>
          <SettingRow label="데이터 내보내기" sublabel="거래 내역 및 고객 정보 CSV">
            <button className="text-sm text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              내보내기
            </button>
          </SettingRow>
        </SettingSection>

        {/* Appearance */}
        <SettingSection title="화면 설정" icon={Palette}>
          <SettingRow label="테마" sublabel="화면 색상 모드">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>라이트 모드</option>
              <option>다크 모드</option>
              <option>시스템 설정</option>
            </select>
          </SettingRow>
          <SettingRow label="언어" sublabel="시스템 표시 언어">
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
              <option>한국어</option>
              <option>English</option>
            </select>
          </SettingRow>
        </SettingSection>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button className="px-5 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">
            취소
          </button>
          <button className="px-5 py-2.5 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors">
            저장하기
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
