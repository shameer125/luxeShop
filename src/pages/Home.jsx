import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCcw, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../utils/mockData';

const Home = () => {
  const categories = [
    { name: 'Apparel', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', count: '450+ Items' },
    { name: 'Accessories', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', count: '120+ Items' },
    { name: 'Footwear', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', count: '300+ Items' },
  ];


  const trendingProducts = MOCK_PRODUCTS.slice(0, 4);

  
  const features = [
    { icon: <Truck size={24} />, title: 'Fast Delivery', desc: 'Secure & tracked shipping' },
    { icon: <ShieldCheck size={24} />, title: 'Secure Payment', desc: '100% encrypted checkout' },
    { icon: <RefreshCcw size={24} />, title: 'Easy Returns', desc: '30-day money back guarantee' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-neutral-50">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full z-0 hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
              alt="High Fashion" 
              className="w-full h-full object-cover grayscale brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-neutral-50"></div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold mb-6 block">Elegance in every detail</span>
            <h1 className="text-4xl md:text-8xl font-display font-medium leading-[0.85] mb-10 tracking-tighter">
              TIMELESS <br />
              <span className="italic font-light">COLLECTION.</span>
            </h1>
            <p className="text-sm md:text-base text-neutral-500 mb-12 leading-relaxed max-w-md uppercase tracking-wide">
              Meticulously curated pieces that blend contemporary silhouettes with artisan craftsmanship.
            </p>
            <div className="flex items-center space-x-8">
              <Link to="/shop" className="btn-primary py-5 px-12 rounded-none">
                EXPLORE SHOP
              </Link>
              <Link to="/categories" className="text-xs font-bold uppercase tracking-widest border-b border-accent-dark pb-1 hover:text-accent-gold transition-colors">
                CATEGORIES
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-xl">
              <h2 className="text-5xl font-display font-medium mb-6 uppercase tracking-tight">The Essentials</h2>
              <p className="text-neutral-500 text-sm leading-relaxed uppercase tracking-widest">Selected collections designed for distinct personal expressions.</p>
            </div>
            <Link to="/categories" className="group flex items-center space-x-4 text-xs font-bold uppercase tracking-widest mt-8 md:mt-0">
              <span>View All</span>
              <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-accent-dark group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[600px] overflow-hidden"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-neutral-900/20 transition-all duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/70 mb-4">{cat.count}</span>
                  <h3 className="text-3xl font-display font-medium text-white mb-8">{cat.name}</h3>
                  <Link 
                    to="/shop" 
                    className="px-8 py-3 bg-white text-accent-dark text-[10px] font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-accent-dark hover:text-white"
                  >
                    DISCOVER
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 mb-4 block">Most Wanted</span>
            <h2 className="text-5xl font-display font-medium uppercase tracking-tight">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {trendingProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/product/${product.id}`} className="block mb-6 relative overflow-hidden aspect-[3/4] bg-neutral-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <button className="absolute bottom-0 left-0 right-0 bg-accent-dark text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    QUICK VIEW
                  </button>
                </Link>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-display font-medium text-sm text-accent-dark uppercase mb-2">{product.name}</h3>
                  <p className="font-bold text-sm">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-y border-neutral-100 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-premium transition-transform hover:-translate-y-1">
                  {f.icon}
                </div>
                <h4 className="font-display font-bold text-lg">{f.title}</h4>
                <p className="text-neutral-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
