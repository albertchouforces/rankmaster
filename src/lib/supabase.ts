import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your Supabase project credentials
// You can find these in your Supabase project settings -> API
const supabaseUrl = 'https://lgtijobontcybeqobomh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndGlqb2JvbnRjeWJlcW9ib21oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjQ1MDk4MiwiZXhwIjoyMDUyMDI2OTgyfQ.TIlDrifOlgutH-kt7Zsu5ab-0iCqS_E6LPZixxbTNLw';

/*
Database setup required:
Create a table named 'global_scores' with the following columns:
- id: uuid (primary key)
- user_name: text
- score: integer
- accuracy: integer
- time: integer (milliseconds)
- service: text (enum: 'navy', 'army', 'air')
- date: timestamp with timezone
*/

export const supabase = createClient(supabaseUrl, supabaseKey);

interface GlobalScoreEntry {
  user_name: string;
  score: number;
  accuracy: number;
  time: number;
  service: 'navy' | 'army' | 'air';
  date: string;
}

export async function saveGlobalScore(scoreData: GlobalScoreEntry): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('global_scores')
      .insert([scoreData]);

    if (error) {
      console.error('Error saving global score:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error in saveGlobalScore:', err);
    return false;
  }
}

export async function getGlobalScores(service: 'navy' | 'army' | 'air'): Promise<GlobalScoreEntry[]> {
  try {
    const { data, error } = await supabase
      .from('global_scores')
      .select('*')
      .eq('service', service)
      .order('score', { ascending: false })
      .order('time', { ascending: true })
      .limit(100);

    if (error) {
      console.error('Error fetching global scores:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getGlobalScores:', err);
    return [];
  }
}

export type { GlobalScoreEntry };