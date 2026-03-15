import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search, Heart, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useStore } from '../../context/StoreContext';
import SearchOverlay from '../SearchOverlay';

const Navbar = () => {
  const { user, setUser } = useStore();
  const [cart] = useLocalStorage('luxe_cart', []);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Journal', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    ...(user?.role === 'admin' ? [{ name: 'Dashboard', path: '/admin' }] : []),
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-accent-dark flex items-center justify-center text-white transition-transform group-hover:rotate-12">
              <ShoppingBag size={20} />
            </div>
            <span className="font-display text-2xl font-bold tracking-tighter">LUXE.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-neutral-500 uppercase ${
                  location.pathname === link.path ? 'text-accent-dark' : 'text-neutral-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6 text-accent-dark">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hover:scale-110 transition-transform"
            >
              <Search size={20} />
            </button>
            
            <div className="flex items-center space-x-6">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10 active:scale-95"
                    >
                      <Shield size={14} className="text-emerald-400" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-accent-dark transition-colors"
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => setUser(null)}
                    className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hover:scale-110 transition-transform">
                  <User size={20} />
                </Link>
              )}
              
              <Link to="/wishlist" className="hover:scale-110 transition-transform"><Heart size={20} /></Link>
              <Link to="/cart" className="relative hover:scale-110 transition-transform">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-accent-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-accent-dark">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-neutral-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-accent-dark border-b border-neutral-50"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-6 pt-6 px-3">
                <button onClick={() => { setIsSearchOpen(true); setIsOpen(false); }}>
                  <Search size={20} />
                </button>
                <Link to={user ? (user.role === 'admin' ? '/admin' : '/profile') : '/login'} onClick={() => setIsOpen(false)}>
                  <User size={20} />
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    <Shield size={14} className="text-emerald-400" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link to="/cart" onClick={() => setIsOpen(false)}>
                  <ShoppingBag size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
