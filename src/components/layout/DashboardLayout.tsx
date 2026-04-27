import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  LogOut, 
  Bell, 
  User, 
  BarChart, 
  Shield, 
  MessageSquare,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '@/src/components/ui/Logo';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: SidebarItem[];
  userRole: string;
}

export function DashboardLayout({ children, menuItems, userRole }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-brand-dark flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-surface text-white hidden xl:flex flex-col flex-shrink-0 border-r border-white/5 shadow-2xl relative z-20">
        <div className="p-8 border-b border-white/5">
          <Link to="/">
            <Logo showText={true} />
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all group relative overflow-hidden",
                  isActive
                    ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} className={cn("transition-colors relative z-10", isActive ? "text-white" : "group-hover:text-brand-teal")} />
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 bg-gradient-to-r from-brand-teal to-blue-600 opacity-90"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl font-medium text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
        
        {/* Header */}
        <header className="h-20 bg-brand-surface/80 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between flex-shrink-0 relative z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <Logo showText={false} />
            <h2 className="font-bold text-brand-teal px-4 py-1.5 bg-brand-teal/10 border border-brand-teal/20 rounded-full text-[10px] uppercase tracking-widest">{userRole} Portal</h2>
          </div>

          <div className="hidden lg:flex items-center bg-white/5 rounded-xl px-4 py-2.5 w-96 border border-white/10 group focus-within:border-brand-teal/50 focus-within:bg-white/10 transition-all">
            <Search className="text-slate-500 group-focus-within:text-brand-teal transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search resources, lessons, help..." 
              className="bg-transparent border-none outline-none pl-3 text-sm flex-1 text-white placeholder:text-slate-600" 
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <button className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all group">
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-brand-teal rounded-full animate-pulse" />
              </button>
              <button className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all group">
                <MessageSquare size={18} />
              </button>
            </div>
            
            <div className="h-8 w-px bg-white/5 mx-2" />
            
            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white leading-none font-serif">John Student</div>
                <div className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mt-1.5">{userRole}</div>
              </div>
              <div className="w-10 h-10 rounded-xl border border-white/10 p-0.5 bg-gradient-to-tr from-brand-teal to-blue-500">
                <div className="w-full h-full bg-brand-surface rounded-lg flex items-center justify-center text-brand-teal">
                  <User size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto pb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
