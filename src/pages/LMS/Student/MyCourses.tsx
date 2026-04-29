import { BookOpen, Search, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const courses = [
  { id: '1', title: 'Health and Social Care Level 3', progress: 45, status: 'In Progress' },
  { id: '2', title: 'Workplace Health & Safety', progress: 100, status: 'Completed' },
  { id: '3', title: 'Clinical Safety Protocols', progress: 12, status: 'In Progress' },
];

export function MyCourses() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 font-serif">My Courses</h1>
        <p className="text-slate-500 font-medium">Track and manage your enrolled programs.</p>
      </header>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search your courses..."
            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-6 text-slate-900 outline-none focus:border-brand-teal transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all font-bold text-sm">
          <Filter size={18} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:border-brand-teal/30 transition-all group shadow-xl">
            <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal mb-6">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-2 min-h-[3.5rem] font-serif group-hover:text-brand-teal transition-colors">{course.title}</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                <span className={course.status === 'Completed' ? "text-emerald-500" : "text-brand-teal"}>{course.status}</span>
                <span className="text-slate-400">{course.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  className={cn("h-full", course.status === 'Completed' ? "bg-emerald-500" : "bg-brand-teal")}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

