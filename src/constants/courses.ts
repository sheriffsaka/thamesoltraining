export const mockCourses: any[] = [
  // HEALTH AND SOCIAL CARE - Level 2
  { 
    id: 'hsc-l2-1', 
    title: 'Level 2 Adult Social Care Certificate', 
    category: 'health-and-social-care', 
    level: 'Level 2 Qualifications', 
    desc: 'Entry-level certification for adult social care professionals.', 
    longDesc: 'The Level 2 Adult Social Care Certificate is designed for individuals who are new to the care sector or looking to formalize their experience. It covers the essential skills and knowledge required to provide high-quality care and support to adults in various settings.',
    outcomes: ['Understanding your role in care', 'Personal development in care settings', 'Duty of care', 'Equality and diversity', 'Work in a person-centered way'],
    requirements: ['Open to all learners aged 16+', 'No specific prior qualifications required', 'Currently working or seeking work in care'],
    duration: '6 Months',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'hsc-l2-2', 
    title: 'Level 2 Diploma in Clinical Healthcare Support', 
    category: 'health-and-social-care', 
    level: 'Level 2 Qualifications', 
    desc: 'Focused on clinical support within healthcare settings.', 
    longDesc: 'This qualification is ideal for those working in clinical support roles within hospitals or community settings. It provides the technical skills and clinical knowledge needed to assist healthcare professionals in delivering patient care.',
    outcomes: ['Clinical task support', 'Monitoring patient health', 'Sterilization and hygiene', 'Record keeping in clinical settings'],
    requirements: ['Working in a clinical support role', 'DBS check', 'Basic literacy and numeracy'],
    duration: '6 Months',
    image: 'https://images.unsplash.com/photo-1584515839997-3afb3b3c990b?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'hsc-l2-3', 
    title: 'Level 2 Diploma in Care', 
    category: 'health-and-social-care', 
    level: 'Level 2 Qualifications', 
    desc: 'Core diploma for those starting in the care sector.',
    longDesc: 'The Level 2 Diploma in Care is a foundational qualification that confirms occupational competence for those in a wide range of roles within the health and social care sector.',
    outcomes: ['Safe working practices', 'Effective communication', 'Safeguarding adults', 'Infection prevention'],
    requirements: ['Aged 16+', 'Employment in a care role (paid or voluntary)'],
    duration: '6 Months',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600'
  },

  // HEALTH AND SOCIAL CARE - Level 3
  { id: 'hsc-l3-1', title: 'Level 3 Diploma in Adult Care', category: 'health-and-social-care', level: 'Level 3 Qualifications', desc: 'Advanced skills for senior care roles and team leading.', image: 'https://images.unsplash.com/photo-1516549221187-df9bd638dfd1?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'hsc-l3-2', title: 'Level 3 Health and Social Care (Adult)', category: 'health-and-social-care', level: 'Level 3 Qualifications', desc: 'Comprehensive training for adult care specialists.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'hsc-l3-3', title: 'Level 3 Healthcare Support Service', category: 'health-and-social-care', level: 'Level 3 Qualifications', desc: 'Supporting primary care and hospital environments.', image: 'https://images.unsplash.com/photo-1505751172107-164746ecf130?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },

  // HEALTH AND SOCIAL CARE - Level 5
  { id: 'hsc-l5-1', title: 'Level 5 Diploma in Health and Social Care and Children and Young People', category: 'health-and-social-care', level: 'Level 5 Qualifications', desc: 'Advanced leadership for complex care environments.', image: 'https://images.unsplash.com/photo-1454165833767-02a6e3099033?auto=format&fit=crop&q=80&w=600', duration: '18 Months' },
  { id: 'hsc-l5-2', title: 'Level 5 Diploma in Leadership and Management', category: 'health-and-social-care', level: 'Level 5 Qualifications', desc: 'Executive-level training for care managers.', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600', duration: '18 Months' },

  // CHILD CARE
  { id: 'cc-l3-1', title: 'Level 3 Diploma for Residential Childcare', category: 'health-and-social-care', level: 'Child Care', desc: 'Focused on residential settings for children.', image: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'cc-l3-2', title: 'Level 3 Diploma in Early Years Educator', category: 'health-and-social-care', level: 'Child Care', desc: 'Training to become a qualified early years practitioner.', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'cc-l3-3', title: 'Level 3 Diploma in Children’s Learning and Development (Early Year Educator)', category: 'health-and-social-care', level: 'Child Care', desc: 'In-depth study of child development and learning.', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600', duration: '12 Months' },
  { id: 'cc-l5-1', title: 'Level 5 Diploma in Leadership and Management for Residential Childcare', category: 'health-and-social-care', level: 'Child Care', desc: 'Managing residential facilities for children.', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=600', duration: '18 Months' },

  // ASSESSOR COURSES
  { id: 'ac-l3-1', title: 'RQF Level 3 Award in Assessing Competency in the Work Environment', category: 'assessor', level: 'Vocational', desc: 'Master workplace assessments and competency standards.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },
  { id: 'ac-l3-2', title: 'RQF Level 3 in Certificate in Assessing Vocational Achievement', category: 'assessor', level: 'Vocational', desc: 'The gold standard for vocational assessors.', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600', duration: '4 Months' },

  // FUNCTIONAL SKILLS
  { id: 'fs-en-l2', title: 'Level 2 English Functional Skills Qualification', category: 'functional-skills', level: 'Level 2', desc: 'Essential English literacy for professional development.', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },
  { id: 'fs-mt-l2', title: 'Level 2 Maths Functional Skills Qualification', category: 'functional-skills', level: 'Level 2', desc: 'Critical mathematical competency for career growth.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600', duration: '3 Months' },

  // MANDATORY TRAINING
  { id: 'mt-mh', title: 'Manual Handling', category: 'mandatory', level: 'Compliance', desc: 'Safe techniques for moving and handling in healthcare.', image: 'https://images.unsplash.com/photo-1581594632702-f22114888183?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-fa', title: 'First Aid', category: 'mandatory', level: 'Compliance', desc: 'Essential first aid skills for the workplace.', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-hs', title: 'Health & Safety', category: 'mandatory', level: 'Compliance', desc: 'Comprehensive health and safety compliance.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-sg', title: 'Safeguarding', category: 'mandatory', level: 'Compliance', desc: 'Protecting vulnerable individuals and groups.', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-gdpr', title: 'GDPR', category: 'mandatory', level: 'Compliance', desc: 'Data protection and privacy standards.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-fs', title: 'Fire Safety', category: 'mandatory', level: 'Compliance', desc: 'Fire prevention and emergency response training.', image: 'https://images.unsplash.com/photo-1510003051059-e93da0183188?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-da', title: 'Dementia Awareness', category: 'mandatory', level: 'Compliance', desc: 'Understanding and supporting those with dementia.', image: 'https://images.unsplash.com/photo-1532187863486-abf51ad4b691?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-eol', title: 'End of Life Care', category: 'mandatory', level: 'Compliance', desc: 'Compassionate care for end-of-life stages.', image: 'https://images.unsplash.com/photo-1516549221187-df9bd638dfd1?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-ed', title: 'Equality & Diversity', category: 'mandatory', level: 'Compliance', desc: 'Promoting inclusive environments and practices.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-ic', title: 'Infection Control', category: 'mandatory', level: 'Compliance', desc: 'Preventing the spread of infection in care.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-ma', title: 'Medication Awareness', category: 'mandatory', level: 'Compliance', desc: 'Safe administration and handling of medication.', image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-mc', title: 'Mental Capacity', category: 'mandatory', level: 'Compliance', desc: 'Understanding legal frameworks for mental capacity.', image: 'https://images.unsplash.com/photo-1460518451285-cd7ba7967ee6?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },
  { id: 'mt-fh', title: 'Food Hygiene', category: 'mandatory', level: 'Compliance', desc: 'Food safety standards for care environments.', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600', duration: '1 Day' },

  // CARE CERTIFICATE
  { id: 'cc-15', title: 'Care Certificate (15 Standards)', category: 'care-certificate', level: 'Foundation', desc: 'The fundamental standards for all care workers.', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600', duration: '12 Weeks' },
];

export const categories = [
  { id: 'all', name: 'All' },
  { id: 'health-and-social-care', name: 'Health & Social Care' },
  { id: 'assessor', name: 'Assessor Courses' },
  { id: 'functional-skills', name: 'Functional Skills' },
  { id: 'mandatory', name: 'Mandatory Training' },
  { id: 'care-certificate', name: 'Care Certificate' },
];
