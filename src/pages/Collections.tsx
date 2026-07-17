import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

import bangles from "@/assets/products/bangles/Bangle1-2.jpeg";
import earrings from "@/assets/products/earrings/earrings2-2.jpeg";
import chain from "@/assets/products/chains/chain2-1.jpeg";
import bracelet from "@/assets/products/bracelets/bracelet1-1.jpeg";
import pendatirumalabalajidivinependantset1 from "@/assets/products/pendants/tirumala-balaji-divine-pendant-set-1.jpeg";
import waistbelt from "@/assets/products/waistbelt/waistbelt1-1.jpeg";
import emeraldmajestynecklaceset1 from "../assets/products/necklace/emerald-majesty-necklace-set-1.jpeg";
import nirvacelestemangalsutr from "../assets/products/blackbeadschains/nirva-celeste-mangalsutra.jpeg";
import divinecollections from "../assets/products/divinecollections/nirva-divine-shiva-lingam-pendant.jpeg";
import nirvaheartsparkstuds from "../assets/products/kids/nirva-heart-spark-studs.jpeg";
import nirvarosegoldlinkbracelet from "../assets/products/mens/nirva-rose-gold-link-bracelet.jpeg";
import emeraldelegancenecklace from "../assets/products/womens/necklaces/emerald-elegance-necklace.jpeg";



import { products, type Product } from "@/data/products";

const collections = [
  { id: "all", name: "All Collections", image: bangles, description: "Explore our entire range of handcrafted jewellery, from elegant necklaces to stylish bracelets." },
  { id: "tops", name: "Tops", image: earrings, description: "Discover our latest tops collection, perfect for any occasion." },
  { id: "bangles", name: "Bangles", image: bangles, description: "Adorn yourself with our beautiful bangles collection." },
  { id: "earrings", name: "Earrings", image: earrings, description: "Elevate your look with our stunning earrings collection." },
  { id: "necklaces", name: "Necklaces", image: emeraldmajestynecklaceset1, description: "Make a statement with our elegant necklaces collection." },
  { id: "bracelets", name: "Bracelets", image: bracelet, description: "Complete your style with our fashionable bracelets collection." },
  { id: "chains", name: "Chains", image: chain, description: "Enhance your look with our beautiful chains collection." },
  { id: "pendants", name: "Pendants", image: pendatirumalabalajidivinependantset1, description: "Add a touch of elegance with our stunning pendants collection." },
  { id: "waistbelt", name: "Waist Belt", image: waistbelt, description: "Define your silhouette with our fashionable waist belts collection." },
  { id: "blackbeads", name: "Black Beads", image: nirvacelestemangalsutr, description: "A perfect blend of tradition and sparkle, the Nirva Celeste Mangalsutra is crafted in 9K gold with a classic black bead chain." },
  { id: "divine", name: "Divine Collections", image: divinecollections, description: "A sacred Nirva 9K yellow gold Shiva Lingam pendant crafted with a polished finish." },
  { id: "kids", name: "Kids Earrings", image: nirvaheartsparkstuds, description: "Charming 9K gold stud earrings featuring a modern geometric silhouette with a delicate heart motif" },
  { id: "mens", name: "Men's Jewellery", image: nirvarosegoldlinkbracelet, description: "A sophisticated Nirva 9K Rose Gold Men’s Bracelet featuring sleek geometric links with a polished finish." },
  { id: "womens", name: "Women's Jewellery", image: emeraldelegancenecklace, description: "A graceful dual-strand necklace adorned with brilliant stones and a captivating pear-shaped emerald centerpiece." },

];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const Collections = () => {
  const [selectedCollection, setSelectedCollection] =
    useState("all");

  const { addItem } = useCart();

  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.productName,
      price: product.totalAmount,
      image: product.productImage,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.productName,
        price: product.totalAmount,
        image: product.productImage,
        category: product.subCategory,
        slug: ""
      });
    }
  };

