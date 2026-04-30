import React, { useState, useEffect } from 'react';
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
  MessageSquare,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { supabase } from '@/src/lib/supabase';
import { uploadImage } from '@/src/lib/storage';

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
  const [editingPage, setEditingPage] = useState<any>(null);
  const [siteContents, setSiteContents] = useState<any[]>([]);

  useEffect(() => {
    fetchSiteContents();
  }, []);

  async function fetchSiteContents() {
    const { data } = await supabase.from('site_contents').select('*');
    if (data) setSiteContents(data);
  }

  const sections = [
    { id: 'home_hero', title: 'Home Hero Section', section: 'home' },
    { id: 'home_about', title: 'Home About Section', section: 'home' },
    { id: 'about_page', title: 'About Page Content', section: 'about' },
  ];

  async function handleSave() {
    if (!editingPage) return;
    const { error } = await supabase
      .from('site_contents')
      .upsert({
        id: editingPage.id,
        section: editingPage.section,
        content: editingPage.content,
        updated_at: new Date().toISOString()
      } as any);

    if (!error) {
       setEditingPage(null);
       fetchSiteContents();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">Manage Site Sections</h3>
          <p className="text-sm text-slate-500 font-medium">Update the content of specific website sections.</p>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const currentData = siteContents.find(sc => sc.id === section.id);
          return (
            <div key={section.id} className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex gap-6 items-center shadow-sm">
               <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
                  <Layout size={20} />
               </div>
               <div className="flex-1">
                  <div className="font-bold text-slate-900 mb-1">{section.title}</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">
                    {currentData ? `Last Updated: ${new Date(currentData.updated_at).toLocaleDateString()}` : 'No content set yet'}
                  </div>
               </div>
               <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingPage({ ...section, content: currentData?.content || {} })}
                    className="px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold text-brand-teal hover:bg-brand-teal hover:text-white transition-all shadow-sm"
                  >
                    Edit Content
                  </button>
               </div>
            </div>
          );
        })}
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
              <h2 className="text-2xl font-bold text-slate-900 font-serif">Editing: {editingPage.title}</h2>
              <button onClick={() => setEditingPage(null)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-8 pr-4 custom-scrollbar space-y-6">
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="text-xs font-medium text-slate-500 mb-4">Edit the JSON object below to update section data like titles and descriptions.</p>
                  <textarea 
                    className="w-full h-80 p-6 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-teal font-mono text-sm"
                    value={JSON.stringify(editingPage.content, null, 2)}
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        setEditingPage({ ...editingPage, content: parsed });
                      } catch (err) {}
                    }}
                  />
               </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setEditingPage(null)} className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold hover:bg-slate-100 transition-all border border-slate-100">
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-12 py-4 bg-brand-teal text-white rounded-2xl font-bold hover:bg-brand-accent transition-all flex items-center gap-2 shadow-xl shadow-brand-teal/20"
              >
                <Save size={18} />
                Save to Section
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function CourseManager() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    if (data) setCourses(data);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const courseData = {
      title: formData.get('title'),
      category: formData.get('category'),
      sub_category: formData.get('sub_category'),
      description: formData.get('description'),
      duration: formData.get('duration'),
      image_url: editingCourse?.image_url,
    };

    if (editingCourse?.id) {
      await (supabase.from('courses') as any).update(courseData as any).eq('id', editingCourse.id);
    } else {
      await (supabase.from('courses') as any).insert([courseData as any]);
    }
    setEditingCourse(null);
    fetchCourses();
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      await supabase.from('courses').delete().eq('id', id);
      fetchCourses();
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setEditingCourse({ ...editingCourse, image_url: url });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  }

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
        <button 
          onClick={() => setEditingCourse({})}
          className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20"
        >
          <Plus size={16} />
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center text-brand-teal">
            <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        ) : courses.map((course) => (
          <div key={course.id} className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 group hover:border-brand-teal transition-all shadow-sm flex flex-col">
            <div className="h-44 rounded-2xl overflow-hidden mb-6 bg-slate-200 border border-slate-100 relative">
              {course.image_url ? (
                <img src={course.image_url} className="w-full h-full object-cover" alt={course.title} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 truncate font-serif">{course.title}</h4>
            <div className="text-xs text-brand-teal font-black uppercase tracking-widest mb-4">{course.category}</div>
            <div className="flex justify-between items-center pt-6 mt-auto border-t border-slate-200/60">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] truncate mr-2">
                {course.sub_category || course.level || 'General'}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setEditingCourse(course)}
                  className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(course.id)}
                  className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingCourse && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setEditingCourse(null)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="relative bg-white w-full max-w-2xl rounded-[3rem] p-12 shadow-3xl overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-8">{editingCourse.id ? 'Edit Course' : 'Add New Course'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Course Title</label>
                  <input name="title" defaultValue={editingCourse.title} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Category</label>
                  <select name="category" defaultValue={editingCourse.category || 'health-and-social-care'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold">
                    <option value="health-and-social-care">Health & Social Care</option>
                    <option value="assessor">Assessor Courses</option>
                    <option value="functional-skills">Functional Skills</option>
                    <option value="mandatory">Mandatory Training</option>
                    <option value="care-certificate">Care Certificate</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Sub-Category</label>
                  <input name="sub_category" defaultValue={editingCourse.sub_category || editingCourse.level || ''} placeholder="e.g. Level 2 Qualifications" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Duration</label>
                  <input name="duration" defaultValue={editingCourse.duration || '6 Months'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Featured Image</label>
                  <div className="relative h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-6 overflow-hidden">
                    <span className="text-sm font-bold text-slate-500 truncate">{editingCourse.image_url ? 'Image Updated' : 'No image uploaded'}</span>
                    <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    {isUploading && <div className="absolute right-4 animate-spin"><Clock size={16} /></div>}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Description</label>
                <textarea name="description" defaultValue={editingCourse.description} className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" />
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setEditingCourse(null)} className="px-8 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl">Cancel</button>
                <button type="submit" className="bg-brand-teal text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-brand-teal/20 flex items-center gap-2">
                  <Save size={18} />
                  {editingCourse.id ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function FAQManager() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<any>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
    setLoading(true);
    const { data } = await supabase.from('faqs').select('*').order('order_index', { ascending: true });
    if (data) setFaqs(data);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const faqData = {
      question: formData.get('question'),
      answer: formData.get('answer'),
      category: formData.get('category'),
      order_index: parseInt(formData.get('order_index') as string) || 0,
      is_active: true
    };

    if (editingFaq?.id) {
      await (supabase.from('faqs') as any).update(faqData as any).eq('id', editingFaq.id);
    } else {
      await (supabase.from('faqs') as any).insert([faqData as any]);
    }
    setEditingFaq(null);
    fetchFaqs();
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      await supabase.from('faqs').delete().eq('id', id);
      fetchFaqs();
    }
  }

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
        <button 
          onClick={() => setEditingFaq({})}
          className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20"
        >
          <Plus size={16} />
          Add FAQ
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex justify-center text-brand-teal">
            <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        ) : faqs.map((faq) => (
          <div key={faq.id} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex gap-8 items-start shadow-sm">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-teal shrink-0 shadow-inner border border-slate-100">
                <HelpCircle size={24} />
             </div>
             <div className="flex-1">
                <div className="font-bold text-slate-900 mb-2 font-serif">{faq.question}</div>
                <div className="text-sm text-slate-600 font-medium leading-relaxed">{faq.answer}</div>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={() => setEditingFaq(faq)}
                  className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm font-medium"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm font-medium"
                >
                  <Trash2 size={18} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {editingFaq && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setEditingFaq(null)} />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="relative bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-3xl"
          >
            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-8">{editingFaq.id ? 'Edit FAQ' : 'Add FAQ'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Question</label>
                <input name="question" defaultValue={editingFaq.question} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Answer</label>
                <textarea name="answer" defaultValue={editingFaq.answer} className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Category</label>
                  <input name="category" defaultValue={editingFaq.category || 'General'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px) font-black text-slate-400 uppercase tracking-widest pl-2">Order Index</label>
                  <input name="order_index" type="number" defaultValue={editingFaq.order_index || 0} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setEditingFaq(null)} className="px-8 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl">Cancel</button>
                <button type="submit" className="bg-brand-teal text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-brand-teal/20 flex items-center gap-2">
                  <Save size={18} />
                  Save FAQ
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function TeamManager() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    const { data } = await supabase.from('team_members').select('*').order('order_index', { ascending: true });
    if (data) setMembers(data);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const memberData = {
      name: formData.get('name'),
      role: formData.get('role'),
      bio: formData.get('bio'),
      image_url: editingMember?.image_url,
      order_index: parseInt(formData.get('order_index') as string) || 0,
    };

    if (editingMember?.id) {
      await (supabase.from('team_members') as any).update(memberData as any).eq('id', editingMember.id);
    } else {
      await (supabase.from('team_members') as any).insert([memberData as any]);
    }
    setEditingMember(null);
    fetchMembers();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      setEditingMember({ ...editingMember, image_url: url });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  }

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
        <button 
          onClick={() => setEditingMember({})}
          className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20"
        >
          <Plus size={16} />
          Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {loading ? (
           <div className="col-span-full py-20 flex justify-center"><div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
         ) : members.map((member) => (
           <div key={member.id} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
              <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full mx-auto mb-6 overflow-hidden flex items-center justify-center text-slate-300 shadow-inner">
                {member.image_url ? <img src={member.image_url} className="w-full h-full object-cover" /> : <Users size={40} />}
              </div>
              <div className="font-bold text-slate-900 mb-1 font-serif">{member.name}</div>
              <div className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-8">{member.role}</div>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => setEditingMember(member)}
                  className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={async () => { if(confirm('Delete member?')) { await supabase.from('team_members').delete().eq('id', member.id); fetchMembers(); } }}
                  className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
           </div>
         ))}
      </div>

      {editingMember && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setEditingMember(null)} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-3xl">
            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-8">{editingMember.id ? 'Edit Member' : 'Add Member'}</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Name</label>
                <input name="name" defaultValue={editingMember.name} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Role</label>
                <input name="role" defaultValue={editingMember.role} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Profile Photo</label>
                <div className="relative h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center px-6 overflow-hidden">
                  <span className="text-sm font-bold text-slate-500">{editingMember.image_url ? 'Photo Set' : 'Choose Photo'}</span>
                  <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  {isUploading && <div className="absolute right-4 animate-spin"><Clock size={16} /></div>}
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setEditingMember(null)} className="px-8 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl">Cancel</button>
                <button type="submit" className="bg-brand-teal text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-brand-teal/20 flex items-center gap-2">
                  <Save size={18} />
                  Save Member
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const testimonialData = {
      student_name: formData.get('student_name'),
      course_name: formData.get('course_name'),
      content: formData.get('content'),
      rating: 5,
    };

    if (editingTestimonial?.id) {
      await (supabase.from('testimonials') as any).update(testimonialData as any).eq('id', editingTestimonial.id);
    } else {
      await (supabase.from('testimonials') as any).insert([testimonialData as any]);
    }
    setEditingTestimonial(null);
    fetchTestimonials();
  }

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
        <button 
          onClick={() => setEditingTestimonial({})}
          className="bg-brand-teal text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center gap-2 shadow-lg shadow-brand-teal/20"
        >
          <Plus size={16} />
          Add Story
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center"><div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
        ) : testimonials.map((t) => (
          <div key={t.id} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative shadow-sm">
             <div className="text-slate-600 italic mb-10 leading-relaxed font-serif text-lg">
               "{t.content}"
             </div>
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-300">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.student_name}</div>
                    <div className="text-[10px] text-brand-teal font-black uppercase tracking-[0.2em]">{t.course_name}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingTestimonial(t)}
                    className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-brand-teal transition-all shadow-sm"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={async () => { if(confirm('Delete story?')) { await supabase.from('testimonials').delete().eq('id', t.id); fetchTestimonials(); } }}
                    className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {editingTestimonial && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setEditingTestimonial(null)} />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-3xl">
            <h2 className="text-2xl font-bold text-slate-900 font-serif mb-8">Add Testimonial</h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Student Name</label>
                <input name="student_name" defaultValue={editingTestimonial.student_name} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Course/Credential</label>
                <input name="course_name" defaultValue={editingTestimonial.course_name} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Content</label>
                <textarea name="content" defaultValue={editingTestimonial.content} className="w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-teal font-bold" required />
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="px-8 py-4 text-slate-400 font-bold hover:bg-slate-50 rounded-2xl">Cancel</button>
                <button type="submit" className="bg-brand-teal text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-brand-teal/20 flex items-center gap-2">
                  <Save size={18} />
                  Save Story
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
