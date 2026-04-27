import { Phone, Mail } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-brand-surface text-slate-400 py-2.5 px-4 text-[11px] font-medium tracking-wider uppercase border-b border-white/5 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-8">
          <a href="tel:07426566335" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={12} className="text-brand-teal" />
            <span>07426566335</span>
          </a>
          <a href="mailto:admin@thamessolutiontraining.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={12} className="text-brand-teal" />
            <span>admin@thamessolutiontraining.co.uk</span>
          </a>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-slate-600">London, SE6 4AS</span>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <span className="text-brand-teal font-bold">System Status: Optimal</span>
        </div>
      </div>
    </div>
  );
}
