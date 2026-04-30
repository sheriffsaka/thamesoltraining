import { GraduationCap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  dark?: boolean;
}

export function Logo({ className, showText = true, dark = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative flex items-center justify-center h-16 w-auto">
        <img src="/logo.png" alt="Thames Solution" className="h-full w-auto object-contain" />
      </div>
    </div>
  );
}
