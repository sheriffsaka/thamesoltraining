import { Users, Search, MoreHorizontal, Mail } from 'lucide-react';

const students = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', course: 'Health & Social Care L3', Joined: '2026-03-12' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', course: 'Clinical Safety', Joined: '2026-03-15' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', course: 'Workplace H&S', Joined: '2026-03-20' },
];

export function ManageStudents() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white font-serif">Students</h1>
        <p className="text-slate-400">Monitor and support your active learners.</p>
      </header>

      <div className="bg-brand-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter by name or course..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-white outline-none focus:border-brand-teal transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-xl font-bold text-sm hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/10">
            Export List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="px-8 py-5">Full Name</th>
                <th className="px-8 py-5">Enrolled Course</th>
                <th className="px-8 py-5">Joined Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400 border border-white/10">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200">{student.name}</div>
                        <div className="text-xs text-slate-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-400 font-medium">{student.course}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{student.Joined}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 text-slate-500">
                      <button className="p-2 hover:bg-white/10 rounded-lg hover:text-brand-teal transition-all">
                        <Mail size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg hover:text-white transition-all">
                        <MoreHorizontal size={18} />
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
