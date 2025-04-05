import { IUser } from '@/@types/user.type';
import { createClient } from '@supabase/supabase-js';

// É importante não armazenar chaves secretas no código do frontend
// Estas são chaves públicas que podem ser expostas com segurança
const supabaseUrl = 'https://cxrwxfzewnitmcpvxrrx.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cnd4Znpld25pdG1jcHZ4cnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MTM3NzMsImV4cCI6MjA1OTE4OTc3M30.X3cqtIxx8of6sDGrV8zqP773r5Dwitq1jNn5qKdHwWY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SupabaseUser = IUser;
