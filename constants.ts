import { BookMarked, ImageIcon, MessageSquare, ImagePlusIcon, Pen } from "lucide-react";

export const MAX_FREE_COUNTS = 10;
export const GPT3_FREE_COUNTS = 20;

export const imageModels = {
  sdxl: 'sdxl',
  sd2: 'sd2',
}

export const modelParameters = {
  sd2: "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
  sdxl: "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
  // 添加其他模型和参数...
};

export const tools = [
  {
    label: '聊天对话',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: '中英互译',
    icon: BookMarked,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/translation',
  },
  {
    label: '文生成图',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  {
    label: '总结能手',
    icon: Pen,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: '/writing',
  },
  {
    label: '人像修复',
    icon: ImagePlusIcon,
    color: "text-blue-700",
    bgcolor: "bg-blue-700/10",
    href: '/restorepics',
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
