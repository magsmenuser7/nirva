import { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, Package, ShoppingCart, Users, CreditCard, Bell, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/admin/customers', icon: Users, label: 'Customers' },
  { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { path: '/admin/notifications', icon: Bell, label: 'Notifications' },
];

const AdminDashboard = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Mobile toggle */}
      <button className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <h1 className="font-display text-xl font-bold text-gold-light">NIRVA Admin</h1>
          <p className="text-sm text-primary-foreground/60 mt-1">{user.email}</p>
        </div>
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = item.end ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/15 text-white' : 'text-primary-foreground/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-3 right-3">
          <Button variant="ghost" className="w-full justify-start text-primary-foreground/70 hover:text-white hover:bg-white/10" onClick={() => { logout(); navigate('/'); }}>
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
