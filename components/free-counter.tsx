"use client";

import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS, GPT3_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";

interface FreeCounterProps {
  isPro: boolean;
  apiLimitCount: number;
  gpt3ApiLimitCount: number;
}

export const FreeCounter = ({
  isPro = false,
  apiLimitCount = 0,
  gpt3ApiLimitCount = 0,
}: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p><strong> 免费使用次数 </strong></p> <Badge variant="premium" className="text-xs italic" >Daily Reset</Badge>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>{gpt3ApiLimitCount} / {GPT3_FREE_COUNTS}</p> <p>GPT3.5</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>{apiLimitCount} / {MAX_FREE_COUNTS}</p> <p>GPT4/Replicate共享</p>
            </div>
            {/* <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} /> */}
          </div>
          <Button onClick={proModal.onOpen} variant="premium" className="w-full">
            升级至专业版
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}