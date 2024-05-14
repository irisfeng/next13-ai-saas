"use client";

import { useChat } from 'ai/react';
import { Message } from 'ai';
import ReactMarkdown from "react-markdown";
// import * as z from "zod";
import { MessageSquare, Send } from "lucide-react";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
// import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from 'next/navigation';

export default function ConversationPage() {
  
  const router = useRouter();
  // const proModal = useProModal();

  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit,
    } = useChat({
      api: '/api/conversation',
      onFinish: () => {
        router.refresh();
      }
    });
    
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className=" w-full max-w-3xl lg:max-w-5xl p-4 lg:p-24 flex flex-col">
        <Heading 
          title="聊天对话"
          description="快速稳定 "
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
          showBadge={1}
          badgeText='GPT-4o驱动'
        />
        
        <div className='flex flex-col gap-y-4 bg-white rounded-lg p-4 w-full lg:max-w-5xl overflow-auto'>
          
          {messages.length > 0 ?
            messages.map(m => (
              <ChatMessage message={m} key={m.id} />
            )) : null}
        </div>

        <div className="px-4 lg:px-8 mt-4 w-full">
          <form className='rounded-lg' onSubmit={handleSubmit}>
            <div className="flex items-center justify-center mt-4 w-full lg:max-w-4xl">
              <input
                className="flex-grow mr-4 p-2 rounded-lg border-2 border-gray-300"
                value={input}
                onChange={handleInputChange}
                placeholder="我今天能帮你做什么？"
              />
              {/* <Button className="flex-shrink-0 text-white rounded-lg p-2" type="submit" size="icon">
                <Send />
              </Button> */}
              <Button variant={'send'} type="submit" size="icon">
                <Send />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
    
  );
}

function ChatMessage({message: {role, content}}: {message: Message}) {
  return (
    <div className={cn(
      "p-8 w-full flex items-start gap-x-8 rounded-lg", role === 'user' ? "bg-white border border-black/10" : "bg-muted",)}
    >
      {role === 'user' ? <UserAvatar /> : <BotAvatar />}
      <p className='text-sm'>
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </p>
    </div>
  );
}





