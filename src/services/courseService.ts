import { supabase, Course } from '../lib/supabase';

export async function getCourses(category: string = 'all') {
  let query = supabase
    .from('courses')
    .select('*');

  if (category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data as Course[];
}

export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*, lessons(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  return data;
}

export async function getEnrollments(userId: string) {
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }

  return data;
}
