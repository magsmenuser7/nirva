import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroVideo from '@/assets/jewelry-hero-video.mp4';

const collections = ['Necklaces', 'Rings', 'Bracelets', 'Earrings', 'Celebrity Picks'];

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
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
          className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4"
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

      {/* Video Controls */}
      {/* <div className="absolute bottom-6 right-6 z-20 flex gap-3">
        <button
          onClick={togglePlay}
          className="p-3 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors text-foreground"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-3 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors text-foreground"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div> */}
    </section>
  );
};
