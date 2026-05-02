import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Calendar, User, FileText, Download, Printer, Share2 } from 'lucide-react';

const POLICY_DATA: Record<string, any> = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'May 2024',
    content: `
      ## 1. Introduction
      Thames Solution Training & Consultancy Ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.

      ## 2. Information Collection
      We collect information that you provide directly to us when you:
      - Register for a course
      - Sign up for our newsletter
      - Contact us via email or phone
      - Use our Learning Management System (LMS)

      ## 3. How We Use Your Information
      We use the personal information we collect to:
      - Process your course registrations
      - Provide learner support and feedback
      - Send administrative information, such as updates on certificates
      - Comply with regulatory requirements from awarding bodies and government agencies

      ## 4. Data Sharing
      We may share your data with:
      - Accrediting awarding bodies (to process your qualifications)
      - Government departments where required by law (e.g., Department for Education)
      - Third-party service providers that perform services for us

      ## 5. Your Rights
      Under the GDPR, you have the right to access, rectify, or erase your personal data. You also have the right to object to the processing of your data in certain circumstances.
    `
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'May 2024',
    content: `
      ## 1. Enrollment
      By enrolling in a course with Thames Solution, you agree to abide by these terms and conditions.

      ## 2. Fees and Payments
      Tuition fees must be paid according to the agreed schedule. Failure to pay may result in a delay in processing certificates or exclusion from the course.

      ## 3. Cancellations and Refunds
      Cancellations made within 14 days of enrollment are eligible for a full refund, provided the course has not commenced.

      ## 4. Intellectual Property
      All training materials provided are the property of Thames Solution or its partners and are for individual use only. Redistribution is strictly prohibited.
    `
  },
  gdpr: {
    title: 'Data Protection (GDPR)',
    lastUpdated: 'May 2024',
    content: `
      ## Our Commitment
      TMS Training & Consultancy is a registered data controller. We adhere to the seven principles of GDPR:
      1. Lawfulness, fairness and transparency
      2. Purpose limitation
      3. Data minimisation
      4. Accuracy
      5. Storage limitation
      6. Integrity and confidentiality
      7. Accountability

      ## Subject Access Requests
      You can make a Subject Access Request (SAR) at any time to see what data we hold about you. We will respond within 30 days.
    `
  }
};

export function PolicyDetail() {
  const { id } = useParams<{ id: string }>();
  const policy = POLICY_DATA[id || ''] || {
    title: (id?.replace('-', ' ') || 'Policy').toUpperCase(),
    lastUpdated: 'January 2024',
    content: 'Full policy documentation is currently being archived. Please contact our compliance department for the latest version of this document.'
  };

  if (!id) return <Navigate to="/policy" />;

  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="py-24 border-b border-slate-900 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-brand-teal font-black uppercase tracking-[0.3em] text-[10px] mb-8">
            <ShieldCheck size={16} />
            <span>TMS Official Document</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-10 font-serif tracking-tighter leading-none">
            {policy.title}
          </h1>
          <div className="flex flex-wrap gap-10 items-center text-slate-500 font-bold border-t border-slate-200 pt-10 mt-10">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-brand-teal" />
              <span className="text-sm">Revised: {policy.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-3">
              <User size={18} className="text-brand-teal" />
              <span className="text-sm">Owner: Compliance Dept</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-brand-teal" />
              <span className="text-sm">Status: Active</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900">
              <div className="whitespace-pre-line">
                {policy.content}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-40 space-y-6">
              <div className="bg-slate-900 p-8 rounded-lg text-white">
                <h4 className="text-lg font-bold mb-6 font-serif">Document Actions</h4>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-brand-teal transition-all group">
                    <span className="text-xs font-bold uppercase tracking-widest">Download PDF</span>
                    <Download size={18} className="opacity-40 group-hover:opacity-100" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-brand-teal transition-all group">
                    <span className="text-xs font-bold uppercase tracking-widest">Print Notice</span>
                    <Printer size={18} className="opacity-40 group-hover:opacity-100" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-brand-teal transition-all group">
                    <span className="text-xs font-bold uppercase tracking-widest">Share Legal</span>
                    <Share2 size={18} className="opacity-40 group-hover:opacity-100" />
                  </button>
                </div>
              </div>
              
              <div className="p-8 border border-slate-100 rounded-lg">
                <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Contact Legal</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  For specific queries regarding this policy, please email:
                  <br />
                  <span className="text-slate-900 font-bold block mt-2">info@thamessolution.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
