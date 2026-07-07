import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// 1. Import your two landscape HD videos
import videoOne from '@/assets/products/videos/Emerald_earrings_catching_light_202606291514.mp4'; 
import videoTwo from '@/assets/products/videos/Jewelry_on_velvet_stand_202606301857.mp4';

const collections = ['Necklaces', 'Rings', 'Bracelets', 'Earrings', 'Celebrity Picks'];

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videos = [videoOne, videoTwo];

  // Logic to switch videos infinitely
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="relative w-full h-[70vh] lg:h-[95vh] overflow-hidden">
      {/* 
        Video: 
        key={videos[currentVideoIndex]} ensures the component updates 
        when the index changes.
        onEnded triggers the switch to the next video.
      */}
      <video
        key={videos[currentVideoIndex]}
        ref={videoRef}
        src={videos[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4 block"
        >
          Exclusive Collections
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground max-w-3xl leading-tight mb-4"
        >
          Celebrity Inspired Elegance
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-8"
        >
          Handcrafted 9K gold pieces worn by icons. Discover the collection that defines luxury.
        </motion.p>

        {/* Collection Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {collections.map((col) => (
            <Link
              key={col}
              to="/shop"
              className="px-4 py-2 border border-accent/50 rounded-full text-primary-foreground text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              {col}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button variant="gold" size="lg" asChild>
            <Link to="/shop">Shop the Collection</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};






// import { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import heroVideo from '@/assets/products/videos/Emerald_earrings_catching_light_202606291514.mp4';

// const collections = ['Necklaces', 'Rings', 'Bracelets', 'Earrings', 'Celebrity Picks'];

// export const VideoSection = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isMuted, setIsMuted] = useState(true);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => {
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   return (
//     <section className="relative w-full h-[70vh] lg:h-[80vh] overflow-hidden">
//       {/* Video */}
//       <video
//         ref={videoRef}
//         src={heroVideo}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />

//       {/* Content */}
//       <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
//         <motion.span
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4"
//         >
//           Exclusive Collections
//         </motion.span>
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.15 }}
//           className="font-display text-3xl md:text-5xl lg:text-6xl text-primary-foreground max-w-3xl leading-tight mb-4"
//         >
//           Celebrity Inspired Elegance
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="text-primary-foreground/80 text-lg md:text-xl max-w-xl mb-8"
//         >
//           Handcrafted 9K gold pieces worn by icons. Discover the collection that defines luxury.
//         </motion.p>

//         {/* Collection Tags */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.45 }}
//           className="flex flex-wrap justify-center gap-3 mb-8"
//         >
//           {collections.map((col) => (
//             <Link
//               key={col}
//               to="/shop"
//               className="px-4 py-2 border border-accent/50 rounded-full text-primary-foreground text-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
//             >
//               {col}
//             </Link>
//           ))}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.6 }}
//         >
//           <Button variant="gold" size="lg" asChild>
//             <Link to="/shop">Shop the Collection</Link>
//           </Button>
//         </motion.div>
//       </div>
//       <p></p>
//     </section>
//   );
// };
