import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid3X3, LayoutGrid, Heart, ShoppingCart, ChevronDown, Eye } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

const categories = [
  { slug: 'all', name: 'All Jewelry' },
  { slug: 'rings', name: 'Rings' },
  { slug: 'necklaces', name: 'Necklaces' },
  { slug: 'earrings', name: 'Earrings' },
  { slug: 'bracelets', name: 'Bracelets' },
  { slug: 'bangles', name: 'Bangles' },
  { slug: 'chains', name: 'Chains' },
  { slug: 'nosepins', name: 'Nose Pins' },
  { slug: 'pendants', name: 'Pendants' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [shopifyProducts, setShopifyProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  const selectedCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    setLoading(true);
    fetchShopifyProducts(50).then((prods) => {
      setShopifyProducts(prods);
      setLoading(false);
    });
  }, []);

  // Category keyword mapping for broader matching
  const categoryKeywords: Record<string, string[]> = {
    rings: ['ring', 'band', 'solitaire', 'engagement'],
    earrings: ['earring', 'stud', 'jhumka', 'hoop', 'huggie', 'drop', 'dangler', 'ear cuff', 'chandbali'],
    bangles: ['bangle', 'bracelet', 'kada', 'charm'],
    bracelets: ['bracelet', 'bangle', 'chain bracelet', 'charm'],
    necklaces: ['necklace', 'pendant', 'mangalsutra', 'choker', 'chain necklace'],
    pendants: ['pendant', 'locket'],
    chains: ['chain', 'rope chain', 'box chain', 'link chain', 'cable chain'],
    nosepins: ['nose pin', 'nose ring', 'nosepin', 'nose stud'],
  };

  // Filter products by category with broad matching; show all if no matches
  const categoryMatched = selectedCategory === 'all'
    ? shopifyProducts
    : shopifyProducts.filter((p) => {
        const title = p.node.title.toLowerCase();
        const desc = p.node.description.toLowerCase();
        const keywords = categoryKeywords[selectedCategory.toLowerCase()] || [selectedCategory.toLowerCase()];
        return keywords.some((kw) => title.includes(kw) || desc.includes(kw));
      });

  // Fallback: if no matches found for a category, show all products
  const filteredProducts = categoryMatched.length > 0 ? categoryMatched : shopifyProducts;

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const priceB = parseFloat(b.node.priceRange.minVariantPrice.amount);
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    return 0;
  });

  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    addItem({
      id: variant.id,
      name: product.node.title,
      price: parseFloat(variant.price.amount),
      image: product.node.images.edges[0]?.node?.url || '',
    });
  };

  const handleToggleWishlist = (product: ShopifyProduct) => {
    const id = product.node.id;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name: product.node.title,
        price: parseFloat(product.node.priceRange.minVariantPrice.amount),
        image: product.node.images.edges[0]?.node?.url || '',
        category: selectedCategory,
      });
    }
  };

  return (
    <Layout noPadding>
      {/* Page Header */}
      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
              Shop
            </h1>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              Discover our exquisite range of 9K gold jewelry, handcrafted with love and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-secondary text-secondary-foreground px-4 py-2 pr-10 rounded-lg text-sm font-medium cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              <div className="hidden md:flex items-center gap-1 bg-secondary rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-card shadow-sm' : ''}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('large')}
                  className={`p-2 rounded ${viewMode === 'large' ? 'bg-card shadow-sm' : ''}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-6">
            Showing {sortedProducts.length} products
          </p>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg overflow-hidden shadow-card animate-pulse">
                  <div className="aspect-square bg-secondary" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-secondary rounded w-1/3" />
                    <div className="h-4 bg-secondary rounded w-3/4" />
                    <div className="h-4 bg-secondary rounded w-1/2" />
                    <div className="h-9 bg-secondary rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-2">Try a different category or check back later.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {sortedProducts.map((product, index) => {
                const img = product.node.images.edges[0]?.node?.url;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const id = product.node.id.split('/').pop();
                return (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative bg-card rounded-lg overflow-hidden shadow-card hover-lift">
                      <Link to={`/product/${id}`} className="block relative aspect-square overflow-hidden">
                        {img ? (
                          <img
                            src={img}
                            alt={product.node.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No image</span>
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleWishlist(product);
                            }}
                            className={`w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
                              isInWishlist(product.node.id)
                                ? 'text-destructive'
                                : 'text-foreground hover:text-accent'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist(product.node.id) ? 'fill-current' : ''}`} />
                          </button>
                          <Link
                            to={`/product/${id}`}
                            className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors text-foreground hover:text-accent"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </Link>

                      <div className="p-4">
                        <Link to={`/product/${id}`}>
                          <h3 className="font-display text-lg text-foreground mt-1 mb-2 hover:text-accent transition-colors line-clamp-1">
                            {product.node.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-accent font-semibold text-lg">
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
