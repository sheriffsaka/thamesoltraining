import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Logo } from '@/src/components/ui/Logo';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'About',
    children: [
      { name: 'About Us', path: '/about' },
      { name: 'Policy & Procedures', path: '/policy' },
      { name: 'Disclaimer', path: '/disclaimer' },
    ],
  },
  {
    name: 'Courses',
    children: [
      { name: 'All Courses', path: '/courses' },
      { name: 'Health & Social Care', path: '/courses?category=health-and-social-care' },
      { name: 'Assessor Courses', path: '/courses?category=assessor-courses' },
      { name: 'Functional Skills', path: '/courses?category=functional-skills' },
      { name: 'Mandatory Training', path: '/courses?category=mandatory-training' },
      { name: 'GDPR & Safety', path: '/courses?category=gdpr' },
      { name: 'Care Certificate', path: '/courses?category=care-certificate' },
    ],
  },
  {
    name: 'Safeguard & Prevent',
    children: [
      { name: 'Safeguarding – Help & Support', path: '/safeguarding' },
      { name: 'Prevent Duty', path: '/prevent-duty' },
      { name: 'British Values', path: '/british-values' },
    ],
  },
  { name: 'Employability', path: '/employability' },
  { name: 'Contact Us', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <nav className="glass-nav border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className="flex items-center gap-1 text-[13px] font-bold tracking-tight text-slate-600 hover:text-brand-teal transition-colors py-2 uppercase">
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === link.name && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    to={link.path!}
                    className={cn(
                      "text-[13px] font-bold tracking-tight transition-colors py-2 uppercase",
                      location.pathname === link.path ? "text-brand-teal" : "text-slate-600 hover:text-brand-teal"
                    )}
                  >
                    {link.name}
                  </Link>
                )}

                <AnimatePresence>
                  {link.children && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 p-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block px-6 py-4 text-xs font-bold uppercase tracking-tight text-slate-600 hover:bg-brand-surface hover:text-brand-teal rounded-xl transition-all"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link
              to="/login"
              className="bg-brand-teal text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20"
            >
              LMS Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 hover:text-brand-teal p-2 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-12 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="space-y-1 mb-4">
                      <div className="px-3 py-2 text-xs font-black text-brand-teal uppercase tracking-[0.2em]">{link.name}</div>
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-8 py-3 text-sm font-bold text-slate-600 hover:text-brand-teal transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      to={link.path!}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-3 py-4 text-sm font-bold uppercase tracking-widest transition-colors",
                        location.pathname === link.path ? "text-brand-teal" : "text-slate-800 hover:text-brand-teal"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-6 px-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-brand-teal text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-teal/20"
                >
                  LMS Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
