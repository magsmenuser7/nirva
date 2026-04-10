import { motion } from "framer-motion";
import model from "@/assets/banners/horozontal-banner.jpeg"

export default function Banner2() {
  return (
    <section className="relative w-full h-[700px] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={model}
          alt="Jewellery Collection"
          className="w-full h-full object-cover"
        />

        {/* Soft Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
<div className="relative z-10 h-full flex items-end justify-center text-center px-6 pb-12 md:pb-16">
  
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-4xl text-white"
  >
    {/* Heading */}
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide whitespace-nowrap">
      Adorn Yourself in Grace
    </h1>

    {/* Subtext */}
    <p className="mt-4 text-sm md:text-base text-gray-200">
      Delicate designs that elevate your everyday
      <br className="hidden md:block" />
      and special moments.
    </p>

    {/* Button */}
    <div className="mt-8">
      <button className="bg-white text-black px-8 py-3 text-sm tracking-widest rounded-md hover:bg-gray-200 transition duration-300">
        SHOP NOW
      </button>
    </div>
  </motion.div>

</div>
    </section>
  );
}