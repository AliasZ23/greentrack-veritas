
import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type VerificationStatus = 'verified' | 'pending' | 'expired';

interface VerificationBadgeProps {
  status: VerificationStatus;
  className?: string;
}

const VerificationBadge = ({ status, className }: VerificationBadgeProps) => {
  const statusConfig = {
    verified: {
      icon: Check,
      label: 'Verified',
      colorClass: 'bg-eco-green-100 text-eco-green-700 border-eco-green-200',
      iconClass: 'text-eco-green-500',
    },
    pending: {
      icon: Clock,
      label: 'Pending',
      colorClass: 'bg-orange-50 text-orange-700 border-orange-100',
      iconClass: 'text-orange-500',
    },
    expired: {
      icon: AlertCircle,
      label: 'Expired',
      colorClass: 'bg-red-50 text-red-700 border-red-100',
      iconClass: 'text-red-500',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      'border transition-all',
      config.colorClass,
      className
    )}>
      <config.icon className={cn('w-3 h-3 mr-1', config.iconClass)} />
      {config.label}
    </div>
  );
};

export default VerificationBadge;
