import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Award, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              REDEFINING <br />
              MODERN <br />
              <span className="gradient-text">ESSENTIALS.</span>
            </h1>
            <p className="text-neutral-500 leading-relaxed max-w-md">
              Founded in 2024, LUXE. was born out of a desire for simplicity. We believe that true quality doesn't need to shout—it speaks through craftsmanship, material, and timeless design.
            </p>
          </motion.div>

          {/* Image Section */}
          
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-neutral-100 overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
              alt="Brand Story" 
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { icon: <Award className="mb-6" />, title: 'Premium Quality', desc: 'We source only the finest materials from sustainable suppliers worldwide.' },
            { icon: <Heart className="mb-6" />, title: 'Ethical Design', desc: 'Our products are designed for longevity, countering the culture of fast fashion.' },
            { icon: <Shield className="mb-6" />, title: 'Transparent Pricing', desc: 'We believe you should know where your money goes. No hidden markups.' }
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 border border-neutral-100 hover:shadow-premium transition-all group"
            >
              <div className="text-accent-dark group-hover:scale-110 transition-transform">{v.icon}</div>
              <h3 className="text-xl font-display font-bold mb-4">{v.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual Callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative h-[600px] overflow-hidden flex items-center justify-center text-center px-4"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Minimalist Design" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">LESS, BUT BETTER.</h2>
            <p className="text-lg text-neutral-500 italic mb-10">"Good design is as little design as possible."</p>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Dieter Rams</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
