"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { ImageIcon, Send, Loader } from 'lucide-react';
import { Heading } from '@/components/heading';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


function ImagePage() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handlePromptChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/predictions', {
        prompt,
      });
      setImage(response.data[0]);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className=" w-full max-w-3xl lg:max-w-5xl p-4 lg:p-24 flex flex-col">
        <Heading
          title="文生成图"
          description="按提示生成图片"
          icon={ImageIcon}
          iconColor="text-pink-700"
          bgColor="bg-pink-700/10"
          showBadge={1}
          badgeText='S.Diffusion 2'
        />
        <div className="px-4 lg:px-8 mt-4 w-full">
          <form className='rounded-lg' onSubmit={handleSubmit}>
            <div className="flex items-center justify-center mt-4 w-full lg:max-w-4xl">
              <input 
                type="text" 
                value={prompt} 
                onChange={handlePromptChange} 
                placeholder="请输入提示词文本[暂时只支持英文]..." 
                className="flex-grow mr-4 p-2 rounded-lg border-2 border-gray-300 w-full" 
              />
              
              <Button variant={'send'} type="submit" size="icon" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : <Send />}
              </Button>
            </div>
          </form>
        </div>
        
        {image && <img src={image} alt="生成的图片" className="mt-8" />}
      </div>
    </section>
  );
}

export default ImagePage;