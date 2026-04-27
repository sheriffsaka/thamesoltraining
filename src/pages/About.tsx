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
    <div className="bg-brand-dark min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-teal rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 font-serif"
          >
            Empowering Careers Through <br /> <span className="text-brand-teal">Expert Training</span>
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
      <section className="py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className="text-4xl font-bold text-brand-teal mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 uppercase tracking-widest font-bold font-sans">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-slate-900 font-serif">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
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
                  <CheckCircle2 className="text-brand-accent" size={20} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-brand-surface rounded-[3rem] border border-slate-200 flex items-center justify-center overflow-hidden">
               <Users size={200} className="text-brand-teal/20" />
               <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-60" />
            </div>
            <div className="absolute -bottom-6 -right-6 p-8 bg-brand-teal rounded-3xl text-white shadow-xl max-w-xs">
               <p className="text-lg font-bold">"Excellence is not an act, but a habit."</p>
               <p className="text-sm text-white/70 mt-2">— Our Founding Principle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-brand-surface border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif">Ready to take the next step?</h2>
          <p className="text-slate-600 mb-10 text-lg">Join thousands of successful graduates who have transformed their careers with Thames Solution.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-brand-teal text-white rounded-full font-bold hover:bg-brand-accent transition-all shadow-lg shadow-brand-teal/20">
              Browse Courses
            </button>
            <button className="px-10 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-brand-surface transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
