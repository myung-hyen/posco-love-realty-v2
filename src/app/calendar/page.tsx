"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { appointments, Appointment } from "@/lib/data";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  Home,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  "매물 상담":  "bg-brand-500",
  "현장 방문":  "bg-emerald-500",
  "계약 체결":  "bg-amber-500",
  "서류 접수":  "bg-sky-500",
  "기타":       "bg-slate-400",
};

const typeBgColors: Record<string, string> = {
  "매물 상담":  "border-l-brand-500 bg-brand-50",
  "현장 방문":  "border-l-emerald-500 bg-emerald-50",
  "계약 체결":  "border-l-amber-500 bg-amber-50",
  "서류 접수":  "border-l-sky-500 bg-sky-50",
  "기타":       "border-l-slate-400 bg-slate-50",
};

const statusVariant: Record<string, "success" | "warning" | "danger" | "info"> = {
  예정: "info",
  완료: "success",
  취소: "danger",
};

const DAYS_KR = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS_KR = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface AppointmentCardProps {
  apt: Appointment;
  compact?: boolean;
}

function AppointmentCard({ apt, compact }: AppointmentCardProps) {
  if (compact) {
    return (
      <div className={`flex items-center gap-1 px-1 py-0.5 rounded text-xs cursor-pointer mb-0.5`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${typeColors[apt.type] || "bg-slate-400"}`} />
        <span className="truncate text-slate-700">{apt.time} {apt.clientName}</span>
      </div>
    );
  }

  return (
    <div className={cn("border-l-4 rounded-lg p-4 hover:shadow-sm transition-shadow", typeBgColors[apt.type] || "border-l-slate-400 bg-slate-50")}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-slate-800 text-sm">{apt.title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{apt.date} {apt.time} ({apt.duration}분)</p>
        </div>
        <Badge variant={statusVariant[apt.status]}>{apt.status}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <User size={11} className="text-slate-400" />
          {apt.clientName}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <User size={11} className="text-slate-400" />
          담당: {apt.agent}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600 col-span-2">
          <Home size={11} className="text-slate-400" />
          {apt.propertyTitle}
        </div>
        {apt.memo && (
          <div className="col-span-2 text-xs text-slate-500 mt-1 pt-1 border-t border-slate-200">
            {apt.memo}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const today = new Date(2026, 4, 2); // 2026-05-02
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>("2026-05-02");
  const [filterAgent, setFilterAgent] = useState("전체");
  const [filterType, setFilterType] = useState("전체");

  const agentList = ["전체", "김철수", "이영희", "박민준"];
  const typeList = ["전체", "매물 상담", "현장 방문", "계약 체결", "서류 접수", "기타"];

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentYear(currentYear - 1); setCurrentMonth(11); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentYear(currentYear + 1); setCurrentMonth(0); }
    else setCurrentMonth(currentMonth + 1);
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const getDateStr = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const getAptsByDate = (dateStr: string) =>
    appointments.filter((a) => a.date === dateStr);

  const filteredApts = appointments.filter((a) => {
    if (filterAgent !== "전체" && a.agent !== filterAgent) return false;
    if (filterType !== "전체" && a.type !== filterType) return false;
    return true;
  });

  const selectedApts = filteredApts.filter((a) => a.date === selectedDate);

  const upcomingApts = filteredApts
    .filter((a) => a.status === "예정")
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  return (
    <DashboardLayout title="일정 관리" subtitle="상담 및 업무 일정을 관리합니다">
      <div className="flex gap-5">
        {/* Calendar */}
        <div className="flex-1 min-w-0">
          {/* Calendar Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-slate-800">
                  {currentYear}년 {MONTHS_KR[currentMonth]}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 mr-2">
                  <select
                    value={filterAgent}
                    onChange={(e) => setFilterAgent(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {agentList.map((a) => <option key={a}>{a}</option>)}
                  </select>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {typeList.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                >
                  <ChevronRight size={16} />
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600">
                  <Plus size={14} />
                  일정 추가
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS_KR.map((d, i) => (
                <div
                  key={d}
                  className={cn(
                    "text-center text-xs font-semibold py-1",
                    i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-slate-500"
                  )}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-slate-50 min-h-[90px] p-1" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const dateStr = getDateStr(day);
                const dayApts = getAptsByDate(dateStr);
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;
                const dayOfWeek = (firstDay + day - 1) % 7;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                      "bg-white min-h-[90px] p-1.5 cursor-pointer hover:bg-brand-50 transition-colors",
                      isSelected && "ring-2 ring-inset ring-brand-400 bg-brand-50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={cn(
                          "w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium",
                          isToday && "bg-brand-500 text-white",
                          !isToday && dayOfWeek === 0 && "text-red-500",
                          !isToday && dayOfWeek === 6 && "text-blue-500",
                          !isToday && dayOfWeek > 0 && dayOfWeek < 6 && "text-slate-700"
                        )}
                      >
                        {day}
                      </span>
                      {dayApts.length > 0 && (
                        <span className="text-xs text-slate-400">{dayApts.length}</span>
                      )}
                    </div>
                    <div>
                      {dayApts.slice(0, 2).map((apt) => (
                        <AppointmentCard key={apt.id} apt={apt} compact />
                      ))}
                      {dayApts.length > 2 && (
                        <p className="text-xs text-slate-400 pl-1">+{dayApts.length - 2}건</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-xs text-slate-500">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-72 shrink-0 space-y-4">
          {/* Selected Date Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={16} className="text-brand-500" />
              <h3 className="font-semibold text-slate-800 text-sm">{selectedDate} 일정</h3>
            </div>
            {selectedApts.length === 0 ? (
              <div className="text-center py-6 text-slate-400">
                <Clock size={28} className="mx-auto mb-2 opacity-40" />
                <p className="text-xs">이 날짜에 일정이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedApts
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((apt) => <AppointmentCard key={apt.id} apt={apt} />)}
              </div>
            )}
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-800 text-sm mb-3">다가오는 일정</h3>
            <div className="space-y-2">
              {upcomingApts.slice(0, 5).map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-start gap-2 py-2 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50 -mx-1 px-1 rounded"
                  onClick={() => setSelectedDate(apt.date)}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${typeColors[apt.type] || "bg-slate-400"}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">{apt.title}</p>
                    <p className="text-xs text-slate-500">{apt.date} {apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
