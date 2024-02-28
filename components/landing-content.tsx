"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "宋江",
    avatar: "J",
    title: "软件开发工程师",
    description: "打开网页就能用，太棒了！😁",
  },
  {
    name: "安东尼",
    avatar: "A",
    title: "设计师",
    description: "我每天用它生成图片，墙裂推荐！👍",
  },
  {
    name: "小马扎",
    avatar: "M",
    title: "CEO",
    description: "每天都用它，很难想象哪天用不了它了🤞",
  },
  {
    name: "玛丽",
    avatar: "M",
    title: "CFO",
    description: "高级订阅超值的，你值得拥有！太棒了💖",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">评价及反馈</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}