"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, Users, Receipt,
  CalendarDays, BarChart3, Settings, LogOut, Home, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",    label: "대시보드", icon: LayoutDashboard },
  { href: "/properties",   label: "매물 관리", icon: Building2 },
  { href: "/clients",      label: "고객 관리", icon: Users },
  { href: "/transactions", label: "거래 내역", icon: Receipt },
  { href: "/calendar",     label: "일정 관리", icon: CalendarDays },
  { href: "/reports",      label: "보고서",    icon: BarChart3 },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const settingsActive = pathname === "/settings" || pathname.startsWith("/settings/");

  return (
    <>
      {/* 모바일 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-screen w-60 bg-brand-900 text-white flex flex-col z-40 transition-transform duration-300",
        "md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-brand-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 bg-brand-500 rounded-lg">
              <Home size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">포스코사랑</p>
              <p className="text-xs text-brand-300 leading-tight">공인중개사</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden p-1 rounded-lg hover:bg-brand-800">
            <X size={18} className="text-brand-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-brand-500 text-white"
                  : "text-brand-300 hover:bg-brand-800 hover:text-white"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-brand-700 space-y-0.5">
          <Link
            href="/settings"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              settingsActive
                ? "bg-brand-500 text-white"
                : "text-brand-300 hover:bg-brand-800 hover:text-white"
            )}
          >
            <Settings size={18} />
            설정
          </Link>
          <button
            onClick={() => {
              if (confirm("로그아웃 하시겠습니까?")) {
                window.location.href = "/dashboard";
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brand-300 hover:bg-brand-800 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            로그아웃
          </button>
        </div>
      </aside>
    </>
  );
}
