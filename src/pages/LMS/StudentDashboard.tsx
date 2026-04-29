import { BookOpen, Clock, Calendar, ChevronRight, Award, MessageCircle, User } from 'lucide-react';
import { motion } from 'motion/react';

const enrolledCourses = [
  {
    id: '1',
    title: 'Health and Social Care Level 3',
    progress: 45,
    nextLesson: 'Communication in Care Settings',
    instructor: 'Dr. Jane Smith',
    lastAccessed: '2 hours ago'
  },
  {
    id: '2',
    title: 'Workplace Health & Safety',
    progress: 82,
    nextLesson: 'Risk Assessment Protocols',
    instructor: 'Mr. David Evans',
    lastAccessed: '1 day ago'
  }
];

export function StudentDashboard() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-bold text-slate-900 mb-2 font-serif tracking-tight">Welcome back, John! 👋</h1>
        <p className="text-slate-500 font-medium">You have completed 65% of your total assigned learning outcomes for the month.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Active Courses */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Continue Learning</h2>
              <button className="text-brand-teal font-black text-[10px] uppercase tracking-widest hover:bg-brand-teal/5 px-4 py-2 rounded-lg transition-all">View All Courses</button>
            </div>
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 group hover:border-brand-teal/20 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
                        <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.25em]">In Progress</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-teal transition-colors font-serif">{course.title}</h3>
                      <div className="flex items-center gap-6 text-sm text-slate-400 mb-8 font-medium">
                        <div className="flex items-center gap-2"><Clock size={16} /> {course.lastAccessed}</div>
                        <div className="flex items-center gap-2"><User size={16} /> {course.instructor}</div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-bold text-slate-600 uppercase tracking-widest">
                          <span>Overall Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="h-full bg-brand-teal shadow-lg shadow-brand-teal/20"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                      <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-brand-teal transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-brand-teal/20">
                        Resume Lesson
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-brand-teal/5 border border-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all shadow-inner">
                <MessageCircle size={28} />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 font-serif">Contact Instructor</div>
                <div className="text-xs text-slate-500 font-medium">Ask about your current module</div>
              </div>
            </button>
            <button className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
              <div className="w-14 h-14 bg-brand-teal/5 border border-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all shadow-inner">
                <Calendar size={28} />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 font-serif">Events & Workshops</div>
                <div className="text-xs text-slate-500 font-medium">View upcoming live sessions</div>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Achievements */}
          <section className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8 font-serif border-b border-slate-50 pb-4">Recent Achievements</h3>
            <div className="space-y-8">
              <div className="flex gap-5 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm leading-tight mb-1 font-serif">Module 1 Mastered</div>
                  <p className="text-xs text-slate-500 font-medium">Excellent score in Clinical Safety</p>
                </div>
              </div>
              <div className="flex gap-5 group cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                  <BookOpen size={28} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm leading-tight mb-1 font-serif">Fast Learner</div>
                  <p className="text-xs text-slate-500 font-medium">Completed 5 lessons in one day</p>
                </div>
              </div>
            </div>
          </section>

          {/* Announcements */}
          <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-teal/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-teal/30 transition-all" />
            <h3 className="text-xl font-bold mb-8 font-serif relative z-10">Announcements</h3>
            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.25em]">Global Admin</div>
                <div className="font-bold text-sm leading-relaxed text-slate-200 font-serif">System maintenance scheduled for Saturday at 10 PM.</div>
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Yesterday</div>
              </div>
              <div className="space-y-3 pt-8 border-t border-white/10">
                <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.25em]">Course Update</div>
                <div className="font-bold text-sm leading-relaxed text-slate-200 font-serif">New resources added to 'Communication' module.</div>
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">2 Days Ago</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
