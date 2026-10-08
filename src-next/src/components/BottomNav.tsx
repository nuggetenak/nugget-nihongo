"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PenTool, Sparkles, BarChart2, Settings } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/materi", label: "Materi", icon: BookOpen },
    { href: "/quiz", label: "Latihan", icon: PenTool },
    { href: "/sensei", label: "Sensei", icon: Sparkles, isSpecial: true },
    { href: "/progress", label: "Progress", icon: BarChart2 },
    { href: "/settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-md z-50 glass-panel p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/10">
      <div className="flex justify-between items-center px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isSpecial) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center group py-1 px-2"
              >
                <div
                  className={`w-10 h-10 -mt-5 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-gradient-to-tr from-nugget-gold to-nugget-amber text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-110"
                      : "bg-surface-200 border border-nugget-amber/40 text-nugget-amber shadow-[0_0_12px_rgba(251,191,36,0.2)] hover:scale-105"
                  }`}
                >
                  <Sparkles className="w-5 h-5 fill-current animate-pulse" />
                </div>
                <span
                  className={`text-[10px] mt-1 font-bold tracking-tight transition-colors ${
                    isActive ? "text-nugget-amber" : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? "text-nugget-amber"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-nugget-amber rounded-full mt-0.5"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
