
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TransitionComponentProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'fade-up' | 'scale-in';
  delay?: number;
  duration?: number;
}

const TransitionComponent = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  duration = 500,
}: TransitionComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.opacity = '1';
              ref.current.style.transform = 'translateY(0) scale(1)';
            }
          }, delay);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const initialStyles = {
    opacity: '0',
    transform: animation === 'fade-up' ? 'translateY(10px)' : animation === 'scale-in' ? 'scale(0.95)' : 'none',
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
  };

  return (
    <div ref={ref} style={initialStyles} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
};

export default TransitionComponent;
