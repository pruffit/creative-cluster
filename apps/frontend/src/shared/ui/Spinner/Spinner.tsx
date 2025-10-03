import { HTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils/cn';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = ({ size = 'md', className, ...props }: SpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={cn(
        'inline-block rounded-full border-solid border-primary border-t-transparent animate-spin',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
};