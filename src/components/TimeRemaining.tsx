
import { useState, useEffect } from "react";
import { getTimeRemaining } from "@/utils/dateUtils";

interface TimeRemainingProps {
  startTime: string;
  className?: string;
}

export function TimeRemaining({ startTime, className }: TimeRemainingProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(startTime));
  
  useEffect(() => {
    // Only set up the interval if the contest hasn't started yet
    if (timeLeft.total > 0) {
      const timer = setInterval(() => {
        const updated = getTimeRemaining(startTime);
        setTimeLeft(updated);
        
        if (updated.total <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [startTime, timeLeft.total]);
  
  if (timeLeft.total <= 0) {
    return <span className={className}>In progress</span>;
  }
  
  return (
    <span className={className}>
      {timeLeft.days > 0 && `${timeLeft.days}d `}
      {timeLeft.hours > 0 && `${timeLeft.hours}h `}
      {timeLeft.minutes > 0 && `${timeLeft.minutes}m `}
      {timeLeft.days === 0 && timeLeft.hours === 0 && `${timeLeft.seconds}s `}
      remaining
    </span>
  );
}
