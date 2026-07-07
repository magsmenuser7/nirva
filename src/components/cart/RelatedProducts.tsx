import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { products, type Product } from "@/data/products";

// Dynamically grab 4 products to show as related products from our central dataset
const relatedProducts = products.slice(0, 4);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const RelatedProducts = () => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.productName,
      price: product.totalAmount,
      image: product.productImage,
    });
    toast({
      title: 'Added to Cart',
      description: `${product.productName} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from Wishlist',
        description: `${product.productName} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.productName,
        price: product.totalAmount,
        image: product.productImage,
        category: product.subCategory,
        slug: ''
      });
      toast({
        title: 'Added to Wishlist',
        description: `${product.productName} has been added to your wishlist.`,
      });
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product, index) => {
          const originalPrice = product.totalAmount + product.discountAmount; // Simulated Original Price for UI consistency
          const routeParam = product.slug || product.id; // Routing strictly by SLUG

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg bg-secondary/30">
                <Link to={`/product/${routeParam}`}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className={`p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors ${
                      isInWishlist(product.id) ? 'text-red-500' : 'text-muted-foreground hover:text-accent'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                {product.makingDiscountPercent > 0 && (
                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
                    {product.makingDiscountPercent}% OFF MAKING
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">{product.subCategory}</p>
                <Link to={`/product/${routeParam}`}>
                  <h3 className="font-medium text-foreground text-sm line-clamp-1 hover:text-accent transition-colors">
                    {product.productName}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-accent font-semibold">{formatPrice(product.totalAmount)}</span>
                  {product.discountAmount > 0 && (
                    <span className="text-muted-foreground text-xs line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};







//  import { Link } from 'react-router-dom';
//  import { motion } from 'framer-motion';
//  import { ShoppingCart, Heart } from 'lucide-react';
//  import { Button } from '@/components/ui/button';
//  import { useCart } from '@/contexts/CartContext';
//  import { useWishlist } from '@/contexts/WishlistContext';
//  import { useToast } from '@/hooks/use-toast';
//  import bangles from "@/assets/products/bangles/Bangle2-1.jpeg";
//  import earrings from "@/assets/products/earrings/earrings3-1.jpeg";
//  import necklace from "@/assets/products/necklace/necklace2-1.jpeg";
//  import tirumalabalajidivinependantset1 from "@/assets/products/pendants/tirumala-balaji-divine-pendant-set-1.jpeg";
 
//  // Mock related products - in production, these would come from Shopify API
//  const relatedProducts = [
//    {
//      id: 'related-1',
//      name: 'Diamond Stud Earrings',
//      price: 24999,
//      originalPrice: 29999,
//      image: earrings,
//      category: 'Earrings',
//    },
//    {
//      id: 'related-2',
//      name: 'Pearl Necklace Set',
//      price: 18500,
//      originalPrice: 22000,
//      image: necklace,
//      category: 'Necklaces',
//    },
//    {
//      id: 'related-3',
//      name: 'Gold Bangles',
//      price: 35000,
//      originalPrice: 40000,
//      image: bangles,
//      category: 'Bracelets',
//    },
//    {
//      id: 'related-4',
//      name: 'Pendant',
//      price: 42000,
//      originalPrice: 48000,
//      image: tirumalabalajidivinependantset1,
//      category: 'Pendants',
//    },
//  ];
 
//  const formatPrice = (price: number) => {
//    return new Intl.NumberFormat('en-IN', {
//      style: 'currency',
//      currency: 'INR',
//      maximumFractionDigits: 0,
//    }).format(price);
//  };
 
//  export const RelatedProducts = () => {
//    const { addItem } = useCart();
//   const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
//    const { toast } = useToast();
 
//    const handleAddToCart = (product: typeof relatedProducts[0]) => {
//      addItem({
//        id: product.id,
//        name: product.name,
//        price: product.price,
//        image: product.image,
//      });
//      toast({
//        title: 'Added to Cart',
//        description: `${product.name} has been added to your cart.`,
//      });
//    };
 
//    const handleToggleWishlist = (product: typeof relatedProducts[0]) => {
//      if (isInWishlist(product.id)) {
//        removeFromWishlist(product.id);
//        toast({
//          title: 'Removed from Wishlist',
//          description: `${product.name} has been removed from your wishlist.`,
//        });
//      } else {
//        addToWishlist({
//          id: product.id,
//          name: product.name,
//          price: product.price,
//          image: product.image,
//        });
//        toast({
//          title: 'Added to Wishlist',
//          description: `${product.name} has been added to your wishlist.`,
//        });
//      }
//    };
 
//    return (
//      <section className="mt-12 pt-8 border-t border-border">
//        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
//          You May Also Like
//        </h2>
//        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//          {relatedProducts.map((product, index) => (
//            <motion.div
//              key={product.id}
//              initial={{ opacity: 0, y: 20 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{ delay: index * 0.1 }}
//              className="group"
//            >
//              <div className="relative overflow-hidden rounded-lg bg-secondary/30">
//                <Link to={`/product/${product.id}`}>
//                  <img
//                    src={product.image}
//                    alt={product.name}
//                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
//                  />
//                </Link>
//                <div className="absolute top-2 right-2 flex flex-col gap-2">
//                  <button
//                    onClick={() => handleToggleWishlist(product)}
//                    className={`p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors ${
//                      isInWishlist(product.id) ? 'text-red-500' : 'text-muted-foreground hover:text-accent'
//                    }`}
//                  >
//                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
//                  </button>
//                </div>
//                {product.originalPrice > product.price && (
//                  <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
//                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
//                  </span>
//                )}
//              </div>
//              <div className="p-3">
//                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
//                <Link to={`/product/${product.id}`}>
//                  <h3 className="font-medium text-foreground text-sm line-clamp-1 hover:text-accent transition-colors">
//                    {product.name}
//                  </h3>
//                </Link>
//                <div className="flex items-center gap-2 mt-1">
//                  <span className="text-accent font-semibold">{formatPrice(product.price)}</span>
//                  {product.originalPrice > product.price && (
//                    <span className="text-muted-foreground text-xs line-through">
//                      {formatPrice(product.originalPrice)}
//                    </span>
//                  )}
//                </div>
//                <Button
//                  variant="outline"
//                  size="sm"
//                  className="w-full mt-3"
//                  onClick={() => handleAddToCart(product)}
//                >
//                  <ShoppingCart className="w-3 h-3 mr-1" />
//                  Add to Cart
//                </Button>
//              </div>
//            </motion.div>
//          ))}
//        </div>
//      </section>
//    );
//  };