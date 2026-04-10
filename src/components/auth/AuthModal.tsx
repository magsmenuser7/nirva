import { useState, useEffect, FormEvent } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from "@emailjs/browser";

import necklacesImage from '@/assets/category-necklaces.jpg';
import ringsImage from '@/assets/category-rings.jpg';
import braceletsImage from '@/assets/category-bracelets.jpg';
import earringsImage from '@/assets/category-earrings.jpg';
import product1 from "@/assets/products/bangles/Bangle1-1.jpeg";
import product2 from "@/assets/products/chains/chain1-1.jpeg";
import product3 from "@/assets/products/necklace/necklace4-1.jpeg";
import product4 from "@/assets/products/pendants/statues3-1.jpeg";

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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % productImages.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + productImages.length) % productImages.length);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // ================= USER STORAGE =================

  const getUsers = (): UserData[] => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  };

  const saveUser = (user: UserData): void => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  const findUser = (email: string): UserData | undefined => {
    return getUsers().find((u) => u.email === email);
  };

  // ================= FORM SUBMIT =================

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    
    debugger;
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    const email = formData.email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter valid email");
      setIsLoading(false);
      return;
    }

    const existingUser = findUser(email);

    // ================= EXISTING USER =================

    if (existingUser) {

      toast({
        title: "Welcome Back",
        description: "Thank you for returning to NIRVA!"
      });

      setSuccessMessage("Welcome to NIRVA!");
      setTimeout(() => {
  localStorage.setItem(
    "nirvaUser",
    JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    })
  );

  setIsLoggedIn(true);
  onClose();
}, 800);

      setIsLoading(false);
      return;
    }

    // ================= NEW USER =================

    try {

      await emailjs.send(
        "service_72ku4qo",
        "template_3ht10ke",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        "-sILhhMXgcwUxupso"
      );

      saveUser({ email });

      toast({
        title: "Welcome to NIRVA",
        description: "Thank you for joining NIRVA! Explore our exquisite gold collections."
      });

      setSuccessMessage("Welcome to NIRVA!");

      setTimeout(() => {
  localStorage.setItem(
    "nirvaUser",
    JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    })
  );

  setIsLoggedIn(true);
  onClose();
}, 1000);

    } catch (err) {

      console.error("EmailJS Error:", err);

      setError("Failed to enter NIRVA. Please try again later.");

      toast({
        title: "Error",
        description: "Email sending failed",
        variant: "destructive"
      });

    } finally {

      setIsLoading(false);

    }

  };

  if (!isLoggedIn) {
    return (

      <Dialog open={isOpen}>

        <DialogContent
          className="max-w-4xl p-0 overflow-hidden bg-card"
          onPointerDownOutside={(e) => e.preventDefault()}
        >

          <div className="grid md:grid-cols-2 min-h-[500px]">

            {/* LEFT IMAGE SLIDER */}

            <div className="relative bg-black hidden md:block">

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={productImages[currentSlide]}
                  alt="Featured Product"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">

                <button onClick={prevSlide} className="p-2 bg-card/30 rounded-full">
                  {/* <ChevronLeft /> */}
                </button>

                <button onClick={nextSlide} className="p-2 bg-card/30 rounded-full">
                  {/* <ChevronRight /> */}
                </button>

              </div>

            </div>

            {/* RIGHT FORM */}

            <div className="p-8 flex flex-col justify-center">

              <h2 className="text-2xl mb-2">Welcome to NIRVA</h2>

              <p className="text-muted-foreground mb-6">
                Enter your details to explore our gold collections
              </p>

              <form onSubmit={handleLogin} className="space-y-4">

                <div>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    required
                    placeholder="Enter your name"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>

              </form>

            </div>

          </div>

        </DialogContent>

      </Dialog>

    );
  }

  return null;
};