import { BookMarked, ImageIcon, MessageSquare, ImagePlusIcon, Pen } from "lucide-react";

export const MAX_FREE_COUNTS = 10;
export const GPT3_FREE_COUNTS = 20;

export const models = [
  {
    modelName: "sdxl",
    modelParameters: '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b'
  },
  {
    modelName: "sd2",    //stable-diffusion
    modelParameters: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4'
  },
];
  


export const tools = [
  {
    label: '聊天对话',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  // {
  //   label: '中英互译',
  //   icon: BookMarked,
  //   color: "text-green-700",
  //   bgColor: "bg-green-700/10",
  //   href: '/translation',
  // },
  {
    label: '提示助手',
    icon: Pen,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/writing',
  },
  {
    label: '文生成图',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },

  // {
  //   label: '人像修复',
  //   icon: ImagePlusIcon,
  //   color: "text-blue-700",
  //   bgcolor: "bg-blue-700/10",
  //   href: '/restorepics',
  // },
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
