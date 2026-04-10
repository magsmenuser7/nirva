import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';

const AdminPayments = () => {
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('payments')
        .select('*, orders(order_number, customer_name)')
        .order('created_at', { ascending: false });
      setPayments(data || []);
    };
    fetch();
  }, []);

  const formatPrice = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Payments</h1>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50"><th className="text-left p-3">Order #</th><th className="text-left p-3">Payment ID</th><th className="text-right p-3">Amount</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr></thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs">{(p.orders as any)?.order_number || '-'}</td>
                    <td className="p-3 font-mono text-xs">{p.razorpay_payment_id || '-'}</td>
                    <td className="p-3 text-right font-semibold">{formatPrice(p.amount)}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${p.status === 'success' ? 'bg-green-100 text-green-800' : p.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{p.status}</span></td>
                    <td className="p-3 text-muted-foreground">{new Date(p.payment_date).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
                {payments.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No payments recorded yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
