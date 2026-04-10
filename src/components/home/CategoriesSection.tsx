import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ringsImage from '@/assets/category-rings.jpg';
import necklacesImage from '@/assets/category-necklaces.jpg';
import braceletsImage from '@/assets/category-bracelets.jpg';
import earringsImage from '@/assets/category-earrings.jpg';
import Bangles from "@/assets/products/bangles/Bangle1-2.jpeg"
import neklaces from "@/assets/products/necklace/necklace4-1.jpeg"
import earrings from "@/assets/products/earrings/earrings2-1.jpeg"
import chains from "@/assets/products/chains/chains3-1.jpeg"
import idols from "@/assets/products/idols/statue2-1.jpeg"
import pendants from "@/assets/products/pendants/statues3-1.jpeg"
import waistbelt from "@/assets/products/waistbelt/waistbelt1-2.jpeg"
import bestsellers from "@/assets/products/earrings/earrings3-1.jpeg"

const categories = [
  { name: 'Necklaces', slug: 'necklaces', image: neklaces, count: 36 },
  { name: 'Bangles', slug: 'bangles', image: Bangles, count: 48 },
  { name: 'Earrings', slug: 'earrings', image: earrings, count: 52 },
  { name: 'Chains', slug: 'chains', image: chains, count: 24 },
  { name: 'Idols', slug: 'idols', image: idols, count: 18 },
  { name: 'Pendants', slug: 'pendants', image: pendants, count: 30 },
  { name: 'Waist Belts', slug: 'waistbelts', image: waistbelt, count: 12 },
  { name: 'Bestsellers', slug: 'bestsellers', image: bestsellers, count: 20 },

];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export const CategoriesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
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
            Browse By Category
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            Our Collections
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link
                to={`/shop?category=${category.slug}`}
                className="group block relative aspect-square overflow-hidden rounded-lg shadow-card hover-lift"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="font-display text-xl lg:text-2xl text-primary-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {category.count} Products
                  </p>
                </div>
                {/* Hover border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent rounded-lg transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
