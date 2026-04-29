import { Phone, Mail } from 'lucide-react';

export function TopBar() {
  return (
    <div className="bg-white text-slate-400 py-3 px-4 text-[10px] font-black tracking-[0.2em] uppercase border-b border-slate-100 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-10">
          <a href="tel:07426566335" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <Phone size={12} className="text-brand-teal" />
            <span>07426566335</span>
          </a>
          <a href="mailto:admin@thamessolutiontraining.co.uk" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
            <Mail size={12} className="text-brand-teal" />
            <span>admin@thamessolutiontraining.co.uk</span>
          </a>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-slate-300 font-bold">London, SE6 4AS</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-100 shadow-inner" />
          <span className="text-brand-teal font-black">System Status: Optimal</span>
        </div>
      </div>
    </div>
  );
}
