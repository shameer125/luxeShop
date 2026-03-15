import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CreditCard, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { useStore } from '../context/StoreContext';

const Checkout = () => {
  const [cart, setCart] = useLocalStorage('luxe_cart', []);
  const { orders, setOrders, customers, setCustomers, activities, setActivities, addOrder, products, updateEntities } = useStore();
  
  const [orderInfo, setOrderInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: 'United Kingdom',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else {
      // Create new order
      const newOrderId = `ORD-${Math.floor(Math.random() * 9000) + 1000}`;
      const fullName = `${orderInfo.firstName} ${orderInfo.lastName}`;
      
      const newOrderInfo = {
        id: `#${newOrderId}`,
        customer: fullName,
        date: new Date().toISOString().split('T')[0],
        total: total,
        status: 'Processing'
      };

      const newActivity = {
        id: Date.now(),
        type: 'order',
        user: fullName,
        action: 'placed a new order',
        time: 'Just now',
        amount: `$${total.toLocaleString()}`
      };

      // Handle customer logic centrally using functional updates
      const customerUpdate = (prev) => {
        const existing = (prev || []).find(c => c.email.toLowerCase() === orderInfo.email.toLowerCase());
        if (existing) {
          return prev.map(c => 
            c.id === existing.id 
              ? { ...c, orders: c.orders + 1, totalSpent: c.totalSpent + total } 
              : c
          );
        } else {
          const newCustomer = {
            id: Date.now(),
            name: fullName,
            email: orderInfo.email,
            orders: 1,
            totalSpent: total,
            location: `${orderInfo.city}, ${orderInfo.country}`,
            joined: 'Mar 2026'
          };
          return [...(prev || []), newCustomer];
        }
      };

      // Atomic Enterprise Update
      const commitCheckout = async () => {
        try {
          await updateEntities({
            customers: customerUpdate,
            orders: prev => [newOrderInfo, ...(prev || [])],
            activities: prev => [newActivity, ...(prev || []).slice(0, 9)]
          });
          
          setCart([]);
          navigate('/order-success');
        } catch (err) {
          console.error('[Checkout] Enterprise sync failed:', err);
          // Fallback or error UI could go here
        }
      };

      commitCheckout();
    }
  };

  if (cart.length === 0 && step !== 3) {
    return <div className="pt-48 text-center"><Link to="/shop" className="btn-primary">Back to Shop</Link></div>;
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Checkout Form */}
          <div className="flex-grow">
            <div className="flex items-center space-x-4 mb-12">
              <span className={`text-xs font-bold uppercase tracking-widest ${step === 1 ? 'text-accent-dark' : 'text-neutral-300'}`}>01 Shipping</span>
              <ChevronRight size={14} className="text-neutral-200" />
              <span className={`text-xs font-bold uppercase tracking-widest ${step === 2 ? 'text-accent-dark' : 'text-neutral-300'}`}>02 Payment</span>
            </div>

            <form onSubmit={handleNext}>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-display font-bold mb-6">Contact Information</h2>
                      <input 
                        required 
                        type="email"
                        placeholder="Email Address"
                        className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                        value={orderInfo.email}
                        onChange={(e) => setOrderInfo({...orderInfo, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-display font-bold mb-6">Shipping Address</h2>
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <input 
                          required 
                          placeholder="First Name"
                          className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                          value={orderInfo.firstName}
                          onChange={(e) => setOrderInfo({...orderInfo, firstName: e.target.value})}
                        />
                        <input 
                          required 
                          placeholder="Last Name"
                          className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                          value={orderInfo.lastName}
                          onChange={(e) => setOrderInfo({...orderInfo, lastName: e.target.value})}
                        />
                      </div>
                      <input 
                        required 
                        placeholder="Street Address"
                        className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors mb-6"
                        value={orderInfo.address}
                        onChange={(e) => setOrderInfo({...orderInfo, address: e.target.value})}
                      />
                      <div className="grid grid-cols-3 gap-6">
                        <input 
                          required 
                          placeholder="City"
                          className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                          value={orderInfo.city}
                          onChange={(e) => setOrderInfo({...orderInfo, city: e.target.value})}
                        />
                        <input 
                          required 
                          placeholder="Postcode"
                          className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                          value={orderInfo.zip}
                          onChange={(e) => setOrderInfo({...orderInfo, zip: e.target.value})}
                        />
                        <select 
                          className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors bg-white"
                          value={orderInfo.country}
                          onChange={(e) => setOrderInfo({...orderInfo, country: e.target.value})}
                        >
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Europe</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-display font-bold mb-6">Payment Method</h2>
                      <div className="bg-neutral-50 p-6 flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          <CreditCard size={20} className="text-neutral-400" />
                          <span className="text-sm font-bold uppercase tracking-widest">Credit Card</span>
                        </div>
                        <div className="flex space-x-2 grayscale opacity-50">
                          <span className="text-[10px] font-bold">VISA</span>
                          <span className="text-[10px] font-bold">MC</span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <input 
                          required 
                          placeholder="Card Number"
                          className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                          value={orderInfo.cardNumber}
                          onChange={(e) => setOrderInfo({...orderInfo, cardNumber: e.target.value})}
                        />
                        <div className="grid grid-cols-2 gap-6">
                          <input 
                            required 
                            placeholder="MM / YY"
                            className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                            value={orderInfo.expiry}
                            onChange={(e) => setOrderInfo({...orderInfo, expiry: e.target.value})}
                          />
                          <input 
                            required 
                            type="password"
                            placeholder="CVV"
                            className="w-full border-b border-neutral-200 py-3 focus:border-accent-dark outline-none transition-colors"
                            value={orderInfo.cvv}
                            onChange={(e) => setOrderInfo({...orderInfo, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-12 mt-12 border-t border-neutral-100">
                {step === 2 && (
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-accent-dark transition-colors"
                  >
                    <ChevronLeft size={16} />
                    <span>Back to Shipping</span>
                  </button>
                )}
                <button 
                  type="submit"
                  className="ml-auto btn-primary py-4 px-12 group flex items-center space-x-3"
                >
                  <span>{step === 1 ? 'CONTINUE TO PAYMENT' : 'PURCHASE NOW'}</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Checkout Sidebar */}
          <div className="lg:w-[400px]">
            <div className="bg-neutral-50 p-8 sticky top-32">
              <h3 className="font-display font-bold mb-6">Order Summary</h3>
              <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-20 bg-white flex-shrink-0 overflow-hidden border border-neutral-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-bold uppercase tracking-tight truncate w-32">{item.name}</h4>
                      <p className="text-[10px] text-neutral-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-neutral-200">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500 uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500 uppercase tracking-widest">Shipping</span>
                  <span className="font-bold">${shipping}</span>
                </div>
                <div className="flex justify-between text-base pt-3">
                  <span className="font-display font-bold uppercase">Total</span>
                  <span className="font-display font-bold">${total}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3 text-neutral-400">
                  <Truck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Complimentary delivery</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-400">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">2 Year Warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
