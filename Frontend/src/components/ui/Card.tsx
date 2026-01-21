import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export const Card = ({ className, children, variant = 'glass', ...props }: CardProps) => {
  const variants = {
    default: 'bg-gray-900',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        'transition-all duration-300',
        'hover:border-white/20',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
