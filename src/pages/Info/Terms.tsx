import { motion } from 'motion/react';
import { Scale, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function Terms() {
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-3xl flex items-center justify-center mx-auto mb-10 border border-brand-teal/20"
          >
            <Scale size={36} />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6 font-serif tracking-tight">Terms of Service</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Please read these terms carefully before enrolling in our professional training programs.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl border border-slate-100 space-y-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">1. Acceptance of Terms</h2>
            <div className="text-slate-600 leading-relaxed text-lg">
              <p>
                By accessing this website and enrolling in any course provided by Thames Solution Training & Consultancy Ltd, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">2. Enrollment & Payments</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              <p>
                Course enrollment is subject to availability and the fulfillment of any specified prerequisites.
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <CheckCircle2 className="text-brand-teal shrink-0 mt-1" size={20} />
                  <span>Fees must be paid in full at the time of enrollment unless a payment plan has been formally agreed upon.</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="text-brand-teal shrink-0 mt-1" size={20} />
                  <span>Cancellations made within 14 days of enrollment are eligible for a partial refund, subject to our refund policy.</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="text-brand-teal shrink-0 mt-1" size={20} />
                  <span>Access to course materials is granted for a specific duration, typically the length of the course plus a grace period.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">3. Academic Integrity</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg text-slate-600">
              <p>
                As a provider of accredited vocational qualifications, we maintain high standards of academic integrity. Students are required to:
              </p>
              <ul className="list-disc pl-8 space-y-4">
                <li>Submit only their own work for assessment.</li>
                <li>Avoid any form of plagiarism or academic dishonesty.</li>
                <li>Maintain professional conduct in all interactions within the LMS and during physical sessions.</li>
              </ul>
              <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100 flex gap-6 items-start">
                <AlertCircle size={24} className="text-amber-500 shrink-0" />
                <div>
                   <h4 className="font-bold text-slate-900 mb-2">Notice of Conduct</h4>
                   <p className="text-sm text-slate-600">
                     Any breach of academic integrity may lead to immediate withdrawal from the course without refund and notification to relevant awarding bodies.
                   </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-serif">4. Intellectual Property</h2>
            <div className="text-slate-600 leading-relaxed text-lg">
              <p>
                All course materials, including but not limited to videos, PDF guides, assessments, and proprietary curriculum, are the intellectual property of Thames Solution Training or its licensors. These materials are for your personal use only and may not be shared, reproduced, or distributed without written permission.
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100">
            <p className="text-slate-400 text-sm italic">
              Thames Solution Training & Consultancy Ltd. Registered in England & Wales.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
