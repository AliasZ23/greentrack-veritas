
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  formatValue?: (value: number) => string;
  className?: string;
}

const AnimatedCounter = ({
  value,
  duration = 1500,
  decimals = 0,
  formatValue,
  className,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const prevValue = useRef<number>(0);

  useEffect(() => {
    prevValue.current = displayValue;
    startTime.current = null;
    animationFrameId.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
      }

      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      const newValue = prevValue.current + (value - prevValue.current) * easedProgress;
      setDisplayValue(newValue);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [value, duration]);

  // Easing function for smoother animations
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };

  // Format the display value
  const formattedValue = formatValue 
    ? formatValue(displayValue) 
    : displayValue.toFixed(decimals);

  return (
    <span className={cn("tabular-nums transition-gpu", className)}>
      {formattedValue}
    </span>
  );
};

export default AnimatedCounter;
