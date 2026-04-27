import { ShieldAlert, BookText, Globe } from 'lucide-react';

export function InfoPage({ type }: { type: 'prevent' | 'values' | 'employability' }) {
  const content = {
    prevent: {
      title: 'Prevent Duty',
      subtitle: 'Protecting learners from radicalisation',
      text: 'The Prevent Duty is part of the Counter-Terrorism and Security Act 2015. It requires all education providers to have "due regard to the need to prevent people from being drawn into terrorism". At Thames Solution, we take this responsibility seriously through staff training, curriculum integration, and robust reporting mechanisms.',
      icon: ShieldAlert,
      items: ['Staff Training', 'Risk Assessment', 'Safe ICT Policies', 'Curriculum Coverage']
    },
    values: {
      title: 'British Values',
      subtitle: 'Democracy, Rule of Law, Liberty & Respect',
      text: 'Thames Solution Training & Consultancy Ltd actively promotes the fundamental British values of democracy, the rule of law, individual liberty, and mutual respect and tolerance of those with different faiths and beliefs.',
      icon: Globe,
      items: ['Democracy', 'Rule of Law', 'Individual Liberty', 'Mutual Respect']
    },
    employability: {
      title: 'Employability Support',
      subtitle: 'Your bridge to a professional career',
      text: 'Our employability services go beyond teaching. We provide CV workshops, mock interviews, and career guidance to ensure that our students are not just qualified, but job-ready.',
      icon: BookText,
      items: ['CV Workshops', 'Interview Prep', 'Career Guidance', 'Employer Networks']
    }
  }[type];

  const Icon = content.icon;

  return (
    <div className="bg-brand-dark min-h-screen pt-20">
      <section className="bg-brand-surface py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-brand-teal/10 rounded-3xl flex items-center justify-center text-brand-teal mx-auto mb-8 border border-brand-teal/20">
             <Icon size={40} />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-serif">{content.title}</h1>
          <p className="text-xl text-brand-teal font-bold">{content.subtitle}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="prose prose-invert prose-lg max-w-none mb-16">
          <p className="text-slate-400 leading-relaxed text-xl mb-12">
            {content.text}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.items.map((item) => (
              <div key={item} className="p-8 bg-brand-card border border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all group">
                <h4 className="text-lg font-bold text-white group-hover:text-brand-teal transition-colors">{item}</h4>
                <div className="w-10 h-1 bg-brand-teal/30 group-hover:bg-brand-teal mt-4 rounded-full transition-all" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-brand-card border border-white/5 rounded-[3rem] p-12 text-white text-center shadow-2xl">
           <h3 className="text-2xl font-bold mb-6 font-serif">Need more information?</h3>
           <p className="text-slate-400 mb-8 max-w-xl mx-auto">Our advisors are always available to discuss our policies and support services with you.</p>
           <button className="bg-brand-teal text-white px-10 py-4 rounded-full font-bold hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20">
             Contact an Advisor
           </button>
        </div>
      </section>
    </div>
  );
}
