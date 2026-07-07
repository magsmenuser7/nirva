import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { products } from "@/data/products";

export const PromoBannerSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden py-20 bg-[#f8f5ef]">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-100/40 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="uppercase tracking-[6px] text-sm text-[#b48a3c] mb-4">
              Nirva 9KT Gold
            </p>

            <h2 className="text-5xl lg:text-7xl leading-[1.05] font-light text-[#132238]">
              Jewelry that
              <br />
              feels timeless.
            </h2>

            <p className="mt-6 text-[#5c6773] text-lg leading-relaxed max-w-xl">
              Discover handcrafted 9KT gold designs made for everyday elegance
              and unforgettable moments.
            </p>

            {/* CTA Row */}
            <div className="flex items-center gap-5 mt-10">
              <Link
                to="/shop"
                className="px-8 py-4 bg-[#132238] text-white rounded-full text-sm tracking-wider uppercase hover:scale-105 transition-all duration-300"
              >
                Shop Collection
              </Link>

              <div className="bg-white shadow-xl border border-black/5 rounded-2xl px-6 py-4">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-semibold text-[#132238]">
                    20%
                  </span>
                  <span className="mb-1 text-[#b48a3c] font-medium">OFF</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  On all 9KT gold designs
                </p>
              </div>
            </div>
          </div>

          {/* Featured Product */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#132238]/10 to-[#b48a3c]/10 rounded-[40px] blur-2xl" />

            <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] p-6 shadow-2xl">
              {products.length > 5 && (
                <>
                  <div className="aspect-[4/5] overflow-hidden rounded-[30px] bg-[#f5f5f5]">
                    <img
                      src={products[5].productImage}
                      alt={products[5].productName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-lg text-[#132238] font-medium">
                        {products[5].productName}
                      </p>

                      <p className="text-[#b48a3c] text-xl font-semibold mt-1">
                        ₹{products[5].totalAmount.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* FIXED: Uses slug with safe fallback to id */}
                    <Link
                      to={`/product/${products[5].slug}`}
                      className="px-5 py-3 bg-[#132238] text-white rounded-full text-sm"
                    >
                      View
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Product Rail */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm tracking-[4px] uppercase text-[#b48a3c]">
                Trending Pieces
              </p>

              <h3 className="text-3xl text-[#132238] mt-2">
                Curated for modern elegance
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => scroll("right")}
                className="w-11 h-11 rounded-full bg-[#132238] text-white flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll snap-x snap-mandatory pb-4 no-scrollbar"
          >
            {products.map((product) => {
              const img = product.productImage;
              const price = product.totalAmount;
              
              // FIXED: Uses product.slug as primary, falls back to product.id
              const routeParam = product.slug || product.id;

              return (
                <Link
                  key={product.slug}
                  to={`/product/${routeParam}`}
                  className="min-w-[200px] snap-start"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-[28px] overflow-hidden shadow-lg border border-black/5"
                  >
                    <div className="aspect-square bg-[#f7f7f7] overflow-hidden">
                      <img
                        src={img}
                        alt={product.productName}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-5">
                      <h4 className="text-[#132238] text-lg truncate">
                        {product.productName}
                      </h4>

                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xl font-semibold text-[#132238]">
                          ₹{price.toLocaleString("en-IN")}
                        </span>

                        <span className="line-through text-gray-400 text-sm">
                          ₹{Math.round(price * 1.2).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};





// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";


// import { products, type Product } from "@/data/products";



// export const PromoBannerSection = () => {
 
//   const scrollRef = useRef<HTMLDivElement>(null);



//   const scroll = (dir: "left" | "right") => {
//     if (!scrollRef.current) return;

//     scrollRef.current.scrollBy({
//       left: dir === "left" ? -320 : 320,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="relative overflow-hidden py-20 bg-[#f8f5ef]">
//       {/* Background glow */}
//       <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-100/40 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 blur-3xl rounded-full" />

//       <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
//         {/* Hero Section */}
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Content */}
//           <div>
//             <p className="uppercase tracking-[6px] text-sm text-[#b48a3c] mb-4">
//               Nirva 9KT Gold
//             </p>

//             <h2 className="text-5xl lg:text-7xl leading-[1.05] font-light text-[#132238]">
//               Jewelry that
//               <br />
//               feels timeless.
//             </h2>

//             <p className="mt-6 text-[#5c6773] text-lg leading-relaxed max-w-xl">
//               Discover handcrafted 9KT gold designs made for everyday elegance
//               and unforgettable moments.
//             </p>

//             {/* CTA Row */}
//             <div className="flex items-center gap-5 mt-10">
//               <Link
//                 to="/shop"
//                 className="px-8 py-4 bg-[#132238] text-white rounded-full text-sm tracking-wider uppercase hover:scale-105 transition-all duration-300"
//               >
//                 Shop Collection
//               </Link>

//               <div className="bg-white shadow-xl border border-black/5 rounded-2xl px-6 py-4">
//                 <div className="flex items-end gap-1">
//                   <span className="text-4xl font-semibold text-[#132238]">
//                     20%
//                   </span>
//                   <span className="mb-1 text-[#b48a3c] font-medium">OFF</span>
//                 </div>

//                 <p className="text-sm text-gray-500 mt-1">
//                   On all 9KT gold designs
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Featured Product */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="relative"
//           >
//             <div className="absolute inset-0 bg-gradient-to-tr from-[#132238]/10 to-[#b48a3c]/10 rounded-[40px] blur-2xl" />

//             <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-[40px] p-6 shadow-2xl">
//               {products.length > 5 && (
//                 <>
//                   <div className="aspect-[4/5] overflow-hidden rounded-[30px] bg-[#f5f5f5]">
//                     <img
//                       src={products[5].image}
//                       alt={products[5].title}
//                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                     />
//                   </div>

//                   <div className="mt-5 flex items-center justify-between">
//                     <div>
//                       <p className="text-lg text-[#132238] font-medium">
//                         {products[5].title}
//                       </p>

//                       <p className="text-[#b48a3c] text-xl font-semibold mt-1">
//                         ₹{products[5].price.toLocaleString("en-IN")}
//                       </p>
//                     </div>

//                     <Link
//                       to={`/product/${products[5].slug}`}
//                       className="px-5 py-3 bg-[#132238] text-white rounded-full text-sm"
//                     >
//                       View
//                     </Link>
//                   </div>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         </div>

//         {/* Product Rail */}
//         <div className="mt-20">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <p className="text-sm tracking-[4px] uppercase text-[#b48a3c]">
//                 Trending Pieces
//               </p>

//               <h3 className="text-3xl text-[#132238] mt-2">
//                 Curated for modern elegance
//               </h3>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => scroll("left")}
//                 className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>

//               <button
//                 onClick={() => scroll("right")}
//                 className="w-11 h-11 rounded-full bg-[#132238] text-white flex items-center justify-center"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           <div
//             ref={scrollRef}
//             className="flex gap-6 overflow-x-scroll snap-x snap-mandatory pb-4 no-scrollbar"
//           >
//             {products.map((product) => {
//               const img = product.image;
//               const price = product.price;
//               const id = product.id;

//               return (
//                 <Link
//                   key={product.id}
//                   to={`/product/${id}`}
//                   className="min-w-[200px] snap-start"
//                 >
//                   <motion.div
//                     whileHover={{ y: -8 }}
//                     className="bg-white rounded-[28px] overflow-hidden shadow-lg border border-black/5"
//                   >
//                     <div className="aspect-square bg-[#f7f7f7] overflow-hidden">
//                       <img
//                         src={img}
//                         alt={product.title}
//                         className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
//                       />
//                     </div>

//                     <div className="p-5">
//                       <h4 className="text-[#132238] text-lg truncate">
//                         {product.title}
//                       </h4>

//                       <div className="flex items-center gap-3 mt-3">
//                         <span className="text-xl font-semibold text-[#132238]">
//                           ₹{price.toLocaleString("en-IN")}
//                         </span>

//                         <span className="line-through text-gray-400 text-sm">
//                           ₹{Math.round(price * 1.2).toLocaleString("en-IN")}
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };