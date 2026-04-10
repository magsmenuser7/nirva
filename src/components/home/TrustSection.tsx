import { motion } from 'framer-motion';
import { Shield, Truck, Award, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'BIS Hallmarked',
    description: 'All our jewelry is 100% BIS certified and hallmarked for guaranteed purity.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary insured shipping on all orders above ₹5,000.',
  },
  {
    icon: Award,
    title: 'Lifetime Exchange',
    description: 'Exchange your jewelry at current gold rates, anytime.',
  },
  {
    icon: RefreshCw,
    title: '30-Day Returns',
    description: 'Easy returns within 30 days with full refund guarantee.',
  },
];

export const TrustSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-navy">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-lg text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
