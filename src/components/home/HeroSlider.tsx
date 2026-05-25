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
import banner1 from "/assets/banners/_RAJ3855.jpeg";
import banner2 from "@/assets/banners/blackdress.jpeg";
import banner3 from "@/assets/banners/banner3.jpeg";
import banner4 from "@/assets/banners/9b58e3d1-a967-4045-a679-565e8e651cdf.jpeg";
import banner5 from "@/assets/banners/eb7bf933-a3e3-4689-aac5-0367408c3914.jpg";
import banner6 from "@/assets/banners/f0517307-bed7-4d93-bdb0-3b9d04053439.jpg";
import banner7 from "@/assets/banners/Untitled design.png"
import banner8 from "@/assets/banners/b9893099-f137-4fa1-ad61-0a50b8f0a204.jpg"
import banner9 from "@/assets/banners/newbanner1.jpeg"
import banner10 from "@/assets/banners/Nirva1.jpeg"

const products = [
  {
    id: 1,
    image: banner9,
    name: 'Heritage Necklace Set',
    price: '₹34000',
    description: 'Timeless elegance in 9K gold',
  },
  {
    id: 2,
    image: banner2,
    name: 'Pearl Cascade Set',
    price: '₹28000',
    description: 'Graceful pearls meet golden luxury',
  },
  {
    id: 3,
    image: banner8,
    name: 'Eternal Necklace Set',
    price: '₹32000',
    description: 'Symbol of everlasting love',
  },
  {
    id: 4,
    image: banner4,
    name: 'Antique Necklace',
    price: '₹25000',
    description: 'Handcrafted brilliance for your special moments',
  },
  {
    id: 5,
    image: banner10,
    name: 'Celestial Necklace Set',
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
    <section className="relative h-[72vh] md:h-screen w-full overflow-hidden">
      {/* Full-width Background Image Slider */}
      <AnimatePresence>
        <motion.div
          key={products[currentIndex].id}
          // initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          // transition={{ duration: 0.7 }}
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
{/* Content */}
<div className="relative z-10 h-full flex items-end md:items-center">

  <div className="
    w-full
    px-6
    pb-16
    md:pb-0
    lg:px-16
  ">

    <AnimatePresence mode="wait">
      <motion.div
        key={products[currentIndex].id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl"
      >

        {/* Collection Label */}
        <span className="
          text-accent
          uppercase
          tracking-[0.22em]
          text-[10px]
          md:text-sm
          font-medium
          ml-8
        ">
          Exquisite 9K Gold Collection
        </span>

        {/* Title */}
        <h1 className="
          mt-3
          font-display
          text-white
          leading-[0.92]
          text-[32px]
          sm:text-6xl
          md:text-5xl
          ml-8
        ">
          {products[currentIndex].name}
        </h1>

        {/* Description */}
        <p className="
          mt-4
          text-white/75
          text-sm
          md:text-lg
          max-w-sm
          ml-8
        ">
          {products[currentIndex].description}
        </p>

        {/* Price */}
        <p className="
          mt-5
          text-accent
          font-display
          text-3xl
          md:text-4xl
          ml-8
        ">
          {products[currentIndex].price}
        </p>

        {/* Buttons */}
        <div className="
          mt-6
          flex
          gap-3
          ml-8
        ">
          <Button
            variant="gold"
            size="sm"
            className="px-6"
            asChild
          >
            <Link to="/shop">
              Shop Now
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-md
              hover:bg-white/20
            "
            asChild
          >
            <Link to="/collections">
              Collection
            </Link>
          </Button>
        </div>
        {/* Trust Badges */} 
        <div className="hidden md:flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20 ml-8">
        {[ { label: 'BIS Hallmarked', value: '100%' }, { label: 'Easy Returns', value: '30 Days' }, { label: 'Free Shipping', value: 'Above ₹5000' }, ].map((badge) => ( 
          <div key={badge.label} className="text-primary-foreground"> 
          <div className="text-accent font-display text-2xl">{badge.value}</div> 
        <div className="text-primary-foreground/60 text-sm">{badge.label}</div>
         </div> ))} 
         </div> 

      </motion.div>
    </AnimatePresence>

  </div>
</div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute left-4 lg:left-4 top-1/2 -translate-y-1/2 z-20 p-3  backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-colors text-foreground bg-white"
        aria-label="Previous product"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3  backdrop-blur-sm rounded-full shadow-lg hover:bg-card transition-colors text-foreground bg-white"
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