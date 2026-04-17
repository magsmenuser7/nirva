import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';
import bangles from "@/assets/products/bangles/Bangle1-2.jpeg";
import earrings from "@/assets/products/earrings/earrings2-2.jpeg";
import chain from "@/assets/products/chains/chain2-1.jpeg";
import bracelet from "@/assets/products/bracelets/bracelet1-1.jpeg";

// Collection cards are static/curated — no Shopify data needed here
const collections = [
  {
    id: 'bridal',
    name: 'Bridal Collection',
    description: 'Timeless pieces for your special day',
    image: bangles,
  },
  {
    id: 'festive',
    name: 'Festive Collection',
    description: 'Celebrate in style with our festive range',
    image: earrings,
  },
  {
    id: 'everyday',
    name: 'Everyday Elegance',
    description: 'Subtle luxury for daily wear',
    image: chain,
  },
  {
    id: 'heritage',
    name: 'Heritage Collection',
    description: 'Traditional designs with modern craftsmanship',
    image: bracelet,
  },
];

// Maps collection id → keywords to filter Shopify products
const collectionKeywords: Record<string, string[]> = {
  bridal: ['bridal', 'wedding', 'bride', 'mangalsutra', 'necklace set'],
  festive: ['festive', 'chandbali', 'jhumka', 'earring', 'stud'],
  everyday: ['chain', 'daily', 'minimalist', 'simple', 'bracelet'],
  heritage: ['heritage', 'temple', 'antique', 'traditional', 'pendant'],
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Collections = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();

  useEffect(() => {
    fetchShopifyProducts(50).then((prods) => {
      setProducts(prods);
      setLoading(false);
    });
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    addItem({
      id: variant.id,
      name: product.node.title,
      price: parseFloat(variant.price.amount),
      image: product.node.images.edges[0]?.node.url || '',
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
        image: product.node.images.edges[0]?.node.url || '',
        category: selectedCollection || '',
      });
    }
  };

  const filteredProducts = selectedCollection
    ? (() => {
        const keywords = collectionKeywords[selectedCollection] || [selectedCollection];
        const matched = products.filter((p) => {
          const title = p.node.title.toLowerCase();
          const desc = p.node.description.toLowerCase();
          return keywords.some((kw) => title.includes(kw) || desc.includes(kw));
        });
        // Fallback to all products if no keyword matches
        return matched.length > 0 ? matched : products;
      })()
    : products;

  return (
    <Layout noPadding>
      {/* Page Header */}
      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
              Our Collections
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Explore our curated collections, each telling a unique story of craftsmanship and elegance
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-12 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Collection Filter Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {collections.map((collection, index) => (
              <motion.button
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  setSelectedCollection(
                    selectedCollection === collection.id ? null : collection.id
                  )
                }
                className={`group relative overflow-hidden rounded-lg aspect-[4/5] text-left ${
                  selectedCollection === collection.id ? 'ring-2 ring-accent' : ''
                }`}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl text-primary-foreground mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {collection.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Section Title */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <h2 className="font-display text-2xl text-foreground">
              {selectedCollection
                ? collections.find((c) => c.id === selectedCollection)?.name
                : 'Featured from All Collections'}
            </h2>
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found in this collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                const img = product.node.images.edges[0]?.node.url;
                const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
                const id = product.node.id.split('/').pop();

                return (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-card rounded-lg overflow-hidden shadow-card hover-lift"
                  >
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
                      <span className="text-accent font-semibold text-lg">{formatPrice(price)}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Collections;