// Updated flexible filter that removes spaces and matches subCategory, mainCategory, or title
  const filteredProducts =
    selectedCollection === "all"
      ? products
      : products.filter((product) => {
          // 1. Remove all spaces and make lowercase (e.g., "blackbeads" -> "blackbeads")
          const selected = selectedCollection.toLowerCase().replace(/\s+/g, '');
          
          // 2. Clean the product fields to match against
          const subCat = (product.subCategory || "").toLowerCase().replace(/\s+/g, '');
          // mainCat also strips apostrophes so "Men's Jewellery" -> "mensjewellery"
          const mainCat = (product.mainCategory || "").toLowerCase().replace(/\s+/g, '').replace(/'/g, '');
          const title = (product.productName || "").toLowerCase().replace(/\s+/g, '');

          // 3. Reliable, exact group-level matches using mainCategory.
          //    These use exact equality (not substring) so every product that
          //    belongs to the group actually shows up, instead of only the
          //    handful that happened to match a loose substring check.
          if (selected === 'mens') return mainCat === 'mensjewellery';
          if (selected === 'womens') return mainCat === 'womensjewellery';
          if (selected === 'kids') return mainCat === 'kidsjewellery';
          if (selected === 'divine') return mainCat === 'divinecollection';

          // 4. Everything else keeps the original flexible substring matching
          return subCat.includes(selected) || selected.includes(subCat) || mainCat.includes(selected) || title.includes(selected);
        });

  return (
    <Layout noPadding>
      {/* ================= Page Header ================= */}
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
              Explore our handcrafted jewellery collections designed for
              timeless elegance.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-12 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">

          {/* ================= Collection Cards ================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">

            {collections.map((collection, index) => (

              <motion.button
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedCollection(collection.id)}
                className={`group relative overflow-hidden rounded-xl aspect-[4/5] text-left transition-all duration-300
                ${
                  selectedCollection === collection.id
                    ? "ring-2 ring-accent"
                    : ""
                }`}
              >

                <img
                  src={collection.image}
                  alt={collection.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">

                  <h3 className="font-display text-xl text-white mb-1">
                    {collection.name}
                  </h3>

                  <p className="text-white/80 text-sm">
                    {collection.description}
                  </p>

                </div>

              </motion.button>

            ))}

          </div>

          {/* ================= Heading ================= */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="font-display text-3xl text-foreground">

              {
                collections.find(
                  c => c.id === selectedCollection
                )?.name
              }

            </h2>

            <p className="text-muted-foreground mt-2">

              Showing {filteredProducts.length} Products

            </p>

          </motion.div>

          {/* ================= Product Grid ================= */}

          {filteredProducts.length === 0 ? (

            <div className="text-center py-20">

              <h3 className="text-2xl font-semibold mb-2">
                No Products Found
              </h3>

              <p className="text-muted-foreground">
                Products will appear here once available.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredProducts.map((product, index) => {

                // Using slug for routing, falling back to id
                const routeParam = product.slug || product.id;
                const img = product.productImage;
                const price = product.totalAmount;

                return (

                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover-lift"
                  >

                    <Link
                      to={`/product/${routeParam}`}
                      className="block relative aspect-square overflow-hidden"
                    >

                      <img
                        src={img}
                        alt={product.productName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleToggleWishlist(product);
                          }}
                          className={`w-10 h-10 rounded-full bg-white shadow flex items-center justify-center ${
                            isInWishlist(product.id)
                              ? "text-red-500"
                              : "text-black"
                          }`}
                        >

                          <Heart
                            className={`w-5 h-5 ${
                              isInWishlist(product.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />

                        </button>

                        <Link
                          to={`/product/${routeParam}`}
                          className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>

                      </div>

                    </Link>

                    <div className="p-5">

                      <Link to={`/product/${routeParam}`}>

                        <h3 className="font-display text-xl hover:text-accent transition-colors line-clamp-2">

                          {product.productName}

                        </h3>

                      </Link>

                      <p className="text-accent text-xl font-semibold mt-3">

                        {formatPrice(price)}

                      </p>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-5"
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








// import { useState } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Heart, ShoppingCart, Eye } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useCart } from "@/contexts/CartContext";
// import { useWishlist } from "@/contexts/WishlistContext";

// import bangles from "@/assets/products/bangles/Bangle1-2.jpeg";
// import earrings from "@/assets/products/earrings/earrings2-2.jpeg";
// import chain from "@/assets/products/chains/chain2-1.jpeg";
// import bracelet from "@/assets/products/bracelets/bracelet1-1.jpeg";
// import pendatirumalabalajidivinependantset1 from "@/assets/products/pendants/tirumala-balaji-divine-pendant-set-1.jpeg";
// import waistbelt from "@/assets/products/waistbelt/waistbelt1-1.jpeg";
// import emeraldmajestynecklaceset1 from "../assets/products/necklace/emerald-majesty-necklace-set-1.jpeg";
// import nirvacelestemangalsutr from "../assets/products/blackbeadschains/nirva-celeste-mangalsutra.jpeg";
// import divinecollections from "../assets/products/divinecollections/nirva-divine-shiva-lingam-pendant.jpeg";
// import nirvaheartsparkstuds from "../assets/products/kids/nirva-heart-spark-studs.jpeg";
// import nirvarosegoldlinkbracelet from "../assets/products/mens/nirva-rose-gold-link-bracelet.jpeg";
// import emeraldelegancenecklace from "../assets/products/womens/necklaces/emerald-elegance-necklace.jpeg";



// import { products, type Product } from "@/data/products";

// const collections = [
//   { id: "all", name: "All Collections", image: bangles, description: "Explore our entire range of handcrafted jewellery, from elegant necklaces to stylish bracelets." },
//   { id: "tops", name: "Tops", image: earrings, description: "Discover our latest tops collection, perfect for any occasion." },
//   { id: "bangles", name: "Bangles", image: bangles, description: "Adorn yourself with our beautiful bangles collection." },
//   { id: "earrings", name: "Earrings", image: earrings, description: "Elevate your look with our stunning earrings collection." },
//   { id: "necklaces", name: "Necklaces", image: emeraldmajestynecklaceset1, description: "Make a statement with our elegant necklaces collection." },
//   { id: "bracelets", name: "Bracelets", image: bracelet, description: "Complete your style with our fashionable bracelets collection." },
//   { id: "chains", name: "Chains", image: chain, description: "Enhance your look with our beautiful chains collection." },
//   { id: "pendants", name: "Pendants", image: pendatirumalabalajidivinependantset1, description: "Add a touch of elegance with our stunning pendants collection." },
//   { id: "waistbelt", name: "Waist Belt", image: waistbelt, description: "Define your silhouette with our fashionable waist belts collection." },
//   { id: "blackbeads", name: "Black Beads", image: nirvacelestemangalsutr, description: "A perfect blend of tradition and sparkle, the Nirva Celeste Mangalsutra is crafted in 9K gold with a classic black bead chain." },
//   { id: "divinecollections", name: "Divine Collections", image: divinecollections, description: "A sacred Nirva 9K yellow gold Shiva Lingam pendant crafted with a polished finish." },
//   { id: "kidsearrings", name: "Kids Jewellery", image: nirvaheartsparkstuds, description: "Charming 9K gold stud earrings featuring a modern geometric silhouette with a delicate heart motif" },
//   { id: "mensbracelets", name: "Men's Jewellery", image: nirvarosegoldlinkbracelet, description: "A sophisticated Nirva 9K Rose Gold Men’s Bracelet featuring sleek geometric links with a polished finish." },
//   { id: "womensnecklaces", name: "Women's Jewellery", image: emeraldelegancenecklace, description: "A graceful dual-strand necklace adorned with brilliant stones and a captivating pear-shaped emerald centerpiece." },

// ];

// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// const Collections = () => {
//   const [selectedCollection, setSelectedCollection] =
//     useState("all");

//   const { addItem } = useCart();

//   const {
//     addItem: addToWishlist,
//     isInWishlist,
//     removeItem: removeFromWishlist,
//   } = useWishlist();

//   const handleAddToCart = (product: Product) => {
//     addItem({
//       id: product.id,
//       name: product.productName,
//       price: product.totalAmount,
//       image: product.productImage,
//     });
//   };

//   const handleToggleWishlist = (product: Product) => {
//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.productName,
//         price: product.totalAmount,
//         image: product.productImage,
//         category: product.subCategory,
//         slug: ""
//       });
//     }
//   };

// // Updated flexible filter that removes spaces and matches subCategory, mainCategory, or title
//   const filteredProducts =
//     selectedCollection === "all"
//       ? products
//       : products.filter((product) => {
//           // 1. Remove all spaces and make lowercase (e.g., "blackbeads" -> "blackbeads")
//           const selected = selectedCollection.toLowerCase().replace(/\s+/g, '');
          
//           // 2. Clean the product fields to match against
//           const subCat = (product.subCategory || "").toLowerCase().replace(/\s+/g, '');
//           const mainCat = (product.mainCategory || "").toLowerCase().replace(/\s+/g, '');
//           const title = (product.productName || "").toLowerCase().replace(/\s+/g, '');

//           // 3. Return true if ANY of the fields contain the category name
//           return subCat.includes(selected) || selected.includes(subCat) || mainCat.includes(selected) || title.includes(selected);
//         });

//   return (
//     <Layout noPadding>
//       {/* ================= Page Header ================= */}
//       <section className="pt-32 pb-12 bg-gradient-hero">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
//               Our Collections
//             </h1>

//             <p className="text-primary-foreground/80 max-w-2xl mx-auto">
//               Explore our handcrafted jewellery collections designed for
//               timeless elegance.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       <div className="py-12 bg-background min-h-screen">
//         <div className="container mx-auto px-4 lg:px-8">

//           {/* ================= Collection Cards ================= */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">

//             {collections.map((collection, index) => (

//               <motion.button
//                 key={collection.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.08 }}
//                 onClick={() => setSelectedCollection(collection.id)}
//                 className={`group relative overflow-hidden rounded-xl aspect-[4/5] text-left transition-all duration-300
//                 ${
//                   selectedCollection === collection.id
//                     ? "ring-2 ring-accent"
//                     : ""
//                 }`}
//               >

//                 <img
//                   src={collection.image}
//                   alt={collection.name}
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//                 <div className="absolute bottom-0 left-0 right-0 p-5">

//                   <h3 className="font-display text-xl text-white mb-1">
//                     {collection.name}
//                   </h3>

//                   <p className="text-white/80 text-sm">
//                     {collection.description}
//                   </p>

//                 </div>

//               </motion.button>

//             ))}

//           </div>

//           {/* ================= Heading ================= */}

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-8"
//           >
//             <h2 className="font-display text-3xl text-foreground">

//               {
//                 collections.find(
//                   c => c.id === selectedCollection
//                 )?.name
//               }

//             </h2>

//             <p className="text-muted-foreground mt-2">

//               Showing {filteredProducts.length} Products

//             </p>

//           </motion.div>

//           {/* ================= Product Grid ================= */}

//           {filteredProducts.length === 0 ? (

//             <div className="text-center py-20">

//               <h3 className="text-2xl font-semibold mb-2">
//                 No Products Found
//               </h3>

//               <p className="text-muted-foreground">
//                 Products will appear here once available.
//               </p>

//             </div>

//           ) : (

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//               {filteredProducts.map((product, index) => {

//                 // Using slug for routing, falling back to id
//                 const routeParam = product.slug || product.id;
//                 const img = product.productImage;
//                 const price = product.totalAmount;

//                 return (

//                   <motion.div
//                     key={product.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.05 }}
//                     className="group bg-card rounded-xl overflow-hidden shadow-card hover-lift"
//                   >

//                     <Link
//                       to={`/product/${routeParam}`}
//                       className="block relative aspect-square overflow-hidden"
//                     >

//                       <img
//                         src={img}
//                         alt={product.productName}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       />

//                       <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleToggleWishlist(product);
//                           }}
//                           className={`w-10 h-10 rounded-full bg-white shadow flex items-center justify-center ${
//                             isInWishlist(product.id)
//                               ? "text-red-500"
//                               : "text-black"
//                           }`}
//                         >

//                           <Heart
//                             className={`w-5 h-5 ${
//                               isInWishlist(product.id)
//                                 ? "fill-current"
//                                 : ""
//                             }`}
//                           />

//                         </button>

//                         <Link
//                           to={`/product/${routeParam}`}
//                           className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </Link>

//                       </div>

//                     </Link>

//                     <div className="p-5">

//                       <Link to={`/product/${routeParam}`}>

//                         <h3 className="font-display text-xl hover:text-accent transition-colors line-clamp-2">

//                           {product.productName}

//                         </h3>

//                       </Link>

//                       <p className="text-accent text-xl font-semibold mt-3">

//                         {formatPrice(price)}

//                       </p>

//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="w-full mt-5"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         <ShoppingCart className="w-4 h-4 mr-2" />
//                         Add to Cart
//                       </Button>

//                     </div>

//                   </motion.div>

//                 );

//               })}

//             </div>

//           )}

//         </div>

//       </div>

//     </Layout>

//   );

// };

// export default Collections;













// import { useState } from "react";
// import { Layout } from "@/components/layout/Layout";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Heart, ShoppingCart, Eye } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useCart } from "@/contexts/CartContext";
// import { useWishlist } from "@/contexts/WishlistContext";

// import bangles from "@/assets/products/bangles/Bangle1-2.jpeg";
// import earrings from "@/assets/products/earrings/earrings2-2.jpeg";
// import chain from "@/assets/products/chains/chain2-1.jpeg";
// import bracelet from "@/assets/products/bracelets/bracelet1-1.jpeg";
// import pendants from "@/assets/products/pendants/statue1-1.jpeg";
// import waistbelt from "@/assets/products/waistbelt/waistbelt1-1.jpeg";
// import necklaces from "@/assets/products/necklace/necklace1-1.jpeg";

// import { products, type Product } from "@/data/products";

// const collections = [
//   { id: "all", name: "All Collections", image: bangles, description: "Explore our entire range of handcrafted jewellery, from elegant necklaces to stylish bracelets." },
//   { id: "tops", name: "Tops", image: earrings, description: "Discover our latest tops collection, perfect for any occasion." },
//   { id: "bangles", name: "Bangles", image: bangles, description: "Adorn yourself with our beautiful bangles collection." },
//   { id: "earrings", name: "Earrings", image: earrings, description: "Elevate your look with our stunning earrings collection." },
//   { id: "necklaces", name: "Necklaces", image: necklaces, description: "Make a statement with our elegant necklaces collection." },
//   { id: "bracelets", name: "Bracelets", image: bracelet, description: "Complete your style with our fashionable bracelets collection." },
//   { id: "chains", name: "Chains", image: chain, description: "Enhance your look with our beautiful chains collection." },
//   { id: "pendants", name: "Pendants", image: pendants, description: "Add a touch of elegance with our stunning pendants collection." },
//   { id: "waistbelt", name: "Waist Belt", image: waistbelt, description: "Define your silhouette with our fashionable waist belts collection." },
// ];

// const formatPrice = (price: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(price);
// };

// const Collections = () => {
//   const [selectedCollection, setSelectedCollection] =
//     useState("all");

//   const { addItem } = useCart();

//   const {
//     addItem: addToWishlist,
//     isInWishlist,
//     removeItem: removeFromWishlist,
//   } = useWishlist();

//   const handleAddToCart = (product: Product) => {
//     addItem({
//       id: product.id,
//       name: product.title,
//       price: product.price,
//       image: product.image,
//     });
//   };

//   const handleToggleWishlist = (product: Product) => {
//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.title,
//         price: product.price,
//         image: product.image,
//         category: product.category,
//       });
//     }
//   };


//   const filteredProducts =
//   selectedCollection === "all"
//     ? products
//     : products.filter(
//         (product) => product.category === selectedCollection
//       );

      
//   // const filteredProducts =
//   //   selectedCollection === "all"
//   //     ? products
//   //     : products.filter(
//   //         (product) =>
//   //           product.category.toLowerCase() ===
//   //           selectedCollection.toLowerCase()
//   //       );

//   return (
//     <Layout noPadding>
//             {/* ================= Page Header ================= */}
//       <section className="pt-32 pb-12 bg-gradient-hero">
//         <div className="container mx-auto px-4 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center"
//           >
//             <h1 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4">
//               Our Collections
//             </h1>

//             <p className="text-primary-foreground/80 max-w-2xl mx-auto">
//               Explore our handcrafted jewellery collections designed for
//               timeless elegance.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       <div className="py-12 bg-background min-h-screen">
//         <div className="container mx-auto px-4 lg:px-8">

//           {/* ================= Collection Cards ================= */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">

//             {collections.map((collection, index) => (

//               <motion.button
//                 key={collection.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.08 }}

//                 onClick={() => setSelectedCollection(collection.id)}

//                 className={`group relative overflow-hidden rounded-xl aspect-[4/5] text-left transition-all duration-300
//                 ${
//                   selectedCollection === collection.id
//                     ? "ring-2 ring-accent"
//                     : ""
//                 }`}
//               >

//                 <img
//                   src={collection.image}
//                   alt={collection.name}
//                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//                 <div className="absolute bottom-0 left-0 right-0 p-5">

//                   <h3 className="font-display text-xl text-white mb-1">
//                     {collection.name}
//                   </h3>

//                   <p className="text-white/80 text-sm">
//                     {collection.description}
//                   </p>

//                 </div>

//               </motion.button>

//             ))}

//           </div>

//           {/* ================= Heading ================= */}

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="mb-8"
//           >
//             <h2 className="font-display text-3xl text-foreground">

//               {
//                 collections.find(
//                   c => c.id === selectedCollection
//                 )?.name
//               }

//             </h2>

//             <p className="text-muted-foreground mt-2">

//               Showing {filteredProducts.length} Products

//             </p>

//           </motion.div>

//           {/* ================= Product Grid ================= */}

//           {filteredProducts.length === 0 ? (

//             <div className="text-center py-20">

//               <h3 className="text-2xl font-semibold mb-2">
//                 No Products Found
//               </h3>

//               <p className="text-muted-foreground">
//                 Products will appear here once available.
//               </p>

//             </div>

//           ) : (

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//               {filteredProducts.map((product, index) => {

//                 const id = product.id;
//                 const img = product.image;
//                 const price = product.price;

//                 return (

//                   <motion.div
//                     key={product.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.05 }}
//                     className="group bg-card rounded-xl overflow-hidden shadow-card hover-lift"
//                   >

//                     <Link
//                       to={`/product/${id}`}
//                       className="block relative aspect-square overflow-hidden"
//                     >

//                       <img
//                         src={img}
//                         alt={product.title}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       />

//                       <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

//                         <button
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleToggleWishlist(product);
//                           }}
//                           className={`w-10 h-10 rounded-full bg-white shadow flex items-center justify-center ${
//                             isInWishlist(product.id)
//                               ? "text-red-500"
//                               : "text-black"
//                           }`}
//                         >

//                           <Heart
//                             className={`w-5 h-5 ${
//                               isInWishlist(product.id)
//                                 ? "fill-current"
//                                 : ""
//                             }`}
//                           />

//                         </button>

//                         <Link
//                           to={`/product/${id}`}
//                           className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </Link>

//                       </div>

//                     </Link>

//                     <div className="p-5">

//                       <Link to={`/product/${id}`}>

//                         <h3 className="font-display text-xl hover:text-accent transition-colors line-clamp-2">

//                           {product.title}

//                         </h3>

//                       </Link>

//                       <p className="text-accent text-xl font-semibold mt-3">

//                         {formatPrice(price)}

//                       </p>

//                                             <Button
//                         variant="outline"
//                         size="sm"
//                         className="w-full mt-5"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         <ShoppingCart className="w-4 h-4 mr-2" />
//                         Add to Cart
//                       </Button>

//                     </div>

//                   </motion.div>

//                 );

//               })}

//             </div>

//           )}

//         </div>

//       </div>

//     </Layout>

//   );

// };

// export default Collections;