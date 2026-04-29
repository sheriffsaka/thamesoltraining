import { Users, Target, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export function About() {
  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Qualified Students', value: '5K+' },
    { label: 'Expert Instructors', value: '50+' },
    { label: 'Success Rate', value: '98%' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-teal rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-slate-900">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold mb-8 font-serif"
          >
            Empowering Careers Through <br /> <span className="text-brand-teal font-sans italic">Expert Training</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Thames Solution Training & Consultancy Ltd is a leading provider of professional training and vocational qualifications in London. We bridge the gap between ambition and employment.
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
                className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl"
              >
                <div className="text-4xl font-bold text-brand-teal mb-2">{stat.value}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-black font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-slate-900">
            <h2 className="text-4xl font-bold font-serif">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              To provide high-quality, accessible, and inclusive training that empowers individuals to achieve their full potential and secure meaningful employment. We are dedicated to excellence in education and consultancy.
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
            <div className="aspect-square bg-white rounded-[3rem] border border-slate-100 flex items-center justify-center overflow-hidden shadow-2xl">
               <Users size={200} className="text-brand-teal/5" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent opacity-60" />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute -bottom-6 -right-6 p-8 bg-brand-teal rounded-3xl text-white shadow-2xl max-w-xs"
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
            <button className="px-12 py-4 bg-brand-teal text-white rounded-2xl font-bold hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20">
              Browse Courses
            </button>
            <button className="px-12 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
