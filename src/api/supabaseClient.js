import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://SEU_PROJETO.supabase.co';
// const supabaseKey = 'SUA_CHAVE_PUBLICA';
const supabaseUrl = 'https://yulykztzhmoxfztykeop.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1bHlrenR6aG1veGZ6dHlrZW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTUyNjAsImV4cCI6MjA2NjE5MTI2MH0.sFnTOu8fRgkycEZatgy4eVK-SyRjyrKKUChdByoiy1c';

export const supabase = createClient(supabaseUrl, supabaseKey);