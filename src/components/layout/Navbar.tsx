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
  { name: 'Employability', path: '/employability' },
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
  const isHome = location.pathname === '/';

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b transition-all duration-300",
      isHome 
        ? "bg-brand-dark/80 backdrop-blur-md border-white/5" 
        : "bg-white border-slate-100 shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/">
              <Logo dark={!isHome} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button className={cn(
                    "flex items-center gap-1.5 text-[11px] font-black tracking-[0.2em] transition-colors py-2 uppercase",
                    isHome ? "text-slate-300 hover:text-brand-teal" : "text-slate-600 hover:text-brand-teal"
                  )}>
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === link.name && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    to={link.path!}
                    className={cn(
                      "text-[11px] font-black tracking-[0.2em] transition-colors py-2 uppercase",
                      location.pathname === link.path 
                        ? "text-brand-teal" 
                        : (isHome ? "text-slate-300 hover:text-brand-teal" : "text-slate-600 hover:text-brand-teal")
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
                        "absolute left-0 mt-4 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50 p-3",
                        link.isMega ? "w-[1100px] -left-[450px] p-12" : "w-80"
                      )}
                    >
                      {link.isMega ? (
                        <div className="grid grid-cols-4 gap-12">
                          {link.children.map((section: any) => (
                            <div key={section.title} className="space-y-8">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal border-b border-slate-100 pb-5 mb-2">{section.title}</h4>
                              <div className="flex flex-col gap-5">
                                {section.items.map((item: any) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-[13px] font-bold text-slate-500 hover:text-brand-teal transition-colors leading-tight"
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
                            className="block px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 hover:text-brand-teal rounded-xl transition-all"
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
              className="bg-brand-teal text-white px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20"
            >
              LMS Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 transition-colors rounded-xl",
                isHome ? "text-white hover:text-brand-teal bg-white/5" : "text-slate-900 hover:text-brand-teal bg-slate-100"
              )}
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
            className={cn(
              "lg:hidden border-t overflow-hidden shadow-2xl",
              isHome ? "bg-brand-dark border-white/5" : "bg-white border-slate-100"
            )}
          >
            <div className="px-6 pt-6 pb-16 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="space-y-4 mb-8">
                      <div className="px-4 py-3 text-[10px] font-black text-brand-teal uppercase tracking-[0.4em] opacity-80 border-b border-slate-100 mb-6">{link.name}</div>
                      {link.isMega ? (
                        <div className="space-y-8">
                          {link.children.map((section: any) => (
                            <div key={section.title} className="pl-6 space-y-4">
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{section.title}</div>
                              <div className="grid grid-cols-1 gap-2">
                                {section.items.map((item: any) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "block px-4 py-3 text-sm font-bold transition-colors rounded-xl font-serif",
                                      isHome ? "text-slate-400 hover:text-brand-teal" : "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-1 pl-4">
                          {link.children.map((child: any) => (
                            <Link
                              key={child.name}
                              to={child.path}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "block px-6 py-4 text-sm font-bold transition-colors rounded-xl font-serif",
                                isHome ? "text-slate-400 hover:text-brand-teal" : "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path!}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all rounded-2xl",
                        location.pathname === link.path 
                          ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                          : (isHome ? "text-slate-300 hover:text-brand-teal hover:bg-white/5" : "text-slate-600 hover:text-brand-teal hover:bg-slate-50")
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-8 px-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-brand-teal text-white py-6 rounded-3xl font-black uppercase tracking-[0.25em] text-xs shadow-2xl shadow-brand-teal/20 active:scale-95 transition-all"
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
