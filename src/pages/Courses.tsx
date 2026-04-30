import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Clock, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { getCourses } from '@/src/services/courseService';
import { Course } from '@/src/lib/supabase';

const mockCourses: any[] = [
  // HEALTH AND SOCIAL CARE
  { id: 'hsc-l2-1', title: 'Level 2 Adult Social Care Certificate', category: 'health-and-social-care', level: 'Level 2', desc: 'Entry-level certification for adult social care professionals.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600', duration: '6 Months' },
  { id: 'hsc-l3-1', title: 'Level 3 Diploma in Adult Care', category: 'health-and-social-care', level: 'Level 3', desc: 'Advanced skills for senior care roles and team leading.', image: 'https://images.unsplash.com/photo-1516549221187-df9bd638dfd1?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  
  // LEADERSHIP
  { id: 'lead-l5-1', title: 'Level 5 Diploma in Leadership and Management for Adult Care', category: 'leadership', level: 'Level 5', desc: 'Elite management skills for health and social care organizations.', image: 'https://images.unsplash.com/photo-1454165833767-02a6e3099033?auto=format&fit=crop&q=80&w=600', duration: '18 Months' },
  
  // CHILD CARE
  { id: 'cc-l3-1', title: 'Level 3 Diploma for Residential Childcare', category: 'child-care', level: 'Level 3', desc: 'Focused on residential settings for children and young people.', image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  
  // ASSESSOR
  { id: 'ac-1', title: 'Level 3 Certificate in Assessing Vocational Achievement (CAVA)', category: 'assessor', level: 'Level 3', desc: 'Professional assessor qualification for workplace assessment.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600', duration: '4 Months' },
  
  // IQA
  { id: 'iqa-1', title: 'Level 4 Award in the Internal Quality Assurance of Assessment (IQA)', category: 'iqa', level: 'Level 4', desc: 'Specialized quality assurance training for training providers.', image: 'https://images.unsplash.com/photo-1454165833767-02a6e3099033?auto=format&fit=crop&q=80&w=600', duration: '6 Months' },
  
  // FUNCTIONAL SKILLS
  { id: 'fs-1', title: 'Level 2 English Functional Skills', category: 'functional-skills', level: 'Level 2', desc: 'Essential English literacy skills for professional success.', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },
  { id: 'fs-2', title: 'Level 2 Maths Functional Skills', category: 'functional-skills', level: 'Level 2', desc: 'Critical mathematical competency for career advancement.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },
  
  // MANDATORY
  { id: 'mt-1', title: 'Mandatory Care Training Package', category: 'mandatory', level: 'Statutory', desc: 'All essential modules required for healthcare compliance.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600', duration: '3 Days' },
  
  // GDPR
  { id: 'gdpr-1', title: 'GDPR & Data Protection for Healthcare', category: 'gdpr', level: 'Professional', desc: 'Critical compliance training for handling patient data securely.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  
  // CARE CERTIFICATE
  { id: 'ccrt-1', title: 'Care Certificate (Standards 1-15)', category: 'care-certificate', level: 'Foundation', desc: 'The baseline standards for health and social care workers.', image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600', duration: '12 Weeks' },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'health-and-social-care', name: 'Health Care' },
  { id: 'leadership', name: 'Leadership' },
  { id: 'child-care', name: 'Child Care' },
  { id: 'assessor', name: 'Assessor' },
  { id: 'iqa', name: 'IQA' },
  { id: 'functional-skills', name: 'Functional' },
  { id: 'mandatory', name: 'Mandatory' },
  { id: 'gdpr', name: 'GDPR' },
  { id: 'care-certificate', name: 'Care Cert' },
];

export function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      const data = await getCourses(currentCategory);
      // If no data in Supabase yet, we can use mock data for demo purposes
      // But in a real PRD app, we'd just show an empty state or the fetched data
      if (data && data.length > 0) {
        setCourses(data);
      } else {
        // Fallback to mock data if DB is empty (optional)
        setCourses(mockCourses.filter(c => currentCategory === 'all' || c.category === currentCategory) as any);
      }
      setIsLoading(false);
    }
    loadCourses();
  }, [currentCategory]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-20 text-sharp">
      {/* Header */}
      <section className="bg-white py-20 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Our Course Catalog</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
            Browse our wide range of professional courses designed to help you succeed in today's competitive job market.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 mb-20 relative z-20">
        {/* Filters */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 mb-12 border border-slate-50">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="w-full lg:flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-14 pr-4 py-4.5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-brand-teal outline-none text-slate-900 transition-all placeholder:text-slate-400 font-medium"
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
                    "px-6 py-4 rounded-2xl font-bold text-xs whitespace-nowrap transition-all border",
                    currentCategory === cat.id
                      ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20 border-brand-teal"
                      : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
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
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-slate-100 flex flex-col h-full"
            >
              <div className="relative h-60 overflow-hidden">
                      <img
                        src={course.image_url || (course as any).image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-4 py-2 bg-brand-teal/90 backdrop-blur rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                    {course.category?.replace(/-/g, ' ')}
                  </span>
                  {course.level && (
                    <span className="px-4 py-2 bg-brand-accent/90 backdrop-blur rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                      {course.level}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand-teal transition-colors line-clamp-2 font-serif leading-tight">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed font-medium">
                  {course.description || course.desc}
                </p>
                <div className="flex items-center justify-between mb-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Clock size={14} className="text-brand-teal" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <GraduationCap size={16} className="text-brand-teal" />
                    <span>Accredited</span>
                  </div>
                </div>
                <Link
                  to={`/courses/${course.id}`}
                  className="w-full py-4.5 text-center bg-slate-50 text-slate-900 border border-slate-100 font-bold rounded-2xl hover:bg-brand-teal hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-md"
                >
                  View Details
                  <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-2xl">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 text-slate-300">
              <Search size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">No courses found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your search or filter results.</p>
          </div>
        )}
      </section>
    </div>
  );
}

