import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MessageSquare } from 'lucide-react';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
      setNotifications(data || []);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Notifications</h1>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50"><th className="text-left p-3">Type</th><th className="text-left p-3">Recipient</th><th className="text-left p-3">Message</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr></thead>
              <tbody>
                {notifications.map((n) => (
                  <tr key={n.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3">{n.type === 'email' ? <Mail className="w-4 h-4 text-blue-500" /> : <MessageSquare className="w-4 h-4 text-green-500" />}</td>
                    <td className="p-3">{n.recipient_email || n.recipient_phone || '-'}</td>
                    <td className="p-3 max-w-xs truncate">{n.message}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs ${n.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{n.status}</span></td>
                    <td className="p-3 text-muted-foreground">{new Date(n.created_at).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
                {notifications.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No notifications sent yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;
