import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Wishlist = () => {
  const [wishlist, setWishlist] = useLocalStorage('luxe_wishlist', []);
  const [cart, setCart] = useLocalStorage('luxe_cart', []);

  const removeItem = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const moveToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    removeItem(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="pt-48 pb-32 text-center max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-300">
            <Heart size={48} />
          </div>
        </div>
        <h1 className="text-3xl font-display font-bold mb-4 uppercase tracking-tighter">Your wishlist is empty.</h1>
        <p className="text-neutral-500 mb-10">Save items you love to find them easily later.</p>
        <Link to="/shop" className="btn-primary inline-flex items-center space-x-2">
          <span>Explore Collection</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-12 uppercase tracking-tight">Wishlist</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence>
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group border border-neutral-100 p-4 hover:shadow-premium transition-all"
              >
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100 mb-6 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-accent-dark hover:bg-neutral-800 hover:text-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display font-bold text-sm uppercase mb-1">{item.name}</h3>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{item.category}</p>
                  </div>
                  <span className="font-medium">${item.price}</span>
                </div>

                <button 
                  onClick={() => moveToCart(item)}
                  className="w-full py-3 border border-accent-dark text-[10px] font-bold uppercase tracking-widest hover:bg-accent-dark hover:text-white transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={14} />
                  <span>Move to Bag</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
