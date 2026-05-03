-- Supabase SQL Schema for Thames Solution Training & Consultancy
-- Comprehensive script to set up all tables and initial data

-- 1. Profiles (with email column to handle user's requirement and promotion)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure columns exist if table was already created
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_role_check') THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('student', 'instructor', 'admin'));
  END IF;
END $$;

-- Trigger to create profile and sync email on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    CASE 
      WHEN NEW.email = 'thamestraining@outlook.com' THEN 'admin'
      WHEN NEW.email = 'sheriffdeenalade@gmail.com' THEN 'admin'
      ELSE 'student'
    END
  )
  ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    role = CASE 
      WHEN EXCLUDED.email IN ('thamestraining@outlook.com', 'sheriffdeenalade@gmail.com') THEN 'admin'
      ELSE profiles.role
    END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cleanup existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Promote existing users if they already signed up
UPDATE profiles SET role = 'admin' WHERE email IN ('thamestraining@outlook.com', 'sheriffdeenalade@gmail.com');

-- 1.5 Storage Setup
-- Note: You may need to run these separately or via the Supabase Dashboard if they fail to run in the SQL Editor due to permissions
INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'uploads'
);

CREATE POLICY "Admin All Access"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'uploads' AND 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  bucket_id = 'uploads' AND 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);

-- 3. Courses (Extended with required fields from CMS)
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  category TEXT, -- For backward compatibility with some code parts
  sub_category TEXT, -- For groupings like 'Level 2 Qualifications'
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  long_description TEXT,
  outcomes TEXT[],
  requirements TEXT[],
  duration TEXT,
  certification_info TEXT,
  image_url TEXT,
  instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure columns exist if table was already created
ALTER TABLE courses ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS outcomes TEXT[];
ALTER TABLE courses ADD COLUMN IF NOT EXISTS requirements TEXT[];
ALTER TABLE courses ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES profiles(id) ON DELETE SET NULL;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS certification_info TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS sub_category TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS syllabus_url TEXT;
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'courses_slug_key') THEN
    ALTER TABLE courses ADD CONSTRAINT courses_slug_key UNIQUE (slug);
  END IF;
END $$;

-- 4. Course Applications
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT, -- Changed from UUID to TEXT to support mock IDs (like 'hsc-l2-1')
  course_title TEXT, -- Added for easier reference if IDs don't match
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT,
  gender TEXT,
  employment_status TEXT,
  address TEXT,
  emergency_contact TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'onboarded')),
  generated_password TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure profiles has required fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS date_of_birth TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS employment_status TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS managed_password TEXT;

-- Migration for applications table if it already exists
DO $$ 
BEGIN 
  -- Drop constraint if it exists so we can change type
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'applications_course_id_fkey') THEN
    ALTER TABLE applications DROP CONSTRAINT applications_course_id_fkey;
  END IF;
  
  -- Remove ethnicity column if it exists (as requested to remove from form)
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='applications' AND column_name='ethnicity') THEN
    ALTER TABLE applications DROP COLUMN ethnicity;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='ethnicity') THEN
    ALTER TABLE profiles DROP COLUMN ethnicity;
  END IF;
END $$;
ALTER TABLE applications ALTER COLUMN course_id TYPE TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS course_title TEXT;

-- 5. Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Site Contents (Page CMS)
CREATE TABLE IF NOT EXISTS site_contents (
  id TEXT PRIMARY KEY, -- e.g. 'about_page', 'home_hero'
  section TEXT NOT NULL, -- e.g. 'about', 'home'
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE faqs ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;

-- 8. Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  course_name TEXT, -- The course they took
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. Enrollments
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  progress INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- RLS Settings
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Categories are viewable by everyone." ON categories;
CREATE POLICY "Categories are viewable by everyone." ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Courses are viewable by everyone." ON courses;
CREATE POLICY "Courses are viewable by everyone." ON courses FOR SELECT USING (is_published = true OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
DROP POLICY IF EXISTS "Admins can manage courses." ON courses;
CREATE POLICY "Admins can manage courses." ON courses FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Anyone can apply." ON applications;
CREATE POLICY "Anyone can apply." ON applications FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can view applications." ON applications;
CREATE POLICY "Admins can view applications." ON applications FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Anyone can send enquiries." ON enquiries;
CREATE POLICY "Anyone can send enquiries." ON enquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage enquiries." ON enquiries;
CREATE POLICY "Admins can manage enquiries." ON enquiries FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Site content is viewable by everyone." ON site_contents;
CREATE POLICY "Site content is viewable by everyone." ON site_contents FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage site content." ON site_contents;
CREATE POLICY "Admins can manage site content." ON site_contents FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "FAQs are viewable by everyone." ON faqs;
CREATE POLICY "FAQs are viewable by everyone." ON faqs FOR SELECT USING (is_active = true);
DROP POLICY IF EXISTS "Admins can manage FAQs." ON faqs;
CREATE POLICY "Admins can manage FAQs." ON faqs FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Team is viewable by everyone." ON team_members;
CREATE POLICY "Team is viewable by everyone." ON team_members FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage team." ON team_members;
CREATE POLICY "Admins can manage team." ON team_members FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

DROP POLICY IF EXISTS "Testimonials are viewable by everyone." ON testimonials;
CREATE POLICY "Testimonials are viewable by everyone." ON testimonials FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admins can manage testimonials." ON testimonials;
CREATE POLICY "Admins can manage testimonials." ON testimonials FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Initial Data - Categories
INSERT INTO categories (name, slug, icon, order_index) VALUES
('Health & Social Care', 'health-and-social-care', 'Heart', 1),
('Assessor Courses', 'assessor', 'CheckCircle', 2),
('Functional Skills', 'functional-skills', 'BookOpen', 3),
('Mandatory Training', 'mandatory', 'ShieldAlert', 4),
('Care Certificate', 'care-certificate', 'Award', 5)
ON CONFLICT (slug) DO NOTHING;

-- Initial Data - FAQs
INSERT INTO faqs (question, answer, order_index) VALUES
('What qualifications do I need to enroll?', 'Most of our level 2 and 3 courses don''t require specific previous qualifications, just a good understanding of English and a commitment to learning.', 1),
('Are the courses accredited?', 'Yes, all our vocational qualifications are accredited by recognised UK awarding bodies and meet national standards.', 2),
('How long does a typical course take?', 'Duration varies by level: Level 2 usually takes 6 months, Level 3 takes 12 months, and Level 5 takes 18 months.', 3)
ON CONFLICT DO NOTHING;

-- Initial Data - Team
INSERT INTO team_members (name, role, order_index) VALUES
('Sarah Johnson', 'Director of Training', 1),
('Michael Chen', 'Lead Clinical Instructor', 2),
('Emma Davies', 'IQA & Compliance Manager', 3)
ON CONFLICT DO NOTHING;
