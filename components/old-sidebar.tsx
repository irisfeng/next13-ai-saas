"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { BookMarked, ImageIcon, Home, MessageSquare, MessageSquarePlus, Settings, Pen } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: '首页',
    icon: Home,
    href: '/dashboard',
    color: "text-sky-500",
  },
  {
    label: '聊天对话',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
  },
  {
    label: '精简互译',
    icon: BookMarked,
    color: "text-green-700",
    href: '/translation',
  },
  {
    label: '文生图',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
  },
  {
    label: '写作助手',
    icon: Pen,
    color: "text-orange-700",
    href: '/writing',
  },
  {
    label: '个人设定',
    icon: Settings,
    href: '/settings',
  },
];

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            PantheonAI
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route, index) => (
            <div className="flex justify-between items-center">
              <Link
                key={route.href} 
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
              {(index === 2 || index === 4) && <span className="text-xs bg-red-500 text-white py-1 px-2 rounded-full">New</span>}
            </div>
          ))}
        </div>
      </div>
      <FreeCounter 
        apiLimitCount={apiLimitCount} 
        isPro={isPro}
      />
    </div>
  );
};