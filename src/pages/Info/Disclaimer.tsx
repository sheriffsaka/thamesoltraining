import { AlertTriangle, Hammer, ShieldAlert, Scale } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-teal/[0.03] -skew-x-12 translate-x-32" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-brand-teal font-black uppercase tracking-[0.4em] text-xs mb-6">Legal Notice & Disclosure</p>
            <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter font-serif text-slate-900 leading-none">Disclaimer</h1>
            <p className="text-2xl text-slate-600 mt-8 font-serif leading-relaxed italic">
              "Official legal statements regarding the use of our services, information accuracy, and institutional liability."
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-20">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-brand-teal mb-6">
                <Scale size={24} />
                <h2 className="text-3xl font-bold font-serif text-slate-900">General Information Notice</h2>
              </div>
              <p className="text-xl text-slate-600 leading-relaxed font-semibold font-serif">
                The information provided by Thames Solution Training & Consultancy Ltd ("we," "us," or "our") on this website is for general educational and informational purposes only.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-brand-teal mb-6">
                <Hammer size={24} />
                <h2 className="text-3xl font-bold font-serif text-slate-900">Professional Disclaimer</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                This site cannot and does not contain legal or vocational advice. The vocational training information is provided for general informational and educational purposes only and is not a substitute for professional advice.
              </p>
              <div className="bg-slate-50 p-8 border-l-4 border-slate-900 rounded-r-lg">
                <p className="text-slate-900 font-bold uppercase tracking-widest text-[10px] mb-4">Urgent Notice</p>
                <p className="text-slate-600 font-bold italic">
                  "Before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. The use or reliance of any information contained on this site is solely at your own risk."
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-brand-teal mb-6">
                <ShieldAlert size={24} />
                <h2 className="text-3xl font-bold font-serif text-slate-900">External Links</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                The site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-40 bg-white border-2 border-slate-100 p-10 rounded-xl shadow-2xl">
              <AlertTriangle className="text-brand-teal mb-6" size={40} />
              <h4 className="text-2xl font-bold text-slate-900 font-serif mb-4 tracking-tighter">Limitation of Liability</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                In no event shall we be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the service or the contents of the service.
              </p>
              <button className="w-full bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] py-5 rounded-lg hover:bg-brand-teal transition-all">
                Acknowledge Terms
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 border-t border-slate-100 italic text-slate-400 text-sm font-medium text-center">
        Thames Solution Training & Consultancy Ltd reserves the right to make additions, deletions, or modifications to the contents on the service at any time without prior notice.
      </section>
    </div>
  );
}
