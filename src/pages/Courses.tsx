import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Clock, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const mockCourses = [
  // HEALTH AND SOCIAL CARE
  { id: 'hsc-l2-1', title: 'Level 2 Adult Social Care Certificate', category: 'health-and-social-care', level: 'Level 2', desc: 'Entry-level certification for adult social care professionals.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600', duration: '6 Months' },
  { id: 'hsc-l2-2', title: 'Level 2 Diploma in Clinical Healthcare Support', category: 'health-and-social-care', level: 'Level 2', desc: 'Focus on clinical skills and patient support in healthcare settings.', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'hsc-l2-3', title: 'Level 2 Diploma in Care', category: 'health-and-social-care', level: 'Level 2', desc: 'Fundamental care skills for various health and social care roles.', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600', duration: '9 Months' },
  { id: 'hsc-l3-1', title: 'Level 3 Diploma in Adult Care', category: 'health-and-social-care', level: 'Level 3', desc: 'Advanced skills for senior care roles and team leading.', image: 'https://images.unsplash.com/photo-1516549221187-df9bd638dfd1?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'hsc-l3-2', title: 'Level 3 Health and Social Care (Adult)', category: 'health-and-social-care', level: 'Level 3', desc: 'Comprehensive study of adult health and social care provision.', image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'hsc-l3-3', title: 'Level 3 Healthcare Support Service', category: 'health-and-social-care', level: 'Level 3', desc: 'Specialized support service training for healthcare environments.', image: 'https://images.unsplash.com/photo-1504813184591-01592fd03cf7?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'hsc-l5-1', title: 'Level 5 Diploma in Health and Social Care and Children and Young People', category: 'health-and-social-care', level: 'Level 5', desc: 'Management and leadership for multi-sector care providers.', image: 'https://images.unsplash.com/photo-1538108190963-b43511d47df8?auto=format&fit=crop&q=80&w=600', duration: '18 Months' },
  { id: 'hsc-l5-2', title: 'Level 5 Diploma in Leadership and Management', category: 'health-and-social-care', level: 'Level 5', desc: 'Elite management skills for health and social care organizations.', image: 'https://images.unsplash.com/photo-1454165833767-02a6e3099033?auto=format&fit=crop&q=80&w=600', duration: '18 Months' },
  // Child Care
  { id: 'cc-l3-1', title: 'Level 3 Diploma for Residential Childcare', category: 'health-and-social-care', level: 'Child Care', desc: 'Focused on residential settings for children and young people.', image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'cc-l3-2', title: 'Level 3 Diploma in Early Years Educator', category: 'health-and-social-care', level: 'Child Care', desc: 'The gold standard for early years education professionals.', image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=600', duration: '15 Months' },
  { id: 'cc-l3-3', title: 'Level 3 Diploma in Children’s Learning and Development (Early Year Educator)', category: 'health-and-social-care', level: 'Child Care', desc: 'Holistic children’s learning and development qualification.', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600', duration: '15 Months' },
  { id: 'cc-l5-1', title: 'Level 5 Diploma in Leadership and Management for Residential Childcare', category: 'health-and-social-care', level: 'Child Care', desc: 'Senior leadership training for residential child care.', image: 'https://images.unsplash.com/photo-1507537243993-c0a35bb06f0e?auto=format&fit=crop&q=80&w=600', duration: '18 Months' },
  // ASSESSOR COURSES
  { id: 'ac-1', title: 'RQF Level 3 Award in Assessing Competency in the Work Environment', category: 'assessor-courses', desc: 'Professional assessor qualification for workplace assessment.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },
  { id: 'ac-2', title: 'RQF Level 3 in Certificate in Assessing Vocational Achievement', category: 'assessor-courses', desc: 'Comprehensive CAVA qualification for vocational assessors.', image: 'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=600', duration: '4 Months' },
  // FUNCTIONAL SKILLS
  { id: 'fs-1', title: 'Level 2 English Functional Skills Qualification', category: 'functional-skills', desc: 'Essential English literacy skills for professional success.', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },
  { id: 'fs-2', title: 'Level 2 Maths Functional Skills Qualification', category: 'functional-skills', desc: 'Critical mathematical competency for career advancement.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },
  // MANDATORY TRAINING
  { id: 'mt-1', title: 'Manual Handling', category: 'mandatory-training', desc: 'Safe lifting and movement techniques for heavy loads.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-2', title: 'First Aid', category: 'mandatory-training', desc: 'Critical life-saving medical response training.', image: 'https://images.unsplash.com/photo-1516549221187-df9bd638dfd1?auto=format&fit=crop&q=80&w=600', duration: '3 Days' },
  { id: 'mt-3', title: 'Health & Safety', category: 'mandatory-training', desc: 'Workplace safety standards and risk management.', image: 'https://images.unsplash.com/photo-1589252392320-95133d83f230?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-4', title: 'Safeguarding', category: 'mandatory-training', desc: 'Protecting vulnerable individuals from harm and abuse.', image: 'https://images.unsplash.com/photo-1573497620053-ea5310f94f17?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  // GDPR & More
  { id: 'gdpr-1', title: 'Fire Safety', category: 'gdpr', desc: 'Essential fire prevention and evacuation procedures.', image: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'gdpr-2', title: 'Dementia Awareness', category: 'gdpr', desc: 'Understanding and supporting individuals with dementia.', image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'gdpr-3', title: 'End of Life Care', category: 'gdpr', desc: 'Palliative care and end of life support training.', image: 'https://images.unsplash.com/photo-1516549221187-df9bd638dfd1?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'gdpr-4', title: 'Equally & Diversity', category: 'gdpr', desc: 'Promoting equality and understanding diversity in the workplace.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'gdpr-5', title: 'Infection Control', category: 'gdpr', desc: 'Standard operating procedures for preventing infection spread.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'gdpr-6', title: 'Medication Awareness', category: 'gdpr', desc: 'Safe handling and administration of medications.', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'gdpr-7', title: 'Mental Capacity', category: 'gdpr', desc: 'Legal and ethical training on assessing mental capacity.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'gdpr-8', title: 'Food Hygiene', category: 'gdpr', desc: 'Essential food safety and hygiene standards.', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  // CARE CERTIFICATE
  { id: 'cc-1', title: 'Care Certificate Standards 1-15', category: 'care-certificate', desc: 'The baseline standards for health and social care workers.', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600', duration: '12 Weeks' },
];

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'health-and-social-care', name: 'Health & Care' },
  { id: 'assessor-courses', name: 'Assessor' },
  { id: 'functional-skills', name: 'Functional Skills' },
  { id: 'mandatory-training', name: 'Mandatory' },
  { id: 'gdpr', name: 'GDPR & Safety' },
  { id: 'care-certificate', name: 'Care Certificate' },
];

export function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = currentCategory === 'all' || course.category === currentCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-brand-dark min-h-screen pt-20">
      {/* Header */}
      <section className="bg-brand-surface py-20 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Our Course Catalog</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Browse our wide range of professional courses designed to help you succeed in today's competitive job market.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 mb-20 relative z-20">
        {/* Filters */}
        <div className="bg-brand-surface rounded-[2.5rem] shadow-2xl p-8 mb-12 border border-white/5">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="w-full lg:flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-dark border border-white/10 focus:border-brand-teal outline-none text-white transition-all placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full lg:w-auto custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSearchParams(cat.id === 'all' ? {} : { category: cat.id })}
                  className={cn(
                    "px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all border",
                    currentCategory === cat.id
                      ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20 border-brand-teal"
                      : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-brand-surface rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-brand-teal/5 transition-all border border-white/5 hover:border-white/10 flex flex-col h-full"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-4 py-2 bg-brand-teal/90 backdrop-blur rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/5">
                    {course.category.replace(/-/g, ' ')}
                  </span>
                  {course.level && (
                    <span className="px-4 py-2 bg-brand-accent/90 backdrop-blur rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/5">
                      {course.level}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-teal transition-colors line-clamp-2 font-serif leading-tight">
                  {course.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                  {course.desc}
                </p>
                <div className="flex items-center justify-between mb-8 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <Clock size={14} className="text-brand-teal" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <GraduationCap size={16} className="text-brand-teal" />
                    <span>Accredited</span>
                  </div>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="w-full py-4 text-center bg-brand-teal/10 text-brand-teal border border-brand-teal/20 font-bold rounded-2xl hover:bg-brand-teal hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-brand-teal/5"
                >
                  View Details
                  <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-24 bg-brand-surface rounded-[3rem] border border-white/5 shadow-22xl">
            <div className="w-24 h-24 bg-brand-dark rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 text-slate-700">
              <Search size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-serif">No courses found</h3>
            <p className="text-slate-500">Try adjusting your search or filter results.</p>
          </div>
        )}
      </section>
    </div>
  );
}

// Helper function needed in this file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
