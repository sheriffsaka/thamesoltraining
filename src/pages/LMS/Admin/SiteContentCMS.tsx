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
  X,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

type CMSTab = 'courses' | 'faq' | 'team' | 'testimonials' | 'pages';

export function SiteContentCMS() {
  const [activeTab, setActiveTab] = useState<CMSTab>('courses');

  const tabs: { id: CMSTab; label: string; icon: any }[] = [
    { id: 'courses', label: 'Courses', icon: FileText },
    { id: 'pages', label: 'Site Pages', icon: Layout },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  ];

  return (
    <div className="space-y-8">
      {/* CMS Sub-navigation */}
      <div className="flex flex-wrap gap-4 p-2 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-bold transition-all",
              activeTab === tab.id 
                ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'courses' && <CourseManager key="courses" />}
          {activeTab === 'pages' && <PagesManager key="pages" />}
          {activeTab === 'faq' && <FAQManager key="faq" />}
          {activeTab === 'team' && <TeamManager key="team" />}
          {activeTab === 'testimonials' && <TestimonialManager key="testimonials" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PagesManager() {
  const [editingPage, setEditingPage] = useState<string | null>(null);

  const pages = [
    { id: 'privacy', title: 'Privacy Policy', lastUpdated: '2026-04-28' },
    { id: 'terms', title: 'Terms of Service', lastUpdated: '2026-04-28' },
    { id: 'policy', title: 'General Policy', lastUpdated: '2026-04-28' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">Manage Site Pages</h3>
          <p className="text-sm text-slate-500 font-medium">Update the content of legal and information pages.</p>
        </div>
      </div>

      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex gap-6 items-center shadow-sm">
             <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
                <FileText size={20} />
             </div>
             <div className="flex-1">
                <div className="font-bold text-slate-900 mb-1">{page.title}</div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">Last Updated: {page.lastUpdated}</div>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={() => setEditingPage(page.title)}
                  className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold text-brand-teal hover:bg-brand-teal hover:text-white transition-all shadow-sm"
                >
                  Edit Content
                </button>
             </div>
          </div>
        ))}
      </div>

      {editingPage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setEditingPage(null)}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white w-full max-w-4xl rounded-[3rem] p-12 shadow-3xl max-h-[80vh] flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Editing: {editingPage}</h2>
              <button onClick={() => setEditingPage(null)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-8 pr-4 custom-scrollbar">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Page Body (Markdown/HTML Supported)</label>
              <textarea 
                className="w-full h-96 p-8 bg-slate-50 border border-slate-100 rounded-3xl outline-none focus:border-brand-teal transition-all font-mono text-sm leading-relaxed"
                defaultValue="# Sample content for this page..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setEditingPage(null)} className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold hover:bg-slate-100 transition-all border border-slate-100">
                Cancel
              </button>
              <button onClick={() => setEditingPage(null)} className="px-12 py-4 bg-brand-teal text-white rounded-2xl font-bold hover:bg-brand-accent transition-all flex items-center gap-2 shadow-xl shadow-brand-teal/20">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
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
          <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">Manage Courses</h3>
          <p className="text-sm text-slate-500 font-medium">Add, edit or remove courses from the public listing.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20">
          <Plus size={16} />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 group hover:border-brand-teal transition-all shadow-sm flex flex-col">
            <div className="h-44 rounded-2xl overflow-hidden mb-6 bg-slate-200 border border-slate-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <ImageIcon size={32} />
                </div>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 truncate font-serif">Level 3 Certificate {i}</h4>
            <div className="flex justify-between items-center pt-6 mt-auto border-t border-slate-200/60">
              <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em]">Accredited</span>
              <div className="flex gap-2">
                <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm">
                  <Edit2 size={16} />
                </button>
                <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm">
                  <Trash2 size={16} />
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
          <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">Manage FAQs</h3>
          <p className="text-sm text-slate-500 font-medium">Update frequently asked questions for your visitors.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20">
          <Plus size={16} />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex gap-8 items-start shadow-sm">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-teal shrink-0 shadow-inner border border-slate-100">
                <HelpCircle size={24} />
             </div>
             <div className="flex-1">
                <div className="font-bold text-slate-900 mb-2 font-serif">How long do courses take?</div>
                <div className="text-sm text-slate-600 font-medium leading-relaxed">Our courses vary depending on the level, typically between 6-12 months.</div>
             </div>
             <div className="flex gap-2">
                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm font-medium">
                  <Edit2 size={18} />
                </button>
                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm font-medium">
                  <Trash2 size={18} />
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
          <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">Manage Team</h3>
          <p className="text-sm text-slate-500 font-medium">Update staff and instructor profiles.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20">
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
              <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center text-slate-300 shadow-inner">
                <Users size={40} />
              </div>
              <div className="font-bold text-slate-900 mb-1 font-serif">Dr. Michael Chen</div>
              <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-8">Senior Instructor</div>
              <div className="flex justify-center gap-3">
                <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm">
                  <Edit2 size={16} />
                </button>
                <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm">
                  <Trash2 size={16} />
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
          <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">Manage Testimonials</h3>
          <p className="text-sm text-slate-500 font-medium">Curate success stories from your students.</p>
        </div>
        <button className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20">
          <Plus size={16} />
          Add Story
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative shadow-sm">
             <div className="text-slate-600 italic mb-10 leading-relaxed font-serif text-lg">
               "The Level 5 Diploma completely transformed my career trajectory. The support from Thames Solution was exceptional throughout the entire process."
             </div>
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full border border-slate-200" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Jennifer Thompson</div>
                    <div className="text-[10px] text-brand-teal font-black uppercase tracking-[0.2em]">HSC Graduate</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm">
                    <Trash2 size={16} />
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
