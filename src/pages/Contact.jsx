import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              GET IN <br />
              <span className="gradient-text">TOUCH.</span>
            </h1>
            <p className="text-neutral-500 max-w-md leading-relaxed mb-12">
              Have a question about our collections or need assistance with an order? Our team is here to provide exceptional support.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-accent-dark transition-colors group-hover:bg-accent-dark group-hover:text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Our Studio</h4>
                  <p className="text-neutral-500 text-sm">123 Minimalist Way, Design District<br />London, E1 6AN</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-accent-dark transition-colors group-hover:bg-accent-dark group-hover:text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Phone</h4>
                  <p className="text-neutral-500 text-sm">+44 (0) 20 7123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center text-accent-dark transition-colors group-hover:bg-accent-dark group-hover:text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Email</h4>
                  <p className="text-neutral-500 text-sm">concierge@luxe.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-neutral-50 p-10 rounded-none relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">Message Sent</h3>
                  <p className="text-neutral-500 text-sm max-w-xs">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 text-xs font-bold uppercase tracking-widest border-b border-accent-dark pb-1"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">First Name</label>
                      <input required className="w-full bg-white border-none py-4 px-6 text-sm focus:ring-1 focus:ring-accent-dark transition-all rounded-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Last Name</label>
                      <input required className="w-full bg-white border-none py-4 px-6 text-sm focus:ring-1 focus:ring-accent-dark transition-all rounded-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Email Address</label>
                    <input type="email" required className="w-full bg-white border-none py-4 px-6 text-sm focus:ring-1 focus:ring-accent-dark transition-all rounded-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Subject</label>
                    <select className="w-full bg-white border-none py-4 px-6 text-sm focus:ring-1 focus:ring-accent-dark transition-all rounded-none">
                      <option>General Inquiry</option>
                      <option>Order Support</option>
                      <option>Press & Media</option>
                      <option>Careers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Message</label>
                    <textarea rows="5" required className="w-full bg-white border-none py-4 px-6 text-sm focus:ring-1 focus:ring-accent-dark transition-all rounded-none resize-none"></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'sending'}
                    className="w-full btn-primary flex items-center justify-center space-x-3 group py-5"
                  >
                    <span>{formStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    <Send size={18} className={`${formStatus === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
