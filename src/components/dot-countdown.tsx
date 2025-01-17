'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from "next/image";
import { Pause, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DotCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const TOTAL_DOTS = 100;
  const TOTAL_TIME = 100;
  const DOT_INTERVAL = TOTAL_TIME / TOTAL_DOTS;
  
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    startTimeRef.current = null;
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      startTimeRef.current = Date.now() - ((TOTAL_TIME - timeLeft) * 1000);
      
      timerRef.current = setInterval(() => {
        if (startTimeRef.current === null) return;

        const elapsed = Date.now() - startTimeRef.current;
        const newTimeLeft = Math.max(TOTAL_TIME - Math.floor(elapsed / 1000), 0);
        
        if (newTimeLeft <= 0) {
          setTimeLeft(0);
          setIsRunning(false);
          stopTimer();
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 50);
    }

    return stopTimer;
  }, [isRunning, stopTimer]);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
  }, [stopTimer]);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const calculateDotOpacity = useCallback((index: number): number => {
    const dotStartTime = TOTAL_TIME - (index + 1) * DOT_INTERVAL;
    return timeLeft <= dotStartTime ? 0.2 : 1;
  }, [timeLeft]);

  const dots = React.useMemo(() => (
    [...Array(TOTAL_DOTS)].map((_, index: number) => {    
      const opacity = calculateDotOpacity(index);
      return (
        <div
          key={index}
          className="aspect-square rounded-full transition-opacity duration-200"
          style={{
            backgroundColor: 'white',
            opacity,
            transform: 'scale(0.15)'
          }}
        />
      );
    })
  ), [calculateDotOpacity]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
      <div className="bg-black border border-white/20 py-8 my-8">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-10 gap-1 p-4 bg-black w-96 h-96">
            {dots}
          </div>
          
          <div className="flex justify-between w-96 px-4">
            <div className="text-white/40 text-xs font-mono pt-2">
              {timeLeft}s
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={toggleTimer}
                variant="outline"
                className="h-8 px-8 bg-transparent border-white/10 text-white rounded-none hover:bg-white/10 hover:text-white"
                size="icon"
              >
                {isRunning ? <Pause className="w-2 h-2" /> : <p className="px-2 text-xs font-mono">Start</p>}
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                className="h-8 px-2 bg-transparent border-white/10 text-white rounded-none hover:bg-white/10 hover:text-white"
                size="icon"
              >
                <RefreshCw className="w-2 h-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://www.offekt.com"
        target="_blank"      
      >
      <Image
          className="dark:invert"
          src="/offekt_logo_20250117@2x.png"
          alt="OFFEKT logo"
          width={88}
          height={27}
          priority
        />      
        </a>
    </div>
  );
};

export default DotCountdown;