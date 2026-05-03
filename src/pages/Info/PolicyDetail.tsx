import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Calendar, User, FileText, Download, Printer, Share2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

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
  const [cmsContent, setCmsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      if (!id) return;
      const contentId = `p_${id}`;
      const { data } = await supabase.from('site_contents').select('*').eq('id', contentId).single();
      if (data) {
        setCmsContent(data.content);
      }
      setLoading(false);
    }
    fetchContent();
  }, [id]);

  const defaultPolicy = POLICY_DATA[id || ''] || {
    title: id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Policy',
    lastUpdated: 'May 2024',
    content: 'The official documentation for this procedure is currently undergoing revision. Please contact our compliance office for the latest authorized version.'
  };

  if (!id) return <Navigate to="/policy" />;

  const displayTitle = cmsContent?.title || defaultPolicy.title;
  const displayContent = cmsContent?.content || defaultPolicy.content;

  return (
    <div className="bg-white min-h-screen pt-20">
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-teal/[0.03] -skew-x-12 translate-x-24" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-3 text-brand-teal font-black uppercase tracking-[0.3em] text-[10px] mb-8">
            <ShieldCheck size={16} />
            <span>TMS Official Document</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-10 font-serif tracking-tight leading-tight">
            {displayTitle}
          </h1>
          <div className="flex flex-wrap gap-8 items-center text-slate-400 font-bold border-t border-slate-200 pt-10 mt-10">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-300" />
              <span className="text-xs uppercase tracking-widest">Revised: {cmsContent?.updated_at ? new Date(cmsContent.updated_at).toLocaleDateString() : (defaultPolicy.lastUpdated || 'May 2024')}</span>
            </div>
            <div className="flex items-center gap-3">
              <User size={18} className="text-slate-300" />
              <span className="text-xs uppercase tracking-widest">Owner: Compliance Dept</span>
            </div>
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-slate-300" />
              <span className="text-xs uppercase tracking-widest">Status: Active</span>
            </div>
          </div>
        </div>
      </section>
      
      {loading ? (
        <div className="py-32 flex justify-center">
          <div className="w-10 h-10 border-4 border-brand-teal border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-slate-900">
            <div className="whitespace-pre-line">
              {displayContent}
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-400 text-sm font-medium italic">
              This document is the property of Thames Solution Training & Consultancy Ltd.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-slate-400 hover:text-brand-teal transition-colors text-xs font-black uppercase tracking-widest">
                <Printer size={16} />
                Print
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-brand-teal transition-colors text-xs font-black uppercase tracking-widest">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
