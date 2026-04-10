import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import nirvaLogo from '@/assets/nirva-logo.png';

const footerLinks = {
  shop: [
    { name: 'All Jewelry', path: '/shop' },
    { name: 'Rings', path: '/shop?category=rings' },
    { name: 'Necklaces', path: '/shop?category=necklaces' },
    { name: 'Bracelets', path: '/shop?category=bracelets' },
    { name: 'Earrings', path: '/shop?category=earrings' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Our Story', path: '/about' },
    { name: 'Craftsmanship', path: '/about#craftsmanship' },
    { name: 'Careers', path: '/careers' },
  ],
  support: [
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Shipping & Returns', path: '/shipping' },
    { name: 'Size Guide', path: '/size-guide' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
];

export const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src={nirvaLogo} alt="NIRVA" className="h-16" />
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-sm leading-relaxed">
              Discover timeless elegance with NIRVA's exquisite 9K gold jewelry collection. 
              Each piece is crafted with passion and precision.
            </p>
            <div className="space-y-3 text-primary-foreground/80">
              <a href="#" className="flex items-center gap-3 hover:text-accent transition-colors">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Miracle Residency, Chandhramouli Nagar 1st Line, Guntur, Andhra Pradesh</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-accent transition-colors">
                <Phone className="w-5 h-5 text-accent" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:hello@nirva.com" className="flex items-center gap-3 hover:text-accent transition-colors">
                <Mail className="w-5 h-5 text-accent" />
                <span>hello@nirva.com</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-accent">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} NIRVA. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-accent hover:border-accent transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
              <span>We accept:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-primary-foreground/10 rounded text-xs">Visa</span>
                <span className="px-2 py-1 bg-primary-foreground/10 rounded text-xs">Mastercard</span>
                <span className="px-2 py-1 bg-primary-foreground/10 rounded text-xs">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
