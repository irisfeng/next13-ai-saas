import { BookMarked, ImageIcon, MessageSquare, MessageSquarePlus, Pen } from "lucide-react";

export const MAX_FREE_COUNTS = 10;

export const tools = [
  {
    label: '聊天对话',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: '精简互译',
    icon: BookMarked,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/translation',
  },
  {
    label: '图片生成',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: '写作助手',
    icon: Pen,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/writing',
  },
  // {
  //   label: 'Music',
  //   icon: Music,
  //   href: '/music',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  // {
  //   label: '语音对话(开发中...)',
  //   icon: MessageSquarePlus,
  //   href: '/voicechat',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
];
