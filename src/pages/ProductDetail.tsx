import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Truck, Shield, RefreshCw, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import necklacesImage from '@/assets/category-necklaces.jpg';


import { useEffect} from 'react';
import { fetchShopifyProducts, type ShopifyProduct } from '@/lib/shopify';



// Mock product data - will be replaced with Shopify data
// const productData = {
//   id: '1',
//   name: 'Royal Heritage Necklace',
//   price: 45999,
//   originalPrice: 52999,
//   description: 'This exquisite 9K gold necklace is a masterpiece of traditional craftsmanship, featuring intricate filigree work and delicate detailing. Each piece is handcrafted by skilled artisans, ensuring that no two pieces are exactly alike.',
//   images: [necklacesImage, necklacesImage, necklacesImage],
//   category: 'Necklaces',
//   material: '9K Gold',
//   weight: '12.5 grams',
//   inStock: true,
//   features: [
//     'BIS Hallmarked 9K Gold',
//     'Handcrafted by skilled artisans',
//     'Comes with certificate of authenticity',
//     'Elegant gift packaging included',
//   ],
// };


const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  

  const handleAddToCart = () => {
  if (!variant) return;
  addItem({
    id: variant.id,
    name: product.node.title,
    price: parseFloat(variant.price.amount),
    image: product.node.images.edges[0]?.node.url || '',
  });
};

const [product, setProduct] = useState<ShopifyProduct | null>(null);



useEffect(() => {
  fetchShopifyProducts(50).then((products) => {
    const found = products.find((p) =>
      p.node.id.includes(id || '')
    );
    setProduct(found || null);
  });
}, [id]);

// const variant = product.node.variants.edges[0]?.node;





if (!product) {
  return <div className="pt-32 text-center">Loading...</div>;
}

const variant = product.node.variants.edges[0]?.node;
const price = variant ? parseFloat(variant.price.amount) : 0;


const images = product.node.images.edges.map(img => img.node.url);
  return (

    
    <Layout>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/shop" className="text-muted-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{product?.node.title}</span>
          </nav>
        </div>
      </div>


      {/* Product Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-landscape rounded-lg overflow-hidden bg-card shadow-elegant mb-4">
               
                 <img src={images[selectedImage]}  alt={`Product Image ${selectedImage + 1}`} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
               
              </span>
              <h1 className="font-display text-3xl md:text-4xl text-foreground mt-2 mb-4">
                {product?.node.title}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
  <span className="text-accent font-display text-3xl">
    {formatPrice(price)}
  </span>
  <span className="text-sm text-muted-foreground">Inclusive of all taxes</span>
</div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.node.description}
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary/50 rounded-lg">
                <div>
                  <span className="text-muted-foreground text-sm">Material</span>
                  {/* <p className="font-medium">{productData.material}</p> */}
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Weight</span>
                  {/* <p className="font-medium">{productData.weight}</p> */}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-foreground font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button variant="gold" size="xl" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="xl">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <span className="text-xs text-muted-foreground">BIS Hallmarked</span>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <span className="text-xs text-muted-foreground">Easy Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
