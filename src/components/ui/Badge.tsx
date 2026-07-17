import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'active';
  children: React.ReactNode;
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-hw-accent focus:ring-offset-2";
  
  const variants = {
    default: "bg-hw-card text-hw-muted border border-hw-border",
    outline: "text-hw-text border border-hw-border",
    active: "bg-[#b1ff00]/10 text-hw-accent border border-hw-accent/20",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
