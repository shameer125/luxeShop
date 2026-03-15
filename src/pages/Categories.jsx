import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 'apparel',
      name: 'Apparel',
      desc: 'Refined silhouettes and premium textiles for the discerning individual.',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
      count: 452
    },
    {
      id: 'accessories',
      name: 'Accessories',
      desc: 'Small details that make a significant impact on your daily aesthetic.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      count: 128
    },
    {
      id: 'footwear',
      name: 'Footwear',
      desc: 'Engineering meets elegance. Crafted for movement and durability.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      count: 312
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-display font-bold mb-4">CURATED COLLECTIONS</h1>
          <p className="text-neutral-500 max-w-xl mx-auto uppercase text-xs font-bold tracking-[0.2em]">Explore by category</p>
        </div>

        <div className="space-y-32">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
            >
              <div className="w-full md:w-1/2 aspect-[16/9] overflow-hidden bg-neutral-100 group">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">{cat.count} Items</span>
                <h2 className="text-4xl font-display font-bold mb-6 uppercase">{cat.name}</h2>
                <p className="text-neutral-500 leading-relaxed mb-8 max-w-md">
                  {cat.desc}
                </p>
                <Link 
                  to={`/shop?category=${cat.name}`}
                  className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest border-b border-accent-dark pb-2 group"
                >
                  <span>Browse Collection</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
