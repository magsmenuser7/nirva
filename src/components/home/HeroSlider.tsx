import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-jewelry.jpg';
import necklacesImage from '@/assets/category-necklaces.jpg';
import ringsImage from '@/assets/category-rings.jpg';
import braceletsImage from '@/assets/category-bracelets.jpg';
import earringsImage from '@/assets/category-earrings.jpg';
import banner1 from "@/assets/banners/_RAJ3855.jpeg";
import banner2 from "@/assets/banners/_RAJ3864.jpeg";
import banner3 from "@/assets/banners/_RAJ3967.jpeg";
import banner4 from "@/assets/banners/9b58e3d1-a967-4045-a679-565e8e651cdf.jpg";
import banner5 from "@/assets/banners/_RAJ4293.jpeg";
import banner6 from "@/assets/banners/f0517307-bed7-4d93-bdb0-3b9d04053439.jpg";

const products = [
  {
    id: 1,
    image: banner6,
    name: 'Royal Heritage Necklace',
    price: '₹34000',
    description: 'Timeless elegance in 9K gold',
  },
  {
    id: 2,
    image: banner2,
    name: 'Pearl Cascade Necklace',
    price: '₹28000',
    description: 'Graceful pearls meet golden luxury',
  },
  {
    id: 3,
    image: banner3,
    name: 'Eternal Bond Ring',
    price: '₹32000',
    description: 'Symbol of everlasting love',
  },
  {
    id: 4,
    image: banner4,
    name: 'Golden Radiance Bracelet',
    price: '₹25000',
    description: 'Handcrafted brilliance for your wrist',
  },
  {
    id: 5,
    image: banner5,
    name: 'Celestial Drop Earrings',
    price: '₹30000',
    description: 'Elegance that frames your face',
  },
];

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-width Background Image Slider */}
      <AnimatePresence>
        <motion.div
          key={products[currentIndex].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={products[currentIndex].image}
            alt={products[currentIndex].name}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 lg:px-8 flex items-center">
        <div className="max-w-2xl pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={products[currentIndex].id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-accent font-medium tracking-widest uppercase text-sm mb-4">
                Exquisite 9K Gold Collection
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-4">
                {products[currentIndex].name}
              </h1>
              <p className="text-primary-foreground/80 text-xl mb-2">
                {products[currentIndex].description}
              </p>
              <p className="text-accent font-display text-3xl md:text-4xl mb-8">
                {products[currentIndex].price}
              </p>
              <div className="flex gap-4">
                <Button variant="gold" size="lg" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-red hover:bg-primary-foreground/10" asChild>
                  <Link to="/collections">View Collection</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20">
            {[
              { label: 'BIS Hallmarked', value: '100%' },
              { label: 'Easy Returns', value: '30 Days' },
              { label: 'Free Shipping', value: 'Above ₹5000' },
            ].map((badge) => (
              <div key={badge.label} className="text-primary-foreground">
                <div className="text-accent font-display text-2xl">{badge.value}</div>
                <div className="text-primary-foreground/60 text-sm">{badge.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-colors text-foreground"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-card/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-colors text-foreground"
        aria-label="Next product"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-accent' : 'bg-primary-foreground/30'
            }`}
            aria-label={`Go to product ${idx + 1}`}
          />
        ))}
      </div>

      {/* Product Thumbnails */}
      <div className="absolute bottom-20 right-4 lg:right-8 z-20 hidden lg:flex gap-3">
        {products.map((product, idx) => (
          <button
            key={product.id}
            onClick={() => setCurrentIndex(idx)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              idx === currentIndex ? 'border-accent scale-110' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
 };