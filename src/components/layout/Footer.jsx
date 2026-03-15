import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-accent-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center text-accent-dark">
                <ShoppingBag size={20} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tighter">LUXE.</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Exclusive collections for those who appreciate the finer things. Crafted with precision and style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-neutral-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-neutral-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-neutral-400 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6 uppercase tracking-wider text-xs">Shop</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Exclusive</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6 uppercase tracking-wider text-xs">Help</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Brand Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-neutral-400 text-sm mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex border-b border-neutral-700 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none text-sm w-full focus:ring-0 placeholder-neutral-600"
              />
              <button className="hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 uppercase tracking-widest">
          <p>© 2026 LUXE E-COMMERCE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Payment Methods: VISA, MASTERCARD, AMEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
