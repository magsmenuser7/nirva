import { useState } from 'react';
 import { Layout } from '@/components/layout/Layout';
 import { motion } from 'framer-motion';
 import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { useCart } from '@/contexts/CartContext';
 import { useWishlist } from '@/contexts/WishlistContext';
 import ringsImage from '@/assets/category-rings.jpg';
 import necklacesImage from '@/assets/category-necklaces.jpg';
 import braceletsImage from '@/assets/category-bracelets.jpg';
 import earringsImage from '@/assets/category-earrings.jpg';
import bangles from "@/assets/products/bangles/Bangle1-2.jpeg"
import bracelet from "@/assets/products/bracelets/bracelet1-1.jpeg"
import chain from "@/assets/products/chains/chain2-1.jpeg"
import earrings from "@/assets/products/earrings/earrings2-2.jpeg"
import necklace1 from "@/assets/products/necklace/necklace2-1.jpeg"
import earrings2 from "@/assets/products/earrings/earrings3-1.jpeg"
import chain2 from "@/assets/products/chains/chains3-1.jpeg"
import bridalset from "@/assets/products/necklace/necklace4-1.jpeg"
import earrings3 from "@/assets/products/earrings/earrings1-1.jpeg"
import chain3 from "@/assets/products/chains/chain1-1.jpeg"
import necklace2 from "@/assets/products/necklace/necklace5-1.jpeg"
import pendant from "@/assets/products/pendants/statues3-1.jpeg"
 
 // Collections data
 const collections = [
   {
     id: 'bridal',
     name: 'Bridal Collection',
     description: 'Timeless pieces for your special day',
     image: bangles,
     productCount: 24,
   },
   {
     id: 'festive',
     name: 'Festive Collection',
     description: 'Celebrate in style with our festive range',
     image: earrings,
     productCount: 32,
   },
   {
     id: 'everyday',
     name: 'Everyday Elegance',
     description: 'Subtle luxury for daily wear',
     image: chain,
     productCount: 45,
   },
   {
     id: 'heritage',
     name: 'Heritage Collection',
     description: 'Traditional designs with modern craftsmanship',
     image: bracelet,
     productCount: 18,
   },
 ];
 
 // Featured products in collections
 const collectionProducts = [
   {
    id: 'c1',
     name: 'Bridal Necklace',
     price: 89999,
     image: necklace1,
     category: 'Bridal Collection',
     badge: 'Bridal Special',
   },
   {
    id: 'c2',
     name: 'Rose Petal Studs',
     price: 15999,
     image: earrings2,
     category: 'Festive Collection',
     badge: 'Trending',
   },
   {
    id: 'c3',
     name: 'Daily Wear Gold Chain',
     price: 12999,
     image: chain2,
     category: 'Everyday Elegance',
   },
   {
    id: 'c4',
     name: 'Temple Heritage Bracelet',
     price: 42999,
     image: bracelet,
     category: 'Heritage Collection',
     badge: 'Limited Edition',
   },
  {
    id: 'c5',
    name: 'Bridal Necklace Set',
    price: 125999,
    image: bridalset,
    category: 'Bridal Collection',
    badge: 'Exclusive',
  },
  {
    id: 'c6',
    name: 'Festive Chandbali',
    price: 28999,
    image: earrings3,
    category: 'Festive Collection',
  },
  {
    id: 'c7',
    name: 'Minimalist Chain',
    price: 8999,
    image: chain3,
    category: 'Everyday Elegance',
  },
  {
    id: 'c8',
    name: 'Antique Temple Necklace',
    price: 78999,
    image: necklace2,
    category: 'Heritage Collection',
    badge: 'Antique',
  },
  
  {
    id: 'c9',
    name: 'Antique Pendant',
    price: 25999,
    image: pendant,
    category: 'Heritage Collection',
    badge: 'Antique',
  }
 ];
 
 const formatPrice = (price: number) => {
   return new Intl.NumberFormat('en-IN', {
     style: 'currency',
     currency: 'INR',
     maximumFractionDigits: 0,
   }).format(price);
 };
 
 const Collections = () => {
   const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
   const { addItem } = useCart();
   const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
 
   const handleAddToCart = (product: typeof collectionProducts[0]) => {
     addItem({
       id: product.id,
       name: product.name,
       price: product.price,
       image: product.image,
     });
   };
 
   const handleToggleWishlist = (product: typeof collectionProducts[0]) => {
     if (isInWishlist(product.id)) {
       removeFromWishlist(product.id);
     } else {
       addToWishlist({
         id: product.id,
         name: product.name,
         price: product.price,
         image: product.image,
         category: product.category,
       });
     }
   };
 
   const filteredProducts = selectedCollection
     ? collectionProducts.filter((p) => p.category.toLowerCase().includes(selectedCollection))
     : collectionProducts;
 
   return (
      <Layout noPadding>
       {/* Page Header with Background */}
       <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
              Our Collections
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Explore our curated collections, each telling a unique story of craftsmanship and elegance
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-12 bg-background min-h-screen">
         <div className="container mx-auto px-4 lg:px-8">
           {/* Collection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
             {collections.map((collection, index) => (
               <motion.button
                 key={collection.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 onClick={() => setSelectedCollection(
                   selectedCollection === collection.id ? null : collection.id
                 )}
                 className={`group relative overflow-hidden rounded-lg aspect-[4/5] text-left ${
                   selectedCollection === collection.id ? 'ring-2 ring-accent' : ''
                 }`}
               >
                 <img
                   src={collection.image}
                   alt={collection.name}
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-transparent" />
                 <div className="absolute bottom-0 left-0 right-0 p-6">
                   <h3 className="font-display text-xl text-primary-foreground mb-1">
                     {collection.name}
                   </h3>
                   <p className="text-primary-foreground/70 text-sm mb-2">
                     {collection.description}
                   </p>
                   <span className="text-accent text-sm">{collection.productCount} products</span>
                 </div>
               </motion.button>
             ))}
           </div>
 
           {/* Products in Collection */}
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
            className="mb-6"
           >
             <h2 className="font-display text-2xl text-foreground mb-6">
               {selectedCollection
                 ? `${collections.find((c) => c.id === selectedCollection)?.name}`
                 : 'Featured from All Collections'}
             </h2>
           </motion.div>
 
          {/* 3 Products per Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredProducts.map((product, index) => (
               <motion.div
                 key={product.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className="group bg-card rounded-lg overflow-hidden shadow-card hover-lift"
               >
                 <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                   <img
                     src={product.image}
                     alt={product.name}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   {product.badge && (
                     <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                       {product.badge}
                     </span>
                   )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleWishlist(product);
                      }}
                      className={`w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                        isInWishlist(product.id)
                          ? 'text-destructive'
                          : 'text-foreground hover:text-accent'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors text-foreground hover:text-accent"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                 </Link>
                 <div className="p-4">
                   <span className="text-muted-foreground text-xs uppercase tracking-wide">
                     {product.category}
                   </span>
                   <Link to={`/product/${product.id}`}>
                     <h3 className="font-display text-lg text-foreground mt-1 mb-2 hover:text-accent transition-colors">
                       {product.name}
                     </h3>
                   </Link>
                   <span className="text-accent font-semibold text-lg">{formatPrice(product.price)}</span>
                   <Button
                     variant="outline"
                     size="sm"
                     className="w-full mt-4"
                     onClick={() => handleAddToCart(product)}
                   >
                     <ShoppingCart className="w-4 h-4 mr-2" />
                     Add to Cart
                   </Button>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
       </div>
     </Layout>
   );
 };
 
 export default Collections;