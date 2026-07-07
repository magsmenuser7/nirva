import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RefreshCw, 
  ChevronRight,   
  Copy, 
  Check, 
  Gem, 
  Layers, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Sparkles 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { products, type Product } from "@/data/products";

const formatPrice = (price: number = 0) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(price);
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [copiedSku, setCopiedSku] = useState<boolean>(false);
  const [isPriceBreakupOpen, setIsPriceBreakupOpen] = useState<boolean>(true);
  
  const { addItem } = useCart();

  useEffect(() => {
    const found = products.find((p) => p.slug === slug);
    setProduct(found || null);
    setSelectedImage(0);
    setQuantity(1);
  }, [slug]);

  const handleCopySku = (sku: string) => {
    navigator.clipboard.writeText(sku);
    setCopiedSku(true);
    setTimeout(() => setCopiedSku(false), 2000);
  };

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center pt-28 pb-20 text-center">
          <Sparkles className="w-8 h-8 text-amber-500 animate-spin mb-4" />
          <h2 className="text-xl font-display font-medium text-foreground">Loading Exquisite Piece...</h2>
          <p className="text-sm text-muted-foreground mt-1">Please wait while we fetch the jewel details.</p>
        </div>
      </Layout>
    );
  }

  const finalPrice = product.totalAmount;
  const images = product.images && product.images.length > 0 ? product.images : [product.productImage];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.productName,
        price: finalPrice,
        image: product.productImage,
      });
    }
  };

  return (
    <Layout>
      {/* Navigation Breadcrumbs */}
      <div className="pt-28 pb-4 bg-secondary/20 border-b border-border/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link to="/" className="hover:text-amber-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="capitalize text-foreground/80">{product.mainCategory}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="capitalize text-foreground/80">{product.subCategory}</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-foreground font-medium truncate max-w-[180px] sm:max-w-xs">
              {product.productName}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Hero & Gallery Section */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Interactive Image Gallery (Span 6) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 flex flex-col gap-4 sticky top-28"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-secondary/40 to-secondary/10 border border-border/60 shadow-xl shadow-black/5 flex items-center justify-center group">
                <img 
                  src={images[selectedImage]}  
                  alt={`${product.productName} Preview ${selectedImage + 1}`} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border/50 shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground">
                    BIS Hallmarked
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx 
                        ? 'border-amber-600 shadow-md scale-95 ring-2 ring-amber-600/20' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:border-border'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Product Overview & Actions (Span 6) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-6 flex flex-col justify-between"
            >
              <div>
                {/* Category Header & Copy SKU */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  <span className="text-[#dba424] bg-[amber-500/10] px-3 py-1 rounded-md border border-[#dba424]">
                    {product.mainCategory} • {product.subCategory}
                  </span>
                  <div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-md text-foreground">
                    <span>SKU: {product.sku}</span>
                    <button 
                      onClick={() => handleCopySku(product.sku)} 
                      className="text-muted-foreground hover:text-[#dba424] transition-colors"
                      title="Copy SKU"
                    >
                      {copiedSku ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
                  {product.productName}
                </h1>

                {/* Price Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-secondary/30 border border-amber-500/20 shadow-sm my-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-foreground">
                      {formatPrice(finalPrice)}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {product.makingDiscountPercent}% OFF Making
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#dba424]" />
                    Price includes Gold Value, Stone Cost, Making Charges & Mandatory GST (3%)
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                  {product.productDescription}
                </p>

                {/* Quick Snapshot Pills */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="p-3.5 rounded-xl bg-card border border-border/80 text-center shadow-2xs">
                    <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Gold Purity</span>
                    <span className="text-sm font-bold text-foreground mt-0.5 block">{product.goldPurity}% Gold</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-card border border-border/80 text-center shadow-2xs">
                    <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Net Weight</span>
                    <span className="text-sm font-bold text-foreground mt-0.5 block">{product.netWeight} g</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-card border border-border/80 text-center shadow-2xs">
                    <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Stone Wt.</span>
                    <span className="text-sm font-bold text-foreground mt-0.5 block">{product.stoneInCarat} Ct</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-foreground font-semibold text-sm">Quantity:</span>
                  <div className="flex items-center border border-border rounded-xl bg-card shadow-2xs overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-sm text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <Button 
                    variant="gold" 
                    size="xl" 
                    className="flex-1 font-semibold tracking-wide shadow-xl shadow-amber-600/15 py-6 rounded-xl text-base" 
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2.5" />
                    Add to Bag
                  </Button>
                  <Button 
                    variant="outline" 
                    size="xl" 
                    className="px-6 border-border/80 hover:border-amber-600 hover:bg-amber-500/5 rounded-xl transition-all"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-red-500 transition-colors" />
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center mb-2 text-[#dba424]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Free Shipping</span>
                  <span className="text-[10px] text-muted-foreground">100% Insured</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center mb-2 text-[#dba424]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">BIS Hallmarked</span>
                  <span className="text-[10px] text-muted-foreground">Certified Purity</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center mb-2 text-[#dba424]">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Easy Returns</span>
                  <span className="text-[10px] text-muted-foreground">15-Day Exchange</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================================================= */}
          {/* DETAILED SPECIFICATIONS & PRICE BREAKUP SECTION */}
          {/* ========================================================================= */}
          <div className="mt-20 pt-12 border-t border-border/60">
            
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Specifications & Pricing Breakdown
                </h2>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-1.5">
                  * If there is any difference in final gold weight upon crafting, an immediate additional payment or refund will be applicable.
                </p>
              </div>

              {/* 3-Card Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                
                {/* Card 1: Product Details */}
                <div className="border border-border/60 rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-secondary/50 py-3.5 px-5 flex items-center gap-2.5 border-b border-border/60">
                    <Info className="w-4 h-4 text-[#dba424]" />
                    <h3 className="font-semibold text-sm text-foreground tracking-wide">Product Details</h3>
                  </div>
                  <div className="p-5 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">SKU</span>
                      <span className="font-semibold text-foreground">{product.sku}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Main Category</span>
                      <span className="font-semibold text-foreground capitalize">{product.mainCategory}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Sub Category</span>
                      <span className="font-semibold text-foreground capitalize">{product.subCategory}</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Gold Details */}
                <div className="border border-border/60 rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-secondary/50 py-3.5 px-5 flex items-center gap-2.5 border-b border-border/60">
                    <Layers className="w-4 h-4 text-[#dba424]" />
                    <h3 className="font-semibold text-sm text-foreground tracking-wide">Gold Details</h3>
                  </div>
                  <div className="p-5 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Gold Color</span>
                      <span className="font-semibold text-foreground capitalize">{product.goldColor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Gold Purity</span>
                      <span className="font-semibold text-foreground">{product.goldPurity}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Gross Weight</span>
                      <span className="font-semibold text-foreground">{product.grossWeight} g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Stone Weight</span>
                      <span className="font-semibold text-foreground">{product.stoneWeight} g</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-border/60 pt-2.5 font-bold">
                      <span className="text-foreground">Net Weight</span>
                      <span className="text-[#dba424]">{product.netWeight} g</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Stone Details */}
                <div className="border border-border/60 rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-secondary/50 py-3.5 px-5 flex items-center gap-2.5 border-b border-border/60">
                    <Gem className="w-4 h-4 text-[#dba424]" />
                    <h3 className="font-semibold text-sm text-foreground tracking-wide">Stone Details</h3>
                  </div>
                  <div className="p-5 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Stone in Carat</span>
                      <span className="font-semibold text-foreground">{product.stoneInCarat} ct</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">Per ct Cost</span>
                      <span className="font-semibold text-foreground">{formatPrice(product.perCtCost)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-border/60 pt-2.5 font-bold">
                      <span className="text-foreground">Total Stone Cost</span>
                      <span className="text-[#dba424]">{formatPrice(product.stoneCost)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Price Breakup Accordion */}
              <div className="border border-border/80 rounded-2xl overflow-hidden bg-card shadow-md">
                <button
                  onClick={() => setIsPriceBreakupOpen(!isPriceBreakupOpen)}
                  className="w-full bg-secondary/60 hover:bg-secondary/80 px-6 py-5 flex items-center justify-between border-b border-border/60 transition-colors"
                >
                  <span className="font-display font-bold text-foreground tracking-wider text-sm sm:text-base">
                    100% TRANSPARENT PRICE BREAKUP
                  </span>
                  {isPriceBreakupOpen ? (
                    <ChevronUp className="w-5 h-5 text-foreground/70" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-foreground/70" />
                  )}
                </button>

                <AnimatePresence>
                  {isPriceBreakupOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 sm:p-8 space-y-4 text-xs sm:text-sm divide-y divide-border/50">
                        
                        {/* GOLD PRICE */}
                        <div className="flex justify-between items-center pt-2 first:pt-0">
                          <div>
                            <span className="font-bold text-foreground block">GOLD PRICE</span>
                            <span className="text-[11px] text-muted-foreground">
                              ({product.netWeight} g Net Wt. @ ₹{product.goldRate.toLocaleString('en-IN')}/g)
                            </span>
                          </div>
                          <span className="text-muted-foreground font-medium">{product.netWeight} g</span>
                          <span className="font-bold text-foreground">{formatPrice(product.goldPrice)}</span>
                        </div>

                        {/* Stone Cost */}
                        <div className="flex justify-between items-center pt-4">
                          <div>
                            <span className="font-bold text-foreground block">Stone Cost</span>
                            <span className="text-[11px] text-muted-foreground">
                              ({product.stoneInCarat} ct @ ₹{product.perCtCost.toLocaleString('en-IN')}/ct)
                            </span>
                          </div>
                          <span className="text-muted-foreground font-medium">{product.stoneInCarat} ct</span>
                          <span className="font-bold text-foreground">{formatPrice(product.stoneCost)}</span>
                        </div>

                        {/* Original Making Charges */}
                        <div className="flex justify-between items-center pt-4">
                          <span className="font-medium text-foreground">Original Making Charges</span>
                          <span className="text-muted-foreground">-</span>
                          <span className="font-medium text-foreground">{formatPrice(product.makingCharges)}</span>
                        </div>

                        {/* Discount Amount */}
                        <div className="flex justify-between items-center pt-4 text-emerald-600 bg-emerald-500/5 -mx-6 sm:-mx-8 px-6 sm:px-8 py-2.5 rounded-sm">
                          <span className="font-bold">{product.makingDiscountPercent}% Discount on Making Charges</span>
                          <span className="text-muted-foreground">-</span>
                          <span className="font-bold">- {formatPrice(product.discountAmount)}</span>
                        </div>

                        {/* Making Charges After Discount */}
                        <div className="flex justify-between items-center pt-4">
                          <span className="font-bold text-foreground">Making Charges After Discount</span>
                          <span className="text-muted-foreground">-</span>
                          <span className="font-bold text-foreground">{formatPrice(product.makingChargesAfterDiscount)}</span>
                        </div>

                        {/* Grand Total Amount Row */}
                        <div className="flex justify-between items-center pt-5 text-base sm:text-lg font-extrabold bg-secondary/30 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-5 border-t-2 border-border">
                          <span className="font-display text-foreground tracking-tight">TOTAL GRAND AMOUNT</span>
                          <span className="text-muted-foreground hidden sm:inline">-</span>
                          <span className="text-[#dba424] font-display text-xl sm:text-2xl">{formatPrice(product.totalAmount)}</span>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
          {/* ========================================================================= */}

        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;











// import { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RefreshCw, ChevronRight } from 'lucide-react';
// import { Layout } from '@/components/layout/Layout';
// import { Button } from '@/components/ui/button';
// import { useCart } from '@/contexts/CartContext';



// import { useEffect} from 'react';

// import { products, type Product } from "@/data/products";



// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const { addItem } = useCart();
  

//   const handleAddToCart = () => {
//   addItem({
//     id: product.id,
//     name: product.title,
//     price: product.price,
//     image: product.image,
//   });
// };

// const [product, setProduct] = useState<Product | null>(null);

// useEffect(() => {
//   const found = products.find((p) => p.id === id);
//   setProduct(found || null);
// }, [id]);


// if (!product) {
//   return <div className="pt-32 text-center">Loading...</div>;
// }
// const price = product.price;


// const images = [product.image];
//   return (

    
//     <Layout>
//       {/* Breadcrumb */}
//       <div className="pt-28 pb-4 bg-secondary/30">
//         <div className="container mx-auto px-4 lg:px-8">
//           <nav className="flex items-center gap-2 text-sm">
//             <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">
//               Home
//             </Link>
//             <ChevronRight className="w-4 h-4 text-muted-foreground" />
//             <Link to="/shop" className="text-muted-foreground hover:text-accent transition-colors">
//               Shop
//             </Link>
//             <ChevronRight className="w-4 h-4 text-muted-foreground" />
//             <span className="text-foreground">{product?.title}</span>
//           </nav>
//         </div>
//       </div>


//       {/* Product Content */}
//       <section className="py-12 bg-background">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
//             {/* Image Gallery */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="relative aspect-landscape rounded-lg overflow-hidden bg-card shadow-elegant mb-4">
               
//                  <img src={images[selectedImage]}  alt={`Product Image ${selectedImage + 1}`} className="w-full h-full object-cover" />
//               </div>
//               <div className="grid grid-cols-3 gap-4">
//                 {images.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
//                       selectedImage === idx ? 'border-accent' : 'border-transparent'
//                     }`}
//                   >
//                     <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Product Info */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               <span className="text-accent text-sm font-medium uppercase tracking-wider">
               
//               </span>
//               <h1 className="font-display text-3xl md:text-4xl text-foreground mt-2 mb-4">
//                 {product?.title}
//               </h1>

//               {/* Price */}
//               <div className="flex items-center gap-3 mb-6">
//   <span className="text-accent font-display text-3xl">
//     {formatPrice(price)}
//   </span>
//   <span className="text-sm text-muted-foreground">Inclusive of all taxes</span>
// </div>

//               {/* Description */}
//               <p className="text-muted-foreground leading-relaxed mb-6">
//                 {product.description}
//               </p>

//               {/* Specs */}
//               <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary/50 rounded-lg">
//                 <div>
//                   <span className="text-muted-foreground text-sm">Material</span>
//                   {/* <p className="font-medium">{productData.material}</p> */}
//                 </div>
//                 <div>
//                   <span className="text-muted-foreground text-sm">Weight</span>
//                   {/* <p className="font-medium">{productData.weight}</p> */}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div className="flex items-center gap-4 mb-6">
//                 <span className="text-foreground font-medium">Quantity:</span>
//                 <div className="flex items-center border border-border rounded-lg">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="p-3 hover:bg-secondary transition-colors"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>
//                   <span className="px-4 font-medium">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="p-3 hover:bg-secondary transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-4 mb-8">
//                 <Button variant="gold" size="xl" className="flex-1" onClick={handleAddToCart}>
//                   <ShoppingBag className="w-5 h-5 mr-2" />
//                   Add to Cart
//                 </Button>
//                 <Button variant="outline" size="xl">
//                   <Heart className="w-5 h-5" />
//                 </Button>
//               </div>

//               {/* Trust Badges */}
//               <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
//                 <div className="text-center">
//                   <Truck className="w-6 h-6 mx-auto mb-2 text-accent" />
//                   <span className="text-xs text-muted-foreground">Free Shipping</span>
//                 </div>
//                 <div className="text-center">
//                   <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
//                   <span className="text-xs text-muted-foreground">BIS Hallmarked</span>
//                 </div>
//                 <div className="text-center">
//                   <RefreshCw className="w-6 h-6 mx-auto mb-2 text-accent" />
//                   <span className="text-xs text-muted-foreground">Easy Returns</span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default ProductDetail;
