import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'motion/react';

export function Contact() {
  return (
    <div className="bg-brand-dark min-h-screen pt-20">
      <section className="py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-serif">Get in Touch</h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Have questions about our courses or consultancy services? Our team is here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-brand-surface p-10 rounded-[2.5rem] border border-white/5 space-y-8 shadow-2xl">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal shrink-0 border border-brand-teal/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Our Office</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Capital House, 2nd Floor,<br />
                      47 Rushey Green, Catford,<br />
                      London SE6 4AS
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent shrink-0 border border-brand-accent/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Phone</h4>
                    <p className="text-slate-400 text-sm">07426566335</p>
                    <p className="text-slate-500 text-xs mt-1">Mon-Fri: 9am - 5pm</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal shrink-0 border border-brand-teal/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Email</h4>
                    <p className="text-slate-400 text-sm">admin@thamessolutiontraining.co.uk</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 shrink-0 border border-white/10">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Office Hours</h4>
                    <p className="text-slate-400 text-sm">Monday - Friday: 09:00 - 17:00</p>
                    <p className="text-slate-400 text-sm">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="bg-brand-surface p-12 rounded-[3rem] border border-white/5 shadow-22xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-brand-teal transition-all placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-brand-teal transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-sm font-bold text-slate-400 ml-2">Subject</label>
                  <select className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-brand-teal transition-all appearance-none cursor-pointer">
                    <option className="bg-brand-dark">Course Inquiry</option>
                    <option className="bg-brand-dark">Consultancy Services</option>
                    <option className="bg-brand-dark">LMS Support</option>
                    <option className="bg-brand-dark">Other</option>
                  </select>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-sm font-bold text-slate-400 ml-2">Message</label>
                  <textarea 
                    rows={6}
                    placeholder="Tell us what you're looking for..."
                    className="w-full bg-brand-dark border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-brand-teal transition-all placeholder:text-slate-500 resize-none"
                  ></textarea>
                </div>

                <button type="button" className="w-full py-5 bg-brand-teal text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-accent transition-all shadow-xl shadow-brand-teal/20 group">
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-brand-surface relative grayscale hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold border-t border-white/5">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 opacity-20" />
            <p>Interactive Map Integration</p>
          </div>
        </div>
      </section>
    </div>
  );
}
