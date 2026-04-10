import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import { Dialog, DialogContent } from '@/components/ui/dialog';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { motion, AnimatePresence } from 'framer-motion';
 import { X, CreditCard, Smartphone, ChevronRight, CheckCircle2, Shield, Building2, Wallet } from 'lucide-react';
 import { useCart } from '@/contexts/CartContext';
 import { useAuth } from '@/contexts/AuthContext';
 import { useToast } from '@/hooks/use-toast';
 import { supabase } from '@/integrations/supabase/client';
 
 type PaymentStep = 'details' | 'otp' | 'processing' | 'success';
 type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet';
 
 interface PaymentModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSuccess: () => void;
   billingAddress?: {
     fullName: string;
     phone: string;
     email: string;
     address: string;
     city: string;
     state: string;
     pincode: string;
   };
   shippingAddress?: {
     fullName: string;
     phone: string;
     address: string;
     city: string;
     state: string;
     pincode: string;
   };
 }
 
 const formatPrice = (price: number) => {
   return new Intl.NumberFormat('en-IN', {
     style: 'currency',
     currency: 'INR',
     maximumFractionDigits: 0,
   }).format(price);
 };
 
 const banks = [
   { id: 'sbi', name: 'State Bank of India' },
   { id: 'hdfc', name: 'HDFC Bank' },
   { id: 'icici', name: 'ICICI Bank' },
   { id: 'axis', name: 'Axis Bank' },
   { id: 'kotak', name: 'Kotak Mahindra Bank' },
   { id: 'pnb', name: 'Punjab National Bank' },
 ];
 
 const wallets = [
   { id: 'paytm', name: 'Paytm Wallet' },
   { id: 'phonepe', name: 'PhonePe Wallet' },
   { id: 'amazon', name: 'Amazon Pay' },
   { id: 'mobikwik', name: 'MobiKwik' },
 ];
 
 export const PaymentModal = ({ isOpen, onClose, onSuccess, billingAddress, shippingAddress }: PaymentModalProps) => {
   const [step, setStep] = useState<PaymentStep>('details');
   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
   const [phone, setPhone] = useState('');
   const [otp, setOtp] = useState('');
   const [upiId, setUpiId] = useState('');
   const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
   const [selectedBank, setSelectedBank] = useState('');
   const [selectedWallet, setSelectedWallet] = useState('');
   const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
   const { total, items, clearCart } = useCart();
   // OTP functions removed from auth - using simple mock for checkout
   const sendOtp = async (phone: string) => { console.log('OTP sent to:', phone); return true; };
   const verifyOtp = async (phone: string, otp: string) => otp.length === 6;
   const { toast } = useToast();
  const navigate = useNavigate();
 
   const taxAmount = total * 0.03;
   const shippingCost = total > 5000 ? 0 : 99;
   const grandTotal = total + taxAmount + shippingCost;
 
   const handleSendOtp = async () => {
     if (!phone || phone.length < 10) {
       toast({ title: 'Invalid phone', description: 'Please enter a valid phone number.', variant: 'destructive' });
       return;
     }
    
    // Validate payment details
    if (paymentMethod === 'upi' && !upiId) {
      toast({ title: 'UPI ID required', description: 'Please enter your UPI ID.', variant: 'destructive' });
      return;
    }
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      toast({ title: 'Card details required', description: 'Please fill all card details.', variant: 'destructive' });
      return;
    }
    if (paymentMethod === 'netbanking' && !selectedBank) {
      toast({ title: 'Bank required', description: 'Please select your bank.', variant: 'destructive' });
      return;
    }
    if (paymentMethod === 'wallet' && !selectedWallet) {
      toast({ title: 'Wallet required', description: 'Please select your wallet.', variant: 'destructive' });
      return;
    }
    
     setIsLoading(true);
     const success = await sendOtp(phone);
     setIsLoading(false);
     if (success) {
       toast({ title: 'OTP Sent', description: 'Check your phone for the verification code.' });
       setStep('otp');
     }
   };
 
   const handleVerifyOtp = async () => {
     setIsLoading(true);
     const success = await verifyOtp(phone, otp);
     if (success) {
       setStep('processing');
      const newOrderId = `NIRVA-${Date.now().toString(36).toUpperCase()}`;
      setOrderId(newOrderId);
       
       // Save order to database
       try {
         const orderData = {
           order_number: newOrderId,
           customer_name: billingAddress?.fullName || 'Guest',
           customer_email: billingAddress?.email || null,
           customer_phone: billingAddress?.phone || phone,
           billing_address: billingAddress || {},
           shipping_address: shippingAddress || billingAddress || {},
           items: items.map(item => ({
             id: item.id,
             name: item.name,
             price: item.price,
             quantity: item.quantity,
             image: item.image,
             variant: item.variant
           })),
           subtotal: total,
           tax_amount: taxAmount,
           shipping_cost: shippingCost,
           total_amount: grandTotal,
           payment_method: paymentMethod,
           payment_status: 'completed',
           order_status: 'processing'
         };
 
         const { data: order, error } = await supabase
           .from('orders')
           .insert([orderData])
           .select()
           .single();
 
         if (error) throw error;
 
         // Add initial tracking entry
         if (order) {
           await supabase
             .from('order_tracking')
             .insert([
               { order_id: order.id, status: 'Order Placed', description: 'Your order has been placed successfully' },
               { order_id: order.id, status: 'Payment Confirmed', description: 'Payment verified successfully' }
             ]);
         }
 
         setStep('success');
         clearCart();
        toast({ 
          title: 'Order Placed Successfully!', 
          description: `Your order ${newOrderId} has been confirmed.` 
        });
       } catch (error) {
         console.error('Error saving order:', error);
         setStep('success');
         clearCart();
         toast({ 
           title: 'Order Placed!', 
           description: `Your order ${newOrderId} has been confirmed.` 
         });
       }
     } else {
       toast({ title: 'Invalid OTP', description: 'Please enter the correct OTP.', variant: 'destructive' });
     }
     setIsLoading(false);
   };
 
  const handleViewOrders = () => {
    onClose();
    navigate('/orders');
  };

   const handleClose = () => {
     if (step === 'success') {
       onSuccess();
     }
     onClose();
     // Reset state after animation
     setTimeout(() => {
       setStep('details');
       setOtp('');
       setPhone('');
      setUpiId('');
      setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
      setOrderId('');
      setSelectedBank('');
      setSelectedWallet('');
     }, 300);
   };
 
   return (
     <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-[712px] p-0 overflow-hidden bg-card">
         <button
           onClick={handleClose}
           className="absolute right-4 top-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
         >
           <X className="w-4 h-4" />
         </button>
 
         <div className="p-6">
           <AnimatePresence mode="wait">
             {step === 'details' && (
               <motion.div
                 key="details"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
               >
                 <h2 className="font-display text-2xl text-foreground mb-2">Payment Details</h2>
                 <p className="text-muted-foreground mb-6">Complete your purchase securely</p>
 
                 {/* Order Summary */}
                 <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                   <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
                   <div className="space-y-2 text-sm">
                     {items.slice(0, 3).map((item) => (
                       <div key={item.id} className="flex justify-between">
                         <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                         <span>{formatPrice(item.price * item.quantity)}</span>
                       </div>
                     ))}
                     {items.length > 3 && (
                       <p className="text-muted-foreground">+{items.length - 3} more items</p>
                     )}
                     <div className="border-t border-border pt-2 mt-2">
                       <div className="flex justify-between">
                         <span className="text-muted-foreground">Subtotal</span>
                         <span>{formatPrice(total)}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-muted-foreground">GST (3%)</span>
                         <span>{formatPrice(taxAmount)}</span>
                       </div>
                       <div className="flex justify-between font-semibold text-accent mt-2">
                         <span>Total</span>
                         <span>{formatPrice(grandTotal)}</span>
                       </div>
                     </div>
                   </div>
                 </div>
 
                 {/* Payment Method Selection */}
                 <div className="space-y-3 mb-6">
                   <Label>Select Payment Method</Label>
                   <div className="grid grid-cols-2 gap-2">
                     <button
                       type="button"
                       onClick={() => setPaymentMethod('upi')}
                       className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                         paymentMethod === 'upi'
                           ? 'border-accent bg-accent/10'
                           : 'border-border hover:border-accent/50'
                       }`}
                     >
                       <Smartphone className="w-5 h-5 text-accent" />
                       <span className="font-medium">UPI</span>
                     </button>
                     <button
                       type="button"
                       onClick={() => setPaymentMethod('card')}
                       className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                         paymentMethod === 'card'
                           ? 'border-accent bg-accent/10'
                           : 'border-border hover:border-accent/50'
                       }`}
                     >
                       <CreditCard className="w-5 h-5 text-accent" />
                       <span className="font-medium">Credit/Debit</span>
                     </button>
                     <button
                       type="button"
                       onClick={() => setPaymentMethod('netbanking')}
                       className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                         paymentMethod === 'netbanking'
                           ? 'border-accent bg-accent/10'
                           : 'border-border hover:border-accent/50'
                       }`}
                     >
                       <Building2 className="w-5 h-5 text-accent" />
                       <span className="font-medium">Net Banking</span>
                     </button>
                     <button
                       type="button"
                       onClick={() => setPaymentMethod('wallet')}
                       className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-colors ${
                         paymentMethod === 'wallet'
                           ? 'border-accent bg-accent/10'
                           : 'border-border hover:border-accent/50'
                       }`}
                     >
                       <Wallet className="w-5 h-5 text-accent" />
                       <span className="font-medium">Wallet</span>
                     </button>
                   </div>
                 </div>
 
                 {/* Payment Details Form */}
                 {paymentMethod === 'upi' ? (
                   <div className="space-y-4">
                     <div>
                       <Label htmlFor="upi-id">UPI ID</Label>
                       <Input
                         id="upi-id"
                         type="text"
                         placeholder="yourname@upi"
                         value={upiId}
                         onChange={(e) => setUpiId(e.target.value)}
                       />
                     </div>
                     <div>
                       <Label htmlFor="phone">Mobile Number (for OTP verification)</Label>
                       <Input
                         id="phone"
                         type="tel"
                         placeholder="+91 9876543210"
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                       />
                     </div>
                   </div>
                 ) : paymentMethod === 'card' ? (
                   <div className="space-y-4">
                     <div>
                       <Label htmlFor="card-name">Card Holder Name</Label>
                       <Input
                         id="card-name"
                         type="text"
                         placeholder="John Doe"
                         value={cardDetails.name}
                         onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                       />
                     </div>
                     <div>
                       <Label htmlFor="card-number">Card Number</Label>
                       <Input
                         id="card-number"
                         type="text"
                         placeholder="1234 5678 9012 3456"
                         value={cardDetails.number}
                         onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <Label htmlFor="card-expiry">Expiry</Label>
                         <Input
                           id="card-expiry"
                           type="text"
                           placeholder="MM/YY"
                           value={cardDetails.expiry}
                           onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                         />
                       </div>
                       <div>
                         <Label htmlFor="card-cvv">CVV</Label>
                         <Input
                           id="card-cvv"
                           type="text"
                           placeholder="123"
                           value={cardDetails.cvv}
                           onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                         />
                       </div>
                     </div>
                     <div>
                       <Label htmlFor="phone-card">Mobile Number (for OTP verification)</Label>
                       <Input
                         id="phone-card"
                         type="tel"
                         placeholder="+91 9876543210"
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                       />
                     </div>
                   </div>
                 ) : paymentMethod === 'netbanking' ? (
                   <div className="space-y-4">
                     <div>
                       <Label>Select Your Bank</Label>
                       <div className="grid grid-cols-2 gap-2 mt-2">
                         {banks.map((bank) => (
                           <button
                             key={bank.id}
                             type="button"
                             onClick={() => setSelectedBank(bank.id)}
                             className={`p-3 text-left rounded-lg border-2 transition-colors text-sm ${
                               selectedBank === bank.id
                                 ? 'border-accent bg-accent/10'
                                 : 'border-border hover:border-accent/50'
                             }`}
                           >
                             {bank.name}
                           </button>
                         ))}
                       </div>
                     </div>
                     <div>
                       <Label htmlFor="phone-netbanking">Mobile Number (for OTP verification)</Label>
                       <Input
                         id="phone-netbanking"
                         type="tel"
                         placeholder="+91 9876543210"
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                       />
                     </div>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     <div>
                       <Label>Select Your Wallet</Label>
                       <div className="grid grid-cols-2 gap-2 mt-2">
                         {wallets.map((wallet) => (
                           <button
                             key={wallet.id}
                             type="button"
                             onClick={() => setSelectedWallet(wallet.id)}
                             className={`p-3 text-left rounded-lg border-2 transition-colors text-sm ${
                               selectedWallet === wallet.id
                                 ? 'border-accent bg-accent/10'
                                 : 'border-border hover:border-accent/50'
                             }`}
                           >
                             {wallet.name}
                           </button>
                         ))}
                       </div>
                     </div>
                     <div>
                       <Label htmlFor="phone-wallet">Mobile Number (for OTP verification)</Label>
                       <Input
                         id="phone-wallet"
                         type="tel"
                         placeholder="+91 9876543210"
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                       />
                     </div>
                   </div>
                 )}
 
                 <Button
                   variant="gold"
                   className="w-full mt-6"
                   onClick={handleSendOtp}
                   disabled={isLoading || !phone}
                 >
                   {isLoading ? 'Sending OTP...' : 'Verify & Pay'}
                   <ChevronRight className="w-4 h-4 ml-2" />
                 </Button>
 
                 <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                   <Shield className="w-4 h-4" />
                   <span>Secure payment with 256-bit encryption</span>
                 </div>
               </motion.div>
             )}
 
             {step === 'otp' && (
               <motion.div
                 key="otp"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="text-center"
               >
                 <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Smartphone className="w-8 h-8 text-accent" />
                 </div>
                 <h2 className="font-display text-2xl text-foreground mb-2">Verify OTP</h2>
                 <p className="text-muted-foreground mb-6">
                   Enter the 6-digit code sent to {phone}
                 </p>
 
                 <div className="max-w-xs mx-auto">
                   <Input
                     type="text"
                     placeholder="Enter 6-digit OTP"
                     value={otp}
                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                     className="text-center text-2xl tracking-widest"
                     maxLength={6}
                   />
 
                   <Button
                     variant="gold"
                     className="w-full mt-6"
                     onClick={handleVerifyOtp}
                     disabled={isLoading || otp.length !== 6}
                   >
                     {isLoading ? 'Verifying...' : 'Confirm Payment'}
                   </Button>
 
                   <button
                     type="button"
                     onClick={() => setStep('details')}
                     className="text-sm text-muted-foreground hover:text-foreground mt-4"
                   >
                     Change phone number
                   </button>
                 </div>
               </motion.div>
             )}
 
             {step === 'processing' && (
               <motion.div
                 key="processing"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="text-center py-12"
               >
                 <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                 <h2 className="font-display text-2xl text-foreground mb-2">Processing Payment</h2>
                 <p className="text-muted-foreground">Please wait while we confirm your payment...</p>
               </motion.div>
             )}
 
             {step === 'success' && (
               <motion.div
                 key="success"
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 className="text-center py-8"
               >
                 <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 className="w-10 h-10 text-accent" />
                 </div>
                 <h2 className="font-display text-2xl text-foreground mb-2">Payment Successful!</h2>
                 <p className="text-muted-foreground mb-6">
                   Thank you for your purchase. You'll receive an order confirmation shortly.
                 </p>
                 <p className="text-sm text-muted-foreground mb-6">
                    Order ID: <span className="font-mono font-semibold">{orderId}</span>
                 </p>
                  <div className="flex flex-col gap-3">
                    <Button variant="gold" onClick={handleViewOrders}>
                      View My Orders
                    </Button>
                    <Button variant="outline" onClick={handleClose}>
                      Continue Shopping
                    </Button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
       </DialogContent>
     </Dialog>
   );
 };