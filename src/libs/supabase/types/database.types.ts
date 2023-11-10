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
      blocked_users: {
        Row: {
          blocked_user_id: string
          blocker_user_id: string
          created_at: string
        }
        Insert: {
          blocked_user_id: string
          blocker_user_id: string
          created_at?: string
        }
        Update: {
          blocked_user_id?: string
          blocker_user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_users_blocked_user_id_fkey"
            columns: ["blocked_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_users_blocker_user_id_fkey"
            columns: ["blocker_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      follows: {
        Row: {
          created_at: string
          followed_id: string
          follower_id: string
        }
        Insert: {
          created_at?: string
          followed_id: string
          follower_id: string
        }
        Update: {
          created_at?: string
          followed_id?: string
          follower_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_followed_id_fkey"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      media: {
        Row: {
          backdrop_path: string
          created_at: string
          date: string | null
          id: number
          overview: string | null
          poster_path: string
          rating: number | null
          runtime: number | null
          season_number: number | null
          title: string
          type: string
          uuid: string
        }
        Insert: {
          backdrop_path: string
          created_at?: string
          date?: string | null
          id: number
          overview?: string | null
          poster_path: string
          rating?: number | null
          runtime?: number | null
          season_number?: number | null
          title: string
          type: string
          uuid?: string
        }
        Update: {
          backdrop_path?: string
          created_at?: string
          date?: string | null
          id?: number
          overview?: string | null
          poster_path?: string
          rating?: number | null
          runtime?: number | null
          season_number?: number | null
          title?: string
          type?: string
          uuid?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      posts_media: {
        Row: {
          media_id: string
          post_id: string
        }
        Insert: {
          media_id: string
          post_id: string
        }
        Update: {
          media_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "posts_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reported_comments: {
        Row: {
          created_at: string
          reported_comment_id: string
          reporter_user_id: string
          reviewed: boolean
        }
        Insert: {
          created_at?: string
          reported_comment_id: string
          reporter_user_id: string
          reviewed?: boolean
        }
        Update: {
          created_at?: string
          reported_comment_id?: string
          reporter_user_id?: string
          reviewed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "reported_comments_reported_comment_id_fkey"
            columns: ["reported_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reported_comments_reporter_user_id_fkey"
            columns: ["reporter_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      reported_posts: {
        Row: {
          created_at: string
          reported_post_id: string
          reporter_user_id: string
          reviewed: boolean
        }
        Insert: {
          created_at?: string
          reported_post_id: string
          reporter_user_id: string
          reviewed?: boolean
        }
        Update: {
          created_at?: string
          reported_post_id?: string
          reporter_user_id?: string
          reviewed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "reported_posts_reported_post_id_fkey"
            columns: ["reported_post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reported_posts_reporter_user_id_fkey"
            columns: ["reporter_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      watchlists: {
        Row: {
          media_id: string
          status: string
          user_id: string
        }
        Insert: {
          media_id: string
          status: string
          user_id: string
        }
        Update: {
          media_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlists_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "watchlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      read_secret: {
        Args: {
          secret_name: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
