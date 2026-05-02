import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Logo } from '@/src/components/ui/Logo';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navLinks: any[] = [
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
    isHierarchical: true,
    children: [
      {
        name: 'Health and Social Care',
        id: 'hsc',
        path: '/courses?category=health-and-social-care',
        items: [
          { name: 'Level 2 Qualifications', path: '/courses?category=health-and-social-care&level=Level 2 Qualifications' },
          { name: 'Level 3 Qualifications', path: '/courses?category=health-and-social-care&level=Level 3 Qualifications' },
          { name: 'Level 5 Qualifications', path: '/courses?category=health-and-social-care&level=Level 5 Qualifications' },
          { name: 'Child Care', path: '/courses?category=health-and-social-care&level=Child Care' },
        ]
      },
      {
        name: 'Assessor Courses',
        id: 'assessor',
        path: '/courses?category=assessor',
        items: [
          { name: 'Award in Assessing', path: '/courses/ac-l3-1' },
          { name: 'Certificate in Assessing', path: '/courses/ac-l3-2' },
        ]
      },
      {
        name: 'Functional Skills',
        id: 'functional',
        path: '/courses?category=functional-skills',
        items: [
          { name: 'Level 2 English', path: '/courses/fs-en-l2' },
          { name: 'Level 2 Maths', path: '/courses/fs-mt-l2' },
        ]
      },
      {
        name: 'Mandatory Training',
        id: 'mandatory',
        path: '/courses?category=mandatory',
        items: [
          { name: 'View Compliance Training', path: '/courses?category=mandatory' },
        ]
      },
      {
        name: 'Care Certificate',
        id: 'care-certificate',
        path: '/courses?category=care-certificate',
        items: [
          { name: 'Standards 1-15', path: '/courses/cc-15' },
        ]
      },
    ],
  },
  { name: 'Employability', path: '/employability' },
  {
    name: 'Safeguard & Prevent',
    children: [
      { name: 'Safeguarding Hub', path: '/safeguarding' },
      { name: 'Prevent Duty', path: '/prevent-duty' },
      { name: 'British Values', path: '/british-values' },
    ],
  },
  { name: 'Contact Us', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={cn(
      "sticky top-0 z-50 border-b transition-all duration-300",
      isHome 
        ? "bg-white/80 backdrop-blur-md border-slate-100 shadow-sm" 
        : "bg-white border-slate-100 shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/">
              <Logo dark={true} />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => {
                  setActiveDropdown(link.name);
                  if (link.isHierarchical && link.children) {
                    setActiveSubMenu(link.children[0].name);
                  }
                }}
                onMouseLeave={() => {
                  setActiveDropdown(null);
                  setActiveSubMenu(null);
                }}
              >
                {link.children ? (
                  <button className={cn(
                    "flex items-center gap-1.5 text-[11px] font-black tracking-[0.2em] transition-all py-2 uppercase h-full",
                    activeDropdown === link.name ? "text-brand-teal scale-105" : "text-slate-600 hover:text-brand-teal"
                  )}>
                    {link.name}
                    <ChevronDown size={14} className={cn("transition-transform opacity-50", activeDropdown === link.name && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    to={link.path!}
                    className={cn(
                      "text-[11px] font-black tracking-[0.2em] transition-colors py-2 uppercase h-full flex items-center",
                      location.pathname === link.path 
                        ? "text-brand-teal" 
                        : "text-slate-600 hover:text-brand-teal"
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
                        "absolute left-0 top-[100%] bg-white rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-50",
                        link.isHierarchical ? "w-[600px] flex min-h-[300px]" : "w-80 p-3"
                      )}
                    >
                      {link.isHierarchical ? (
                        <>
                          {/* Sidebar Categories */}
                          <div className="w-[45%] bg-slate-50/50 border-r border-slate-100 py-4">
                            {link.children.map((section: any) => (
                              <div
                                key={section.name}
                                onMouseEnter={() => setActiveSubMenu(section.name)}
                                className={cn(
                                  "flex items-center justify-between px-8 py-5 transition-all cursor-pointer group",
                                  activeSubMenu === section.name ? "bg-white text-brand-teal" : "text-slate-600"
                                )}
                              >
                                <span className="text-[11px] font-black uppercase tracking-widest leading-tight pr-4">
                                  {section.name}
                                </span>
                                {section.items && section.items.length > 0 && <ChevronDown size={14} className="-rotate-90 opacity-40 group-hover:translate-x-1 transition-transform" />}
                              </div>
                            ))}
                          </div>
                          {/* Sub-menu Content */}
                          <div className="flex-1 bg-white p-8">
                            <AnimatePresence mode="wait">
                              {activeSubMenu && (
                                <motion.div
                                  key={activeSubMenu}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="space-y-6"
                                >
                                  <Link 
                                    to={link.children.find((s: any) => s.name === activeSubMenu)?.path || '#'}
                                    className="block group"
                                  >
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-teal mb-6 border-b border-slate-100 pb-4 inline-block group-hover:text-brand-accent transition-colors">
                                      View All {activeSubMenu}
                                    </h4>
                                  </Link>
                                  <div className="grid grid-cols-1 gap-4">
                                    {((link.children.find((s: any) => s.name === activeSubMenu) as any)?.items || []).map((item: any) => (
                                      <Link
                                        key={item.name}
                                        to={item.path}
                                        className="text-[13px] font-bold text-slate-500 hover:text-brand-teal transition-all leading-tight flex items-center gap-2 hover:translate-x-1"
                                      >
                                        <div className="w-1 h-1 bg-brand-teal/20 rounded-full" />
                                        {item.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </>
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
                "text-slate-900 hover:text-brand-teal bg-slate-100"
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
              "bg-white border-slate-100"
            )}
          >
            <div className="px-6 pt-6 pb-16 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.children ? (
                    <div className="space-y-4 mb-8">
                      <div className="px-4 py-3 text-[10px] font-black text-brand-teal uppercase tracking-[0.4em] opacity-80 border-b border-slate-100 mb-6">{link.name}</div>
                      {link.isHierarchical ? (
                        <div className="space-y-8">
                          {link.children.map((section: any) => (
                            <div key={section.name} className="pl-6 space-y-4">
                              <Link 
                                to={section.path}
                                onClick={() => setIsOpen(false)}
                                className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-teal block"
                              >
                                {section.name}
                              </Link>
                              <div className="grid grid-cols-1 gap-2 pl-4">
                                {section.items.map((item: any) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "block px-4 py-3 text-sm font-bold transition-colors rounded-xl font-serif",
                                      "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
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
                                "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
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
                          : "text-slate-600 hover:text-brand-teal hover:bg-slate-50"
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
