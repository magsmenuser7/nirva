import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export const ProductCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  // Fetch Shopify products on mount, limit to 6 for carousel
  useEffect(() => {
    fetchShopifyProducts(6).then((prods) => {
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  const totalSlides = products.length;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (totalSlides === 0) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
  }, [totalSlides]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const goTo = (index: number) => {
    setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
    startAutoPlay();
  };

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

  const getVisibleItems = () => {
    if (totalSlides === 0) return [];
    const items = [];
    for (let offset = -2; offset <= 2; offset++) {
      const index = ((activeIndex + offset) % totalSlides + totalSlides) % totalSlides;
      items.push({ product: products[index], offset, originalIndex: index });
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-primary overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-center" style={{ minHeight: '560px' }}>
          <p className="text-primary-foreground/50">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4 block">
              Trending Now
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6 leading-tight">
              Our Signature Pieces
            </h2>
            <p className="text-primary-foreground/60 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
              Swipe through our most loved creations — each piece crafted with precision and passion,
              designed to make every moment unforgettable.
            </p>

            {/* Dots */}
            <div className="flex gap-2 mb-8">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'bg-accent w-8'
                      : 'bg-primary-foreground/30 w-2.5 hover:bg-primary-foreground/50'
                  }`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column — Carousel */}
          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: '560px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence initial={false} mode="sync">
              {visibleItems.map(({ product, offset, originalIndex }) => {
                const isCenter = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;
                const img = product.node.images.edges[0]?.node.url;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const id = product.node.id.split('/').pop();

                const xPercent = offset * 105;
                const scale = isCenter ? 1 : isAdjacent ? 0.85 : 0.7;
                const opacity = isCenter ? 1 : isAdjacent ? 0.5 : 0;
                const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

                return (
                  <motion.div
                    key={`slide-${originalIndex}`}
                    animate={{ x: `${xPercent}%`, scale, opacity, zIndex }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute cursor-pointer w-[280px] md:w-[340px]"
                    style={{ zIndex }}
                    onClick={() => !isCenter && goTo(originalIndex)}
                  >
                    <div className="rounded-2xl overflow-hidden group relative">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                        {img ? (
                          <img
                            src={img}
                            alt={product.node.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No image</span>
                          </div>
                        )}

                        {isCenter && (
                          <>
                            {/* Wishlist + View */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}
                                className={`w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                                  isInWishlist(product.node.id) ? 'text-destructive' : 'text-foreground hover:text-accent'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isInWishlist(product.node.id) ? 'fill-current' : ''}`} />
                              </button>
                              <Link
                                to={`/product/${id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            </div>

                            {/* Add to Cart slide-up */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                              >
                                <ShoppingCart className="w-4 h-4" /> Add to Cart
                              </button>
                            </div>

                            {/* Title + Price overlay at bottom */}
                            <div className="absolute bottom-14 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-white font-medium text-sm line-clamp-1">{product.node.title}</p>
                              <p className="text-accent text-sm font-semibold">{formatPrice(price)}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};