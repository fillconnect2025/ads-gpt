import { createClient } from '@supabase/supabase-js';

// É importante não armazenar chaves secretas no código do frontend
// Estas são chaves públicas que podem ser expostas com segurança
const supabaseUrl = 'https://qmwknacjqutcneizgqll.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtd2tuYWNqcXV0Y25laXpncWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4ODgzNzIsImV4cCI6MjA1OTQ2NDM3Mn0.tXsMXDH27Xu9Zn_n9Q3kLobiDfZDwEZ94_VM6dE2JLc';

export const supabase = createClient(supabaseUrl, supabaseKey);


