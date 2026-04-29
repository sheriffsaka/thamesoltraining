import { Users, BookOpen, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';
import { SiteContentCMS } from './Admin/SiteContentCMS';

const applications = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', course: 'Health & Social Care L3', date: '2026-04-26', status: 'pending' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', course: 'Business Administration', date: '2026-04-25', status: 'approved' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', course: 'Cybersecurity', date: '2026-04-24', status: 'pending' },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'cms'>('overview');

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif tracking-tight">Admin Hub</h1>
          <p className="text-slate-500 font-medium">System-wide overview and site content management.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
          <button 
            onClick={() => setActiveTab('overview')}
            className={cn(
              "px-8 py-3 rounded-xl text-xs font-bold transition-all",
              activeTab === 'overview' ? "bg-brand-teal text-white shadow-xl shadow-brand-teal/20" : "text-slate-500 hover:text-slate-900"
            )}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('cms')}
            className={cn(
              "px-8 py-3 rounded-xl text-xs font-bold transition-all",
              activeTab === 'cms' ? "bg-brand-teal text-white shadow-xl shadow-brand-teal/20" : "text-slate-500 hover:text-slate-900"
            )}
          >
            Site Content (CMS)
          </button>
        </div>
      </header>

      {activeTab === 'overview' ? (
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
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">Recent Applications</h2>
            <div className="flex gap-2">
              <button className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all text-slate-500">
                <Search size={18} />
              </button>
              <button className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all text-slate-500">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-10 py-6">Applicant</th>
                    <th className="px-10 py-6">Course</th>
                    <th className="px-10 py-6">Date</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-6">
                        <div className="font-bold text-slate-900 group-hover:text-brand-teal transition-colors">{app.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{app.email}</div>
                      </td>
                      <td className="px-10 py-6 text-sm font-bold text-slate-600">{app.course}</td>
                      <td className="px-10 py-6 text-sm text-slate-400 font-medium">{app.date}</td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                          app.status === 'pending' ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        )}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right font-serif italic text-slate-500">
                        <button className="text-brand-teal font-black text-[10px] uppercase tracking-widest hover:bg-brand-teal/5 px-4 py-2 rounded-lg transition-all">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-slate-50/50 text-center border-t border-slate-100">
              <button className="text-sm font-black text-brand-teal hover:text-brand-accent uppercase tracking-widest transition-all">View All Applications</button>
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 font-serif">Admin Tools</h2>
          <div className="bg-white rounded-[3rem] p-6 text-slate-900 overflow-hidden shadow-2xl border border-slate-100 relative group">
             <div className="relative z-10 space-y-4">
                <button className="w-full text-left p-6 rounded-[2rem] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                  <div className="font-bold text-base mb-1 group-hover:text-brand-teal transition-colors font-serif">Create Announcement</div>
                  <div className="text-xs text-slate-500 font-medium">Broadcast message to all students</div>
                </button>
                <button className="w-full text-left p-6 rounded-[2rem] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                  <div className="font-bold text-base mb-1 group-hover:text-brand-teal transition-colors font-serif">Assign Instructor</div>
                  <div className="text-xs text-slate-500 font-medium">Manage course permissions</div>
                </button>
                <button className="w-full text-left p-6 rounded-[2rem] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                  <div className="font-bold text-base mb-1 group-hover:text-brand-teal transition-colors font-serif">System Logs</div>
                  <div className="text-xs text-slate-500 font-medium">View security & error events</div>
                </button>
             </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <SiteContentCMS />
  )}
</div>
  );
}

