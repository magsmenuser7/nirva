 import { useState } from 'react';
 import { useToast } from '@/hooks/use-toast';
 import { Layout } from '@/components/layout/Layout';
 import { motion } from 'framer-motion';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { useCart } from '@/contexts/CartContext';
 import { PaymentModal } from '@/components/checkout/PaymentModal';
 import { useNavigate } from 'react-router-dom';
 import { ChevronLeft, MapPin, Truck } from 'lucide-react';
 import { Link } from 'react-router-dom';
 
 const formatPrice = (price: number) => {
   return new Intl.NumberFormat('en-IN', {
     style: 'currency',
     currency: 'INR',
     maximumFractionDigits: 0,
   }).format(price);
 };
 
 const Checkout = () => {
   const { items, total } = useCart();
   const navigate = useNavigate();
    const { toast } = useToast();
   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
   const [billingAddress, setBillingAddress] = useState({
     fullName: '',
     phone: '',
     email: '',
     address: '',
     city: '',
     state: '',
     pincode: '',
   });
   const [shippingAddress, setShippingAddress] = useState({
     fullName: '',
     phone: '',
     address: '',
     city: '',
     state: '',
     pincode: '',
   });
   const [sameAsBilling, setSameAsBilling] = useState(true);
 
   const taxAmount = total * 0.03;
   const shippingCost = total > 5000 ? 0 : 99;
   const grandTotal = total + taxAmount + shippingCost;
 
   const handleProceedToPayment = () => {
     // Validate form
     if (!billingAddress.fullName || !billingAddress.phone || !billingAddress.address) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in your name, phone, and address.',
        variant: 'destructive',
      });
       return;
     }
     setIsPaymentModalOpen(true);
   };
 
   const handlePaymentSuccess = () => {
     navigate('/');
   };
 
   if (items.length === 0) {
     return (
       <Layout>
         <div className="pt-24 pb-16 min-h-screen">
           <div className="container mx-auto px-4 lg:px-8 text-center">
             <h1 className="font-display text-3xl text-foreground mb-4">Your cart is empty</h1>
             <Button variant="gold" asChild>
               <Link to="/shop">Continue Shopping</Link>
             </Button>
           </div>
         </div>
       </Layout>
     );
   }
 
   return (
     <Layout>
       <div className="pt-24 pb-16 min-h-screen bg-secondary/30">
         <div className="container mx-auto px-4 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8"
           >
             <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
               <ChevronLeft className="w-4 h-4 mr-1" />
               Back to Cart
             </Link>
             <h1 className="font-display text-3xl md:text-4xl text-foreground">Checkout</h1>
           </motion.div>
 
           <div className="grid lg:grid-cols-3 gap-8">
             {/* Forms */}
             <div className="lg:col-span-2 space-y-6">
               {/* Billing Address */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-card rounded-lg p-6 shadow-card"
               >
                 <div className="flex items-center gap-3 mb-6">
                   <MapPin className="w-5 h-5 text-accent" />
                   <h2 className="font-display text-xl text-foreground">Billing Address</h2>
                 </div>
                 <div className="grid md:grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="billing-name">Full Name *</Label>
                     <Input
                       id="billing-name"
                       value={billingAddress.fullName}
                       onChange={(e) => setBillingAddress({ ...billingAddress, fullName: e.target.value })}
                       placeholder="John Doe"
                       required
                     />
                   </div>
                   <div>
                     <Label htmlFor="billing-phone">Phone *</Label>
                     <Input
                       id="billing-phone"
                       value={billingAddress.phone}
                       onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                       placeholder="+91 9876543210"
                       required
                     />
                   </div>
                   <div className="md:col-span-2">
                     <Label htmlFor="billing-email">Email</Label>
                     <Input
                       id="billing-email"
                       type="email"
                       value={billingAddress.email}
                       onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })}
                       placeholder="your@email.com"
                     />
                   </div>
                   <div className="md:col-span-2">
                     <Label htmlFor="billing-address">Address *</Label>
                     <Input
                       id="billing-address"
                       value={billingAddress.address}
                       onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                       placeholder="House No, Street, Area"
                       required
                     />
                   </div>
                   <div>
                     <Label htmlFor="billing-city">City</Label>
                     <Input
                       id="billing-city"
                       value={billingAddress.city}
                       onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                       placeholder="City"
                     />
                   </div>
                   <div>
                     <Label htmlFor="billing-state">State</Label>
                     <Input
                       id="billing-state"
                       value={billingAddress.state}
                       onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                       placeholder="State"
                     />
                   </div>
                   <div>
                     <Label htmlFor="billing-pincode">Pincode</Label>
                     <Input
                       id="billing-pincode"
                       value={billingAddress.pincode}
                       onChange={(e) => setBillingAddress({ ...billingAddress, pincode: e.target.value })}
                       placeholder="123456"
                     />
                   </div>
                 </div>
               </motion.div>
 
               {/* Shipping Address */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="bg-card rounded-lg p-6 shadow-card"
               >
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-3">
                     <Truck className="w-5 h-5 text-accent" />
                     <h2 className="font-display text-xl text-foreground">Shipping Address</h2>
                   </div>
                   <label className="flex items-center gap-2 cursor-pointer">
                     <input
                       type="checkbox"
                       checked={sameAsBilling}
                       onChange={(e) => setSameAsBilling(e.target.checked)}
                       className="w-4 h-4 accent-accent"
                     />
                     <span className="text-sm text-muted-foreground">Same as billing</span>
                   </label>
                 </div>
 
                 {!sameAsBilling && (
                   <div className="grid md:grid-cols-2 gap-4">
                     <div>
                       <Label htmlFor="shipping-name">Full Name</Label>
                       <Input
                         id="shipping-name"
                         value={shippingAddress.fullName}
                         onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                         placeholder="John Doe"
                       />
                     </div>
                     <div>
                       <Label htmlFor="shipping-phone">Phone</Label>
                       <Input
                         id="shipping-phone"
                         value={shippingAddress.phone}
                         onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                         placeholder="+91 9876543210"
                       />
                     </div>
                     <div className="md:col-span-2">
                       <Label htmlFor="shipping-address">Address</Label>
                       <Input
                         id="shipping-address"
                         value={shippingAddress.address}
                         onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                         placeholder="House No, Street, Area"
                       />
                     </div>
                     <div>
                       <Label htmlFor="shipping-city">City</Label>
                       <Input
                         id="shipping-city"
                         value={shippingAddress.city}
                         onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                         placeholder="City"
                       />
                     </div>
                     <div>
                       <Label htmlFor="shipping-state">State</Label>
                       <Input
                         id="shipping-state"
                         value={shippingAddress.state}
                         onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                         placeholder="State"
                       />
                     </div>
                     <div>
                       <Label htmlFor="shipping-pincode">Pincode</Label>
                       <Input
                         id="shipping-pincode"
                         value={shippingAddress.pincode}
                         onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                         placeholder="123456"
                       />
                     </div>
                   </div>
                 )}
 
                 {sameAsBilling && (
                   <p className="text-muted-foreground text-sm">
                     Your order will be shipped to the billing address provided above.
                   </p>
                 )}
               </motion.div>
             </div>
 
             {/* Order Summary */}
             <div>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="bg-card rounded-lg p-6 shadow-card sticky top-28"
               >
                 <h2 className="font-display text-xl text-foreground mb-6">Order Summary</h2>
 
                 <div className="space-y-4 mb-6">
                   {items.map((item) => (
                     <div key={item.id} className="flex gap-4">
                       <img
                         src={item.image}
                         alt={item.name}
                         className="w-16 h-16 object-cover rounded-lg"
                       />
                       <div className="flex-1">
                         <h3 className="text-sm font-medium text-foreground">{item.name}</h3>
                         <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                         <p className="text-sm font-semibold text-accent">
                           {formatPrice(item.price * item.quantity)}
                         </p>
                       </div>
                     </div>
                   ))}
                 </div>
 
                 <div className="border-t border-border pt-4 space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">Subtotal</span>
                     <span>{formatPrice(total)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">GST (3%)</span>
                     <span>{formatPrice(taxAmount)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-muted-foreground">Shipping</span>
                     <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                   </div>
                   <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                     <span>Total</span>
                     <span className="text-accent">{formatPrice(grandTotal)}</span>
                   </div>
                 </div>
 
                 <Button
                   variant="gold"
                   size="lg"
                   className="w-full mt-6"
                   onClick={handleProceedToPayment}
                 >
                   Proceed to Payment
                 </Button>
 
                 <p className="text-xs text-muted-foreground text-center mt-4">
                   By placing your order, you agree to our Terms & Conditions
                 </p>
               </motion.div>
             </div>
           </div>
         </div>
       </div>
 
       {/* Payment Modal */}
       <PaymentModal
         isOpen={isPaymentModalOpen}
         onClose={() => setIsPaymentModalOpen(false)}
         onSuccess={handlePaymentSuccess}
         billingAddress={billingAddress}
         shippingAddress={sameAsBilling ? billingAddress : shippingAddress}
       />
     </Layout>
   );
 };
 
 export default Checkout;