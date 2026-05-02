import { FileText, Shield, Scale, Eye, UserCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Policy() {
  const policies = [
    { id: 'privacy', title: 'Privacy Policy', icon: Eye, color: 'text-brand-teal' },
    { id: 'terms', title: 'Terms of Service', icon: Scale, color: 'text-brand-teal' },
    { id: 'cookies', title: 'Cookie Policy', icon: FileText, color: 'text-brand-teal' },
    { id: 'gdpr', title: 'Data Protection (GDPR)', icon: Shield, color: 'text-brand-teal' },
    { id: 'conduct', title: 'Student Code of Conduct', icon: UserCheck, color: 'text-brand-teal' },
    { id: 'whistleblowing', title: 'Whistleblowing Policy', icon: MessageSquare, color: 'text-brand-teal' },
  ];

  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="py-24 border-b border-slate-900 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-teal font-black uppercase tracking-[0.4em] text-xs mb-6">TMS Compliance & Governance</p>
          <h1 className="text-5xl lg:text-8xl font-bold text-slate-900 mb-8 font-serif tracking-tighter">Policy & Procedures</h1>
          <p className="text-2xl text-slate-600 max-w-3xl font-serif leading-relaxed italic">
            "Thames Solution is committed to transparency and the highest standards of governance. Explore our official guidelines and procedures to understand our operational framework."
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-2xl">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <Link 
                key={policy.id} 
                to={`/policy/${policy.id}`}
                className="group p-12 bg-white hover:bg-slate-50 transition-all flex flex-col justify-between min-h-[350px]"
              >
                <div>
                  <div className={`w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center ${policy.color} mb-10 border border-slate-100 shadow-sm`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif tracking-tight">{policy.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    Review our standardized guidelines regarding {policy.title.toLowerCase()} to understand how we manage our operations and protect our community members.
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-4 text-brand-teal font-black text-[10px] uppercase tracking-widest transition-all">
                  Access Document 
                  <div className="w-8 h-[2px] bg-brand-teal/20 group-hover:w-16 group-hover:bg-brand-teal transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Corporate Info */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-10 font-serif tracking-tight">Governance and Accreditation</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-10">
                Thames Solution Training & Consultancy Ltd is an accredited provider for leading vocational qualifications in the UK. All our courses meet the rigorous standards set by national regulators and awarding bodies.
              </p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-t border-slate-100 pt-8 mt-12">
                Last Updated: January 2024 <span className="mx-4 text-slate-200">|</span> Next Review Scheduled: January 2025
              </p>
            </div>
            
            <div className="bg-slate-900 p-12 rounded-lg text-white">
              <h4 className="text-2xl font-bold mb-8 font-serif">Quality Assurance</h4>
              <p className="text-slate-400 font-medium leading-relaxed mb-10 italic">
                "Our policies are robustly reviewed annually to ensure they reflect the latest legislative changes and best practices in the education sector."
              </p>
              <button className="w-full bg-brand-teal text-white py-5 rounded-lg font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20">
                Contact Compliance Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
