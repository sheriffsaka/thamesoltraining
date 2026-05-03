import { useState, useEffect } from 'react';
import { Shield, HeartHandshake, PhoneCall, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '@/src/lib/supabase';

export function Safeguarding() {
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const { data } = await supabase.from('site_contents').select('*').eq('id', 'safeguarding_policy').single();
      if (data) {
        setCmsContent(data.content);
      }
      setLoading(false);
    }
    fetchContent();
  }, []);

  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden border-b border-slate-100 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=2000" 
            alt="Supportive Office Consultation" 
            className="w-full h-full object-cover opacity-60 shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <p className="text-brand-teal font-black uppercase tracking-[0.4em] text-xs mb-6">Safe & Inclusive Environment</p>
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 tracking-tighter font-serif text-white leading-none">
            {cmsContent?.title || 'Safeguarding'} Hub
          </h1>
          <p className="text-xl lg:text-2xl text-slate-300 max-w-3xl font-medium mb-12 leading-relaxed">
            Protecting our learners, staff, and visitors is our highest priority. We provide a safe, supportive, and inclusive environment for everyone to achieve their potential.
          </p>
          <p className="text-2xl text-slate-300 max-w-2xl font-serif leading-relaxed italic border-l-4 border-brand-teal pl-8">
            "{cmsContent?.content?.substring(0, 150)}..."
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif tracking-tight">Our Commitment</h2>
              <div className="text-slate-600 leading-relaxed mb-10 font-medium text-lg whitespace-pre-wrap">
                {cmsContent?.content || `Thames Solution Training & Consultancy Ltd is committed to safeguarding and promoting the welfare of all our learners. We believe that everyone has the right to live and learn in an environment that is free from harm, neglect, and abuse.`}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  'Zero Tolerance for Abuse',
                  'Inclusive Culture',
                  'Confidential Support',
                  'Dedicated Officers',
                  'Regular Staff Training',
                  'Whistleblowing Policy'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-6 bg-white rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <Shield className="text-brand-teal shrink-0" size={20} />
                    <span className="font-bold text-sm text-slate-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-4 font-serif">
                   <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-brand-teal">
                      <PhoneCall size={24} />
                   </div>
                   Urgent Support
                </h3>
                <p className="text-slate-400 mb-10 font-medium text-lg italic">
                  "If you have a concern about your safety or the safety of another student, please contact our Lead Safeguarding Officer immediately."
                </p>
                <div className="space-y-4">
                  <a href="tel:07426566335" className="flex items-center justify-center gap-3 w-full bg-brand-teal text-white py-5 rounded-lg font-black uppercase tracking-widest text-xs transition-all hover:bg-brand-accent shadow-xl shadow-brand-teal/20">
                     Call: 07426566335
                  </a>
                  <a href="mailto:safeguarding@thamessolution.com" className="flex items-center justify-center gap-3 w-full bg-white/5 border border-white/10 py-5 rounded-lg font-black uppercase tracking-widest text-xs text-white hover:bg-white/10 transition-all">
                     Email Safeguarding
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
             <div className="bg-white rounded-lg p-12 border border-slate-100 shadow-2xl">
                <h3 className="text-3xl font-bold text-slate-900 mb-10 font-serif tracking-tight">External Agencies</h3>
                <div className="space-y-6">
                   {[
                     { name: 'NSPCC', url: 'https://www.nspcc.org.uk', desc: 'Expert guidance on child protection and safety standards.' },
                     { name: 'Childline', url: 'https://www.childline.org.uk', desc: '24/7 confidential support for young people across the UK.' },
                     { name: 'Citizens Advice', url: 'https://www.citizensadvice.org.uk', desc: 'Comprehensive legal and personal support services.' },
                     { name: 'Mind', url: 'https://www.mind.org.uk', desc: 'Specialized mental health support and crisis information.' },
                   ].map((link) => (
                     <a 
                       key={link.name} 
                       href={link.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block group p-8 bg-slate-50 rounded-lg hover:bg-slate-900 transition-all border border-transparent shadow-sm"
                     >
                       <div className="flex justify-between items-center mb-4">
                         <h4 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors font-serif">{link.name}</h4>
                         <ExternalLink size={18} className="text-brand-teal group-hover:text-white transition-colors" />
                       </div>
                       <p className="text-slate-500 font-medium leading-relaxed group-hover:text-slate-400 transition-colors">{link.desc}</p>
                     </a>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>

  );
}
