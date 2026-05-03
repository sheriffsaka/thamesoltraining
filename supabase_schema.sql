-- Comprehensive Supabase SQL Schema for Thames Solution
-- This script is idempotent and can be run multiple times safely.

-- 1. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  date_of_birth TEXT,
  emergency_contact TEXT,
  gender TEXT,
  employment_status TEXT,
  managed_password TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure columns exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS employment_status TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS managed_password TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student';

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    CASE 
      WHEN NEW.email IN ('thamestraining@outlook.com', 'sheriffdeenalade@gmail.com') THEN 'admin'
      ELSE 'student'
    END
  )
  ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Promote existing users to admin
UPDATE public.profiles SET role = 'admin' WHERE email IN ('thamestraining@outlook.com', 'sheriffdeenalade@gmail.com');

-- 2. Storage Setup
INSERT INTO storage.buckets (id, name, public) 
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
    DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
    DROP POLICY IF EXISTS "Admin All Access" ON storage.objects;
END $$;

CREATE POLICY "Public Read Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'uploads');
CREATE POLICY "Admin All Access" ON storage.objects FOR ALL TO authenticated 
USING (bucket_id = 'uploads' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
WITH CHECK (bucket_id = 'uploads' AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- 3. Categories & Courses
CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  category_id INTEGER REFERENCES public.categories(id) ON DELETE SET NULL,
  category TEXT,
  sub_category TEXT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  long_description TEXT,
  outcomes TEXT[],
  requirements TEXT[],
  duration TEXT,
  certification_info TEXT,
  image_url TEXT,
  instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Ensure course columns
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES public.categories(id) ON DELETE SET NULL;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS outcomes TEXT[];
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS requirements TEXT[];
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS instructor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

-- 4. Enrollments & Lessons
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  progress INTEGER DEFAULT 0,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- Handle migration from user_id to student_id if needed
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='enrollments' AND column_name='user_id') THEN
    ALTER TABLE public.enrollments RENAME COLUMN user_id TO student_id;
  END IF;
END $$;

-- 5. Applications & Enquiries
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT,
  course_title TEXT,
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

-- Ensure all columns exist for applications
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS course_title TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS date_of_birth TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS employment_status TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS generated_password TEXT;

CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CMS & Support
CREATE TABLE IF NOT EXISTS public.site_contents (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  course_name TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Announcements & Notifications
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.announcements ADD COLUMN IF NOT EXISTS course_id TEXT;

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Policies
DO $$ 
BEGIN
    -- Profiles
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
    DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
    CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
    CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

    -- Courses
    ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Courses are viewable by everyone." ON public.courses;
    DROP POLICY IF EXISTS "Admins can manage courses." ON public.courses;
    CREATE POLICY "Courses are viewable by everyone." ON public.courses FOR SELECT USING (is_published = true OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
    CREATE POLICY "Admins can manage courses." ON public.courses FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Applications
    ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Anyone can apply." ON public.applications;
    DROP POLICY IF EXISTS "Admins can view applications." ON public.applications;
    CREATE POLICY "Anyone can apply." ON public.applications FOR INSERT WITH CHECK (true);
    CREATE POLICY "Admins can view applications." ON public.applications FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Site Contents
    ALTER TABLE public.site_contents ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Site content is viewable by everyone." ON public.site_contents;
    DROP POLICY IF EXISTS "Admins can manage site content." ON public.site_contents;
    CREATE POLICY "Site content is viewable by everyone." ON public.site_contents FOR SELECT USING (true);
    CREATE POLICY "Admins can manage site content." ON public.site_contents FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

    -- Generic Public Read Policies
    ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Categories are viewable by everyone." ON public.categories;
    CREATE POLICY "Categories are viewable by everyone." ON public.categories FOR SELECT USING (true);

    ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Announcements viewable by everyone." ON public.announcements;
    CREATE POLICY "Announcements viewable by everyone." ON public.announcements FOR SELECT USING (true);

    ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "FAQs are viewable by everyone." ON public.faqs;
    CREATE POLICY "FAQs are viewable by everyone." ON public.faqs FOR SELECT USING (true);

    ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Testimonials are viewable by everyone." ON public.testimonials;
    CREATE POLICY "Testimonials are viewable by everyone." ON public.testimonials FOR SELECT USING (true);

    -- Enrollments
    ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Users can view own enrollments." ON public.enrollments;
    CREATE POLICY "Users can view own enrollments." ON public.enrollments FOR SELECT USING (auth.uid() = student_id);
END $$;

-- 9. Seed Data
INSERT INTO public.categories (name, slug, icon, order_index) VALUES
('Health & Social Care', 'health-and-social-care', 'Heart', 1),
('Assessor Courses', 'assessor', 'CheckCircle', 2),
('Functional Skills', 'functional-skills', 'BookOpen', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.site_contents (id, section, content) VALUES
('safeguarding_policy', 'safeguarding', '{
  "title": "Safeguarding",
  "content": "Thames Solution Training & Consultancy Ltd is committed to safeguarding and promoting the welfare of all our learners. We believe that everyone has the right to live and learn in an environment that is free from harm, neglect, and abuse. Protecting our learners, staff, and visitors is our highest priority. We provide a safe, supportive, and inclusive environment for everyone to achieve their potential."
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;
