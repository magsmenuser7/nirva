import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ringsImage from '@/assets/category-rings.jpg';
import necklacesImage from '@/assets/category-necklaces.jpg';
import braceletsImage from '@/assets/category-bracelets.jpg';
import earringsImage from '@/assets/category-earrings.jpg';
import product1 from "@/assets/products/necklace/necklace5-1.jpeg"
import product2 from "@/assets/products/earrings/earrigs4-1.jpeg"
import product3 from "@/assets/products/bangles/Bangle3-1.jpeg"
import product4 from "@/assets/products/bracelets/bracelet1-1.jpeg"


// Mock featured products - will be replaced with Shopify data
const featuredProducts = [
  {
    id: '1',
    name: 'Emerald Heritage Necklace',
    price: 12000,
    originalPrice: 15000,
    image: product1,
    category: 'Necklaces',
    badge: 'Bestseller',
  },
  {
    id: '2',
    name: 'Emerald Enclave Studs',
    price: 10000,
    originalPrice: 12000,
    image: product2,
    category: 'Earrings',
    badge: '',
  },
  {
    id: '3',
    name: 'Starlit Eternity Bangles',
    price: 15000,
    originalPrice: 18000,
    image: product3,
    category: 'Bangles',
  },
  {
    id: '4',
    name: 'Eternal Glow Cuff Bracelet',
    price: 12000,
    originalPrice: 15000,
    image: product4,
    category: 'Bracelets',
    badge: 'Popular',
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const FeaturedProducts = () => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleToggleWishlist = (product: typeof featuredProducts[0]) => {
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

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">
            Handpicked For You
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most coveted pieces, each one a testament to exceptional craftsmanship and timeless design.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-card rounded-lg overflow-hidden shadow-card hover-lift">
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {/* Quick Actions */}
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

                {/* Product Info */}
                <div className="p-4">
                  <span className="text-muted-foreground text-xs uppercase tracking-wide">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-display text-lg text-foreground mt-1 mb-2 hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-accent font-semibold text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg" asChild>
            <Link to="/shop">View All Products</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
