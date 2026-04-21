import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  
  return (
    <div className="pt-48 pb-32 bg-white min-h-screen">
      <div className="max-w-xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10"
        >
          <CheckCircle2 size={48} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-display font-bold mb-6 uppercase tracking-tight">Purchase Successful</h1>
          <p className="text-neutral-500 leading-relaxed mb-12">
            Your order <span className="text-accent-dark font-bold">#LX-{orderNumber}</span> has been placed successfully. 
            We've sent a confirmation email with all details to your inbox.
          </p>

          <div className="bg-neutral-50 p-8 mb-12 flex flex-col items-center">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.3em] mb-4">Estimated Delivery</span>
            <span className="text-xl font-display font-medium">March 22 - March 25, 2026</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop" className="btn-primary w-full sm:w-auto px-10 py-5 flex items-center justify-center space-x-3">
              <ShoppingBag size={18} />
              <span>CONTINUE SHOPPING</span>
            </Link>
            <Link to="/admin" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-accent-dark transition-colors px-6">
              Track Order
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
