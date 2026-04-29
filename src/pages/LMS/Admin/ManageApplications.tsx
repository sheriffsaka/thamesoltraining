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
        <h1 className="text-3xl font-bold text-slate-900 font-serif">Applications</h1>
        <p className="text-slate-500 font-medium">Review and manage student course applications.</p>
      </header>

      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search applications..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-slate-900 outline-none focus:border-brand-teal transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-5">Applicant</th>
                <th className="px-8 py-5">Course</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900">{app.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{app.email}</div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-600 font-bold">{app.course}</td>
                  <td className="px-8 py-6 text-sm text-slate-400">{app.date}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      app.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      app.status === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                      'bg-amber-50 text-amber-600 border border-amber-100'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand-teal hover:bg-white transition-all border border-slate-100 shadow-sm">
                         <CheckCircle size={18} />
                       </button>
                       <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-white transition-all border border-slate-100 shadow-sm">
                         <XCircle size={18} />
                       </button>
                       <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white transition-all border border-slate-100 shadow-sm">
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
