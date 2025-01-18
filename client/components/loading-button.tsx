import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';

interface IProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  isLoading: boolean;
}

export function LoadingButton({
  className,
  onClick,
  variant,
  children,
  isLoading,
}: IProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      className={className}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
