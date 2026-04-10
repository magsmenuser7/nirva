import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gridLeft from "@/assets/grid-image-left.jpg";
import gridRightTop from "@/assets/grid-image-right-top.jpg";
import gridRightBottom from "@/assets/grid-image-right-bottom.jpg";
import leftimage from "@/assets/banners/SM-_-TIMELINE-2_04.jpg"
import rightTopImage from "@/assets/banners/_RAJ3864.jpeg"
import rightBottomImage from "@/assets/products/necklace/necklace1-1.jpeg"

export const ImageGridSection = () => {
  return (
   <section className="py-6 bg-background">
  <div className="container mx-auto px-4 lg:px-8">
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* LEFT BIG CARD */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
        <img
          src={leftimage}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-8 left-8">
          <p className="text-yellow-400 tracking-[0.3em] text-xs">NEW ARRIVAL</p>
          {/* <h2 className="text-white text-3xl font-semibold mt-2">Jewellery</h2> */}
          <p className="text-white/70 text-sm mt-2">
            Discover our latest collection of handcrafted luxury pieces.
          </p>
          <p className="text-yellow-400 mt-4 text-sm flex items-center gap-2">
            Shop Now →
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="grid grid-rows-2 gap-[15px]">

        {/* TOP */}
        <div className="relative rounded-2xl overflow-hidden aspect-[15/9] group">
          <img
            src={rightTopImage}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-6 left-6">
            <p className="text-yellow-400 text-xs tracking-[0.3em]">BESTSELLER</p>
            <p className="text-yellow-400 text-sm mt-2">Explore →</p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="relative rounded-2xl overflow-hidden aspect-[15/9] group">
          <img
            src={rightBottomImage}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute bottom-6 left-6">
            <p className="text-yellow-400 text-xs tracking-[0.3em]">HANDCRAFTED</p>
            <p className="text-yellow-400 text-sm mt-2">Explore →</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>
  );
};
