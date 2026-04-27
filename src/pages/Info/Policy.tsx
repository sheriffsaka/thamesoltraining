import { FileText, Shield, Scale, Eye, UserCheck, MessageSquare } from 'lucide-react';

export function Policy() {
  const policies = [
    { title: 'Privacy Policy', icon: Eye, color: 'text-blue-400' },
    { title: 'Terms of Service', icon: Scale, color: 'text-amber-400' },
    { title: 'Cookie Policy', icon: FileText, color: 'text-brand-teal' },
    { title: 'Data Protection (GDPR)', icon: Shield, color: 'text-brand-accent' },
    { title: 'Student Code of Conduct', icon: UserCheck, color: 'text-indigo-400' },
    { title: 'Whistleblowing', icon: MessageSquare, color: 'text-rose-400' },
  ];

  return (
    <div className="bg-brand-dark min-h-screen pt-20">
      <section className="py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 font-serif">Policy & Procedures</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Thames Solution is committed to transparency and the highest standards of governance. Explore our official guidelines and procedures.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div key={policy.title} className="group p-10 bg-brand-card border border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all cursor-pointer">
                <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center ${policy.color} mb-8 border border-white/10 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{policy.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Review our guidelines regarding {policy.title.toLowerCase()} to understand how we manage our operations and protect our community.
                </p>
                <button className="text-brand-teal font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  Read Policy <div className="w-8 h-px bg-brand-teal/30 group-hover:bg-brand-teal group-hover:w-12 transition-all" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Corporate Info */}
      <section className="py-24 bg-brand-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 font-serif">Governance and Accreditation</h2>
            <div className="space-y-8">
              <div className="p-8 bg-brand-card rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-4">Awarding Bodies</h4>
                <p className="text-slate-400 text-sm italic">
                  Thames Solution Training & Consultancy Ltd is an accredited provider for leading vocational qualifications in the UK. All our courses meet the rigorous standards set by national regulators.
                </p>
              </div>
              <p className="text-slate-500 text-sm">
                Last Updated: January 2024. Next Review Scheduled: January 2025.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
