-- SQL Schema for Thames Solution Training LMS
-- Run this in your Supabase SQL Editor

-- 1. Create Tables

-- PROFILES: Extends Supabase Auth users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- COURSES: The main catalog
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT,
  description TEXT,
  image_url TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- LESSONS: Content for each course
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER NOT NULL,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENROLLMENTS: Links users to courses
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, course_id)
);

-- ANNOUNCEMENTS: Global system messages
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT, -- Added for consistency
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES public.profiles(id)
);

ALTER TABLE public.announcements ADD COLUMN IF NOT EXISTS course_id TEXT;

-- NOTIFICATIONS: User-specific alerts
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- FAQS: Help and support questions
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SITE_CONTENTS: Dynamic content for pages (Hero banners, About text, etc)
CREATE TABLE IF NOT EXISTS public.site_contents (
  id TEXT PRIMARY KEY, -- e.g., 'home_hero_title'
  section TEXT NOT NULL, -- e.g., 'home'
  content JSONB NOT NULL, -- Flexible structure for different content types
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- TEAM_MEMBERS: Staff and Instructors
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TESTIMONIALS: Student feedback
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Row Level Security (RLS) Policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Announcements viewable by everyone." ON public.announcements;
    DROP POLICY IF EXISTS "Users view own notifications." ON public.notifications;
    DROP POLICY IF EXISTS "FAQs viewable by everyone." ON public.faqs;
    DROP POLICY IF EXISTS "Site contents viewable by everyone." ON public.site_contents;
    DROP POLICY IF EXISTS "Only admins can modify site contents." ON public.site_contents;
    DROP POLICY IF EXISTS "Team viewable by everyone." ON public.team_members;
    DROP POLICY IF EXISTS "Only admins can modify team." ON public.team_members;
    DROP POLICY IF EXISTS "Testimonials viewable by everyone." ON public.testimonials;
    DROP POLICY IF EXISTS "Only admins can modify testimonials." ON public.testimonials;
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
    DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
    DROP POLICY IF EXISTS "Courses are viewable by everyone." ON public.courses;
    DROP POLICY IF EXISTS "Only admins can modify courses." ON public.courses;
    DROP POLICY IF EXISTS "Lessons are viewable by enrolled students or admins." ON public.lessons;
    DROP POLICY IF EXISTS "Users can view own enrollments." ON public.enrollments;
    DROP POLICY IF EXISTS "Admins can view all enrollments." ON public.enrollments;
END $$;

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Announcements viewable by everyone." ON public.announcements FOR SELECT USING (true);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own notifications." ON public.notifications FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQs viewable by everyone." ON public.faqs FOR SELECT USING (true);

ALTER TABLE public.site_contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site contents viewable by everyone." ON public.site_contents FOR SELECT USING (true);
CREATE POLICY "Only admins can modify site contents." ON public.site_contents 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Team viewable by everyone." ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Only admins can modify team." ON public.team_members 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Testimonials viewable by everyone." ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Only admins can modify testimonials." ON public.testimonials 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are viewable by everyone." ON public.courses FOR SELECT USING (true);
CREATE POLICY "Only admins can modify courses." ON public.courses 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons are viewable by enrolled students or admins." ON public.lessons
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = auth.uid() AND course_id = lessons.course_id)
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'instructor')
  );

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments." ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all enrollments." ON public.enrollments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 3. Automatic Profile Creation on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'student');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Initial Seed Data (Optional)
INSERT INTO public.courses (title, category, level, description, duration, image_url)
VALUES 
('Level 2 Adult Social Care Certificate', 'health-and-social-care', 'Level 2', 'Entry-level certification for adult social care professionals.', '6 Months', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600'),
('Level 3 Diploma in Adult Care', 'health-and-social-care', 'Level 3', 'Advanced skills for senior care roles and team leading.', '12 Months', 'https://images.unsplash.com/photo-1516549221187-df9bd638dfd1?auto=format&fit=crop&q=80&w=600'),
('Level 5 Diploma in Leadership and Management for Adult Care', 'leadership', 'Level 5', 'Elite management skills for health and social care organizations.', '18 Months', 'https://images.unsplash.com/photo-1454165833767-02a6e3099033?auto=format&fit=crop&q=80&w=600');
