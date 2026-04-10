import { motion } from "framer-motion";
import model from "@/assets/banners/9fe57630-84aa-4fb0-bd19-48f27ba1ffcb.jpg"

export default function Banner3() {
  return (
    <section className="relative w-full h-[700px] overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={model}
          alt="Luxury Jewellery"
          className="w-full h-full object-cover"
        />

        {/* Left Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

     {/* Content */}
<div className="relative z-10 h-full flex items-end justify-start px-6 md:px-16 pb-12 md:pb-16">
  
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="max-w-xl text-white"
  >
    {/* Heading */}
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide whitespace-nowrap">
      Shine Beyond Ordinary
    </h1>

    {/* Subtext */}
    <p className="mt-4 text-sm md:text-base text-gray-300 max-w-md">
      Elevate your presence with pieces designed
      <br className="hidden md:block" />
      to captivate every gaze.
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