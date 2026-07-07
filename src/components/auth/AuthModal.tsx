import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import emailjs from "@emailjs/browser";

import product1 from "@/assets/products/bangles/Bangle1-1.jpeg";
import product2 from "@/assets/products/chains/chain1-1.jpeg";
import product3 from "@/assets/products/necklace/necklace4-1.jpeg";
import product4 from "@/assets/products/pendants/hanuman-gada-divine-pendant-set-2.jpeg";

const productImages = [product1, product2, product3, product4];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  email: string;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  // States to track persistence
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("nirvaUser"));
  const [hasDismissed, setHasDismissed] = useState(() => !!localStorage.getItem("nirvaDismissed"));
  const [internalOpen, setInternalOpen] = useState(false);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % productImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length);

  // Sync open state
  useEffect(() => {
    if (!isLoggedIn && !hasDismissed && isOpen) {
      setInternalOpen(true);
    }
  }, [isOpen, isLoggedIn, hasDismissed]);

  // Timer: Only run if not logged in and not dismissed
  useEffect(() => {
    if (isLoggedIn || hasDismissed) return;

    const intervalId = setInterval(() => {
      setInternalOpen(true);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isLoggedIn, hasDismissed]);

  // Close handler: Sets dismissal flag permanently
  const handleClose = () => {
    setInternalOpen(false);
    setHasDismissed(true);
    localStorage.setItem("nirvaDismissed", "true");
    onClose();
  };

  const finalizeLogin = () => {
    localStorage.setItem("nirvaUser", JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone }));
    setIsLoggedIn(true);
    handleClose();
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // ... (Keep existing EmailJS logic)
    finalizeLogin(); 
    setIsLoading(false);
  };

  if (isLoggedIn || hasDismissed) return null;

  return (
    <AnimatePresence>
      {internalOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row min-h-[500px] z-10"
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-50 p-2 text-foreground/70 hover:bg-black/10 rounded-full transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* LEFT IMAGE SLIDER: Fixed background flash */}
            <div className="relative w-full md:w-1/2 bg-zinc-900 hidden md:block">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={productImages[currentSlide]}
                  alt="NIRVA Collection"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-10">
                <button onClick={prevSlide} className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={nextSlide} className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-white dark:bg-zinc-950">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="text-amber-600" /> Welcome to NIRVA
                </h2>
                <p className="text-sm text-muted-foreground mt-2">Enter your details to unlock exclusive offers.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <Input required placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <Input required type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <Input required type="tel" placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <Button type="submit" className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Enter NIRVA Collection"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};






// import { useState, useEffect, FormEvent } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import emailjs from "@emailjs/browser";

// import product1 from "@/assets/products/bangles/Bangle1-1.jpeg";
// import product2 from "@/assets/products/chains/chain1-1.jpeg";
// import product3 from "@/assets/products/necklace/necklace4-1.jpeg";
// import product4 from "@/assets/products/pendants/hanuman-gada-divine-pendant-set-2.jpeg";

// const productImages = [product1, product2, product3, product4];

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface UserData {
//   email: string;
// }

// export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
//   const { toast } = useToast();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string>('');
  
//   // 1. Check registration status immediately so registered users NEVER see the popup
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
//     if (typeof window !== 'undefined') {
//       return !!localStorage.getItem("nirvaUser");
//     }
//     return false;
//   });

//   // Internal state to manage the automatic popup
//   const [internalOpen, setInternalOpen] = useState<boolean>(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % productImages.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length);

//   // Sync external prop if needed
//   useEffect(() => {
//     if (!isLoggedIn && isOpen) {
//       setInternalOpen(true);
//     }
//   }, [isOpen, isLoggedIn]);

//   // 2. Auto-Popup Every 10 Seconds for unregistered users
//   useEffect(() => {
//     if (isLoggedIn) return; // Stop timer completely if registered

//     const intervalId = setInterval(() => {
//       const user = localStorage.getItem("nirvaUser");
//       if (!user) {
//         setInternalOpen(true);
//       } else {
//         setIsLoggedIn(true);
//       }
//     }, 10000); // 10 seconds

//     return () => clearInterval(intervalId);
//   }, [isLoggedIn]);

//   // Handle image slider timing
//   useEffect(() => {
//     if (!internalOpen) return;
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % productImages.length);
//     }, 3500);
//     return () => clearInterval(interval);
//   }, [internalOpen]);

//   // 3. Close Button Handler
//   const handleClose = () => {
//     setInternalOpen(false);
//     onClose();
//   };

//   // ================= USER STORAGE =================
//   const getUsers = (): UserData[] => {
//     return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//   };

//   const saveUser = (user: UserData): void => {
//     const users = getUsers();
//     users.push(user);
//     localStorage.setItem('registeredUsers', JSON.stringify(users));
//   };

//   const findUser = (email: string): UserData | undefined => {
//     return getUsers().find((u) => u.email === email);
//   };

//   // ================= FORM SUBMIT =================
//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     const email = formData.email.trim();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       setError("Please enter a valid email address.");
//       setIsLoading(false);
//       return;
//     }

//     const existingUser = findUser(email);

//     // ================= EXISTING USER =================
//     if (existingUser) {
//       toast({
//         title: "Welcome Back",
//         description: "Thank you for returning to NIRVA!"
//       });
//       finalizeLogin();
//       return;
//     }

//     // ================= NEW USER =================
//     try {
//       await emailjs.send(
//         "service_72ku4qo",
//         "template_3ht10ke",
//         {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone
//         },
//         "-sILhhMXgcwUxupso"
//       );

//       saveUser({ email });

//       toast({
//         title: "Welcome to NIRVA",
//         description: "Thank you for joining NIRVA! Explore our exquisite gold collections."
//       });

//       finalizeLogin();
//     } catch (err) {
//       console.error("EmailJS Error:", err);
//       setError("Failed to verify details. Please try again later.");
//       toast({
//         title: "Connection Error",
//         description: "Could not send verification email.",
//         variant: "destructive"
//       });
//       setIsLoading(false);
//     }
//   };

//   const finalizeLogin = () => {
//     localStorage.setItem(
//       "nirvaUser",
//       JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone
//       })
//     );
//     setIsLoggedIn(true);
//     handleClose();
//     setIsLoading(false);
//   };

//   // If the user is logged in, never render the modal
//   if (isLoggedIn) return null;

//   return (
//     <AnimatePresence>
//       {internalOpen && (
//         <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6">
//           {/* Dark Backdrop Overlay */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={handleClose}
//             className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//           />

//           {/* Modal Content Box */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ type: "spring", duration: 0.5 }}
//             className="relative w-full max-w-4xl bg-white dark:bg-zinc-950 overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row min-h-[500px] z-10"
//           >
//             {/* Close Button */}
//             <button
//               onClick={handleClose}
//               className="absolute right-4 top-4 z-50 rounded-full bg-black/10 dark:bg-white/10 p-2 text-foreground/70 hover:bg-black/20 hover:text-foreground transition-all focus:outline-none"
//             >
//               <X className="h-5 w-5" />
//               <span className="sr-only">Close</span>
//             </button>

//             {/* LEFT IMAGE SLIDER (Hidden on mobile, visible on medium+ screens) */}
//             <div className="relative w-full md:w-1/2 bg-zinc-100 dark:bg-zinc-900 hidden md:block">
//               <AnimatePresence>
//                 <motion.img
//                   key={currentSlide}
//                   src={productImages[currentSlide]}
//                   alt="NIRVA Jewelry Collection"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5 }}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </AnimatePresence>

//               {/* Gradient Overlay for text visibility */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//               {/* Slider Controls */}
//               <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-10">
//                 <button 
//                   onClick={prevSlide} 
//                   className="p-2 bg-white/20 hover:bg-white/40 transition-colors rounded-full backdrop-blur-md text-white"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//                 <button 
//                   onClick={nextSlide} 
//                   className="p-2 bg-white/20 hover:bg-white/40 transition-colors rounded-full backdrop-blur-md text-white"
//                 >
//                   <ChevronRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT FORM */}
//             <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-white dark:bg-zinc-950">
//               <div className="mb-8">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Sparkles className="w-5 h-5 text-amber-600" />
//                   <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
//                     Welcome to NIRVA
//                   </h2>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Enter your details to explore our premium 9K gold collections and unlock exclusive offers.
//                 </p>
//               </div>

//               {error && (
//                 <div className="mb-6 p-3 rounded-md bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
//                   {error}
//                 </div>
//               )}

//               <form onSubmit={handleLogin} className="space-y-5">
//                 <div className="space-y-1.5">
//                   <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
//                   <Input
//                     id="name"
//                     type="text"
//                     required
//                     placeholder="Enter your name"
//                     className="bg-secondary/50 border-border/50"
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     required
//                     placeholder="you@example.com"
//                     className="bg-secondary/50 border-border/50"
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   />
//                 </div>

//                 <div className="space-y-1.5">
//                   <Label htmlFor="phone" className="text-foreground/80">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     type="tel"
//                     required
//                     placeholder="Enter your mobile number"
//                     className="bg-secondary/50 border-border/50"
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   />
//                 </div>

//                 <Button 
//                   type="submit" 
//                   className="w-full h-12 text-base font-semibold bg-amber-600 hover:bg-amber-700 text-white mt-4 shadow-lg shadow-amber-600/20" 
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Verifying..." : "Enter NIRVA Collection"}
//                 </Button>
//               </form>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };










// import { useState, useEffect, FormEvent } from 'react';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import emailjs from "@emailjs/browser";

// import necklacesImage from '@/assets/category-necklaces.jpg';
// import ringsImage from '@/assets/category-rings.jpg';
// import braceletsImage from '@/assets/category-bracelets.jpg';
// import earringsImage from '@/assets/category-earrings.jpg';
// import product1 from "@/assets/products/bangles/Bangle1-1.jpeg";
// import product2 from "@/assets/products/chains/chain1-1.jpeg";
// import product3 from "@/assets/products/necklace/necklace4-1.jpeg";
// import product4 from "@/assets/products/pendants/statues3-1.jpeg";

// const productImages = [product1, product2, product3, product4];

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface UserData {
//   email: string;
// }

// export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {

//   const { toast } = useToast();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [successMessage, setSuccessMessage] = useState<string>('');

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });

