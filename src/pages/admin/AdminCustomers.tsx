import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      // Get profiles (customers)
      const { data: profiles } = await supabase.from('profiles').select('*');
      // Get orders for order counts
      const { data: orders } = await supabase.from('orders').select('customer_email, total_amount');

      const customerMap = new Map<string, { orderCount: number; totalSpent: number }>();
      orders?.forEach((o) => {
        const email = o.customer_email || 'unknown';
        const existing = customerMap.get(email) || { orderCount: 0, totalSpent: 0 };
        customerMap.set(email, { orderCount: existing.orderCount + 1, totalSpent: existing.totalSpent + Number(o.total_amount) });
      });

      const enriched = (profiles || []).map((p) => {
        const stats = customerMap.get(p.email || '') || { orderCount: 0, totalSpent: 0 };
        return { ...p, ...stats };
      });

      setCustomers(enriched);
    };
    fetch();
  }, []);

  const formatPrice = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Customers Management</h1>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50"><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Phone</th><th className="text-right p-3">Orders</th><th className="text-right p-3">Total Spent</th></tr></thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3 font-medium">{c.name || '-'}</td>
                    <td className="p-3">{c.email || '-'}</td>
                    <td className="p-3">{c.phone || '-'}</td>
                    <td className="p-3 text-right">{c.orderCount}</td>
                    <td className="p-3 text-right font-semibold">{formatPrice(c.totalSpent)}</td>
                  </tr>
                ))}
                {customers.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No customers yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;
