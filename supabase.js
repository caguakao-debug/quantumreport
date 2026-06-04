/* ============================================
   QUANTUMREPORT — Supabase Client
   ============================================ */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pdmkaimtseshngyuqjyn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkbWthaW10c2VzaG5neXVxanluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzQ1NDUsImV4cCI6MjA5NjExMDU0NX0.rRwcl0BX2zFxTYHWFYdMQsIi9ddm4MmXbCYi1BPSCuM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
