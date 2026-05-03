export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          role: 'student' | 'instructor' | 'admin'
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          role?: 'student' | 'instructor' | 'admin'
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          role?: 'student' | 'instructor' | 'admin'
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          category: string
          level: string | null
          description: string | null
          long_description: string | null
          outcomes: string[] | Json | null
          requirements: string[] | Json | null
          image_url: string | null
          duration: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          category: string
          level?: string | null
          description?: string | null
          image_url?: string | null
          duration?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          category?: string
          level?: string | null
          description?: string | null
          image_url?: string | null
          duration?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          content: string | null
          video_url: string | null
          order_index: number
          duration: string | null
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          content?: string | null
          video_url?: string | null
          order_index: number
          duration?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          content?: string | null
          video_url?: string | null
          order_index?: number
          duration?: string | null
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          status: 'active' | 'completed'
          enrolled_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          progress?: number
          status?: 'active' | 'completed'
          enrolled_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          progress?: number
          status?: 'active' | 'completed'
          enrolled_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          category: string | null
          is_active: boolean
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          category?: string | null
          is_active?: boolean
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string | null
          is_active?: boolean
          created_at?: string
          created_by?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          is_read: boolean
          link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          category: string | null
          order_index: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
        }
      }
      site_contents: {
        Row: {
          id: string
          section: string
          content: Json
          updated_at: string | null
        }
        Insert: {
          id: string
          section: string
          content: Json
          updated_at?: string | null
        }
        Update: {
          id?: string
          section?: string
          content?: Json
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
