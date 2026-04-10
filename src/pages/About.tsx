import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Award, Users, Gem, Heart } from 'lucide-react';
import heroImage from '@/assets/banners/green-necklace.jpg';

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
              Crafting Elegance
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              For over many years, NIRVA has been synonymous with exceptional craftsmanship 
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
                <p className="text-xl">
                  Some beginnings don’t need to be loud to be meaningful.<br /><br />

They arrive gently, yet stay with us forever.<br /><br />

At Nirva, we believe your first piece of gold is more than just jewellery. It is a moment of becoming. A first achievement. A heartfelt gift. A quiet celebration of how far you have come, and all that lies ahead.<br /><br />

Every Nirva creation is designed to honour these beginnings. Refined in form and balanced in brilliance, our pieces carry the essence of tradition without excess, and luxury without noise. They are made not just to be worn, but to be remembered.<br /><br />

Crafted for life’s meaningful milestones, yet light enough for everyday elegance, Nirva brings gold closer to your journey. It becomes a part of your present, not just your someday.<br /><br />

Because when a moment shapes your story, it deserves to be marked gently, beautifully, and forever, in gold.<br /><br />

<span className="font-bold">Nirva. The start of something golden.</span>
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
