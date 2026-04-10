import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Award, Users, Gem, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-jewelry.jpg';

const values = [
  {
    icon: Gem,
    title: 'Quality Craftsmanship',
    description: 'Every piece is meticulously crafted by skilled artisans with decades of experience.',
  },
  {
    icon: Heart,
    title: 'Passion for Excellence',
    description: 'We pour our heart into every design, ensuring each piece tells a unique story.',
  },
  {
    icon: Award,
    title: 'Certified Purity',
    description: 'All our jewelry is BIS hallmarked, guaranteeing authentic 9K gold purity.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Your satisfaction is our priority, with dedicated support at every step.',
  },
];

const About = () => {
  return (
    <Layout noPadding>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">
              Our Story
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6">
              Crafting Elegance Since 1985
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              For over three decades, NIRVA has been synonymous with exceptional craftsmanship 
              and timeless elegance in 9K gold jewelry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-elegant">
                <img
                  src={heroImage}
                  alt="NIRVA Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">
                Heritage & Craftsmanship
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Where Tradition Meets Artistry
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1985 by master jeweler Rajesh Kumar, NIRVA began as a small workshop 
                  in the heart of Mumbai's jewelry district. With a deep respect for traditional 
                  craftsmanship and an eye for contemporary design, we set out to create jewelry 
                  that would be treasured for generations.
                </p>
                <p>
                  Our name "NIRVA" is inspired by the peacock - a symbol of beauty, grace, and 
                  immortality in Indian culture. Just like the peacock displays its magnificent 
                  feathers, we believe jewelry should bring out the inner radiance of every wearer.
                </p>
                <p>
                  Today, NIRVA continues this legacy with a team of over 50 skilled artisans, 
                  each carrying forward the traditions passed down through generations while 
                  embracing modern techniques to create truly exceptional pieces.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">
              What We Stand For
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-lg shadow-card"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '35+', label: 'Years of Excellence' },
              { value: '50,000+', label: 'Happy Customers' },
              { value: '10,000+', label: 'Unique Designs' },
              { value: '100%', label: 'BIS Hallmarked' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-accent font-display text-4xl md:text-5xl mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/70 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
