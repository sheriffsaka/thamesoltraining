import { FileText, Search, CheckCircle, XCircle, Eye } from 'lucide-react';

const applications = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', course: 'Health & Social Care L3', date: '2026-04-26', status: 'pending' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', course: 'Business Administration', date: '2026-04-25', status: 'approved' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', course: 'Cybersecurity', date: '2026-04-24', status: 'pending' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', course: 'Workplace Safety', date: '2026-04-23', status: 'rejected' },
];

export function ManageApplications() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white font-serif">Applications</h1>
        <p className="text-slate-400">Review and manage student course applications.</p>
      </header>

      <div className="bg-brand-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search applications..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-white outline-none focus:border-brand-teal transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="px-8 py-5">Applicant</th>
                <th className="px-8 py-5">Course</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-200">{app.name}</div>
                    <div className="text-xs text-slate-500">{app.email}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-400 font-medium">{app.course}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{app.date}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      app.status === 'approved' ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20' :
                      app.status === 'rejected' ? 'bg-rose-400/10 text-rose-400 border border-rose-400/20' :
                      'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-brand-teal hover:bg-white/10 transition-all border border-white/10">
                         <CheckCircle size={18} />
                       </button>
                       <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-all border border-white/10">
                         <XCircle size={18} />
                       </button>
                       <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/10">
                         <Eye size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
