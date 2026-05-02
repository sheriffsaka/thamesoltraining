import { Users, Target, Award, CheckCircle2, Eye, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { getSiteContent } from '@/src/services/contentService';

export function About() {
  const [content, setContent] = useState<any>({
    title: "Empowering Careers Through \nExpert Training",
    description: "Thames Solution Training & Consultancy Ltd is a leading provider of professional training and vocational qualifications in London. We bridge the gap between ambition and employment.",
    mission: "To provide high-quality, accessible, and inclusive training that empowers individuals to achieve their full potential and secure meaningful employment. We are dedicated to excellence in education and consultancy."
  });

  useEffect(() => {
    async function loadContent() {
      const data = await getSiteContent('about');
      const aboutPage = data.find(item => item.id === 'about_page');
      if (aboutPage?.content) {
        setContent(aboutPage.content);
      }
    }
    loadContent();
  }, []);

  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Qualified Students', value: '5K+' },
    { label: 'Expert Instructors', value: '50+' },
    { label: 'Success Rate', value: '98%' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20 text-sharp">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-teal rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-slate-900">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold mb-8 font-serif whitespace-pre-line"
          >
            {content.title.split('\n')[0]} <br /> <span className="text-brand-teal font-sans italic">{content.title.split('\n')[1] || ''}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {content.description}
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-xl border border-slate-100 shadow-xl"
              >
                <div className="text-4xl font-bold text-brand-teal mb-2">{stat.value}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-serif mb-6">Built on Strong Foundations</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">Our purpose is clear, our goals are ambitious, and our values are non-negotiable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                desc: "To empower individuals through high-quality vocational education, fostering skills that drive excellence in the health and social care sectors and beyond.",
                icon: <Target className="text-brand-teal" size={32} />
              },
              {
                title: "Our Vision",
                desc: "To be the leading provider of innovative training solutions, recognized globally for producing competent professionals who transform their workplaces.",
                icon: <Eye className="text-brand-teal" size={32} />
              },
              {
                title: "Our Values",
                desc: "Integrity, Excellence, and Compassion form the bedrock of TMS. We believe in personalized learning that respects the dignity of every student and professional.",
                icon: <Heart className="text-brand-teal" size={32} />
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-10 rounded-xl border border-slate-200 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-semibold italic">"{item.desc}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-slate-900">
            <h2 className="text-4xl font-bold font-serif">A Commitment to Quality</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              We specialize in delivering RQF qualifications that are not just certificates, but real markers of professional capability. Our approach is student-centric, ensuring that every learner has the support needed to succeed.
            </p>
            <div className="space-y-4">
              {[
                'Industry-Accredited Qualifications',
                'Personalized Learner Support',
                'Expert Industry Practitioners',
                'Modern Learning Environments'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle2 className="text-brand-teal font-black" size={20} />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden shadow-2xl">
               <Users size={200} className="text-brand-teal/5" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent opacity-60" />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute -bottom-6 -right-6 p-8 bg-brand-teal rounded-xl text-white shadow-2xl max-w-xs"
            >
               <p className="text-lg font-bold leading-tight">"Excellence is not an act, but a habit."</p>
               <p className="text-[10px] text-white/70 mt-3 font-black uppercase tracking-[0.2em]">— Our Founding Principle</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 bg-sky-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 font-serif">Ready to take the next step?</h2>
          <p className="text-slate-600 mb-10 text-lg font-medium">Join thousands of successful graduates who have transformed their careers with Thames Solution.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-12 py-4 bg-brand-teal text-white rounded-lg font-bold hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20">
              Browse Courses
            </button>
            <button className="px-12 py-4 bg-white border border-slate-200 text-slate-900 rounded-lg font-bold hover:bg-slate-50 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
