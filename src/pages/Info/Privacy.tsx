import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export function Privacy() {
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-3xl flex items-center justify-center mx-auto mb-10 border border-brand-teal/20"
          >
            <Shield size={36} />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6 font-serif tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Your trust is our most significant asset. Learn how Thames Solution protects and manages your personal data.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl border border-slate-100 space-y-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">1. Information We Collect</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                We collect personal information that you voluntarily provide to us when you register for a course, sign up for our newsletter, or contact us through our website.
              </p>
              <ul className="list-disc pl-8 space-y-4">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and mailing address.</li>
                <li><strong>Academic Data:</strong> Educational background, certifications, and professional experience.</li>
                <li><strong>Payment Data:</strong> Billing information for course enrollments.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">2. How We Use Your Information</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                We use the information we collect to provide, maintain, and improve our training services. This includes:
              </p>
              <ul className="list-disc pl-8 space-y-4">
                <li>Processing your course enrollment and certification.</li>
                <li>Communicating with you regarding your studies.</li>
                <li>Ensuring compliance with UK educational regulations and awarding body requirements.</li>
                <li>Sending you updates and marketing communications (with your consent).</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">3. Data Sharing & Security</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                Thames Solution does not sell your personal data to third parties. We only share information with:
              </p>
              <ul className="list-disc pl-8 space-y-4">
                <li><strong>Awarding Bodies:</strong> To process your certifications and credits.</li>
                <li><strong>Regulatory Authorities:</strong> To comply with legal obligations and educational standards.</li>
                <li><strong>Service Providers:</strong> Partners who help us deliver our LMS and communication services.</li>
              </ul>
              <div className="p-8 bg-brand-teal/5 rounded-3xl border border-brand-teal/10 mt-8">
                <p className="text-slate-800 font-bold mb-4 flex items-center gap-3">
                  <Lock size={20} className="text-brand-teal" />
                  Security Commitment
                </p>
                <p className="text-sm">
                  We use industry-standard encryption and security protocols to protect your data from unauthorized access, disclosure, or misuse.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100">
            <p className="text-slate-400 text-sm italic">
              Last Updated: April 29, 2026. For any privacy-related inquiries, please contact our Data Protection Officer at admin@thamessolutiontraining.co.uk
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
