import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface SubItem {
  label: string;
  link: string;
  bold?: boolean;
}

interface MenuColumn {
  title: string;
  items: SubItem[];
}

interface Category {
  name: string;
  link: string;
  megaMenu?: MenuColumn[];
}

const categories: Category[] = [
  {
    name: 'EARRINGS',
    link: '/shop?category=earrings',
    megaMenu: [
      {
        title: 'Featured',
        items: [
          { label: 'Latest Designs', link: '/shop?category=earrings&sort=latest' },
          { label: 'Bestsellers', link: '/shop?category=earrings&sort=bestsellers' },
          { label: 'Fast Delivery', link: '/shop?category=earrings&delivery=fast' },
          { label: 'Special Deals', link: '/shop?category=earrings&deals=true' },
        ],
      },
      {
        title: 'By Style',
        items: [
          { label: 'All Earrings', link: '/shop?category=earrings', bold: true },
          { label: 'Studs', link: '/shop?category=earrings&type=studs' },
          { label: 'Jhumkas', link: '/shop?category=earrings&type=jhumkas' },
          { label: 'Hoops & Huggies', link: '/shop?category=earrings&type=hoops' },
          { label: 'Drops & Danglers', link: '/shop?category=earrings&type=drops' },
          { label: 'Ear Cuffs', link: '/shop?category=earrings&type=earcuffs' },
          { label: 'Chandbalis', link: '/shop?category=earrings&type=chandbalis' },
        ],
      },
      {
        title: 'By Metal',
        items: [
          { label: '9KT Gold', link: '/shop?category=earrings&purity=9kt' },
          { label: 'Yellow Gold', link: '/shop?category=earrings&metal=yellow-gold' },
          { label: 'Rose Gold', link: '/shop?category=earrings&metal=rose-gold' },
          { label: 'White Gold', link: '/shop?category=earrings&metal=white-gold' },
        ],
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under ₹5,000', link: '/shop?category=earrings&price=under5k' },
          { label: '₹5,000 - ₹10,000', link: '/shop?category=earrings&price=5k-10k' },
          { label: '₹10,000 - ₹20,000', link: '/shop?category=earrings&price=10k-20k' },
          { label: '₹20,000 - ₹50,000', link: '/shop?category=earrings&price=20k-50k' },
          { label: '₹50,000 & Above', link: '/shop?category=earrings&price=50k-above' },
        ],
      },
    ],
  },
  {
    name: 'RINGS',
    link: '/shop?category=rings',
    megaMenu: [
      {
        title: 'Featured',
        items: [
          { label: 'Latest Designs', link: '/shop?category=rings&sort=latest' },
          { label: 'Bestsellers', link: '/shop?category=rings&sort=bestsellers' },
          { label: 'Fast Delivery', link: '/shop?category=rings&delivery=fast' },
          { label: 'Special Deals', link: '/shop?category=rings&deals=true' },
        ],
      },
      {
        title: 'By Style',
        items: [
          { label: 'All Rings', link: '/shop?category=rings', bold: true },
          { label: 'Engagement', link: '/shop?category=rings&type=engagement' },
          { label: 'Dailywear', link: '/shop?category=rings&type=dailywear' },
          { label: 'Cocktail', link: '/shop?category=rings&type=cocktail' },
          { label: 'Solitaire', link: '/shop?category=rings&type=solitaire' },
          { label: 'Bands', link: '/shop?category=rings&type=bands' },
          { label: 'Promise Rings', link: '/shop?category=rings&type=promise' },
        ],
      },
      {
        title: 'By Metal',
        items: [
          { label: '9KT Gold', link: '/shop?category=rings&purity=9kt' },
          { label: 'Yellow Gold', link: '/shop?category=rings&metal=yellow-gold' },
          { label: 'Rose Gold', link: '/shop?category=rings&metal=rose-gold' },
          { label: 'White Gold', link: '/shop?category=rings&metal=white-gold' },
        ],
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under ₹10,000', link: '/shop?category=rings&price=under10k' },
          { label: '₹10,000 - ₹20,000', link: '/shop?category=rings&price=10k-20k' },
          { label: '₹20,000 - ₹30,000', link: '/shop?category=rings&price=20k-30k' },
          { label: '₹30,000 - ₹50,000', link: '/shop?category=rings&price=30k-50k' },
          { label: '₹50,000 & Above', link: '/shop?category=rings&price=50k-above' },
        ],
      },
    ],
  },
  {
    name: 'BRACELETS & BANGLES',
    link: '/shop?category=bangles',
    megaMenu: [
      {
        title: 'Featured',
        items: [
          { label: 'Latest Designs', link: '/shop?category=bangles&sort=latest' },
          { label: 'Bestsellers', link: '/shop?category=bangles&sort=bestsellers' },
          { label: 'Special Deals', link: '/shop?category=bangles&deals=true' },
        ],
      },
      {
        title: 'By Style',
        items: [
          { label: 'All Bangles', link: '/shop?category=bangles', bold: true },
          { label: 'Bangles', link: '/shop?category=bangles&type=bangles' },
          { label: 'Bracelets', link: '/shop?category=bangles&type=bracelets' },
          { label: 'Kadas', link: '/shop?category=bangles&type=kadas' },
          { label: 'Charm Bracelets', link: '/shop?category=bangles&type=charm' },
        ],
      },
      {
        title: 'By Metal',
        items: [
          { label: '9KT Gold', link: '/shop?category=bangles&purity=9kt' },
          { label: 'Yellow Gold', link: '/shop?category=bangles&metal=yellow-gold' },
          { label: 'Rose Gold', link: '/shop?category=bangles&metal=rose-gold' },
        ],
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under ₹10,000', link: '/shop?category=bangles&price=under10k' },
          { label: '₹10,000 - ₹20,000', link: '/shop?category=bangles&price=10k-20k' },
          { label: '₹20,000 - ₹50,000', link: '/shop?category=bangles&price=20k-50k' },
          { label: '₹50,000 & Above', link: '/shop?category=bangles&price=50k-above' },
        ],
      },
    ],
  },
  {
    name: 'NECKLACES & PENDANTS',
    link: '/shop?category=necklaces',
    megaMenu: [
      {
        title: 'Featured',
        items: [
          { label: 'Latest Designs', link: '/shop?category=necklaces&sort=latest' },
          { label: 'Bestsellers', link: '/shop?category=necklaces&sort=bestsellers' },
          { label: 'Special Deals', link: '/shop?category=necklaces&deals=true' },
        ],
      },
      {
        title: 'By Style',
        items: [
          { label: 'All Necklaces', link: '/shop?category=necklaces', bold: true },
          { label: 'Pendants', link: '/shop?category=necklaces&type=pendants' },
          { label: 'Necklace Sets', link: '/shop?category=necklaces&type=sets' },
          { label: 'Mangalsutras', link: '/shop?category=necklaces&type=mangalsutra' },
          { label: 'Chokers', link: '/shop?category=necklaces&type=chokers' },
        ],
      },
      {
        title: 'By Metal',
        items: [
          { label: '9KT Gold', link: '/shop?category=necklaces&purity=9kt' },
          { label: 'Yellow Gold', link: '/shop?category=necklaces&metal=yellow-gold' },
          { label: 'Rose Gold', link: '/shop?category=necklaces&metal=rose-gold' },
        ],
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under ₹10,000', link: '/shop?category=necklaces&price=under10k' },
          { label: '₹10,000 - ₹20,000', link: '/shop?category=necklaces&price=10k-20k' },
          { label: '₹20,000 - ₹50,000', link: '/shop?category=necklaces&price=20k-50k' },
          { label: '₹50,000 & Above', link: '/shop?category=necklaces&price=50k-above' },
        ],
      },
    ],
  },
  {
    name: 'CHAINS',
    link: '/shop?category=chains',
    megaMenu: [
      {
        title: 'Featured',
        items: [
          { label: 'Latest Designs', link: '/shop?category=chains&sort=latest' },
          { label: 'Bestsellers', link: '/shop?category=chains&sort=bestsellers' },
        ],
      },
      {
        title: 'By Style',
        items: [
          { label: 'All Chains', link: '/shop?category=chains', bold: true },
          { label: 'Rope Chains', link: '/shop?category=chains&type=rope' },
          { label: 'Box Chains', link: '/shop?category=chains&type=box' },
          { label: 'Link Chains', link: '/shop?category=chains&type=link' },
          { label: 'Cable Chains', link: '/shop?category=chains&type=cable' },
        ],
      },
      {
        title: 'By Metal',
        items: [
          { label: '9KT Gold', link: '/shop?category=chains&purity=9kt' },
          { label: 'Yellow Gold', link: '/shop?category=chains&metal=yellow-gold' },
          { label: 'Rose Gold', link: '/shop?category=chains&metal=rose-gold' },
        ],
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under ₹5,000', link: '/shop?category=chains&price=under5k' },
          { label: '₹5,000 - ₹10,000', link: '/shop?category=chains&price=5k-10k' },
          { label: '₹10,000 - ₹20,000', link: '/shop?category=chains&price=10k-20k' },
          { label: '₹20,000 & Above', link: '/shop?category=chains&price=20k-above' },
        ],
      },
    ],
  },
  {
    name: 'NOSE PINS',
    link: '/shop?category=nosepins',
    megaMenu: [
      {
        title: 'Featured',
        items: [
          { label: 'Latest Designs', link: '/shop?category=nosepins&sort=latest' },
          { label: 'Bestsellers', link: '/shop?category=nosepins&sort=bestsellers' },
        ],
      },
      {
        title: 'By Style',
        items: [
          { label: 'All Nose Pins', link: '/shop?category=nosepins', bold: true },
          { label: 'Studs', link: '/shop?category=nosepins&type=studs' },
          { label: 'Rings', link: '/shop?category=nosepins&type=rings' },
          { label: 'Clip-on', link: '/shop?category=nosepins&type=clipon' },
        ],
      },
      {
        title: 'By Metal',
        items: [
          { label: '9KT Gold', link: '/shop?category=nosepins&purity=9kt' },
          { label: 'Yellow Gold', link: '/shop?category=nosepins&metal=yellow-gold' },
        ],
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under ₹3,000', link: '/shop?category=nosepins&price=under3k' },
          { label: '₹3,000 - ₹5,000', link: '/shop?category=nosepins&price=3k-5k' },
          { label: '₹5,000 & Above', link: '/shop?category=nosepins&price=5k-above' },
        ],
      },
    ],
  },
  {
    name: 'GIFTING',
    link: '/shop?type=gifts',
    megaMenu: [
      {
        title: 'Featured',
        items: [
          { label: 'Best Gift Ideas', link: '/shop?type=gifts&sort=bestsellers' },
          { label: 'Special Deals', link: '/shop?type=gifts&deals=true' },
        ],
      },
      {
        title: 'By Occasion',
        items: [
          { label: 'Birthday Gifts', link: '/shop?type=gifts&occasion=birthday' },
          { label: 'Anniversary Gifts', link: '/shop?type=gifts&occasion=anniversary' },
          { label: 'Wedding Gifts', link: '/shop?type=gifts&occasion=wedding' },
          { label: "Valentine's Day", link: '/shop?type=gifts&occasion=valentines' },
        ],
      },
      {
        title: 'Gift For',
        items: [
          { label: 'Wife', link: '/shop?type=gifts&for=wife' },
          { label: 'Daughter', link: '/shop?type=gifts&for=daughter' },
          { label: 'Mother', link: '/shop?type=gifts&for=mother' },
          { label: 'Sister', link: '/shop?type=gifts&for=sister' },
        ],
      },
      {
        title: 'By Price',
        items: [
          { label: 'Under ₹10,000', link: '/shop?type=gifts&price=under10k' },
          { label: '₹10,000 - ₹20,000', link: '/shop?type=gifts&price=10k-20k' },
          { label: '₹20,000 - ₹50,000', link: '/shop?type=gifts&price=20k-50k' },
          { label: '₹50,000 & Above', link: '/shop?type=gifts&price=50k-above' },
        ],
      },
    ],
  },
  {
    name: 'COLLECTIONS',
    link: '/collections',
  },
  {
    name: 'TRENDING',
    link: '/shop?sort=trending',
  },
  {
    name: 'LEGACY',
    link: '/about',
  },
];

