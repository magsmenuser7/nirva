import { motion } from "framer-motion";
import model from "@/assets/banners/9b58e3d1-a967-4045-a679-565e8e651cdf.jpg"

export default function Banner1() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={model}
          alt="Luxury Jewellery"
          className="w-full h-full object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
<div className="relative z-10 h-full flex items-end justify-end px-6 md:px-16 pb-12 md:pb-16">
  
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-xl text-right text-white space-y-4"
  >
    {/* Heading */}
    <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-wide">
      Less Noise. <br /> More Luxury.
    </h1>

    {/* Subtext */}
    <p className="text-sm md:text-base text-gray-300">
      Pieces that speak softly, yet leave a lasting impression.
    </p>

    {/* Button */}
    <div>
      
      <button className="bg-white text-black px-6 py-3 text-sm tracking-widest hover:bg-gray-200 transition-all duration-300 rounded" onClick={() => window.location.href = '/shop'}>
        SHOP NOW
      </button>
     
    </div>
  </motion.div>

</div>
    </section>
  );
}