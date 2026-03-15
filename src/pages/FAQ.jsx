import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, MessageSquare, Phone, Mail } from 'lucide-react';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState('Shipping');
  const [openIndex, setOpenIndex] = useState(0);

  const categories = ['Shipping', 'Returns', 'Payment', 'Ethical Sourcing'];

  const faqs = {
    Shipping: [
      { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days within the continental US. International shipping varies by location, typically reaching its destination in 7-14 business days." },
      { q: "Can I track my order?", a: "Yes, you will receive a tracking number via email as soon as your order has been dispatched from our studio." },
      { q: "Do you offer international shipping?", a: "We ship to over 50 countries worldwide. Shipping costs and delivery times will be calculated at checkout." }
    ],
    Returns: [
      { q: "What is your return policy?", a: "We offer a 30-day return policy for all items in their original condition. Please ensure all tags are attached and the item hasn't been worn." },
      { q: "How do I start a return?", a: "Log into your account and navigate to 'My Orders' to initiate a return request, or contact our support team." }
    ],
    Payment: [
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and PayPal." },
      { q: "Is my payment secure?", a: "Absolutely. We use industry-standard encryption and secure payment processors to ensure your data stays protected." }
    ],
    'Ethical Sourcing': [
      { q: "Where are your products made?", a: "We partner with family-owned ateliers in Italy and Portugal that provide fair wages and safe working conditions for all artisans." },
      { q: "What materials do you use?", a: "We prioritize natural, biodegradable fibers like organic cotton, tencel, and recycled wool." }
    ]
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold mb-4 uppercase tracking-tighter">Support Center</h1>
          <p className="text-neutral-500 uppercase text-[10px] font-bold tracking-[0.3em]">How can we help you today?</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-100 mb-12 justify-center space-x-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveTab(cat); setOpenIndex(0); }}
              className={`pb-4 px-2 text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeTab === cat ? 'text-accent-dark' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              {cat}
              {activeTab === cat && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-dark" />}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4 mb-24">
          {faqs[activeTab].map((item, idx) => (
            <div key={idx} className="border-b border-neutral-100 pb-4">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full flex justify-between items-center py-4 text-left group"
              >
                <span className="font-display font-bold text-lg group-hover:text-accent-dark transition-colors">{item.q}</span>
                {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-neutral-500 text-sm leading-relaxed pb-6 pr-12">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <MessageSquare size={20} />, label: 'Live Chat', value: 'Mon-Fri, 9am-6pm' },
            { icon: <Mail size={20} />, label: 'Email Us', value: 'support@luxe.com' },
            { icon: <Phone size={20} />, label: 'Call Us', value: '+1 (800) LUXE-01' }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-neutral-50 text-center flex flex-col items-center">
              <div className="text-accent-dark mb-4">{item.icon}</div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{item.label}</p>
              <p className="text-xs font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
