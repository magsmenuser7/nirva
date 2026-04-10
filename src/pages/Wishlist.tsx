 import { Layout } from '@/components/layout/Layout';
 import { motion } from 'framer-motion';
 import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { useWishlist } from '@/contexts/WishlistContext';
 import { useCart } from '@/contexts/CartContext';
 import { Link } from 'react-router-dom';
 
 const formatPrice = (price: number) => {
   return new Intl.NumberFormat('en-IN', {
     style: 'currency',
     currency: 'INR',
     maximumFractionDigits: 0,
   }).format(price);
 };
 
 const Wishlist = () => {
   const { items, removeItem } = useWishlist();
   const { addItem } = useCart();
 
   const handleMoveToCart = (item: typeof items[0]) => {
     addItem({
       id: item.id,
       name: item.name,
       price: item.price,
       image: item.image,
     });
     removeItem(item.id);
   };
 
   return (
     <Layout>
       <div className="pt-24 pb-16 min-h-screen">
         <div className="container mx-auto px-4 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
             <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">My Wishlist</h1>
             <p className="text-muted-foreground">
               {items.length} {items.length === 1 ? 'item' : 'items'} saved
             </p>
           </motion.div>
 
           {items.length === 0 ? (
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-16"
             >
               <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                 <Heart className="w-12 h-12 text-muted-foreground" />
               </div>
               <h2 className="font-display text-2xl text-foreground mb-4">Your wishlist is empty</h2>
               <p className="text-muted-foreground mb-8">Save items you love by clicking the heart icon.</p>
               <Button variant="gold" asChild>
                 <Link to="/shop">Explore Products</Link>
               </Button>
             </motion.div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {items.map((item, index) => (
                 <motion.div
                   key={item.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-card rounded-lg overflow-hidden shadow-card hover-lift"
                 >
                   <Link to={`/product/${item.id}`} className="block relative aspect-square overflow-hidden">
                     <img
                       src={item.image}
                       alt={item.name}
                       className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                     />
                   </Link>
                   <div className="p-4">
                     {item.category && (
                       <span className="text-muted-foreground text-xs uppercase tracking-wide">
                         {item.category}
                       </span>
                     )}
                     <Link to={`/product/${item.id}`}>
                       <h3 className="font-display text-lg text-foreground mt-1 mb-2 hover:text-accent transition-colors">
                         {item.name}
                       </h3>
                     </Link>
                     <span className="text-accent font-semibold text-lg">{formatPrice(item.price)}</span>
                     <div className="flex gap-2 mt-4">
                       <Button
                         variant="outline"
                         size="sm"
                         className="flex-1"
                         onClick={() => handleMoveToCart(item)}
                       >
                         <ShoppingCart className="w-4 h-4 mr-2" />
                         Move to Cart
                       </Button>
                       <Button
                         variant="outline"
                         size="sm"
                         onClick={() => removeItem(item.id)}
                         className="text-destructive hover:text-destructive"
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
           )}
         </div>
       </div>
     </Layout>
   );
 };
 
 export default Wishlist;