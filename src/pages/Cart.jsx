import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Cart = () => {
  const [cart, setCart] = useLocalStorage('luxe_cart', []);
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-32 text-center max-w-7xl mx-auto px-4">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-300">
            <ShoppingBag size={48} />
          </div>
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">Your bag is empty.</h1>
        <p className="text-neutral-500 mb-10">Items remain in your bag for 30 days, or until you check out.</p>
        <Link to="/shop" className="btn-primary inline-flex items-center space-x-2">
          <span>Continue Shopping</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold mb-12">SHOPPING BAG</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center space-x-6 pb-8 border-b border-neutral-100"
                >
                  <div className="w-24 h-32 bg-neutral-100 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display font-bold text-lg">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-neutral-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">{item.category}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-neutral-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-neutral-50"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-neutral-50"><Plus size={14} /></button>
                      </div>
                      <span className="font-medium font-display">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-accent-dark pt-4 transition-colors">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-50 p-8 rounded-none sticky top-32">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-tighter italic">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-6 mb-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold uppercase">Estimated Total</span>
                  <span className="text-2xl font-display font-bold">${subtotal}</span>
                </div>
                <p className="text-[10px] text-neutral-400 text-right italic font-normal">Taxes calculated at checkout</p>
              </div>
              <button 
                className="w-full btn-primary py-4 uppercase tracking-[0.2em] font-bold text-xs"
                onClick={() => navigate('/checkout')}
              >
                PROCEED TO CHECKOUT
              </button>
              <div className="mt-8 flex items-center justify-center space-x-6 grayscale opacity-30">
                <span className="text-[10px] font-bold tracking-tighter">VISA</span>
                <span className="text-[10px] font-bold tracking-tighter">MASTERCARD</span>
                <span className="text-[10px] font-bold tracking-tighter">APPLE PAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
