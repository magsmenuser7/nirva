import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ringsImage from '@/assets/category-rings.jpg';
import necklacesImage from '@/assets/category-necklaces.jpg';
import braceletsImage from '@/assets/category-bracelets.jpg';
import earringsImage from '@/assets/category-earrings.jpg';
import product1 from "@/assets/products/earrings/earrings2-2.jpeg"
import product2 from "@/assets/products/chains/chains3-1.jpeg"
import product3 from "@/assets/products/bangles/Bangle2-1.jpeg"
import product4 from "@/assets/products/necklace/necklace5-1.jpeg"
import product5 from "@/assets/products/pendants/statues3-1.jpeg"
import product6 from "@/assets/products/necklace/necklace2-1.jpeg"

const products = [
  { id: 'c1', name: 'Royal Heritage Necklace', price: 45999, originalPrice: 54999, image: product1, category: 'Necklaces', badge: 'Bestseller' },
  { id: 'c2', name: 'Eternal Bond Ring', price: 18999, image: product2, category: 'Rings', badge: 'New' },
  { id: 'c3', name: 'Golden Radiance Bracelet', price: 32999, originalPrice: 38999, image: product3, category: 'Bracelets' },
  { id: 'c4', name: 'Celestial Drop Earrings', price: 24999, image: product4, category: 'Earrings', badge: 'Popular' },
  { id: 'c5', name: 'Diamond Cascade Necklace', price: 67999, image: product5, category: 'Necklaces', badge: 'Premium' },
  { id: 'c6', name: 'Sapphire Eternity Ring', price: 29999, image: product6, category: 'Rings' },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export const ProductCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const totalSlides = products.length;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
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

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  const handleToggleWishlist = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category });
  };

  const getVisibleItems = () => {
    const items = [];
    for (let offset = -2; offset <= 2; offset++) {
      const index = ((activeIndex + offset) % totalSlides + totalSlides) % totalSlides;
      items.push({ ...products[index], offset, originalIndex: index });
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="py-20 lg:py-28 bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">
          {/* Left Column — Title & Description */}
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
              Swipe through our most loved creations — each piece crafted with precision and passion, designed to make every moment unforgettable.
            </p>

            {/* Dots */}
            <div className="flex gap-2 mb-8">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent w-8' : 'bg-primary-foreground/30 w-2.5 hover:bg-primary-foreground/50'}`}
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

          {/* Right Column — Product Slider */}
          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: '560px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence initial={false} mode="sync">
              {visibleItems.map((product) => {
                const isCenter = product.offset === 0;
                const isAdjacent = Math.abs(product.offset) === 1;

                // Position cards based on offset
                const xPercent = product.offset * 105;
                const scale = isCenter ? 1 : isAdjacent ? 0.85 : 0.7;
                const opacity = isCenter ? 1 : isAdjacent ? 0.5 : 0;
                const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

                return (
                  <motion.div
                    key={`slide-${product.originalIndex}`}
                    animate={{
                      x: `${xPercent}%`,
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute cursor-pointer w-[280px] md:w-[340px]"
                    style={{ zIndex }}
                    onClick={() => !isCenter && goTo(product.originalIndex)}
                  >
                    <div className="rounded-2xl overflow-hidden group relative">
                      {/* Image Only */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {product.badge && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                            {product.badge}
                          </span>
                        )}

                        {isCenter && (
                          <>
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}
                                className={`w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${isInWishlist(product.id) ? 'text-destructive' : 'text-foreground hover:text-accent'}`}
                              >
                                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                              </button>
                              <Link
                                to={`/product/${product.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <Link
                                to={`/product/${product.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                              >
                                <ShoppingCart className="w-4 h-4" /> Add to Cart
                              </Link>
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
