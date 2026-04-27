import { BookOpen, Users, Plus, Upload, MoreVertical, Edit, Trash } from 'lucide-react';
import { motion } from 'motion/react';

const myCourses = [
  { id: '1', title: 'Health & Social Care L3', students: 156, modules: 12, status: 'Active' },
  { id: '2', title: 'Clinical Safety Protocols', students: 89, modules: 8, status: 'Draft' },
];

export function InstructorDashboard() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-serif">Instructor Hub</h1>
          <p className="text-slate-400 font-sans">Manage your curriculum and monitor student progress.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-brand-teal/20 hover:scale-105 transition-all flex items-center gap-3">
          <Plus size={20} />
          Create New Course
        </button>
      </header>

      {/* Course Management Table */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white font-serif tracking-tight">My Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {myCourses.map((course) => (
            <div key={course.id} className="bg-brand-card rounded-[2.5rem] p-10 border border-white/5 shadow-2xl hover:border-white/10 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-teal">
                  <BookOpen size={32} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    course.status === 'Active' ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" : "bg-white/5 text-slate-500 border border-white/10"
                  )}>
                    {course.status}
                  </span>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <MoreVertical size={20} className="text-slate-500" />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-brand-teal transition-colors font-serif">
                {course.title}
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Students</div>
                  <div className="text-lg font-bold text-slate-200 flex items-center gap-2">
                    <Users size={18} className="text-brand-teal" />
                    {course.students}
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Modules</div>
                  <div className="text-lg font-bold text-slate-200 flex items-center gap-2">
                    <BookOpen size={18} className="text-brand-teal" />
                    {course.modules}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-brand-teal text-white py-4 rounded-xl font-bold text-sm hover:bg-brand-teal/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-teal/10">
                  <Edit size={16} />
                  Edit Course
                </button>
                <button className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-brand-teal hover:border-brand-teal transition-all">
                  <Upload size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-brand-card rounded-[2.5rem] p-10 border border-white/5 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-8 font-serif">Recent Student Submissions</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-white/5 rounded-2xl hover:border-brand-teal/20 transition-all gap-4 bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-slate-500">
                  <User size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-200">Sarah Miller</div>
                  <div className="text-xs text-slate-400">Submitted Assignment: "Risk Management Case Study"</div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-xs text-slate-500 font-medium">15 mins ago</div>
                <button className="flex-1 sm:flex-none px-6 py-2.5 bg-brand-teal/10 text-brand-teal font-bold rounded-lg text-xs hover:bg-brand-teal hover:text-white transition-all border border-brand-teal/20">
                  Grade Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const User = ({ size, className }: { size?: number, className?: string }) => <Users size={size} className={className} />;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
