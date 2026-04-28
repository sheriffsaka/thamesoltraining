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
    isMega: true,
    children: [
      {
        title: 'Health & Social Care',
        items: [
          { name: 'Adult Care L2 & L3', path: '/courses?category=health-and-social-care' },
          { name: 'Leadership & Management L5', path: '/courses?category=leadership' },
          { name: 'Care Certificate (15 Standards)', path: '/courses?category=care-certificate' },
          { name: 'Mandatory Training', path: '/courses?category=mandatory' },
        ]
      },
      {
        title: 'Education & Training',
        items: [
          { name: 'Assessor (CAVA) L3', path: '/courses?category=assessor' },
          { name: 'IQA (Internal Quality Assurance) L4', path: '/courses?category=iqa' },
          { name: 'Functional Skills (Maths/English/ICT)', path: '/courses?category=functional-skills' },
        ]
      },
      {
        title: 'Specialized Training',
        items: [
          { name: 'Child Care L3', path: '/courses?category=child-care' },
          { name: 'GDPR & Data Protection', path: '/courses?category=gdpr' },
          { name: 'Employability Skills', path: '/employability' },
        ]
      },
      {
        title: 'Professional Support',
        items: [
          { name: 'Apprenticeships', path: '/about' },
          { name: 'Consultancy Services', path: '/about' },
          { name: 'Safeguarding Hub', path: '/safeguarding' },
        ]
      },
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
                  <button className="flex items-center gap-1 text-[13px] font-bold tracking-tight text-slate-300 hover:text-brand-teal transition-colors py-2 uppercase">
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === link.name && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    to={link.path!}
                    className={cn(
                      "text-[13px] font-bold tracking-tight transition-colors py-2 uppercase",
                      location.pathname === link.path ? "text-brand-teal" : "text-slate-300 hover:text-brand-teal"
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
                      className={cn(
                        "absolute left-0 mt-2 bg-brand-surface rounded-2xl shadow-2xl border border-white/5 overflow-hidden z-50 p-2",
                        link.isMega ? "w-[1000px] -left-[400px] p-10" : "w-80"
                      )}
                    >
                      {link.isMega ? (
                        <div className="grid grid-cols-4 gap-10">
                          {link.children.map((section: any) => (
                            <div key={section.title} className="space-y-6">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal border-b border-white/5 pb-4">{section.title}</h4>
                              <div className="flex flex-col gap-4">
                                {section.items.map((item: any) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-[12px] font-bold text-slate-400 hover:text-white transition-colors leading-tight"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        link.children.map((child: any) => (
                          <Link
                            key={child.name}
                            to={child.path}
                            className="block px-6 py-4 text-xs font-bold uppercase tracking-tight text-slate-400 hover:bg-white/5 hover:text-brand-teal rounded-xl transition-all"
                          >
                            {child.name}
                          </Link>
                        ))
                      )}
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
              className="text-white hover:text-brand-teal p-2 transition-colors"
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
            className="lg:hidden bg-brand-dark border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-12 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="space-y-1 mb-6">
                      <div className="px-3 py-2 text-[10px] font-black text-brand-teal uppercase tracking-[0.3em] opacity-80 border-b border-white/5 mb-4">{link.name}</div>
                      {link.isMega ? (
                        <div className="space-y-6">
                          {link.children.map((section: any) => (
                            <div key={section.title} className="pl-4 space-y-3">
                              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{section.title}</div>
                              {section.items.map((item: any) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className="block px-4 py-2 text-[13px] font-bold text-slate-400 hover:text-brand-teal transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        link.children.map((child: any) => (
                          <Link
                            key={child.name}
                            to={child.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-8 py-3 text-sm font-bold text-slate-400 hover:text-brand-teal transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path!}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-3 py-4 text-sm font-bold uppercase tracking-widest transition-colors",
                        location.pathname === link.path ? "text-brand-teal" : "text-slate-300 hover:text-brand-teal"
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
