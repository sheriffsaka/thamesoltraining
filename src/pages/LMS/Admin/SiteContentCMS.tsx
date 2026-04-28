import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  FileText, 
  HelpCircle, 
  Layout, 
  Users, 
  Image as ImageIcon,
  CheckCircle2,
  Save,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

type CMSTab = 'courses' | 'faq' | 'team' | 'testimonials';

export function SiteContentCMS() {
  const [activeTab, setActiveTab] = useState<CMSTab>('courses');

  const tabs: { id: CMSTab; label: string; icon: any }[] = [
    { id: 'courses', label: 'Courses', icon: FileText },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: Layout },
  ];

  return (
    <div className="space-y-8">
      {/* CMS Sub-navigation */}
      <div className="flex flex-wrap gap-4 p-2 bg-white/5 rounded-2xl border border-white/10 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-bold transition-all",
              activeTab === tab.id 
                ? "bg-brand-teal text-white shadow-lg" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-brand-card rounded-[3rem] border border-white/5 shadow-2xl p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'courses' && <CourseManager key="courses" />}
          {activeTab === 'faq' && <FAQManager key="faq" />}
          {activeTab === 'team' && <TeamManager key="team" />}
          {activeTab === 'testimonials' && <TestimonialManager key="testimonials" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CourseManager() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white font-serif mb-2">Manage Courses</h3>
          <p className="text-sm text-slate-400">Add, edit or remove courses from the public listing.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2">
          <Plus size={16} />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-brand-dark p-6 rounded-3xl border border-white/5 group hover:border-brand-teal/30 transition-all">
            <div className="h-40 rounded-2xl overflow-hidden mb-6 bg-white/5 relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                    <ImageIcon size={32} />
                </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-2 truncate">Course Title {i}</h4>
            <div className="flex justify-between items-center pt-6 border-t border-white/5">
              <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Level 3</span>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-brand-teal transition-all">
                  <Edit2 size={14} />
                </button>
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FAQManager() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white font-serif mb-2">Manage FAQs</h3>
          <p className="text-sm text-slate-400">Update frequently asked questions for your visitors.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2">
          <Plus size={16} />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-brand-dark p-6 rounded-[2rem] border border-white/5 flex gap-6 items-start">
             <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
                <HelpCircle size={20} />
             </div>
             <div className="flex-1">
                <div className="font-bold text-white mb-2">How long do courses take?</div>
                <div className="text-sm text-slate-400">Our courses vary depending on the level, typically between 6-12 months.</div>
             </div>
             <div className="flex gap-2">
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-brand-teal transition-all">
                  <Edit2 size={16} />
                </button>
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-red-400 transition-all">
                  <Trash2 size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function TeamManager() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white font-serif mb-2">Manage Team</h3>
          <p className="text-sm text-slate-400">Update staff and instructor profiles.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2">
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className="bg-brand-dark p-6 rounded-3xl border border-white/5 text-center">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-700">
                <Users size={32} />
              </div>
              <div className="font-bold text-white mb-1">Dr. Michael Chen</div>
              <div className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-6">Senior Instructor</div>
              <div className="flex justify-center gap-2">
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-brand-teal transition-all">
                  <Edit2 size={14} />
                </button>
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
           </div>
         ))}
      </div>
    </motion.div>
  );
}

function TestimonialManager() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white font-serif mb-2">Manage Testimonials</h3>
          <p className="text-sm text-slate-400">Curate success stories from your students.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2">
          <Plus size={16} />
          Add Story
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-brand-dark p-8 rounded-[3rem] border border-white/5 relative">
             <div className="text-slate-400 italic mb-8 leading-relaxed">
               "The Level 5 Diploma completely transformed my career trajectory. The support from Thames Solution was exceptional throughout the entire process."
             </div>
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/5 rounded-full" />
                  <div>
                    <div className="font-bold text-white text-sm">Jennifer Thompson</div>
                    <div className="text-[10px] text-brand-teal font-black uppercase tracking-widest">HSC Graduate</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-brand-teal transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
