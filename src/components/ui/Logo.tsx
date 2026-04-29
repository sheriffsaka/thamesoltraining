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
      <div className="relative flex items-center justify-center w-10 h-10 bg-brand-teal rounded-lg text-white shadow-lg shadow-brand-teal/20">
        <GraduationCap size={24} className="italic" />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            "font-bold text-lg tracking-tighter uppercase",
            dark ? "text-slate-900" : "text-white"
          )}>
            Thames <span className="opacity-60 font-light">Solution</span>
          </span>
          <span className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Training & Consultancy Ltd</span>
        </div>
      )}
    </div>
  );
}
