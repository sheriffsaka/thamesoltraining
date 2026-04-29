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
          <h1 className="text-3xl font-bold text-slate-900 font-serif">Manage Courses</h1>
          <p className="text-slate-500 font-medium">Create and edit your training curriculum.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand-teal/20 hover:scale-105 transition-all flex items-center gap-3">
          <Plus size={20} />
          Add New Course
        </button>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search your courses..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-slate-900 outline-none focus:border-brand-teal transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-5">Course Title</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Students</th>
                <th className="px-8 py-5 text-center">Modules</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 group-hover:text-brand-teal transition-colors font-serif">{course.title}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                      course.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                    )}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center text-slate-500 font-black">{course.students}</td>
                  <td className="px-8 py-6 text-center text-slate-500 font-black">{course.modules}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-brand-teal font-black text-[10px] uppercase tracking-widest hover:bg-brand-teal/5 px-4 py-2 rounded-lg transition-all">Manage</button>
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
