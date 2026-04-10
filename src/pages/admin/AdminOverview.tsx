import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, IndianRupee, Users, Package } from 'lucide-react';

const AdminOverview = () => {
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalCustomers: 0, totalProducts: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, profilesRes, productsRes] = await Promise.all([
        supabase.from('orders').select('id, total_amount, order_number, customer_name, order_status, created_at'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true }),
      ]);

      const orders = ordersRes.data || [];
      const revenue = orders.reduce((sum, o) => sum + Number(o.total_amount), 0);

      setStats({
        totalOrders: orders.length,
        totalRevenue: revenue,
        totalCustomers: profilesRes.count || 0,
        totalProducts: productsRes.count || 0,
      });
      setRecentOrders(orders.slice(0, 5));
    };
    fetchStats();
  }, []);

  const formatPrice = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const statCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-blue-600' },
    { title: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: IndianRupee, color: 'text-green-600' },
    { title: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'text-purple-600' },
    { title: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-amber-600' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b"><th className="text-left py-2">Order #</th><th className="text-left py-2">Customer</th><th className="text-left py-2">Status</th><th className="text-right py-2">Amount</th></tr></thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-2 font-mono text-xs">{o.order_number}</td>
                      <td className="py-2">{o.customer_name}</td>
                      <td className="py-2"><span className="px-2 py-1 rounded-full text-xs bg-accent/20 text-accent-foreground">{o.order_status}</span></td>
                      <td className="py-2 text-right font-semibold">{formatPrice(o.total_amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
