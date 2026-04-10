import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const trendingSearches = [
  { name: "Valentine's Gifts under 20K", link: '/shop?occasion=valentines&price=under20k' },
  { name: 'Engagement Rings', link: '/shop?category=rings&type=engagement' },
  { name: 'Infinity Collection', link: '/shop?collection=infinity' },
  { name: 'Personalized Gifts', link: '/shop?type=gifts&personalized=true' },
  { name: 'Gifts in 9 Karat Gold', link: '/shop?purity=9kt&type=gifts' },
  { name: 'Anniversary Gifts for Wife', link: '/shop?type=anniversary&for=wife' },
];

const browsingCollections = [
  { name: '9kt Gold', link: '/shop?purity=9kt', count: 63 },
  { name: '9 Carat Gold Jewellery', link: '/shop?purity=9kt&type=all', count: 362 },
  { name: 'Gold Earrings', link: '/shop?category=earrings&metal=gold', count: 128 },
  { name: 'Gold Rings', link: '/shop?category=rings&metal=gold', count: 95 },
];

export const SearchOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<ShopifyProduct[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchShopifyProducts(20).then((prods) => {
        setAllProducts(prods);
        setTrendingProducts(prods.slice(0, 6));
      });
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      setQuery('');
      setProducts([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = allProducts.filter((p) =>
        p.node.title.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts([]);
    }
  }, [query, allProducts]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[60]"
          />
          {/* Right-side panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xl z-[61] bg-card shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for gold, rings, earrings..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-foreground text-lg outline-none placeholder:text-muted-foreground"
              />
              <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {query.trim().length === 0 ? (
                <div className="space-y-10">
                  {/* Trending Searches with product images */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-6">
                      Trending Searches
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                      {trendingSearches.map((item, idx) => {
                        const productImg = trendingProducts[idx]?.node?.images?.edges[0]?.node?.url;
                        return (
                          <Link
                            key={item.name}
                            to={item.link}
                            onClick={onClose}
                            className={`flex items-center justify-between gap-3 py-4 group ${
                              idx < trendingSearches.length - 2 ? 'border-b border-border/50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <TrendingUp className="w-4 h-4 text-accent/60 group-hover:text-accent transition-colors shrink-0" />
                              <span className="text-sm text-foreground group-hover:text-accent transition-colors truncate">
                                {item.name}
                              </span>
                            </div>
                            {productImg && (
                              <img
                                src={productImg}
                                alt={item.name}
                                className="w-12 h-12 object-contain shrink-0 rounded"
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Continue Your Browsing with product thumbnails */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-6">
                      Continue Your Browsing
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {browsingCollections.map((col, colIdx) => {
                        const colProducts = allProducts.slice(colIdx * 3, colIdx * 3 + 3);
                        return (
                          <Link
                            key={col.name}
                            to={col.link}
                            onClick={onClose}
                            className="block p-4 rounded-xl bg-accent/5 hover:bg-accent/10 border border-accent/10 transition-all group"
                          >
                            <p className="text-sm font-semibold text-foreground mb-3">{col.name}</p>
                            <div className="flex items-center gap-2">
                              {colProducts.map((p) => {
                                const img = p.node.images.edges[0]?.node?.url;
                                return img ? (
                                  <img
                                    key={p.node.id}
                                    src={img}
                                    alt={p.node.title}
                                    className="w-10 h-10 object-contain rounded bg-card"
                                  />
                                ) : null;
                              })}
                              <div className="ml-auto flex items-center gap-1 text-xs text-accent font-medium">
                                <span>{col.count}</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : products.length > 0 ? (
                <div>
                  <p className="text-xs text-muted-foreground mb-4">
                    {products.length} result{products.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="space-y-2">
                    {products.slice(0, 8).map((product) => {
                      const img = product.node.images.edges[0]?.node.url;
                      const price = product.node.priceRange.minVariantPrice;
                      const id = product.node.id.split('/').pop();
                      return (
                        <Link
                          key={product.node.id}
                          to={`/product/${id}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors"
                        >
                          {img && (
                            <img
                              src={img}
                              alt={product.node.title}
                              className="w-14 h-14 object-cover rounded-md"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {product.node.title}
                            </p>
                            <p className="text-xs text-accent font-semibold">
                              ₹{parseFloat(price.amount).toLocaleString('en-IN')}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-12">
                  No products found for "{query}"
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
