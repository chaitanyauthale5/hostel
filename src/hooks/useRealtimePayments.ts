import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Payment {
  id: string;
  student_id: string;
  room_number: string;
  amount: number;
  month: string;
  due_date: string;
  payment_date?: string;
  status: string;
  payment_method?: string;
  transaction_id?: string;
  late_fee: number;
  notes?: string;
  extracted_text?: string;
  created_at: string;
  updated_at: string;
}

export const useRealtimePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial payments
    const fetchPayments = async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching payments:', error);
        return;
      }

      setPayments(data || []);
      setLoading(false);
    };

    fetchPayments();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payments'
        },
        (payload) => {
          console.log('Payment change received:', payload);
          
          switch (payload.eventType) {
            case 'INSERT':
              setPayments(prev => [payload.new as Payment, ...prev]);
              break;
            case 'UPDATE':
              setPayments(prev => 
                prev.map(payment => 
                  payment.id === payload.new.id ? payload.new as Payment : payment
                )
              );
              break;
            case 'DELETE':
              setPayments(prev => 
                prev.filter(payment => payment.id !== payload.old.id)
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

  return { payments, loading };
};