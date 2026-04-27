import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="bg-brand-dark min-h-screen pt-20">
      <section className="py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-400 mx-auto mb-8 border border-amber-400/20">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 font-serif">Disclaimer</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto uppercase tracking-widest font-bold text-sm">
            Legal notice & terms of use
          </p>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-invert prose-lg max-w-none space-y-12">
          <div className="p-10 bg-brand-card rounded-[2.5rem] border border-white/5">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 font-serif mb-6">
              <Info className="text-brand-teal" />
              Information Accuracy
            </h3>
            <p className="text-slate-400">
              The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and correct, Thames Solution Training & Consultancy Ltd makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>
          </div>

          <div className="p-10 bg-brand-card rounded-[2.5rem] border border-white/5">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 font-serif mb-6">
              <ShieldCheck className="text-brand-accent" />
              Course Accreditation
            </h3>
            <p className="text-slate-400">
              Course details, including pricing, dates, and accreditation status, are subject to change without notice. Official enrollment documentation provided upon registration will serve as the final authority on course specifications.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-bold">Limitation of Liability</h4>
            <p className="text-slate-500 text-sm italic">
              In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
          </div>

          <div className="p-8 border-l-4 border-brand-teal bg-brand-card/50">
            <p className="text-slate-400 text-sm mb-0">
              Through this website you are able to link to other websites which are not under the control of Thames Solution. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
