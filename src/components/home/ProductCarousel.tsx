import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { products, type Product } from "@/data/products"; // Using your central data source

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

export const ProductCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselProducts = products;
  const [loading] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const totalSlides = carouselProducts.length;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (totalSlides === 0) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
  }, [totalSlides]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const goTo = (index: number) => {
    setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
    startAutoPlay();
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.productName, // Updated mapping
      price: product.totalAmount, // Updated mapping
      image: product.productImage, // Updated mapping
    });
  };

  const handleToggleWishlist = (product: Product) => {
    const id = product.id;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name: product.productName, // Updated mapping
        price: product.totalAmount, // Updated mapping
        image: product.productImage, // Updated mapping
        category: product.subCategory,
        slug: ''
      });
    }
  };

  const getVisibleItems = () => {
    if (totalSlides === 0) return [];

    const items = [];

    for (let offset = -2; offset <= 2; offset++) {
      const index =
        ((activeIndex + offset) % totalSlides + totalSlides) % totalSlides;

      items.push({
        product: carouselProducts[index],
        offset,
        originalIndex: index,
      });
    }

    return items;
  };

  const visibleItems = getVisibleItems();

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-primary overflow-hidden">
        <div className="container mx-auto px-4 flex items-center justify-center" style={{ minHeight: '560px' }}>
          <p className="text-primary-foreground/50">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4 block">
              Trending Now
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6 leading-tight">
              Our Signature Pieces
            </h2>
            <p className="text-primary-foreground/60 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
              Swipe through our most loved creations each piece crafted with precision and passion,
              designed to make every moment unforgettable.
            </p>

            {/* Dots */}
            {/* <div className="flex gap-2 mb-8">
              {carouselProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex
                      ? 'bg-accent w-8'
                      : 'bg-primary-foreground/30 w-2.5 hover:bg-primary-foreground/50'
                    }`}
                />
              ))}
            </div> */}

            {/* Nav Arrows */}
            <div className="flex gap-3">
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column — Carousel */}
          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: '560px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence initial={false} mode="sync">
              {visibleItems.map(({ product, offset, originalIndex }) => {
                const isCenter = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;
                const img = product.productImage; // Updated mapping
                const price = product.totalAmount; // Updated mapping
                const slug = product.slug; // Ensure slug is ready for routing

                const xPercent = offset * 105;
                const scale = isCenter ? 1 : isAdjacent ? 0.85 : 0.7;
                const opacity = isCenter ? 1 : isAdjacent ? 0.5 : 0;
                const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

                return (
                  <motion.div
                    key={`slide-${originalIndex}`}
                    animate={{ x: `${xPercent}%`, scale, opacity, zIndex }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute cursor-pointer w-[280px] md:w-[340px]"
                    style={{ zIndex }}
                    onClick={() => !isCenter && goTo(originalIndex)}
                  >
                    <div className="rounded-2xl overflow-hidden group relative">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                        {img ? (
                          <img
                            src={img}
                            alt={product.productName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No image</span>
                          </div>
                        )}

                        {isCenter && (
                          <>
                            {/* Wishlist + View (SLUG BASED ROUTING FIXED HERE) */}
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}
                                className={`w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${isInWishlist(product.id) ? 'text-destructive' : 'text-foreground hover:text-accent'
                                  }`}
                              >
                                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                              </button>
                              <Link
                                to={`/product/${slug}`} // Explicitly fixed to SLUG
                                onClick={(e) => e.stopPropagation()}
                                className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            </div>

                            {/* Add to Cart slide-up */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                              >
                                <ShoppingCart className="w-4 h-4" /> Add to Cart
                              </button>
                            </div>

                            {/* Title + Price overlay at bottom */}
                            <div className="absolute bottom-14 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-white font-medium text-sm line-clamp-1">{product.productName}</p>
                              <p className="text-accent text-sm font-semibold">{formatPrice(price)}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};









// import { useState, useRef, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Heart, Eye, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useCart } from '@/contexts/CartContext';
// import { useWishlist } from '@/contexts/WishlistContext';
// // import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';

// import womensjewellerytopsone from "../../assets/products/tops/womens-jewellery-tops-1.jpeg";
// import womensjewellerytopstwo from "../../assets/products/tops/womens-jewellery-tops-2.jpeg";
// import womensjewellerytopsthree from "../../assets/products/tops/womens-jewellery-tops-3.jpeg";
// import womensjewellerytopsfour from "../../assets/products/tops/womens-jewellery-tops-4.jpeg";
// import womensjewellerytopsfive from "../../assets/products/tops/womens-jewellery-tops-5.jpeg";
// import womensjewellerytopssix from "../../assets/products/tops/womens-jewellery-tops-6.jpeg";
// import womensjewellerytopsseven from "../../assets/products/tops/womens-jewellery-tops-7.jpeg";

// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
//   description: string;
// }

// export const products: Product[] = [
//  {
//     id: "1",
//     title: "Nirva Emerald dewdrops",
//     price: 27786.5,
//     image: womensjewellerytopsone,
//     category: "tops",
//     description: "elegant emerald teardrops framed by brilliant sparkle.",
//   },
//   {
//     id: "2",
//     title: "Nirva Ruby Dewdrops",
//     price: 25347,
//     image: womensjewellerytopstwo,
//     category: "tops",
//     description: "Elegant ruby teardrops with radiant sparkle.",
//   },
//   {
//     id: "3",
//     title: "Nirva Emerald Bloom Studs",
//     price: 17731,
//     image: womensjewellerytopsthree,
//     category: "tops",
//     description: "Graceful emerald sparkle in a timeless stud design.",
//   },
//   {
//     id: "4",
//     title: "Nirva Ruby Tree Studs",
//     price: 16422,
//     image: womensjewellerytopsfour,
//     category: "tops",
//     description: "Delicate floral-inspired studs with radiant ruby stones and brilliant sparkle.",
//   },
//   {
//     id: "5",
//     title: "Nirva Halo Circle Earrings",
//     price: 10019.8,
//     image: womensjewellerytopsfive,
//     category: "tops",
//     description: "Elegant circular earrings with a sparkling halo design and brilliant stone accents for everyday sophistication.",
//   },
//   {
//     id: "6",
//     title: "Nirva Regal Cone Drops",
//     price: 31832.5,
//     image: womensjewellerytopssix,
//     category: "tops",
//     description: "Bold cone-shaped earrings with layered sparkle detailing, crafted to make every occasion shine.",
//   },
//   {
//     id: "7",
//     title: "Nirva Emerald Star Studs",
//     price: 15470,
//     image: womensjewellerytopsseven,
//     category: "tops",
//     description: "Elegant circular studs featuring a radiant emerald center surrounded by sparkling stones for a timeless look.",
//   },
// ];

// const formatPrice = (price: number) =>
//   new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

// export const ProductCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   // const [products, setProducts] = useState<ShopifyProduct[]>([]);
//   const carouselProducts = products;
//   const [loading] = useState(false);
//   const { addItem } = useCart();
//   const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
//   const intervalRef = useRef<ReturnType<typeof setInterval>>();

//   // Fetch Shopify products on mount, limit to 6 for carousel
//   // useEffect(() => {
//   //   fetchShopifyProducts(6).then((prods) => {
//   //     setProducts(prods);
//   //     setLoading(false);
//   //   });
//   // }, []);

//   const totalSlides = carouselProducts.length;

//   const startAutoPlay = useCallback(() => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (totalSlides === 0) return;
//     intervalRef.current = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % totalSlides);
//     }, 3000);
//   }, [totalSlides]);

//   useEffect(() => {
//     startAutoPlay();
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [startAutoPlay]);

//   const goTo = (index: number) => {
//     setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
//     startAutoPlay();
//   };

//   const handleAddToCart = (product: Product) => {
//     addItem({
//       id: product.id,
//       name: product.title,
//       price: product.price,
//       image: product.image,
//     });
//   };

//   const handleToggleWishlist = (product: Product) => {
//     const id = product.id;
//     if (isInWishlist(id)) {
//       removeFromWishlist(id);
//     } else {
//       addToWishlist({
//         id,
//         name: product.title,
//         price: product.price,
//         image: product.image,
//         category: product.category,
//       });
//     }
//   };


//   const getVisibleItems = () => {
//     if (totalSlides === 0) return [];

//     const items = [];

//     for (let offset = -2; offset <= 2; offset++) {
//       const index =
//         ((activeIndex + offset) % totalSlides + totalSlides) % totalSlides;

//       items.push({
//         product: carouselProducts[index],
//         offset,
//         originalIndex: index,
//       });
//     }

//     return items;
//   };

//   const visibleItems = getVisibleItems();

//   if (loading) {
//     return (
//       <section className="py-20 lg:py-28 bg-primary overflow-hidden">
//         <div className="container mx-auto px-4 flex items-center justify-center" style={{ minHeight: '560px' }}>
//           <p className="text-primary-foreground/50">Loading...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20 lg:py-28 bg-primary overflow-hidden">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-center">

//           {/* Left Column */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <span className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4 block">
//               Trending Now
//             </span>
//             <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6 leading-tight">
//               Our Signature Pieces
//             </h2>
//             <p className="text-primary-foreground/60 text-base lg:text-lg leading-relaxed mb-8 max-w-md">
//               Swipe through our most loved creations each piece crafted with precision and passion,
//               designed to make every moment unforgettable.
//             </p>

//             {/* Dots */}
//             <div className="flex gap-2 mb-8">
//               {carouselProducts.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goTo(i)}
//                   className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex
//                       ? 'bg-accent w-8'
//                       : 'bg-primary-foreground/30 w-2.5 hover:bg-primary-foreground/50'
//                     }`}
//                 />
//               ))}
//             </div>

//             {/* Nav Arrows */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => goTo(activeIndex - 1)}
//                 className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => goTo(activeIndex + 1)}
//                 className="w-12 h-12 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </motion.div>

//           {/* Right Column — Carousel */}
//           <div
//             className="relative flex items-center justify-center"
//             style={{ minHeight: '560px' }}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             <AnimatePresence initial={false} mode="sync">
//               {visibleItems.map(({ product, offset, originalIndex }) => {
//                 const isCenter = offset === 0;
//                 const isAdjacent = Math.abs(offset) === 1;
//                 const img = product.image;
//                 const price = product.price;
//                 const id = product.id;

//                 const xPercent = offset * 105;
//                 const scale = isCenter ? 1 : isAdjacent ? 0.85 : 0.7;
//                 const opacity = isCenter ? 1 : isAdjacent ? 0.5 : 0;
//                 const zIndex = isCenter ? 30 : isAdjacent ? 20 : 10;

//                 return (
//                   <motion.div
//                     key={`slide-${originalIndex}`}
//                     animate={{ x: `${xPercent}%`, scale, opacity, zIndex }}
//                     transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
//                     className="absolute cursor-pointer w-[280px] md:w-[340px]"
//                     style={{ zIndex }}
//                     onClick={() => !isCenter && goTo(originalIndex)}
//                   >
//                     <div className="rounded-2xl overflow-hidden group relative">
//                       <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
//                         {img ? (
//                           <img
//                             src={product.image}
//                             alt={product.title}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                           />
//                         ) : (
//                           <div className="w-full h-full bg-secondary flex items-center justify-center">
//                             <span className="text-muted-foreground text-sm">No image</span>
//                           </div>
//                         )}

//                         {isCenter && (
//                           <>
//                             {/* Wishlist + View */}
//                             <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                               <button
//                                 onClick={(e) => { e.stopPropagation(); handleToggleWishlist(product); }}
//                                 className={`w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${isInWishlist(product.id) ? 'text-destructive' : 'text-foreground hover:text-accent'
//                                   }`}
//                               >
//                                 <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
//                               </button>
//                               <Link
//                                 to={`/product/${product.id}`}
//                                 onClick={(e) => e.stopPropagation()}
//                                 className="w-9 h-9 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors"
//                               >
//                                 <Eye className="w-4 h-4" />
//                               </Link>
//                             </div>

//                             {/* Add to Cart slide-up */}
//                             <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                               <button
//                                 onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
//                                 className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
//                               >
//                                 <ShoppingCart className="w-4 h-4" /> Add to Cart
//                               </button>
//                             </div>

//                             {/* Title + Price overlay at bottom */}
//                             <div className="absolute bottom-14 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                               <p className="text-white font-medium text-sm line-clamp-1">{product.title}</p>
//                               <p className="text-accent text-sm font-semibold">{formatPrice(product.price)}</p>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };