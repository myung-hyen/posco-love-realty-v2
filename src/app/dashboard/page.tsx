import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import PropertyTypeChart from "@/components/dashboard/PropertyTypeChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import AgentPerformance from "@/components/dashboard/AgentPerformance";
import {
  Building2,
  TrendingUp,
  Users,
  Wallet,
  CalendarCheck,
  FileCheck,
} from "lucide-react";
import { properties, clients, transactions, appointments } from "@/lib/data";
import { formatKRW } from "@/lib/utils";

export default function DashboardPage() {
  const activeProperties = properties.filter((p) => p.status === "매물등록").length;
  const inProgressTx = transactions.filter((t) => t.status === "진행중").length;
  const completedTx = transactions.filter((t) => t.status === "완료");
  const totalCommission = completedTx.reduce((acc, t) => acc + t.commission, 0);
  const activeClients = clients.filter((c) => c.status !== "이탈" && c.status !== "계약완료").length;
  const upcomingApts = appointments.filter((a) => a.status === "예정").length;
  const completedTxCount = completedTx.length;

  return (
    <DashboardLayout
      title="대시보드"
      subtitle="포스코사랑공인중개사 업무 현황"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="등록 매물"
          value={`${activeProperties}건`}
          change="전월 대비 +2"
          changeType="up"
          icon={Building2}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="진행중 거래"
          value={`${inProgressTx}건`}
          icon={TrendingUp}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          subtitle="계약 진행 중"
        />
        <StatCard
          title="완료 거래"
          value={`${completedTxCount}건`}
          change="이달 누적"
          changeType="up"
          icon={FileCheck}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="수익 합계"
          value={formatKRW(totalCommission)}
          change="완료 거래 기준"
          changeType="neutral"
          icon={Wallet}
          iconColor="text-violet-600"
          iconBg="bg-violet-50"
        />
        <StatCard
          title="활성 고객"
          value={`${activeClients}명`}
          change="전월 대비 +3"
          changeType="up"
          icon={Users}
          iconColor="text-sky-600"
          iconBg="bg-sky-50"
        />
        <StatCard
          title="예정 일정"
          value={`${upcomingApts}건`}
          icon={CalendarCheck}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
          subtitle="이번 주"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <MonthlyChart />
        </div>
        <PropertyTypeChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="flex flex-col gap-4">
          <UpcomingAppointments />
          <AgentPerformance />
        </div>
      </div>
    </DashboardLayout>
  );
}
