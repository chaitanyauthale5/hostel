import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Student {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  room_number?: string;
  course?: string;
  admission_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useRealtimeStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial students
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching students:', error);
        return;
      }

      setStudents(data || []);
      setLoading(false);
    };

    fetchStudents();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'students'
        },
        (payload) => {
          console.log('Student change received:', payload);
          
          switch (payload.eventType) {
            case 'INSERT':
              setStudents(prev => [payload.new as Student, ...prev]);
              break;
            case 'UPDATE':
              setStudents(prev => 
                prev.map(student => 
                  student.id === payload.new.id ? payload.new as Student : student
                )
              );
              break;
            case 'DELETE':
              setStudents(prev => 
                prev.filter(student => student.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { students, loading };
};