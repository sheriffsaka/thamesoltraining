import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, Award, Shield, ArrowLeft, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const mockCourse = {
  id: '1',
  title: 'Health and Social Care Level 3 Diploma',
  category: 'Healthcare',
  longDesc: `The Level 3 Diploma in Adult Care (RQF) is for learners who work in adult care settings and wish to develop their skills and knowledge to a professional standard. This qualification validates the skills and knowledge required for safe and effective practice.

Learners will develop advanced communication skills, understand person-centred care, and lead best practices in health and social care settings.`,
  outcomes: [
    'Advanced communication in care settings',
    'Personal development as a healthcare professional',
    'Equality and inclusion in adult care',
    'Duty of care in health and social care',
    'The role of the health and social care worker',
    'Handling information in care settings',
    'Health and safety in social care',
    'Principles of safeguarding and protection',
    'Lead person-centred assessment and planning'
  ],
  duration: '12 Months',
  requirements: [
    'Minimum 18 years of age',
    'Currently working in a care setting (recommended)',
    'Satisfactory literacy and numeracy skills',
    'Valid identification'
  ],
  certification: 'Level 3 Diploma (RQF) Accredited by TQUK / NCFE',
  image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
};

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-brand-dark min-h-screen pt-20">
      {/* Hero Header */}
      <section className="relative h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={mockCourse.image} alt={mockCourse.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-white">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-brand-teal transition-colors mb-8 font-bold text-xs uppercase tracking-widest bg-white/5 backdrop-blur px-4 py-2 rounded-full border border-white/10 shadow-sm"
          >
            <ArrowLeft size={16} />
            Back to Courses
          </motion.button>
          <div className="flex flex-col gap-6">
            <span className="px-4 py-1.5 bg-brand-teal text-white rounded-full text-[10px] font-bold w-fit uppercase tracking-widest">
              {mockCourse.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl font-serif leading-tight select-none">{mockCourse.title}</h1>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-white mb-8 font-serif flex items-center gap-4">
                <div className="w-10 h-1 bg-brand-teal rounded-full" />
                Course Description
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-line font-medium">
                {mockCourse.longDesc}
              </p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold text-white mb-8 font-serif flex items-center gap-4">
                <div className="w-10 h-1 bg-brand-teal rounded-full" />
                What You Will Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCourse.outcomes.map((outcome, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-brand-surface border border-white/5 hover:border-brand-teal/20 transition-all group shadow-2xl">
                    <CheckCircle2 className="text-brand-teal shrink-0 group-hover:scale-110 transition-transform" size={20} />
                    <span className="text-slate-300 font-medium text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
              >
                <h2 className="text-xl font-bold text-white mb-8 font-serif flex items-center gap-4">
                  <div className="w-10 h-1 bg-brand-teal rounded-full" />
                  Requirements
                </h2>
                <ul className="space-y-4">
                  {mockCourse.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-400 font-medium">
                      <div className="w-2 h-2 rounded-full border border-brand-teal bg-brand-teal/20" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-brand-surface rounded-[2.5rem] p-10 border border-white/5 self-start shadow-2xl space-y-8"
              >
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-teal shadow-sm">
                    <Award size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-1.5">Certification</h4>
                    <p className="text-white font-bold leading-tight font-serif">{mockCourse.certification}</p>
                  </div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-teal shadow-sm">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-1.5">Accreditation</h4>
                    <p className="text-white font-bold leading-tight font-serif">Nationally Recognized (RQF)</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar / CTA */}
          <aside className="space-y-8">
            <div className="sticky top-28 bg-brand-surface border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-teal/10 transition-all" />
              
              <div className="relative z-10 text-center">
                <div className="mb-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-brand-dark border border-white/5 rounded-3xl flex items-center justify-center text-brand-teal">
                      <Clock size={36} />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 text-center">Duration</h3>
                  <p className="text-3xl font-bold text-white font-serif">{mockCourse.duration}</p>
                </div>

                <div className="space-y-6">
                  <button 
                    onClick={() => setIsApplying(true)}
                    className="w-full bg-brand-teal text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20"
                  >
                    Enroll Now
                  </button>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest pt-6 border-t border-white/5">
                    Limited Seats Available
                  </p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {isApplying && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplying(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-brand-surface rounded-[2.5rem] shadow-2xl border border-white/5 scrollbar-hide"
            >
              {formStatus === 'success' ? (
                <div className="p-10 lg:p-16 text-center">
                  <div className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-teal/20">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 font-serif">Application Received!</h2>
                  <p className="text-slate-400 mb-8 text-base leading-relaxed">
                    Thank you for applying for the <strong>{mockCourse.title}</strong>. Our admissions team will review your application and contact you within 48 hours.
                  </p>
                  <button 
                    onClick={() => setIsApplying(false)}
                    className="w-full bg-brand-teal text-white py-4 rounded-xl font-bold text-base hover:bg-brand-accent transition-all"
                  >
                    Back to Course
                  </button>
                </div>
              ) : (
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white font-serif mb-2">Apply for Course</h2>
                    <p className="text-brand-teal font-bold text-[10px] uppercase tracking-widest">Submit your details to get started</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          required
                          type="text"
                          placeholder="Your Full Name"
                          className="w-full pl-14 pr-6 py-4 bg-brand-dark border border-white/10 rounded-xl focus:border-brand-teal outline-none text-white transition-all placeholder:text-slate-500"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          className="w-full pl-14 pr-6 py-4 bg-brand-dark border border-white/10 rounded-xl focus:border-brand-teal outline-none text-white transition-all placeholder:text-slate-500"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          required
                          type="tel"
                          placeholder="Phone Number"
                          className="w-full pl-14 pr-6 py-4 bg-brand-dark border border-white/10 rounded-xl focus:border-brand-teal outline-none text-white transition-all placeholder:text-slate-500"
                        />
                      </div>
                      <div className="relative">
                        <MessageSquare className="absolute left-5 top-5 text-slate-500" size={18} />
                        <textarea
                          placeholder="Any specific questions or goals?"
                          rows={3}
                          className="w-full pl-14 pr-6 py-4 bg-brand-dark border border-white/10 rounded-xl focus:border-brand-teal outline-none text-white transition-all placeholder:text-slate-500 resize-none"
                        />
                      </div>
                    </div>


                    <button
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-brand-teal text-white py-4 rounded-xl font-bold text-base hover:bg-brand-accent transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : 'Submit Application'}
                    </button>
                    
                    <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">
                      Secure Application • Privacy Guaranteed
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
