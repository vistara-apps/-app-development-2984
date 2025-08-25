import { createClient } from '@supabase/supabase-js'

// For demo purposes, using placeholder values
// In production, these would come from environment variables
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)