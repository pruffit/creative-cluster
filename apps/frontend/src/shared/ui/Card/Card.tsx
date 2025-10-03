import { HTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = ({ children, hover = false, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-surface rounded-xl p-6 border border-border',
        hover && 'group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};