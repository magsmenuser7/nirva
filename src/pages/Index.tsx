import { Layout } from '@/components/layout/Layout';
import { HeroSlider } from '@/components/home/HeroSlider';
import { ImageGridSection } from '@/components/home/ImageGridSection';
import { VideoSection } from '@/components/home/VideoSection';
import { PromoBannerSection } from '@/components/home/PromoBannerSection';
import { ProductCarousel } from '@/components/home/ProductCarousel';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { TrustSection } from '@/components/home/TrustSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { AuthModal } from "@/components/auth/AuthModal";
import { useState, useEffect } from 'react';
import Banner1 from '@/components/home/Banner1';
import Banner2 from '@/components/home/Banner2';
import Banner3 from '@/components/home/Banner3';

const Index = () => {

  const [popupOpen, setPopupOpen] = useState(true);



  return (
    <>
      <AuthModal
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />

      <Layout noPadding>
        <HeroSlider />
        <div className="py-8 lg:py-12" />
        <ImageGridSection />
        <div className="py-4 lg:py-6" />
        <PromoBannerSection />
        <VideoSection />
        <ProductCarousel />
          <Banner1 />
        <CategoriesSection />
          <Banner2 />
        <FeaturedProducts />
            {/* <Banner3 /> */}
        <TrustSection />
        <NewsletterSection />
      </Layout>
    </>
  );
};

export default Index;