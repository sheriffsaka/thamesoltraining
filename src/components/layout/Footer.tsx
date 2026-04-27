import { Link } from 'react-router-dom';
import { Logo } from '@/src/components/ui/Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-surface text-slate-600 pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Logo />
            <p className="text-slate-600 text-sm leading-[1.8] font-medium">
              High-performance training and consultancy for professionals and institutions. Empowering individuals through excellence in London.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white flex items-center justify-center hover:bg-brand-teal hover:text-white transition-all border border-slate-200 shadow-sm">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
 
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Navigation</h4>
            <ul className="space-y-5 text-[13px] font-bold">
              <li><Link to="/" className="hover:text-brand-teal transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-teal transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-brand-teal transition-colors">Course Catalog</Link></li>
              <li><Link to="/employability" className="hover:text-brand-teal transition-colors">Employability</Link></li>
              <li><Link to="/contact" className="hover:text-brand-teal transition-colors">Direct Contact</Link></li>
            </ul>
          </div>
 
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Support</h4>
            <ul className="space-y-5 text-[13px] font-bold">
              <li><Link to="/safeguarding" className="hover:text-brand-teal transition-colors">Safeguarding Hub</Link></li>
              <li><Link to="/prevent-duty" className="hover:text-brand-teal transition-colors">Prevent Duty</Link></li>
              <li><Link to="/policy" className="hover:text-brand-teal transition-colors">Policy & Procedures</Link></li>
              <li><Link to="/disclaimer" className="hover:text-brand-teal transition-colors">Disclaimer</Link></li>
              <li><Link to="/login" className="hover:text-brand-teal transition-colors">Student Login</Link></li>
            </ul>
          </div>
 
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900 mb-8">Contact</h4>
            <ul className="space-y-6 text-[13px] font-bold">
              <li className="flex gap-4 text-slate-700">
                <MapPin className="text-brand-teal shrink-0" size={18} />
                <span className="leading-relaxed">Capital House, Catford, London SE6 4AS</span>
              </li>
              <li className="flex gap-4 text-slate-700">
                <Phone className="text-brand-teal shrink-0" size={18} />
                <span>07426566335</span>
              </li>
              <li className="flex gap-4 text-slate-700">
                <Mail className="text-brand-teal shrink-0" size={18} />
                <span>admin@thamessolutiontraining.co.uk</span>
              </li>
            </ul>
          </div>
        </div>
 
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <p>© {currentYear} Thames Solution Training & Consultancy Ltd.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-brand-teal transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-brand-teal transition-colors">Terms</Link>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
              <span className="text-emerald-600/80">Secure Connection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
