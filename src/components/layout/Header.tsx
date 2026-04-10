import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, User, Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { CategoryNavBar } from '@/components/layout/CategoryNavBar';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import nirvaLogo from '@/assets/nirva-logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-card/95 backdrop-blur-md shadow-elegant'
              : 'bg-transparent'
          }`}
        >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-primary hover:text-accent transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={nirvaLogo}
                alt="NIRVA - 9K Gold Jewellers"
                className="h-12 lg:h-16 w-auto"
              />
            </Link>

            {/* Center Nav Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans text-sm tracking-widest uppercase transition-colors ${
                    isActive(link.path)
                      ? 'text-gold-nav font-semibold'
                      : 'text-gold-nav/70 hover:text-gold-nav'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 lg:gap-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gold-nav hover:text-gold-nav/80 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/wishlist" className="hidden md:flex p-2 text-gold-nav hover:text-gold-nav/80 transition-colors relative">
                <Heart className="w-5 h-5 text-gold-nav" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* User Dropdown */}
              <div 
                className="relative hidden md:block"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <button className="p-2 text-gold-nav hover:text-gold-nav/80 transition-colors">
                  <User className="w-5 h-5 text-gold-nav" />
                </button>
                
                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-64 bg-card rounded-lg shadow-elegant border border-border overflow-hidden z-50"
                    >
                      <div className="p-6 text-center">
                        <h3 className="font-display text-xl text-foreground mb-2">My Account</h3>
                        {isAuthenticated ? (
                          <>
                            <p className="text-sm text-muted-foreground mb-4">
                              Welcome, {user?.name}
                            </p>
                            <div className="space-y-2">
                              <Link
                                to="/orders"
                                className="block w-full py-2 px-4 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                              >
                                My Orders
                              </Link>
                              <Link
                                to="/wishlist"
                                className="block w-full py-2 px-4 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                              >
                                Wishlist
                              </Link>
                              <button
                                onClick={logout}
                                className="block w-full py-2 px-4 text-sm text-destructive hover:bg-secondary rounded transition-colors text-left"
                              >
                                Logout
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-muted-foreground mb-4">
                              Login to access your account
                            </p>
                            <Button
                              variant="outline"
                              className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                              onClick={() => {
                                setShowUserDropdown(false);
                                setIsAuthModalOpen(true);
                              }}
                            >
                              LOGIN/SIGNUP
                            </Button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/cart" className="relative p-2 text-gold-nav hover:text-gold-nav/80 transition-colors">
                <ShoppingCart className="w-5 h-5 text-gold-nav" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
          {/* CategoryNavBar removed */}
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-navy-dark/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-card z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <img src={nirvaLogo} alt="NIRVA" className="h-10" />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-primary hover:text-accent transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex-1 py-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-6 py-4 font-display text-lg transition-colors ${
                          isActive(link.path)
                            ? 'text-accent bg-secondary'
                            : 'text-primary hover:text-accent hover:bg-secondary'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <div className="p-6 border-t border-border">
                  <Button variant="gold" className="w-full" asChild>
                    <Link to="/shop">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
