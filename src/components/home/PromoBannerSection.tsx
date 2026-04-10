import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchShopifyProducts, type ShopifyProduct } from "@/lib/shopify";

export const PromoBannerSection = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchShopifyProducts(12).then(setProducts);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="pb-16">
      <div className="flex flex-col lg:flex-row min-h-[340px]">
        {/* Left: Promo banner */}
        <div className="lg:w-[45%] bg-gradient-to-br from-accent/20 via-accent/10 to-gold-light/20 relative flex items-center justify-center p-8 lg:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative z-10 text-center">
            <h3 className="font-display text-sm tracking-widest text-accent mb-2 uppercase">Nirva 9KT Gold</h3>
            <p className="font-display text-2xl lg:text-3xl text-foreground mb-3 leading-tight">
              Love that shines
              <br />
              in 9 Karat Gold!
            </p>
            <div className="inline-block border-2 border-foreground/20 rounded-lg px-6 py-4 my-4 bg-card/60 backdrop-blur-sm">
              <span className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                FLAT 20<span className="text-lg align-top">%</span>
              </span>
              <span className="text-accent text-xs font-semibold ml-1">OFF*</span>
              <p className="text-xs text-muted-foreground mt-1">on all 9KT Gold Designs</p>
            </div>
            <div className="mt-4">
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold text-sm tracking-wider uppercase rounded hover:bg-primary/90 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Product carousel */}
        <div className="lg:w-[55%] bg-secondary/30 flex flex-col justify-center py-6 px-4 lg:px-8 relative">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product) => {
              const img = product.node.images.edges[0]?.node?.url;
              const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
              const originalPrice = Math.round(price * 1.2);
              const id = product.node.id.split("/").pop();
              return (
                <Link key={product.node.id} to={`/product/${id}`} className="shrink-0 w-[200px] group">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card rounded-lg border border-border/50 overflow-hidden shadow-card"
                  >
                    <div className="aspect-square bg-secondary/20 flex items-center justify-center p-3">
                      {img ? (
                        <img
                          src={img}
                          alt={product.node.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted rounded" />
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-bold text-foreground">₹{price.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{product.node.title}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 text-right">
            <Link
              to="/shop"
              className="inline-block px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-xs tracking-wider uppercase rounded hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
