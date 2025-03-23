
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Supplier } from '@/utils/mockData';
import VerificationBadge from './VerificationBadge';
import SustainabilityScore from './SustainabilityScore';
import TransitionComponent from './TransitionComponent';

interface SupplierCardProps {
  supplier: Supplier;
  index: number;
  className?: string;
}

const SupplierCard = ({ supplier, index, className }: SupplierCardProps) => {
  const tierBadgeClasses = {
    primary: 'bg-ocean-blue-100 text-ocean-blue-800 border-ocean-blue-200',
    secondary: 'bg-purple-100 text-purple-800 border-purple-200',
    tertiary: 'bg-warm-gray-100 text-warm-gray-800 border-warm-gray-200',
  };

  return (
    <TransitionComponent 
      animation="fade-up" 
      delay={100 * index}
      className="h-full"
    >
      <div className={cn(
        'glass-card rounded-xl overflow-hidden h-full flex flex-col',
        'transition-all duration-300 hover:translate-y-[-4px]',
        className
      )}>
        <div className="flex justify-between items-start p-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="mb-1 flex items-center">
              <h3 className="font-medium text-base truncate mr-2">{supplier.name}</h3>
              <VerificationBadge status={supplier.verificationStatus} />
            </div>
            <div className="flex items-center text-muted-foreground text-xs">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{supplier.location}</span>
            </div>
          </div>
          <SustainabilityScore score={supplier.sustainabilityScore} size="sm" showLabel={false} />
        </div>
        
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-muted-foreground">Category</span>
            <span className="text-sm font-medium">{supplier.category}</span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-muted-foreground">Tier</span>
            <span className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full border',
              tierBadgeClasses[supplier.tier]
            )}>
              {supplier.tier.charAt(0).toUpperCase() + supplier.tier.slice(1)}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-muted-foreground">Last Verified</span>
            <span className="text-sm">{new Date(supplier.lastVerified).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs font-medium text-muted-foreground mb-2">Certifications</p>
          <div className="flex flex-wrap gap-1.5">
            {supplier.certifications.map((cert, i) => (
              <span 
                key={i}
                className="inline-flex px-2 py-1 text-xs font-medium bg-secondary rounded-md"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </TransitionComponent>
  );
};

export default SupplierCard;
