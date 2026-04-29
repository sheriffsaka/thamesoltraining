import { Shield, HeartHandshake, PhoneCall, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function Safeguarding() {
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <section className="bg-white py-24 text-slate-900 relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight font-serif">Safeguarding</h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
            Helping and supporting our students to ensure a safe, inclusive, and protected learning environment for everyone.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Our Commitment</h2>
              <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                Thames Solution Training & Consultancy Ltd is committed to safeguarding and promoting the welfare of all our learners. We believe that everyone has the right to live and learn in an environment that is free from harm, neglect, and abuse.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Zero Tolerance for Abuse',
                  'Inclusive Culture',
                  'Confidential Support',
                  'Dedicated Officers',
                  'Regular Staff Training',
                  'Whistleblowing Policy'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 shadow-xl">
                    <Shield className="text-brand-teal" size={18} />
                    <span className="font-bold text-sm text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 text-slate-900 shadow-2xl border border-slate-100">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-4 font-serif">
                 <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal">
                    <PhoneCall size={24} />
                 </div>
                 Need Immediate Help?
              </h3>
              <p className="text-slate-600 mb-8 font-medium">
                If you have a concern about your safety or the safety of another student, please contact our Lead Safeguarding Officer immediately.
              </p>
              <div className="space-y-4">
                <a href="tel:07426566335" className="flex items-center justify-center gap-3 w-full bg-brand-teal text-white py-5 rounded-2xl font-bold transition-all shadow-xl shadow-brand-teal/20">
                   Call Safeguarding Line: 07426566335
                </a>
                <a href="mailto:admin@thamessolutiontraining.co.uk" className="flex items-center justify-center gap-3 w-full bg-slate-50 border border-slate-100 py-5 rounded-2xl font-bold text-slate-600 hover:bg-slate-100 transition-all">
                   Email: safeguarding@thamessolutiontraining.co.uk
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-12">
             <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 font-serif">External Support Links</h3>
                <div className="space-y-6">
                   {[
                     { name: 'NSPCC', url: 'https://www.nspcc.org.uk', desc: 'Advice on child protection and safety.' },
                     { name: 'Childline', url: 'https://www.childline.org.uk', desc: 'Confidential support for young people.' },
                     { name: 'Citizens Advice', url: 'https://www.citizensadvice.org.uk', desc: 'Legal and personal support services.' },
                     { name: 'Mind', url: 'https://www.mind.org.uk', desc: 'Mental health support and information.' },
                   ].map((link) => (
                     <a 
                       key={link.name} 
                       href={link.url} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="block group p-6 bg-slate-50 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-brand-teal/20 shadow-sm hover:shadow-xl"
                     >
                       <div className="flex justify-between items-center mb-2">
                         <h4 className="font-bold text-slate-800 group-hover:text-brand-teal transition-colors">{link.name}</h4>
                         <ExternalLink size={16} className="text-slate-400 group-hover:text-brand-teal transition-colors" />
                       </div>
                       <p className="text-xs text-slate-500 font-medium">{link.desc}</p>
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