export const CategoryNavBar = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="hidden lg:block bg-card border-t border-border relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center gap-0">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                to={cat.link}
                className={`block px-4 py-3 text-[11px] font-semibold tracking-wider transition-all duration-200 border-b-2 whitespace-nowrap ${
                  activeCategory === cat.name
                    ? 'text-accent border-accent'
                    : 'text-foreground/80 border-transparent hover:text-accent'
                }`}
              >
                {cat.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width mega menu */}
      <AnimatePresence>
        {activeCategory && (() => {
          const cat = categories.find(c => c.name === activeCategory);
          if (!cat?.megaMenu) return null;
          return (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full z-50 bg-card border-t border-border shadow-elegant"
              onMouseEnter={() => setActiveCategory(activeCategory)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="container mx-auto px-8 py-8">
                <div className="grid grid-cols-4 gap-10">
                  {cat.megaMenu.map((col) => (
                    <div key={col.title}>
                      <h4 className="font-display text-sm font-bold text-accent tracking-wide mb-4">
                        {col.title}
                      </h4>
                      <ul className="space-y-1">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={item.link}
                              className={`block py-1.5 text-sm transition-colors duration-150 hover:text-accent ${
                                item.bold
                                  ? 'font-semibold text-foreground'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom: Shop For Women / Girls / Kids */}
                <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border">
                  <Link to={`${cat.link}&gender=women`} className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                    For Women
                  </Link>
                  <span className="text-border">|</span>
                  <Link to={`${cat.link}&gender=girls`} className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                    For Girls
                  </Link>
                  <span className="text-border">|</span>
                  <Link to={`${cat.link}&gender=kids`} className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                    For Kids
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
};
