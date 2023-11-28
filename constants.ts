import { Code, ImageIcon, MessageSquare, MessageSquarePlus, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 30; 

export const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Code',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: '/code',
  },
  {
    label: 'Image',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: '/image',
  },
  // {
  //   label: 'Video',
  //   icon: VideoIcon,
  //   color: "text-orange-700",
  //   bgColor: "bg-orange-700/10",
  //   href: '/video',
  // },
  // {
  //   label: 'Music',
  //   icon: Music,
  //   href: '/music',
  //   color: "text-emerald-500",
  //   bgColor: "bg-emerald-500/10",
  // },
  {
    label: 'VoiceChat(developing...)',
    icon: MessageSquarePlus,
    href: '/voicechat',
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
];
