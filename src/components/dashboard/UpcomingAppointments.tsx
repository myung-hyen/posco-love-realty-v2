import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { appointments } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const typeColor: Record<string, string> = {
  "매물 상담":  "bg-brand-500",
  "현장 방문":  "bg-emerald-500",
  "계약 체결":  "bg-amber-500",
  "서류 접수":  "bg-sky-500",
  "기타":       "bg-slate-400",
};

export default function UpcomingAppointments() {
  const upcoming = appointments.filter((a) => a.status === "예정").slice(0, 4);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">다가오는 일정</h3>
          <p className="text-xs text-slate-500 mt-0.5">예정된 상담 및 방문</p>
        </div>
        <Link
          href="/calendar"
          className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium"
        >
          전체 보기 <ArrowRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {upcoming.map((apt) => (
          <div key={apt.id} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
            <div
              className={cn("w-1 h-12 rounded-full shrink-0 mt-1", typeColor[apt.type] || "bg-slate-400")}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{apt.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock size={11} />
                  {apt.date} {apt.time}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <User size={11} />
                  {apt.clientName}
                </span>
              </div>
            </div>
            <Badge variant="info">{apt.type}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
