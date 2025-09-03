export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_profiles: {
        Row: {
          business_email: string
          business_name: string
          business_niche: string
          created_at: string
          id: string
          monthly_clients: number
          onboarding_completed: boolean | null
          phone_number: string
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          business_email: string
          business_name: string
          business_niche: string
          created_at?: string
          id: string
          monthly_clients: number
          onboarding_completed?: boolean | null
          phone_number: string
          updated_at?: string
          whatsapp_number: string
        }
        Update: {
          business_email?: string
          business_name?: string
          business_niche?: string
          created_at?: string
          id?: string
          monthly_clients?: number
          onboarding_completed?: boolean | null
          phone_number?: string
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_type: string
          client_email: string | null
          client_name: string | null
          created_at: string
          duration_minutes: number
          id: string
          scheduled_at: string
          status: string
          user_id: string | null
        }
        Insert: {
          booking_type?: string
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          scheduled_at: string
          status?: string
          user_id?: string | null
        }
        Update: {
          booking_type?: string
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          duration_minutes?: number
          id?: string
          scheduled_at?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      email_automation_rules: {
        Row: {
          active: boolean | null
          created_at: string | null
          delay_minutes: number | null
          id: string
          name: string
          template_id: string | null
          trigger_conditions: Json | null
          trigger_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          delay_minutes?: number | null
          id?: string
          name: string
          template_id?: string | null
          trigger_conditions?: Json | null
          trigger_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          delay_minutes?: number | null
          id?: string
          name?: string
          template_id?: string | null
          trigger_conditions?: Json | null
          trigger_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_automation_rules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          clicked_count: number | null
          created_at: string | null
          id: string
          name: string
          opened_count: number | null
          replied_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          sent_count: number | null
          status: string | null
          template_id: string | null
          total_recipients: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          clicked_count?: number | null
          created_at?: string | null
          id?: string
          name: string
          opened_count?: number | null
          replied_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string | null
          template_id?: string | null
          total_recipients?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          clicked_count?: number | null
          created_at?: string | null
          id?: string
          name?: string
          opened_count?: number | null
          replied_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          sent_count?: number | null
          status?: string | null
          template_id?: string | null
          total_recipients?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_queue: {
        Row: {
          bounce_reason: string | null
          campaign_id: string | null
          clicked_at: string | null
          content: string
          created_at: string | null
          error_message: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          opened_at: string | null
          replied_at: string | null
          retry_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string | null
          subject: string
          template_id: string | null
          to_email: string
          user_id: string | null
        }
        Insert: {
          bounce_reason?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          content: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          opened_at?: string | null
          replied_at?: string | null
          retry_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          template_id?: string | null
          to_email: string
          user_id?: string | null
        }
        Update: {
          bounce_reason?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          content?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          opened_at?: string | null
          replied_at?: string | null
          retry_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          template_id?: string | null
          to_email?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_queue_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_queue_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_queue_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          active: boolean | null
          content: string
          created_at: string | null
          id: string
          name: string
          subject: string
          template_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          active?: boolean | null
          content: string
          created_at?: string | null
          id?: string
          name: string
          subject: string
          template_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          active?: boolean | null
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          subject?: string
          template_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          source: string
          status: string
          temperature: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          source?: string
          status?: string
          temperature?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          source?: string
          status?: string
          temperature?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_automated: boolean | null
          message_type: string
          platform: string
          response_time_seconds: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_automated?: boolean | null
          message_type?: string
          platform?: string
          response_time_seconds?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_automated?: boolean | null
          message_type?: string
          platform?: string
          response_time_seconds?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      n8n_coaches: {
        Row: {
          Email: string | null
          "Follow-Up": boolean | null
          "follow-Up-details": string | null
          "Have you worked with a coach before?": string | null
          "How soon are you looking to get started?": string | null
          id: string
          "Lead Source": string | null
          Name: string | null
          "Phone number": number | null
          Status: string | null
          "What goal are you looking to achieve?": string | null
        }
        Insert: {
          Email?: string | null
          "Follow-Up"?: boolean | null
          "follow-Up-details"?: string | null
          "Have you worked with a coach before?"?: string | null
          "How soon are you looking to get started?"?: string | null
          id?: string
          "Lead Source"?: string | null
          Name?: string | null
          "Phone number"?: number | null
          Status?: string | null
          "What goal are you looking to achieve?"?: string | null
        }
        Update: {
          Email?: string | null
          "Follow-Up"?: boolean | null
          "follow-Up-details"?: string | null
          "Have you worked with a coach before?"?: string | null
          "How soon are you looking to get started?"?: string | null
          id?: string
          "Lead Source"?: string | null
          Name?: string | null
          "Phone number"?: number | null
          Status?: string | null
          "What goal are you looking to achieve?"?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          business_type: string
          company_name: string | null
          created_at: string | null
          current_tools: string[] | null
          full_name: string
          goals: string[] | null
          id: string
          industry: string | null
          monthly_leads_goal: number | null
          onboarding_completed: boolean | null
          pain_points: string[] | null
          phone: string | null
          primary_communication: string
          team_size: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          business_type?: string
          company_name?: string | null
          created_at?: string | null
          current_tools?: string[] | null
          full_name: string
          goals?: string[] | null
          id: string
          industry?: string | null
          monthly_leads_goal?: number | null
          onboarding_completed?: boolean | null
          pain_points?: string[] | null
          phone?: string | null
          primary_communication?: string
          team_size?: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          business_type?: string
          company_name?: string | null
          created_at?: string | null
          current_tools?: string[] | null
          full_name?: string
          goals?: string[] | null
          id?: string
          industry?: string | null
          monthly_leads_goal?: number | null
          onboarding_completed?: boolean | null
          pain_points?: string[] | null
          phone?: string | null
          primary_communication?: string
          team_size?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      voice_calls: {
        Row: {
          caller_phone: string | null
          created_at: string
          duration_seconds: number
          id: string
          resolution_status: string
          status: string
          transcript: string | null
          user_id: string | null
        }
        Insert: {
          caller_phone?: string | null
          created_at?: string
          duration_seconds?: number
          id?: string
          resolution_status?: string
          status?: string
          transcript?: string | null
          user_id?: string | null
        }
        Update: {
          caller_phone?: string | null
          created_at?: string
          duration_seconds?: number
          id?: string
          resolution_status?: string
          status?: string
          transcript?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      workflows: {
        Row: {
          actions_count: number | null
          created_at: string
          id: string
          last_run_at: string | null
          name: string
          status: string
          success_rate: number | null
          trigger_type: string
          user_id: string | null
        }
        Insert: {
          actions_count?: number | null
          created_at?: string
          id?: string
          last_run_at?: string | null
          name: string
          status?: string
          success_rate?: number | null
          trigger_type: string
          user_id?: string | null
        }
        Update: {
          actions_count?: number | null
          created_at?: string
          id?: string
          last_run_at?: string | null
          name?: string
          status?: string
          success_rate?: number | null
          trigger_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      trigger_email_automation: {
        Args: {
          p_lead_id: string
          p_trigger_type: string
          p_trigger_data?: Json
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
