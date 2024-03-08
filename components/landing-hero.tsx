"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Powerful AI SaaS</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "智能模型对话",
                "文生成图",
                "中英互译",
                "文章总结能手",
                "照片人像修复",
                "与文档聊天",
                "文本转语音",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
       更多好用功能持续更新中... 
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            免费开始使用
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required.
        {/* 无须信用卡，直接使用 */}
      </div>
    </div>
  );
};
