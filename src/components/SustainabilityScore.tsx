
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import AnimatedCounter from './AnimatedCounter';

interface SustainabilityScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const SustainabilityScore = ({ 
  score, 
  size = 'md', 
  className,
  showLabel = true
}: SustainabilityScoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Determine color based on score
  const getColor = (s: number) => {
    if (s >= 85) return '#2f7b39'; // eco-green-600
    if (s >= 70) return '#65a30d'; // green-600
    if (s >= 50) return '#d97706'; // amber-600
    return '#dc2626'; // red-600
  };

  const color = getColor(score);
  
  // Size configurations
  const sizeConfig = {
    sm: { size: 60, thickness: 3, fontSize: 'text-lg', padding: 'p-1' },
    md: { size: 80, thickness: 4, fontSize: 'text-xl', padding: 'p-2' },
    lg: { size: 120, thickness: 6, fontSize: 'text-3xl', padding: 'p-3' },
  };
  
  const config = sizeConfig[size];

  // Draw the circular progress
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set the canvas dimensions with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = config.size * dpr;
    canvas.height = config.size * dpr;
    ctx.scale(dpr, dpr);
    
    // Set canvas style dimensions
    canvas.style.width = `${config.size}px`;
    canvas.style.height = `${config.size}px`;

    // Clear canvas
    ctx.clearRect(0, 0, config.size, config.size);
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(config.size / 2, config.size / 2, (config.size / 2) - config.thickness, 0, 2 * Math.PI);
    ctx.strokeStyle = '#e5e7eb'; // Light gray background
    ctx.lineWidth = config.thickness;
    ctx.stroke();
    
    // Calculate the angle for the score
    const angle = (score / 100) * 2 * Math.PI;
    
    // Draw the score arc with animation
    let currentAngle = 0;
    const animationDuration = 1500; // 1.5 seconds
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Ease out cubic function for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      currentAngle = easeProgress * angle;
      
      ctx.beginPath();
      ctx.arc(config.size / 2, config.size / 2, (config.size / 2) - config.thickness, -Math.PI / 2, currentAngle - Math.PI / 2, false);
      ctx.strokeStyle = color;
      ctx.lineWidth = config.thickness;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [score, color, size]);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className={cn('relative flex items-center justify-center', config.padding)}>
        <canvas ref={canvasRef} className="absolute" />
        <div className="absolute flex flex-col items-center justify-center">
          <AnimatedCounter
            value={score}
            className={cn('font-semibold', config.fontSize)}
            duration={1500}
          />
        </div>
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground mt-1">
          Sustainability Score
        </span>
      )}
    </div>
  );
};

export default SustainabilityScore;