//   const nextSlide = () =>
//     setCurrentSlide((prev) => (prev + 1) % productImages.length);

//   const prevSlide = () =>
//     setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length);

//   useEffect(() => {
//     if (!isOpen) return;

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % productImages.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isOpen]);

//   // ================= USER STORAGE =================

//   const getUsers = (): UserData[] => {
//     return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
//   };

//   const saveUser = (user: UserData): void => {
//     const users = getUsers();
//     users.push(user);
//     localStorage.setItem('registeredUsers', JSON.stringify(users));
//   };

//   const findUser = (email: string): UserData | undefined => {
//     return getUsers().find((u) => u.email === email);
//   };

//   // ================= FORM SUBMIT =================

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    
//     debugger;
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccessMessage('');

//     const email = formData.email.trim();

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!emailRegex.test(email)) {
//       setError("Please enter valid email");
//       setIsLoading(false);
//       return;
//     }

//     const existingUser = findUser(email);

//     // ================= EXISTING USER =================

//     if (existingUser) {

//       toast({
//         title: "Welcome Back",
//         description: "Thank you for returning to NIRVA!"
//       });

//       setSuccessMessage("Welcome to NIRVA!");
//       setTimeout(() => {
//   localStorage.setItem(
//     "nirvaUser",
//     JSON.stringify({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone
//     })
//   );

//   setIsLoggedIn(true);
//   onClose();
// }, 800);

//       setIsLoading(false);
//       return;
//     }

//     // ================= NEW USER =================

//     try {

//       await emailjs.send(
//         "service_72ku4qo",
//         "template_3ht10ke",
//         {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone
//         },
//         "-sILhhMXgcwUxupso"
//       );

//       saveUser({ email });

//       toast({
//         title: "Welcome to NIRVA",
//         description: "Thank you for joining NIRVA! Explore our exquisite gold collections."
//       });

//       setSuccessMessage("Welcome to NIRVA!");

//       setTimeout(() => {
//   localStorage.setItem(
//     "nirvaUser",
//     JSON.stringify({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone
//     })
//   );

//   setIsLoggedIn(true);
//   onClose();
// }, 1000);

//     } catch (err) {

//       console.error("EmailJS Error:", err);

//       setError("Failed to enter NIRVA. Please try again later.");

//       toast({
//         title: "Error",
//         description: "Email sending failed",
//         variant: "destructive"
//       });

//     } finally {

//       setIsLoading(false);

//     }

//   };

//   if (!isLoggedIn) {
//     return (

//       <Dialog open={isOpen}>

//         <DialogContent
//           className="max-w-4xl p-0 overflow-hidden bg-card"
//           onPointerDownOutside={(e) => e.preventDefault()}
//         >

//           <div className="grid md:grid-cols-2 min-h-[500px]">

//             {/* LEFT IMAGE SLIDER */}

//             <div className="relative bg-black hidden md:block">

//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={currentSlide}
//                   src={productImages[currentSlide]}
//                   alt="Featured Product"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="w-full h-full object-cover"
//                 />
//               </AnimatePresence>

//               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">

//                 <button onClick={prevSlide} className="p-2 bg-card/30 rounded-full">
//                   {/* <ChevronLeft /> */}
//                 </button>

//                 <button onClick={nextSlide} className="p-2 bg-card/30 rounded-full">
//                   {/* <ChevronRight /> */}
//                 </button>

//               </div>

//             </div>

//             {/* RIGHT FORM */}

//             <div className="p-8 flex flex-col justify-center">

//               <h2 className="text-2xl mb-2">Welcome to NIRVA</h2>

//               <p className="text-muted-foreground mb-6">
//                 Enter your details to explore our gold collections
//               </p>

//               <form onSubmit={handleLogin} className="space-y-4">

//                 <div>
//                   <Label>Name</Label>
//                   <Input
//                     type="text"
//                     required
//                     placeholder="Enter your name"
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Email</Label>
//                   <Input
//                     type="email"
//                     required
//                     placeholder="Enter your email"
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <Label>Phone Number</Label>
//                   <Input
//                     type="tel"
//                     required
//                     placeholder="Enter your phone number"
//                     onChange={(e) =>
//                       setFormData({ ...formData, phone: e.target.value })
//                     }
//                   />
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? "Submitting..." : "Submit"}
//                 </Button>

//               </form>

//             </div>

//           </div>

//         </DialogContent>

//       </Dialog>

//     );
//   }

//   return null;
// };