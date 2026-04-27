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
        <h1 className="text-3xl font-bold text-white mb-2 font-serif">Welcome back, John! 👋</h1>
        <p className="text-slate-400">You have completed 65% of your total assigned learning outcomes for the month.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Courses */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Continue Learning</h2>
              <button className="text-brand-teal font-bold text-sm hover:underline">View All Courses</button>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-brand-card rounded-[2rem] p-8 shadow-2xl border border-white/5 group hover:border-white/10 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                        <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">In Progress</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-teal transition-colors font-serif">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 font-medium">
                        <div className="flex items-center gap-1.5"><Clock size={14} /> {course.lastAccessed}</div>
                        <div className="flex items-center gap-1.5"><User size={14} /> {course.instructor}</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-bold text-slate-300">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-brand-teal shadow-[0_0_10px_#3b82f6]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                      <button className="bg-brand-dark border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-brand-teal hover:border-brand-teal transition-all flex items-center justify-center gap-2">
                        Resume Lesson
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center gap-4 p-6 bg-brand-surface rounded-[2rem] border border-white/5 hover:border-brand-teal hover:bg-brand-teal/10 transition-all group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all">
                <MessageCircle size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Contact Instructor</div>
                <div className="text-xs text-slate-500">Ask about your current module</div>
              </div>
            </button>
            <button className="flex items-center gap-4 p-6 bg-brand-surface rounded-[2rem] border border-white/5 hover:border-brand-teal hover:bg-brand-teal/10 transition-all group">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all">
                <Calendar size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold text-white">Events & Workshops</div>
                <div className="text-xs text-slate-500">View upcoming live sessions</div>
              </div>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Achievements */}
          <section className="bg-brand-card rounded-[2.5rem] p-8 shadow-2xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 font-serif">Recent Achievements</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-400/20">
                  <Award size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-200 text-sm leading-tight">Module 1 Mastered</div>
                  <p className="text-xs text-slate-500 mt-1">Excellent score in Clinical Safety</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-400/10 text-blue-500 flex items-center justify-center shrink-0 border border-blue-400/20">
                  <BookOpen size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-200 text-sm leading-tight">Fast Learner</div>
                  <p className="text-xs text-slate-500 mt-1">Completed 5 lessons in one day</p>
                </div>
              </div>
            </div>
          </section>

          {/* Announcements */}
          <section className="bg-brand-surface rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-xl font-bold mb-6 font-serif relative z-10">Announcements</h3>
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Global Admin</div>
                <div className="font-bold text-sm leading-snug text-slate-200">System maintenance scheduled for Saturday at 10 PM.</div>
                <div className="text-xs text-slate-500">Published yesterday</div>
              </div>
              <div className="space-y-2 pt-6 border-t border-white/5">
                <div className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Course Update</div>
                <div className="font-bold text-sm leading-snug text-slate-200">New resources added to 'Communication' module.</div>
                <div className="text-xs text-slate-500">Published 2 days ago</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
