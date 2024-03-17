"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { 
  BookMarked, 
  ImageIcon, 
  Home, 
  MessageSquare, 
  Settings, 
  Pen,
  ImagePlusIcon,
  Heading1
} from "lucide-react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";
import { Badge } from "./ui/badge";

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
  // {
  //   label: '中英互译',
  //   icon: BookMarked,
  //   color: "text-green-700",
  //   href: '/translation',
  // },
  {
    label: '提示助手',
    icon: Pen,
    color: "text-orange-700",
    href: '/writing',
  },
  {
    label: '文生成图',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
  },
  // {
  //   label: '人像修复',
  //   icon: ImagePlusIcon,
  //   color: "text-blue-700",
  //   href: '/restorepics',
  // },
  {
    label: '用户设置',
    icon: Settings,
    href: '/settings',
  },

];

interface SidebarProps {
  apiLimitCount: number;
  gpt3ApiLimitCount: number;
  isPro: boolean;
}

export  const Sidebar =  ({
  apiLimitCount = 0,
  gpt3ApiLimitCount = 0,
  isPro = false
}: SidebarProps) => {

  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-normal", poppins.className)}>
            PantheonAI
          </h1>
          <Badge variant="secondary" className="text-xs ml-2">Beta</Badge>
        </Link>
        <div className="space-y-1">
          {routes.map((route, index) => (
            <div className="group flex p-3 w-full justify-start items-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition">
              <Link
                key={route.href} 
                href={route.href}
                className={cn(
                  "text-sm flex flex-1 justify-between items-center",
                  pathname === route.href ? "text-white" : "text-zinc-400",
                )}
              >
                
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center">
                    <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
                    {route.label}
                  </div>
                  <div>
                    {(index === 1) && <Badge variant="premium" className="text-xs italic">Bravo</Badge>}
                    {(index === 2) && <Badge variant="premium" className="text-xs italic">Pro</Badge>}
                    {(index === 3) && <Badge variant="hot" className="text-xs italic">New!</Badge>}
                    {/* {(index === 4) && <Badge variant="hot" className="text-xs italic">New!</Badge>} */}
                    {/* {(index === 5) && <Badge variant="premium" className="text-xs">Pro</Badge>} */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <FreeCounter 
        gpt3ApiLimitCount={gpt3ApiLimitCount}
        apiLimitCount={apiLimitCount}
        isPro={isPro} 
      />

    </div>
  );
};