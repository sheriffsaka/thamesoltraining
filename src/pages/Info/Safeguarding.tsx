import { Shield, HeartHandshake, PhoneCall, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function Safeguarding() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-teal/[0.03] -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 tracking-tighter font-serif text-slate-900 leading-none">Safeguarding</h1>
          <p className="text-2xl text-slate-600 max-w-2xl font-serif leading-relaxed italic">
            "Helping and supporting our students to ensure a safe, inclusive, and protected learning environment for everyone."
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 font-serif tracking-tight">Our Commitment</h2>
              <p className="text-slate-600 leading-relaxed mb-10 font-medium text-lg">
                Thames Solution Training & Consultancy Ltd is committed to safeguarding and promoting the welfare of all our learners. We believe that everyone has the right to live and learn in an environment that is free from harm, neglect, and abuse.
              </p>
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
