import { Users, BookOpen, Clock, CheckCircle, Search, Filter, ShieldCheck, Layout } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';
import { SiteContentCMS } from './Admin/SiteContentCMS';
import { ManageUsers } from './Admin/ManageUsers';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'cms' | 'users'>('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'cms', label: 'Site Content', icon: BookOpen },
    { id: 'users', label: 'Manage Users', icon: Users },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif tracking-tight">Admin Hub</h1>
          <p className="text-slate-500 font-medium">System-wide overview and site content management.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all",
                activeTab === item.id ? "bg-brand-teal text-white shadow-xl shadow-brand-teal/20" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <item.icon size={14} />
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Total Users', value: '1,280', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
              { label: 'Courses', value: '42', icon: BookOpen, color: 'text-brand-teal', bg: 'bg-brand-teal/5', border: 'border-brand-teal/10' },
              { label: 'Pending Apps', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
              { label: 'Enrollments', value: '850', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden group">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border shadow-sm group-hover:scale-110 transition-transform", stat.bg, stat.border)}>
                  <stat.icon className={stat.color} size={28} />
                </div>
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Quick Tools */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button onClick={() => setActiveTab('cms')} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:border-brand-teal transition-all text-left group">
                  <div className="w-12 h-12 bg-brand-teal/5 rounded-xl flex items-center justify-center text-brand-teal mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <div className="font-bold text-xl text-slate-900 mb-2 font-serif">Manage Content</div>
                  <p className="text-sm text-slate-500 font-medium">Update courses, FAQs, and pages.</p>
                </button>
                <button onClick={() => setActiveTab('users')} className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:border-brand-teal transition-all text-left group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="font-bold text-xl text-slate-900 mb-2 font-serif">User Permissions</div>
                  <p className="text-sm text-slate-500 font-medium">Promote users to admin or instructor.</p>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">System Status</h2>
              <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Database</div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Operational
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Storage</div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Operational
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Auth Service</div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Operational
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'cms' && <SiteContentCMS />}
      {activeTab === 'users' && <ManageUsers />}
    </div>
  );
}


