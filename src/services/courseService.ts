import { supabase, Course } from '../lib/supabase';

export async function getCourses(category: string = 'all') {
  try {
    let query = supabase
      .from('courses')
      .select('*');

    // If category is not 'all', we try to match it
    // We'll also try a fallback in the UI side, but let's keep this clean
    if (category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
      return [];
    }

    // Double check: if we filtered by slug but got nothing, maybe it's saved with spaces?
    // This is a safety measure for manual DB edits
    if (category !== 'all' && (!data || data.length === 0)) {
       const { data: fallbackData } = await supabase
        .from('courses')
        .select('*')
        .ilike('category', `%${category.replace(/-/g, ' ')}%`);
       
       if (fallbackData && fallbackData.length > 0) return fallbackData as Course[];
    }

    return data as Course[];
  } catch (err) {
    console.error('Unexpected error in getCourses:', err);
    return [];
  }
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
