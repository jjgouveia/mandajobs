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
            consult: {
                Row: {
                    created_at: string | null
                    id: number
                    query_string: string
                }
                Insert: {
                    created_at?: string | null
                    id?: never
                    query_string: string
                }
                Update: {
                    created_at?: string | null
                    id?: never
                    query_string?: string
                }
                Relationships: []
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
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
