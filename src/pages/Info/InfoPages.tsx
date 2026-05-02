import { ShieldAlert, BookText, Globe } from 'lucide-react';

export function InfoPage({ type }: { type: 'prevent' | 'values' | 'employability' }) {
  const content = {
    prevent: {
      title: 'Prevent Duty',
      subtitle: 'TMS Commitment to Safeguarding',
      text: 'The Prevent Duty is part of the Counter-Terrorism and Security Act 2015. It requires all education providers to have "due regard to the need to prevent people from being drawn into terrorism". At Thames Solution, we take this responsibility seriously through staff training, curriculum integration, and robust reporting mechanisms.',
      icon: ShieldAlert,
      details: [
        {
          title: 'Our Responsibility',
          desc: 'We are committed to building learners\' resilience to radicalisation by promoting fundamental British values and enabling them to challenge extremist views. It is not about spying on students or restricting freedom of speech, but rather about ensuring a safe environment for all.'
        },
        {
          title: 'Identification and Support',
          desc: 'Our staff are trained to identify signs that a learner may be vulnerable to radicalisation. We work closely with local authorities and the Channel panel to provide support when concerns are raised.'
        },
        {
          title: 'Digital Safety',
          desc: 'We implement robust filtering and monitoring systems to ensure our learners are safe while using ICT equipment and the internet within our premises.'
        }
      ]
    },
    values: {
      title: 'British Values',
      subtitle: 'Core Principles of Our Community',
      text: 'Thames Solution Training & Consultancy Ltd actively promotes the fundamental British values of democracy, the rule of law, individual liberty, and mutual respect and tolerance of those with different faiths and beliefs. These values are embedded throughout our curriculum and organizational culture.',
      icon: Globe,
      details: [
        {
          title: 'Democracy',
          desc: 'We value the voice of our learners. Through surveys, feedback sessions, and open discussions, we ensure that our community has a say in how we operate and how learning is delivered.'
        },
        {
          title: 'The Rule of Law',
          desc: 'We promote an environment where there is a clear understanding that rules are for the protection of all. Our policies are transparent and applied fairly and consistently.'
        },
        {
          title: 'Individual Liberty',
          desc: 'Learners are supported to make informed choices and exercise their rights in a safe and supportive environment. We empower our students to be independent and self-confident.'
        },
        {
          title: 'Mutual Respect and Tolerance',
          desc: 'Diversity is our strength. We foster a culture where different backgrounds, faiths, and beliefs are respected and celebrated, and where discrimination is never tolerated.'
        }
      ]
    },
    employability: {
      title: 'Employability Support',
      subtitle: 'Empowering Your Professional Journey',
      text: 'Our employability services are designed to bridge the gap between qualification and vocation. We understand that a certificate is only one part of professional success; the ability to navigate the job market is the other.',
      icon: BookText,
      details: [
        {
          title: 'CV and Application Workshops',
          desc: 'We provide expert guidance on crafting professional CVs and cover letters that stand out to employers in the health and social care sectors.'
        },
        {
          title: 'Interview Preparation',
          desc: 'Our mock interviews and technique workshops help build confidence and prepare learners for the rigours of professional recruitment.'
        },
        {
          title: 'Career Guidance',
          desc: 'One-on-one sessions with career advisors help learners map out their professional progression and identify opportunities for growth.'
        },
        {
          title: 'Employer Engagement',
          desc: 'We maintain strong networks with local and national employers, providing our learners with access to exclusive job opportunities and industry insights.'
        }
      ]
    }
  }[type];

  const Icon = content.icon;

  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-end justify-between border-b-2 border-slate-900 pb-12 mb-12">
            <div className="max-w-3xl">
              <p className="text-brand-teal font-black uppercase tracking-[0.3em] text-xs mb-4">{content.subtitle}</p>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter font-serif text-slate-900">{content.title}</h1>
            </div>
            <div className="text-slate-200 hidden md:block">
              <Icon size={120} strokeWidth={1} />
            </div>
          </div>

          <div className="max-w-4xl">
            <p className="text-2xl text-slate-600 font-medium leading-relaxed mb-20 italic font-serif">
              "{content.text}"
            </p>

            <div className="space-y-24">
              {content.details.map((item, idx) => (
                <div key={idx} className="border-l-4 border-brand-teal pl-12 relative">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-brand-teal rounded-full" />
                  <h3 className="text-3xl font-bold text-slate-900 mb-6 font-serif tracking-tight">{item.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-8 font-serif">Further Information</h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              TMS Training & Consultancy is committed to transparency and the welfare of our learners. If you have questions regarding this policy or require specific support, please contact our administrative team.
            </p>
            <div className="flex gap-4">
              <button className="bg-brand-teal text-white px-10 py-4 rounded-lg font-bold hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20">
                Contact an Advisor
              </button>
              <button className="bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-lg font-bold hover:bg-slate-50 transition-all">
                Download PDF Policy
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
