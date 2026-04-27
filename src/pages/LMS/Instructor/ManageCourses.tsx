import { BookOpen, Plus, Search } from 'lucide-react';

const courses = [
  { id: '1', title: 'Health & Social Care L3', students: 156, modules: 12, status: 'Active' },
  { id: '2', title: 'Clinical Safety Protocols', students: 89, modules: 8, status: 'Draft' },
  { id: '3', title: 'Workplace H&S', students: 210, modules: 5, status: 'Active' },
];

export function ManageCourses() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-serif">Manage Courses</h1>
          <p className="text-slate-400">Create and edit your training curriculum.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand-teal/20 hover:scale-105 transition-all flex items-center gap-3">
          <Plus size={20} />
          Add New Course
        </button>
      </header>

      <div className="bg-brand-card rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search your courses..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-white outline-none focus:border-brand-teal transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="px-8 py-5">Course Title</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Students</th>
                <th className="px-8 py-5 text-center">Modules</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-white/5 transition-all group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-200 group-hover:text-brand-teal transition-colors font-serif">{course.title}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      course.status === 'Active' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-white/5 text-slate-500'
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center text-slate-400 font-bold">{course.students}</td>
                  <td className="px-8 py-6 text-center text-slate-400 font-bold">{course.modules}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-brand-teal font-bold text-xs hover:underline underline-offset-4 decoration-2">Manage</button>
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
