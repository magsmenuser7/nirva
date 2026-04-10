import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, ChevronRight, MapPin, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  total_amount: number;
  order_status: string;
  payment_status: string;
  tracking_number: string | null;
  created_at: string;
}

interface TrackingStep {
  id: string;
  status: string;
  description: string | null;
  location: string | null;
  created_at: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-accent" />;
    case 'shipped':
      return <Truck className="w-5 h-5 text-primary" />;
    case 'processing':
      return <Package className="w-5 h-5 text-accent" />;
    default:
      return <Clock className="w-5 h-5 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-accent/20 text-accent';
    case 'shipped':
      return 'bg-primary/20 text-primary';
    case 'processing':
      return 'bg-secondary text-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const searchOrders = async () => {
    if (!searchQuery.trim()) {
      toast({ title: 'Enter search', description: 'Please enter an order number or phone number.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .or(`order_number.ilike.%${searchQuery}%,customer_phone.ilike.%${searchQuery}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Parse the items JSON for each order
      const parsedOrders = (data || []).map(order => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
      }));

      setOrders(parsedOrders);
      if (parsedOrders.length === 0) {
        toast({ title: 'No orders found', description: 'Try a different order number or phone number.' });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({ title: 'Error', description: 'Failed to fetch orders.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderTracking = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_tracking')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTrackingSteps(data || []);
    } catch (error) {
      console.error('Error fetching tracking:', error);
    }
  };

  useEffect(() => {
    if (selectedOrder) {
      fetchOrderTracking(selectedOrder.id);
    }
  }, [selectedOrder]);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <Layout>
      <div className="pt-24 pb-16 min-h-screen bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl text-foreground">My Orders</h1>
            <p className="text-muted-foreground mt-2">Track and manage your orders</p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-lg p-6 shadow-card mb-8"
          >
            <h2 className="font-display text-xl text-foreground mb-4">Find Your Order</h2>
            <div className="flex gap-4">
              <Input
                placeholder="Enter order number or phone number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchOrders()}
                className="flex-1"
              />
              <Button variant="gold" onClick={searchOrders} disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                Search
              </Button>
            </div>
          </motion.div>

          {orders.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-lg shadow-card">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl text-foreground mb-2">Search for your orders</h2>
              <p className="text-muted-foreground mb-6">Enter your order number or phone number to view your orders</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Orders List */}
              <div className="lg:col-span-2 space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.order_number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-card rounded-lg p-6 shadow-card cursor-pointer transition-all ${
                      selectedOrder?.order_number === order.order_number ? 'ring-2 ring-accent' : 'hover:shadow-elegant'
                    }`}
                    onClick={() => handleSelectOrder(order)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{order.order_number}</h3>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                            {item.image && item.image !== '/placeholder.svg' ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-sm text-muted-foreground">+{order.items.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-semibold text-accent">{formatPrice(order.total_amount)}</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Details & Tracking */}
              <div className="lg:col-span-1">
                {selectedOrder ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card rounded-lg p-6 shadow-card sticky top-28"
                  >
                    <h3 className="font-display text-xl text-foreground mb-6">Order Tracking</h3>
                    
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Truck className="w-4 h-4" />
                        <span>Order #{selectedOrder.order_number}</span>
                      </div>
                      {selectedOrder.tracking_number && (
                        <p className="text-sm font-mono text-foreground">
                          Tracking: {selectedOrder.tracking_number}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2 capitalize">
                        Status: <span className="font-medium text-foreground">{selectedOrder.order_status}</span>
                      </p>
                    </div>

                    {/* Tracking Steps */}
                    {trackingSteps.length > 0 ? (
                      <div className="space-y-4">
                        {trackingSteps.map((step, index) => (
                          <div key={step.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-accent" />
                              {index < trackingSteps.length - 1 && (
                                <div className="w-0.5 h-8 bg-accent" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium text-foreground">{step.status}</p>
                              {step.description && (
                                <p className="text-xs text-muted-foreground">{step.description}</p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {new Date(step.created_at).toLocaleString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No tracking updates available yet.</p>
                    )}

                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-semibold text-foreground mb-4">Order Items</h4>
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                          <span className="text-foreground">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-semibold mt-4 pt-4 border-t border-border">
                        <span>Total</span>
                        <span className="text-accent">{formatPrice(selectedOrder.total_amount)}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-card rounded-lg p-6 shadow-card text-center">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select an order to view tracking details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;