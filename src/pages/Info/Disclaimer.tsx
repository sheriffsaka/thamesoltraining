import { AlertTriangle, Info, ShieldCheck } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <section className="py-24 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900">
          <div className="w-20 h-20 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-8 border border-amber-400/20 shadow-inner">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 font-serif tracking-tight">Disclaimer</h1>
          <p className="text-slate-400 max-w-2xl mx-auto uppercase tracking-[0.3em] font-black text-xs">
            Legal notice & terms of use
          </p>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-4 font-serif mb-8">
              <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal">
                <Info size={20} />
              </div>
              Information Accuracy
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              The information provided on this website is for general informational purposes only. While we strive to keep the information up-to-date and correct, Thames Solution Training & Consultancy Ltd makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>
          </div>

          <div className="p-12 bg-white rounded-[3rem] border border-slate-100 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-4 font-serif mb-8">
              <div className="w-10 h-10 bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal">
                <ShieldCheck size={20} />
              </div>
              Course Accreditation
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Course details, including pricing, dates, and accreditation status, are subject to change without notice. Official enrollment documentation provided upon registration will serve as the final authority on course specifications.
            </p>
          </div>

          <div className="space-y-6 px-10">
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-xs">Limitation of Liability</h4>
            <p className="text-slate-400 text-sm italic font-medium leading-relaxed">
              In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
          </div>

          <div className="p-10 border-l-4 border-brand-teal bg-white rounded-r-[2rem] shadow-xl">
            <p className="text-slate-500 text-sm mb-0 font-medium leading-relaxed italic">
              Through this website you are able to link to other websites which are not under the control of Thames Solution. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
