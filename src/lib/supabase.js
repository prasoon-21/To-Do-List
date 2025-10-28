import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// ADD THESE DEBUG LOGS
console.log('=== SUPABASE DEBUG INFO ===')
console.log('URL exists:', !!supabaseUrl)
console.log('Key exists:', !!supabaseAnonKey)
console.log('URL starts with https:', supabaseUrl?.startsWith('https://'))
console.log('Full URL:', supabaseUrl)
console.log('Key preview:', supabaseAnonKey?.substring(0, 20) + '...')
console.log('===========================')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)