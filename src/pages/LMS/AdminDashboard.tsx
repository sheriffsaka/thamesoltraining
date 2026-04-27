import { Users, BookOpen, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';

const applications = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', course: 'Health & Social Care L3', date: '2026-04-26', status: 'pending' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', course: 'Business Administration', date: '2026-04-25', status: 'approved' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', course: 'Cybersecurity', date: '2026-04-24', status: 'pending' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 font-serif">Admin Command Center</h1>
        <p className="text-slate-400">System-wide overview and management for Thames Solution.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '1,280', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Courses', value: '42', icon: BookOpen, color: 'text-brand-teal', bg: 'bg-brand-teal/10' },
          { label: 'Pending Apps', value: '12', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { label: 'Enrollments', value: '850', icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-brand-card p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-white/5", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white font-serif">Recent Applications</h2>
            <div className="flex gap-2">
              <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-all text-slate-400">
                <Search size={18} />
              </button>
              <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-all text-slate-400">
                <Filter size={18} />
              </button>
            </div>
          </div>

          <div className="bg-brand-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-8 py-5">Applicant</th>
                    <th className="px-8 py-5">Course</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/5 transition-all">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-200">{app.name}</div>
                        <div className="text-xs text-slate-500">{app.email}</div>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-slate-400">{app.course}</td>
                      <td className="px-8 py-6 text-sm text-slate-500">{app.date}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          app.status === 'pending' ? "bg-amber-400/10 text-amber-400 border border-amber-400/20" : "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                        )}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <button className="text-brand-teal font-bold text-xs hover:underline decoration-2 underline-offset-4">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-white/5 text-center border-t border-white/5">
              <button className="text-sm font-bold text-brand-teal hover:underline decoration-2 underline-offset-4">View All Applications</button>
            </div>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white font-serif">Admin Tools</h2>
          <div className="bg-brand-surface rounded-[2.5rem] p-4 text-white overflow-hidden shadow-2xl border border-white/5 relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-teal/20 transition-all" />
             <div className="relative z-10 p-4 space-y-4">
                <button className="w-full text-left p-4 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="font-bold text-sm mb-1 group-hover:text-brand-teal transition-colors">Create Announcement</div>
                  <div className="text-[10px] text-slate-500">Broadcast message to all students</div>
                </button>
                <div className="h-px bg-white/5 mx-4" />
                <button className="w-full text-left p-4 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="font-bold text-sm mb-1 group-hover:text-brand-teal transition-colors">Assign Instructor</div>
                  <div className="text-[10px] text-slate-500">Manage course permissions</div>
                </button>
                <div className="h-px bg-white/5 mx-4" />
                <button className="w-full text-left p-4 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="font-bold text-sm mb-1 group-hover:text-brand-teal transition-colors">System Logs</div>
                  <div className="text-[10px] text-slate-500">View security & error events</div>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper needed inside this file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
