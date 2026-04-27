import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Users, Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const stats = [
  { label: 'Courses', value: '50+', icon: BookOpen },
  { label: 'Students', value: '2000+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Award },
  { label: 'Accredited', value: '100%', icon: ShieldCheck },
];

const categories = [
  { 
    title: 'Healthcare', 
    desc: 'Professional clinical and care-giving training for healthcare specialists.', 
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    title: 'Business', 
    desc: 'Leadership, management and administrative excellence for small and large enterprises.', 
    image: 'https://images.unsplash.com/photo-1454165833767-02a6e3099033?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    title: 'IT & Digital', 
    desc: 'Essential tech skills from cybersecurity to software management.', 
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' 
  },
];

export function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = [
    "https://cdn.pixabay.com/video/2019/11/24/29326-375549007_large.mp4", // Medical/Healthcare
    "https://cdn.pixabay.com/video/2020/09/23/50917-463870685_large.mp4", // Business/Office
    "https://cdn.pixabay.com/video/2021/04/12/70868-537452601_large.mp4", // Technology/Learning
  ];

  return (
    <div className="overflow-hidden bg-brand-dark">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 hero-gradient overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10" />
          <AnimatePresence mode="wait">
            <motion.video
              key={currentVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              autoPlay
              loop
              muted
              playsInline
              onEnded={() => setCurrentVideo((prev) => (prev + 1) % videos.length)}
              className="w-full h-full object-cover"
            >
              <source src={videos[currentVideo]} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="w-20 h-1 bg-brand-teal mb-10" />
            <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] mb-10 text-slate-900 tracking-tighter">
              Professional <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-accent italic font-serif">Excellence</span>
            </h1>
            <p className="text-xl text-slate-700 mb-12 leading-relaxed max-w-2xl font-medium">
              High-performance training and consultancy for professionals and institutions. Accredited courses in Healthcare, IT, and Business Management.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/courses"
                className="bg-brand-teal text-white px-12 py-5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-brand-teal/20"
              >
                Explore Courses
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="bg-white border border-slate-200 text-slate-900 px-12 py-5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-brand-surface transition-all text-center"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Abstract Glows */}
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-brand-teal/10 blur-[180px] rounded-full translate-x-1/3" />
      </section>

      {/* Stats Section with sleek dark cards */}
      <section className="bg-brand-surface py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 group"
              >
                <div className="text-4xl font-black text-slate-900 group-hover:text-brand-teal transition-colors tracking-tighter">{stat.value}</div>
                <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] max-w-[80px]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section with card-dark */}
      <section className="py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black text-brand-teal uppercase tracking-[0.4em] mb-4">Core Competencies</h2>
              <h3 className="text-5xl font-bold text-slate-900 tracking-tighter">Elite Training Categories</h3>
            </div>
            <p className="text-slate-600 text-lg max-w-md font-medium leading-relaxed">
              We specialize in providing industry-standard training across key sectors driving the modern economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative overflow-hidden rounded-[2.5rem] aspect-[10/14] shadow-2xl border border-white/5"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <h3 className="text-3xl font-bold text-white mb-4 tracking-tighter">{cat.title}</h3>
                  <p className="text-slate-100 text-sm mb-8 leading-relaxed font-medium">
                    {cat.desc}
                  </p>
                  <Link
                    to={`/courses?category=${cat.title.toLowerCase()}`}
                    className="inline-flex items-center gap-3 text-brand-teal font-black text-[11px] uppercase tracking-widest group/btn"
                  >
                    View Modules
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-brand-surface border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black text-brand-teal uppercase tracking-[0.4em] mb-4">Support & Info</h2>
            <h3 className="text-5xl font-bold text-slate-900 tracking-tighter font-serif">Critical Intelligence</h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { q: 'How do I enroll in a course?', a: 'To enroll, simply browse our courses, click "View Details", and fill out the "Apply Now" form. Our team will contact you within 48 hours to finalize your application.' },
              { q: 'Are the certificates recognized?', a: 'Yes, all our courses are accredited by leading UK awarding bodies including TQUK and NCFE, providing you with nationally recognized qualifications.' },
              { q: 'Can I study while working?', a: 'Absolutely! Our courses are designed with flexibility in mind, offering a mix of online resources and blended learning to fit your busy schedule.' },
              { q: 'What are the entry requirements?', a: 'Requirements vary by course. Generally, you need to be over 18 and have a basic level of literacy/numeracy. Specifics are listed on each course page.' }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] p-10 border border-slate-200 hover:border-brand-teal/30 transition-all group overflow-hidden relative shadow-lg"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-teal scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex gap-4 font-serif leading-tight">
                  <span className="text-brand-teal">Q.</span> {faq.q}
                </h4>
                <p className="text-slate-600 leading-relaxed pl-10 font-medium">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[4rem] bg-white p-12 lg:p-24 overflow-hidden text-center shadow-2xl border border-slate-200 group">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-teal/10 transition-all duration-1000" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-xs font-black text-brand-teal uppercase tracking-[0.4em] mb-8">Ready to Advance?</h2>
              <h3 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-10 tracking-tighter leading-[1.1] font-serif">
                Forge Your <span className="italic text-brand-teal">Future</span> 
              </h3>
              <p className="text-xl text-slate-600 mb-14 leading-relaxed font-medium">
                Join thousands of students who have advanced their careers through our practical and accredited training programs.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center gap-4 bg-brand-teal text-white hover:bg-brand-accent px-16 py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-brand-teal/20 border border-transparent"
              >
                Browse All Courses
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
