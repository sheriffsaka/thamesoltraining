import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, BookOpen, Users, Award, ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { getFAQs, getSiteContent } from '@/src/services/contentService';

const stats = [
  { label: 'Courses', value: '50+', icon: BookOpen },
  { label: 'Students', value: '2000+', icon: Users },
  { label: 'Success Rate', value: '98%', icon: Award },
  { label: 'Accredited', value: '100%', icon: ShieldCheck },
];

const categories = [
  { 
    title: 'Health & Social Care', 
    desc: 'Elite clinical and administrative training for modern healthcare sectors.', 
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    title: 'Professional Compliance', 
    desc: 'GDPR, Fire Safety, and Mandatory training for institutional standards.', 
    image: 'https://images.unsplash.com/photo-1507537243993-c0a35bb06f0e?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    title: 'Teacher Training', 
    desc: 'Assessors (CAVA) and Quality Assurance (IQA) vocational qualifications.', 
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' 
  },
];

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([
    {
      title: "Healthcare Excellence",
      subtitle: "Elevate Patient Care",
      desc: "Empowering the next generation of healthcare professionals with accredited clinical and vocational training.",
      video: "https://res.cloudinary.com/di7okmjsx/video/upload/v1777508500/the-healthcare-worker-in-blue-scrubs-gently-pushes_hhxtqz.mp4",
      link: "/courses?category=health-and-social-care"
    }
  ]);

  useEffect(() => {
    async function loadContent() {
      const [faqData, heroContent] = await Promise.all([
        getFAQs(),
        getSiteContent('home')
      ]);

      if (faqData && faqData.length > 0) {
        setFaqs(faqData);
      } else {
        setFaqs([
          { question: 'How do I enroll in a course?', answer: 'To enroll, simply browse our courses, click "View Details", and fill out the "Apply Now" form.' },
          { question: 'Are the certificates recognized?', answer: 'Yes, all our courses are accredited by leading UK awarding bodies.' },
        ]);
      }

      const heroHero = heroContent.find(c => c.id === 'home_hero');
      if (heroHero?.content?.slides) {
        setSlides(heroHero.content.slides);
      } else {
        setSlides([
          {
            title: "Healthcare Excellence",
            subtitle: "Elevate Patient Care",
            desc: "Empowering the next generation of healthcare professionals with accredited clinical and vocational training.",
            video: "https://res.cloudinary.com/di7okmjsx/video/upload/v1777508500/the-healthcare-worker-in-blue-scrubs-gently-pushes_hhxtqz.mp4",
            link: "/courses?category=health-and-social-care"
          },
          {
            title: "Leadership & Strategy",
            subtitle: "Lead with Authority",
            desc: "Master the art of strategic management and clinical leadership with our Level 5 Diploma programs.",
            video: "https://res.cloudinary.com/di7okmjsx/video/upload/v1777509647/the-trainer-in-the-gray-blazer-speaks-and-gestures_oir7sf.mp4",
            link: "/courses?category=leadership"
          }
        ]);
      }
    }
    loadContent();
  }, []);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) return null;
  const slide = slides[currentSlide] || slides[0];

  return (
    <div className="overflow-hidden bg-slate-50 text-sharp">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10" />
          <AnimatePresence mode="wait">
            <motion.video
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale"
            >
              <source src={slide.video} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              key={`content-${currentSlide}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-1.5 bg-brand-teal mb-10" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-black text-brand-teal uppercase tracking-[0.5em] mb-6"
              >
                {slide.subtitle}
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-bold leading-[1.05] mb-10 text-slate-900 tracking-tighter">
                {slide.title.split(' ')[0]} <br/>
                <span className="text-brand-teal italic font-serif">
                  {slide.title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl font-medium">
                {slide.desc}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to={slide.link}
                  className="bg-brand-teal text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-brand-teal/20"
                >
                  View Category
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-slate-50 border border-slate-100 text-slate-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all text-center shadow-lg"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>

            {/* Slide Indicators / Navigation */}
            <div className="hidden lg:flex flex-col gap-6 justify-self-end">
              {slides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="group flex items-center gap-6 text-left transition-all"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all border",
                    currentSlide === idx 
                      ? "bg-brand-teal text-white border-brand-teal shadow-lg shadow-brand-teal/20" 
                      : "bg-white text-slate-400 border-slate-100 group-hover:bg-slate-50 group-hover:shadow-lg"
                  )}>
                    0{idx + 1}
                  </div>
                  <div className={cn(
                    "transition-all",
                    currentSlide === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                  )}>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">{slide.subtitle}</div>
                    <div className="text-xs font-bold text-slate-900 uppercase">{slide.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Accreditations / Partners Ribbon */}
        <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-100 py-8 z-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-r border-slate-100 pr-12 hidden md:block">Accredited By</div>
            <div className="text-xl font-bold text-slate-400 tracking-tighter">CPD<span className="text-brand-teal">UK</span></div>
            <div className="text-xl font-black text-slate-400 tracking-tighter">TQUK</div>
            <div className="text-xl font-serif italic text-slate-400 tracking-tighter">NCFE</div>
            <div className="text-xl font-bold text-slate-400 tracking-tighter">Cache</div>
            <div className="text-xl font-black text-slate-400 tracking-tighter">Skills<span className="text-brand-teal">For</span>Care</div>
          </div>
        </div>
      </section>

      {/* Stats Section with sleek light cards */}
      <section className="bg-white py-16 border-b border-slate-50 shadow-sm">
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
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] max-w-[80px]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section with light cards */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-black text-brand-teal uppercase tracking-[0.4em] mb-4">Core Competencies</h2>
              <h3 className="text-5xl font-bold text-slate-900 tracking-tighter font-serif">Elite Training Categories</h3>
            </div>
            <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed">
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
                className="group relative overflow-hidden rounded-[3rem] aspect-[10/14] shadow-2xl border border-white"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-12 w-full">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tighter font-serif">{cat.title}</h3>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
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

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="relative rounded-[4rem] overflow-hidden aspect-square shadow-2xl border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                  alt="Students learning" 
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-brand-teal/5 mix-blend-overlay" />
              </div>
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 max-w-[300px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="font-black text-2xl text-slate-900 tracking-tighter">100%</div>
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  Compliance and quality assurance guaranteed across all programs.
                </div>
              </motion.div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-xs font-black text-brand-teal uppercase tracking-[0.4em] mb-4">The TMS Advantage</h2>
                <h3 className="text-5xl font-bold text-slate-900 tracking-tighter mb-8 font-serif leading-tight">
                  Why Leading Institutions <br/>
                  <span className="italic text-brand-teal">Choose TMS</span>
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  At Thames Solution Training, we don't just provide courses; we forge pathways to professional mastery through rigorous standards and innovative pedagogy.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {[
                  { title: 'Industry Expert Tutors', desc: 'Our instructors bring years of frontline experience in London\'s premier healthcare and business institutions.' },
                  { title: 'Fully Accredited Modules', desc: 'All certifications are recognized by official UK awarding bodies, ensuring portable professional value.' },
                  { title: 'Strategic LMS Platform', desc: 'Access your learning 24/7 with our state-of-the-art Learning Management System designed for modern learners.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-brand-teal bg-white flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-brand-teal">
                      <div className="w-2 h-2 bg-brand-teal rounded-full group-hover:bg-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2 tracking-tight font-serif">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with light cards */}
      <section className="py-32 bg-slate-50 relative overflow-hidden border-y border-slate-100">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black text-brand-teal uppercase tracking-[0.4em] mb-4">Support & Info</h2>
            <h3 className="text-5xl font-bold text-slate-900 tracking-tighter font-serif">Critical Intelligence</h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 hover:border-brand-teal/30 transition-all group overflow-hidden relative shadow-xl"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-teal scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex gap-4 font-serif leading-tight">
                  <span className="text-brand-teal">Q.</span> {faq.question}
                </h4>
                <p className="text-slate-500 leading-relaxed pl-10 font-medium">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[4rem] bg-slate-900 p-12 lg:p-24 overflow-hidden text-center shadow-2xl group">
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-teal/20 transition-all duration-1000" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-xs font-black text-brand-teal uppercase tracking-[0.4em] mb-8">Ready to Advance?</h2>
              <h3 className="text-5xl lg:text-7xl font-bold text-white mb-10 tracking-tighter leading-[1.1] font-serif">
                Forge Your <span className="italic text-brand-teal">Future</span> 
              </h3>
              <p className="text-xl text-slate-400 mb-14 leading-relaxed font-medium">
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
