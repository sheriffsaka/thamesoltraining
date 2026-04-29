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
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
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
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, course_id)
);

-- ANNOUNCEMENTS: Global system messages
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES public.profiles(id)
);

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

-- 2. Row Level Security (RLS) Policies (Continued)

-- Announcements: Publicly viewable, Admin only write
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Announcements viewable by everyone." ON public.announcements FOR SELECT USING (true);

-- Notifications: Private to user
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own notifications." ON public.notifications FOR SELECT USING (auth.uid() = user_id);

-- FAQs: Public viewable
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQs viewable by everyone." ON public.faqs FOR SELECT USING (true);

-- Site Contents: Public viewable, Admin only write
ALTER TABLE public.site_contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site contents viewable by everyone." ON public.site_contents FOR SELECT USING (true);

-- 4. Initial Seed Data
INSERT INTO public.announcements (title, content, category)
VALUES 
('System Maintenance', 'System maintenance scheduled for Saturday at 10 PM.', 'Global Admin'),
('New Resources', 'New resources added to Communication module.', 'Course Update');

INSERT INTO public.faqs (question, answer, category, order_index)
VALUES 
('How do I enroll in a course?', 'To enroll, simply browse our courses and click Apply Now.', 'General', 1),
('Are the certificates recognized?', 'Yes, all our courses are accredited by leading UK awarding bodies.', 'General', 2);

-- 2. Row Level Security (RLS) Policies

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses are viewable by everyone." ON public.courses FOR SELECT USING (true);
CREATE POLICY "Only admins can modify courses." ON public.courses 
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Lessons
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons are viewable by enrolled students or admins." ON public.lessons
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = auth.uid() AND course_id = lessons.course_id)
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'instructor')
  );

-- Enrollments
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
