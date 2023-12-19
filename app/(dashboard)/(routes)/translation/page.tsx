'use client';

import { Message, experimental_useAssistant as useAssistant } from 'ai/react';
import { useEffect, useRef } from 'react';

import { BookMarked, Calculator, Heart, Send } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // 引入 KaTeX 样式
import { Satisfy } from 'next/font/google';

export default function mathAssistant() {

  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: '/api/translation',
    });

    // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
      <div className=" w-full max-w-3xl lg:max-w-5xl p-4 lg:p-24 flex flex-col items-center">
        <Heading 
          title="Minimalist Translation"
          description="Especially for Engish and Chinese..."
          icon={BookMarked}
          iconColor="text-green-700"
          bgColor="bg-green-700/10"
          // className="w-full text-left"
        />
        
        <div className='flex flex-col gap-y-4 bg-white rounded-lg p-4 w-full lg:max-w-5xl overflow-auto'>
          {messages.length > 0 ?
            messages.map((m:Message) => (
              <ChatMessage message={m} key={m.id} />
            )) : null
          }
        </div>
        {status === 'in_progress' && (
          <div className="px-4 lg:px-8 mt-4 w-full" />
          )
        }
          <form className='rounded-lg' onSubmit={submitMessage}>
            <div className="flex items-center justify-center mt-4 w-full lg:max-w-4xl">
              <input
                className="flex-grow mr-4 p-2 rounded-lg border-2 border-gray-300"
                ref={inputRef}
                value={input}
                disabled={status !== 'awaiting_message'}
                onChange={handleInputChange}
                placeholder="空山新雨后,天气晚来秋..."
              />
              <Button  className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg p-2 px-6 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg" 
                      type="submit" 
                size="icon">
                发 送
              </Button>
            </div>
          </form>
      </div>
  );
}

function ChatMessage({message: {role, content}}: {message: Message}) {
  return (
    <div className={cn(
      "p-8 w-full flex items-start gap-x-8 rounded-lg", role === 'user' ? "bg-white border border-black/10" : "bg-muted",)}
    >
      {role === 'user' ? <UserAvatar /> : <BotAvatar />}
      <div className='text-sm'>
        <ReactMarkdown remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}>
            {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}