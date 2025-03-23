
import React from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SustainabilityMetric } from '@/utils/mockData';
import { Progress } from '@/components/ui/progress';
import AnimatedCounter from './AnimatedCounter';
import TransitionComponent from './TransitionComponent';

interface MetricsPanelProps {
  metrics: SustainabilityMetric[];
  className?: string;
}

const MetricsPanel = ({ metrics, className }: MetricsPanelProps) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {metrics.map((metric, index) => (
        <TransitionComponent 
          key={metric.id}
          animation="scale-in"
          delay={100 * index}
          className="h-full"
        >
          <div className="glass-card p-5 rounded-xl h-full flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                <div className="flex items-baseline mt-1">
                  <h3 className="text-2xl font-semibold">
                    <AnimatedCounter 
                      value={metric.value} 
                      decimals={metric.unit === '%' ? 0 : metric.value >= 1000 ? 0 : 1}
                    />
                  </h3>
                  <span className="ml-1 text-sm text-muted-foreground">{metric.unit}</span>
                </div>
              </div>
              
              <div className={cn(
                'flex items-center px-2 py-1 rounded-full text-xs font-medium',
                metric.trend === 'up' 
                  ? metric.name === 'Carbon Footprint' || metric.name === 'Water Usage'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-eco-green-100 text-eco-green-800'
                  : metric.trend === 'down'
                    ? metric.name === 'Carbon Footprint' || metric.name === 'Water Usage'
                      ? 'bg-eco-green-100 text-eco-green-800'
                      : 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
              )}>
                {metric.trend === 'up' ? (
                  <ArrowUp className="w-3 h-3 mr-1" />
                ) : metric.trend === 'down' ? (
                  <ArrowDown className="w-3 h-3 mr-1" />
                ) : (
                  <Minus className="w-3 h-3 mr-1" />
                )}
                {metric.change}%
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span>Progress to target</span>
                <span className="font-medium">{Math.round((metric.value / metric.target) * 100)}%</span>
              </div>
              <Progress 
                value={(metric.value / metric.target) * 100}
                className={cn(
                  'h-1.5',
                  metric.name === 'Carbon Footprint' || metric.name === 'Water Usage'
                    ? 'bg-muted'
                    : 'bg-muted'
                )}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">{metric.periodLabel}</span>
                <span className="text-xs font-medium">Target: {metric.target}{metric.unit}</span>
              </div>
            </div>
          </div>
        </TransitionComponent>
      ))}
    </div>
  );
};

export default MetricsPanel;
