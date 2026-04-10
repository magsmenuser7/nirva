import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye } from 'lucide-react';

const statusOptions = ['pending', 'processing', 'confirmed', 'shipped', 'delivered', 'cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ order_status: status }).eq('id', id);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else {
      toast({ title: 'Status updated' });
      // Add tracking entry
      await supabase.from('order_tracking').insert({ order_id: id, status: status.charAt(0).toUpperCase() + status.slice(1), description: `Order status changed to ${status}` });
      fetchOrders();
    }
  };

  const formatPrice = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Orders Management</h1>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50"><th className="text-left p-3">Order #</th><th className="text-left p-3">Customer</th><th className="text-left p-3">Phone</th><th className="text-left p-3">Status</th><th className="text-left p-3">Payment</th><th className="text-right p-3">Amount</th><th className="text-right p-3">Actions</th></tr></thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs">{o.order_number}</td>
                    <td className="p-3">{o.customer_name}</td>
                    <td className="p-3">{o.customer_phone}</td>
                    <td className="p-3">
                      <Select value={o.order_status} onValueChange={(v) => updateStatus(o.id, v)}>
                        <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>{statusOptions.map((s) => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}</SelectContent>
                      </Select>
                    </td>
                    <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${o.payment_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{o.payment_status}</span></td>
                    <td className="p-3 text-right font-semibold">{formatPrice(o.total_amount)}</td>
                    <td className="p-3 text-right"><Button size="sm" variant="outline" onClick={() => setSelectedOrder(o)}><Eye className="w-3 h-3" /></Button></td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No orders yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Order Details - {selectedOrder?.order_number}</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><strong>Customer:</strong> {selectedOrder.customer_name}</div>
                <div><strong>Phone:</strong> {selectedOrder.customer_phone}</div>
                <div><strong>Email:</strong> {selectedOrder.customer_email || '-'}</div>
                <div><strong>Payment:</strong> {selectedOrder.payment_method}</div>
              </div>
              <div>
                <strong>Items:</strong>
                <div className="mt-2 space-y-1">
                  {(selectedOrder.items as any[])?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between bg-muted/50 rounded p-2">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(selectedOrder.subtotal)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>{formatPrice(selectedOrder.tax_amount)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{formatPrice(selectedOrder.shipping_cost)}</span></div>
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatPrice(selectedOrder.total_amount)}</span></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
