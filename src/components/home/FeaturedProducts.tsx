import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  useEffect(() => {
    fetchShopifyProducts(4).then((prods) => {
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    addItem({
      id: variant.id,
      name: product.node.title,
      price: parseFloat(variant.price.amount),
      image: product.node.images.edges[0]?.node.url || '',
    });
  };

  const handleToggleWishlist = (product: ShopifyProduct) => {
    const id = product.node.id;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name: product.node.title,
        price: parseFloat(product.node.priceRange.minVariantPrice.amount),
        image: product.node.images.edges[0]?.node.url || '',
        category: '',
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg overflow-hidden shadow-card animate-pulse">
                <div className="aspect-square bg-secondary" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-secondary rounded w-1/3" />
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-4 bg-secondary rounded w-1/2" />
                  <div className="h-9 bg-secondary rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, index) => {
              const img = product.node.images.edges[0]?.node.url;
              const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
              const id = product.node.id.split('/').pop();

              return (
                <motion.div
                  key={product.node.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-card rounded-lg overflow-hidden shadow-card hover-lift">
                    {/* Product Image */}
                    <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden">
                      {img ? (
                        <img
                          src={img}
                          alt={product.node.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">No image</span>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggleWishlist(product);
                          }}
                          className={`w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                            isInWishlist(product.node.id)
                              ? 'text-destructive'
                              : 'text-foreground hover:text-accent'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(product.node.id) ? 'fill-current' : ''}`} />
                        </button>
                        <Link
                          to={`/product/${id}`}
                          className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors text-foreground hover:text-accent"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="p-4">
                      <Link to={`/product/${id}`}>
                        <h3 className="font-display text-lg text-foreground mt-1 mb-2 hover:text-accent transition-colors line-clamp-1">
                          {product.node.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-accent font-semibold text-lg">
                          {formatPrice(price)}
                        </span>
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
              );
            })}
          </div>
        )}

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