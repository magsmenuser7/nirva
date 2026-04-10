import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-jewelry.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury gold jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-accent font-medium tracking-widest uppercase text-sm mb-4">
              Exquisite 9K Gold Collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl md:text-5xl lg:text-7xl text-primary-foreground leading-tight mb-6"
          >
            Timeless Elegance,{' '}
            <span className="text-gradient-gold">Crafted</span> for You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-primary-foreground/80 text-lg md:text-xl mb-8 leading-relaxed"
          >
            Discover our handcrafted collection of 9K gold jewelry. 
            Each piece tells a story of heritage, artistry, and enduring beauty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/shop">
                Explore Collection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20"
          >
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
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
