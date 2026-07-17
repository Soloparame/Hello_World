import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hw-accent disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-hw-accent text-hw-bg hover:bg-[#9de000]",
      secondary: "bg-hw-card text-hw-text hover:bg-hw-card-hover border border-hw-border",
      outline: "border border-hw-border bg-transparent hover:bg-hw-card hover:text-hw-text",
      ghost: "hover:bg-hw-card hover:text-hw-text text-hw-muted",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
        {icon && <span className="ml-2 -mr-1">{icon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
