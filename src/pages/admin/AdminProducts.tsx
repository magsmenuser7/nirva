import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  product_name: string;
  description: string | null;
  price: number;
  weight: number | null;
  gold_purity: string | null;
  stock: number;
  image: string | null;
  category: string | null;
}

const emptyProduct = { product_name: '', description: '', price: 0, weight: 0, gold_purity: '', stock: 0, image: '', category: '' };

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async () => {
    setLoading(true);
    if (editing) {
      const { error } = await supabase.from('products').update({
        product_name: form.product_name,
        description: form.description || null,
        price: form.price,
        weight: form.weight || null,
        gold_purity: form.gold_purity || null,
        stock: form.stock,
        image: form.image || null,
        category: form.category || null,
      }).eq('id', editing.id);
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else toast({ title: 'Product updated' });
    } else {
      const { error } = await supabase.from('products').insert({
        product_name: form.product_name,
        description: form.description || null,
        price: form.price,
        weight: form.weight || null,
        gold_purity: form.gold_purity || null,
        stock: form.stock,
        image: form.image || null,
        category: form.category || null,
      });
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else toast({ title: 'Product added' });
    }
    setLoading(false);
    setIsOpen(false);
    setEditing(null);
    setForm(emptyProduct);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await supabase.from('products').delete().eq('id', id);
    toast({ title: 'Product deleted' });
    fetchProducts();
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      product_name: p.product_name,
      description: p.description || '',
      price: p.price,
      weight: p.weight || 0,
      gold_purity: p.gold_purity || '',
      stock: p.stock,
      image: p.image || '',
      category: p.category || '',
    });
    setIsOpen(true);
  };

  const formatPrice = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Products Management</h1>
        <Button onClick={() => { setEditing(null); setForm(emptyProduct); setIsOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50"><th className="text-left p-3">Image</th><th className="text-left p-3">Name</th><th className="text-left p-3">Category</th><th className="text-right p-3">Price</th><th className="text-right p-3">Stock</th><th className="text-right p-3">Actions</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="p-3">{p.image ? <img src={p.image} alt={p.product_name} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-muted rounded" />}</td>
                    <td className="p-3 font-medium">{p.product_name}</td>
                    <td className="p-3 text-muted-foreground">{p.category || '-'}</td>
                    <td className="p-3 text-right">{formatPrice(p.price)}</td>
                    <td className="p-3 text-right">{p.stock}</td>
                    <td className="p-3 text-right space-x-2">
                      <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Pencil className="w-3 h-3" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}><Trash2 className="w-3 h-3" /></Button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No products yet. Add your first product.</td></tr>}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Product' : 'Add Product'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Product Name *</Label><Input value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} /></div>
            <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Price (₹) *</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
              <div><Label>Stock *</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Weight (grams)</Label><Input type="number" value={form.weight} onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })} /></div>
              <div><Label>Gold Purity</Label><Input value={form.gold_purity} onChange={(e) => setForm({ ...form, gold_purity: e.target.value })} placeholder="e.g. 22K, 24K" /></div>
            </div>
            <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Rings, Necklaces" /></div>
            <div><Label>Image URL</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
            <Button onClick={handleSave} disabled={loading || !form.product_name} className="w-full">{loading ? 'Saving...' : (editing ? 'Update Product' : 'Add Product')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
