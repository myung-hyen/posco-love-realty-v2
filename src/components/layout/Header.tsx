"use client";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export default function Header({ title, subtitle, onMenuClick }: HeaderProps) {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* 햄버거 버튼 (모바일만) */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-slate-500 hidden lg:block">{today}</p>
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="검색..."
            className="pl-9 pr-4 py-1.5 text-sm bg-slate-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-brand-500 w-48"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
            권
          </div>
          <span className="text-sm font-medium text-slate-700 hidden md:block">권옥자</span>
          <ChevronDown size={14} className="text-slate-500 hidden md:block" />
        </button>
      </div>
    </header>
  );
}
