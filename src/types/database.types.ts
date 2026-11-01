export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      _test_table: {
        Row: {
          id: number | null
          pk_id: number
        }
        Insert: {
          id?: number | null
          pk_id?: number
        }
        Update: {
          id?: number | null
          pk_id?: number
        }
        Relationships: []
      }
      achievements: {
        Row: {
          achievement: string
          earned_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          achievement: string
          earned_at?: string | null
          id?: never
          user_id: string
        }
        Update: {
          achievement?: string
          earned_at?: string | null
          id?: never
          user_id?: string
        }
        Relationships: []
      }
      ai_feedback: {
        Row: {
          ai_item_id: string
          correction: string | null
          created_at: string | null
          critic_provider: string | null
          critic_verdict: string | null
          generator_model: string | null
          generator_provider: string | null
          id: string
          item_type: string
          prompt_version: string | null
          quarantined: boolean | null
          reason_codes: string[] | null
          reason_other: string | null
          user_id: string
          verdict: string
        }
        Insert: {
          ai_item_id: string
          correction?: string | null
          created_at?: string | null
          critic_provider?: string | null
          critic_verdict?: string | null
          generator_model?: string | null
          generator_provider?: string | null
          id?: string
          item_type: string
          prompt_version?: string | null
          quarantined?: boolean | null
          reason_codes?: string[] | null
          reason_other?: string | null
          user_id: string
          verdict: string
        }
        Update: {
          ai_item_id?: string
          correction?: string | null
          created_at?: string | null
          critic_provider?: string | null
          critic_verdict?: string | null
          generator_model?: string | null
          generator_provider?: string | null
          id?: string
          item_type?: string
          prompt_version?: string | null
          quarantined?: boolean | null
          reason_codes?: string[] | null
          reason_other?: string | null
          user_id?: string
          verdict?: string
        }
        Relationships: []
      }
      ai_promotion_queue: {
        Row: {
          ai_item_id: string
          content: Json
          critic_provider: string | null
          critic_verdict: string | null
          edits_submitted: number | null
          first_seen_at: string | null
          generator_model: string | null
          generator_provider: string | null
          item_type: string
          last_feedback_at: string | null
          promoted_at: string | null
          promoted_by: string | null
          promoted_payload: Json | null
          promotion_target: string | null
          prompt_version: string | null
          quarantined: boolean | null
          rejected_at: string | null
          serve_count: number | null
          status: string
          thumbs_down: number | null
          thumbs_up: number | null
        }
        Insert: {
          ai_item_id: string
          content: Json
          critic_provider?: string | null
          critic_verdict?: string | null
          edits_submitted?: number | null
          first_seen_at?: string | null
          generator_model?: string | null
          generator_provider?: string | null
          item_type: string
          last_feedback_at?: string | null
          promoted_at?: string | null
          promoted_by?: string | null
          promoted_payload?: Json | null
          promotion_target?: string | null
          prompt_version?: string | null
          quarantined?: boolean | null
          rejected_at?: string | null
          serve_count?: number | null
          status?: string
          thumbs_down?: number | null
          thumbs_up?: number | null
        }
        Update: {
          ai_item_id?: string
          content?: Json
          critic_provider?: string | null
          critic_verdict?: string | null
          edits_submitted?: number | null
          first_seen_at?: string | null
          generator_model?: string | null
          generator_provider?: string | null
          item_type?: string
          last_feedback_at?: string | null
          promoted_at?: string | null
          promoted_by?: string | null
          promoted_payload?: Json | null
          promotion_target?: string | null
          prompt_version?: string | null
          quarantined?: boolean | null
          rejected_at?: string | null
          serve_count?: number | null
          status?: string
          thumbs_down?: number | null
          thumbs_up?: number | null
        }
        Relationships: []
      }
      ai_quiz_cache: {
        Row: {
          cache_key: string
          created_at: string | null
          critic_provider: string | null
          expires_at: string
          generator_provider: string | null
          level: string
          prompt_version: string
          question_count: number
          questions: Json
          quiz_type: string
          target_id: string
        }
        Insert: {
          cache_key: string
          created_at?: string | null
          critic_provider?: string | null
          expires_at: string
          generator_provider?: string | null
          level: string
          prompt_version: string
          question_count: number
          questions: Json
          quiz_type: string
          target_id: string
        }
        Update: {
          cache_key?: string
          created_at?: string | null
          critic_provider?: string | null
          expires_at?: string
          generator_provider?: string | null
          level?: string
          prompt_version?: string
          question_count?: number
          questions?: Json
          quiz_type?: string
          target_id?: string
        }
        Relationships: []
      }
      ai_semantic_cache: {
        Row: {
          category: string | null
          created_at: string | null
          id: number
          query_embedding: string | null
          query_text: string
          response_text: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: never
          query_embedding?: string | null
          query_text: string
          response_text: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: never
          query_embedding?: string | null
          query_text?: string
          response_text?: string
        }
        Relationships: []
      }
      book_grammar: {
        Row: {
          book: string
          created_at: string | null
          day: number | null
          desc_id: string | null
          examples: Json | null
          form: string | null
          global_id: string | null
          id: string
          level: string | null
          meaning_en: string | null
          meaning_id: string | null
          pattern: string
          quiz_items: Json | null
          seq: number | null
          source_verified: boolean | null
          unit: string | null
          updated_at: string | null
          week: number | null
        }
        Insert: {
          book: string
          created_at?: string | null
          day?: number | null
          desc_id?: string | null
          examples?: Json | null
          form?: string | null
          global_id?: string | null
          id: string
          level?: string | null
          meaning_en?: string | null
          meaning_id?: string | null
          pattern: string
          quiz_items?: Json | null
          seq?: number | null
          source_verified?: boolean | null
          unit?: string | null
          updated_at?: string | null
          week?: number | null
        }
        Update: {
          book?: string
          created_at?: string | null
          day?: number | null
          desc_id?: string | null
          examples?: Json | null
          form?: string | null
          global_id?: string | null
          id?: string
          level?: string | null
          meaning_en?: string | null
          meaning_id?: string | null
          pattern?: string
          quiz_items?: Json | null
          seq?: number | null
          source_verified?: boolean | null
          unit?: string | null
          updated_at?: string | null
          week?: number | null
        }
        Relationships: []
      }
      book_quiz: {
        Row: {
          answer: string
          book: string
          created_at: string | null
          day: number | null
          explanation_id: string | null
          grammar_id: string | null
          id: string
          options: Json | null
          question: string
          source_verified: boolean | null
          type: string | null
          week: number | null
        }
        Insert: {
          answer: string
          book: string
          created_at?: string | null
          day?: number | null
          explanation_id?: string | null
          grammar_id?: string | null
          id: string
          options?: Json | null
          question: string
          source_verified?: boolean | null
          type?: string | null
          week?: number | null
        }
        Update: {
          answer?: string
          book?: string
          created_at?: string | null
          day?: number | null
          explanation_id?: string | null
          grammar_id?: string | null
          id?: string
          options?: Json | null
          question?: string
          source_verified?: boolean | null
          type?: string | null
          week?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_quiz_grammar_id_fkey"
            columns: ["grammar_id"]
            isOneToOne: false
            referencedRelation: "book_grammar"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progress: {
        Row: {
          completed: boolean | null
          current_index: number | null
          id: number
          started_at: string | null
          track_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          current_index?: number | null
          id?: never
          started_at?: string | null
          track_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          current_index?: number | null
          id?: never
          started_at?: string | null
          track_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      error_reports: {
        Row: {
          created_at: string | null
          description: string
          field: string | null
          id: number
          item_id: string
          item_type: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          field?: string | null
          id?: never
          item_id: string
          item_type: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          field?: string | null
          id?: never
          item_id?: string
          item_type?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      fsrs_atoms: {
        Row: {
          atom_id: string
          atom_type: string
          auditory_difficulty: number | null
          auditory_stability: number | null
          context_difficulty: number | null
          context_stability: number | null
          created_at: string | null
          id: number
          last_reviewed_at: string | null
          updated_at: string | null
          user_id: string
          verbal_difficulty: number | null
          verbal_stability: number | null
          visual_difficulty: number | null
          visual_stability: number | null
        }
        Insert: {
          atom_id: string
          atom_type: string
          auditory_difficulty?: number | null
          auditory_stability?: number | null
          context_difficulty?: number | null
          context_stability?: number | null
          created_at?: string | null
          id?: never
          last_reviewed_at?: string | null
          updated_at?: string | null
          user_id: string
          verbal_difficulty?: number | null
          verbal_stability?: number | null
          visual_difficulty?: number | null
          visual_stability?: number | null
        }
        Update: {
          atom_id?: string
          atom_type?: string
          auditory_difficulty?: number | null
          auditory_stability?: number | null
          context_difficulty?: number | null
          context_stability?: number | null
          created_at?: string | null
          id?: never
          last_reviewed_at?: string | null
          updated_at?: string | null
          user_id?: string
          verbal_difficulty?: number | null
          verbal_stability?: number | null
          visual_difficulty?: number | null
          visual_stability?: number | null
        }
        Relationships: []
      }
      grammar_rules: {
        Row: {
          category: string | null
          connection: string | null
          created_at: string | null
          desc_id: string | null
          examples: Json | null
          formality_level: string | null
          id: string
          level: string | null
          meaning_en: string | null
          meaning_id: string
          pattern: string
          reading: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          connection?: string | null
          created_at?: string | null
          desc_id?: string | null
          examples?: Json | null
          formality_level?: string | null
          id: string
          level?: string | null
          meaning_en?: string | null
          meaning_id: string
          pattern: string
          reading?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          connection?: string | null
          created_at?: string | null
          desc_id?: string | null
          examples?: Json | null
          formality_level?: string | null
          id?: string
          level?: string | null
          meaning_en?: string | null
          meaning_id?: string
          pattern?: string
          reading?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      health_heartbeats: {
        Row: {
          id: number
          metadata: Json | null
          ping_source: string
          pinged_at: string | null
        }
        Insert: {
          id?: never
          metadata?: Json | null
          ping_source: string
          pinged_at?: string | null
        }
        Update: {
          id?: never
          metadata?: Json | null
          ping_source?: string
          pinged_at?: string | null
        }
        Relationships: []
      }
      kanji: {
        Row: {
          character: string
          created_at: string | null
          jlpt_level: string | null
          kunyomi: string[] | null
          meaning_en: string | null
          meaning_id: string
          onyomi: string[] | null
          radical: string | null
          stroke_count: number | null
        }
        Insert: {
          character: string
          created_at?: string | null
          jlpt_level?: string | null
          kunyomi?: string[] | null
          meaning_en?: string | null
          meaning_id: string
          onyomi?: string[] | null
          radical?: string | null
          stroke_count?: number | null
        }
        Update: {
          character?: string
          created_at?: string | null
          jlpt_level?: string | null
          kunyomi?: string[] | null
          meaning_en?: string | null
          meaning_id?: string
          onyomi?: string[] | null
          radical?: string | null
          stroke_count?: number | null
        }
        Relationships: []
      }
      particles: {
        Row: {
          collocation: string | null
          examples: Json | null
          explanation_id: string | null
          function_name: string
          id: string
          level: string | null
          meaning_id: string
          particle: string
        }
        Insert: {
          collocation?: string | null
          examples?: Json | null
          explanation_id?: string | null
          function_name: string
          id: string
          level?: string | null
          meaning_id: string
          particle: string
        }
        Update: {
          collocation?: string | null
          examples?: Json | null
          explanation_id?: string | null
          function_name?: string
          id?: string
          level?: string | null
          meaning_id?: string
          particle?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_level: string | null
          display_name: string | null
          id: string
          learning_dna: Json | null
          streak_days: number | null
          streak_last: string | null
          updated_at: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_level?: string | null
          display_name?: string | null
          id: string
          learning_dna?: Json | null
          streak_days?: number | null
          streak_last?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_level?: string | null
          display_name?: string | null
          id?: string
          learning_dna?: Json | null
          streak_days?: number | null
          streak_last?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      review_history: {
        Row: {
          id: number
          item_id: string
          item_type: string
          rating: number
          response_ms: number | null
          reviewed_at: string | null
          user_id: string
        }
        Insert: {
          id?: never
          item_id: string
          item_type: string
          rating: number
          response_ms?: number | null
          reviewed_at?: string | null
          user_id: string
        }
        Update: {
          id?: never
          item_id?: string
          item_type?: string
          rating?: number
          response_ms?: number | null
          reviewed_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      srs_cards: {
        Row: {
          created_at: string | null
          difficulty: number | null
          due: string | null
          elapsed_days: number | null
          id: number
          item_id: string
          item_type: string
          lapses: number | null
          last_review: string | null
          reps: number | null
          scheduled_days: number | null
          stability: number | null
          state: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          difficulty?: number | null
          due?: string | null
          elapsed_days?: number | null
          id?: never
          item_id: string
          item_type: string
          lapses?: number | null
          last_review?: string | null
          reps?: number | null
          scheduled_days?: number | null
          stability?: number | null
          state?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          difficulty?: number | null
          due?: string | null
          elapsed_days?: number | null
          id?: never
          item_id?: string
          item_type?: string
          lapses?: number | null
          last_review?: string | null
          reps?: number | null
          scheduled_days?: number | null
          stability?: number | null
          state?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_memories: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_play_audio: boolean | null
          daily_goal: number | null
          preferred_quiz: string | null
          show_romaji: boolean | null
          theme: string | null
          ui_language: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_play_audio?: boolean | null
          daily_goal?: number | null
          preferred_quiz?: string | null
          show_romaji?: boolean | null
          theme?: string | null
          ui_language?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_play_audio?: boolean | null
          daily_goal?: number | null
          preferred_quiz?: string | null
          show_romaji?: boolean | null
          theme?: string | null
          ui_language?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vocabulary: {
        Row: {
          antonyms: string[] | null
          conj_type: string | null
          created_at: string | null
          examples: Json | null
          formality_level: string | null
          furigana_mapping: Json | null
          id: string
          jlpt_level: string | null
          meaning_en: string | null
          meaning_id: string
          pos: string | null
          reading: string
          romaji: string | null
          see_also: string[] | null
          synonyms: string[] | null
          transitivity: string | null
          updated_at: string | null
          word: string
        }
        Insert: {
          antonyms?: string[] | null
          conj_type?: string | null
          created_at?: string | null
          examples?: Json | null
          formality_level?: string | null
          furigana_mapping?: Json | null
          id: string
          jlpt_level?: string | null
          meaning_en?: string | null
          meaning_id: string
          pos?: string | null
          reading: string
          romaji?: string | null
          see_also?: string[] | null
          synonyms?: string[] | null
          transitivity?: string | null
          updated_at?: string | null
          word: string
        }
        Update: {
          antonyms?: string[] | null
          conj_type?: string | null
          created_at?: string | null
          examples?: Json | null
          formality_level?: string | null
          furigana_mapping?: Json | null
          id?: string
          jlpt_level?: string | null
          meaning_en?: string | null
          meaning_id?: string
          pos?: string | null
          reading?: string
          romaji?: string | null
          see_also?: string[] | null
          synonyms?: string[] | null
          transitivity?: string | null
          updated_at?: string | null
          word?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_user_memories: {
        Args: {
          p_match_count?: number
          p_match_threshold?: number
          p_query_embedding: string
          p_user_id: string
        }
        Returns: {
          category: string
          content: string
          id: string
          metadata: Json
          similarity: number
        }[]
      }
      upsert_promotion_signal: {
        Args: {
          p_ai_item_id: string
          p_content: Json
          p_critic_provider?: string
          p_critic_verdict?: string
          p_generator_model?: string
          p_generator_provider?: string
          p_item_type: string
          p_prompt_version?: string
          p_verdict: string
        }
        Returns: undefined
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
