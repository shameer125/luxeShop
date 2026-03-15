import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../utils/mockData';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 4);
    setResults(filtered);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col"
        >
          {/* Header */}
          <div className="max-w-7xl mx-auto px-4 w-full pt-10 flex justify-between items-center">
            <span className="font-display text-2xl font-bold tracking-tighter uppercase">Search</span>
            <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Search Input Area */}
          <div className="flex-grow flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-3xl">
              <div className="relative mb-12">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="WHAT ARE YOU LOOKING FOR?"
                  className="w-full text-4xl md:text-6xl font-display font-medium border-none outline-none placeholder:text-neutral-100 uppercase tracking-tight"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="h-0.5 bg-neutral-100 w-full mt-4 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: query.length > 0 ? '100%' : '0%' }}
                    className="absolute inset-0 bg-accent-dark"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {results.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group"
                  >
                    <Link to={`/product/${product.id}`} onClick={onClose} className="block">
                      <div className="aspect-[3/4] overflow-hidden bg-neutral-50 mb-4 border border-neutral-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-1">{product.name}</h4>
                      <p className="text-[10px] text-neutral-400 uppercase">${product.price}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {query && results.length === 0 && (
                <p className="text-center text-neutral-400 text-sm italic">No products found for "{query}"</p>
              )}

              {query && results.length > 0 && (
                <div className="text-center mt-12">
                  <Link to={`/shop?search=${query}`} onClick={onClose} className="text-xs font-bold uppercase tracking-[0.3em] border-b border-accent-dark pb-1 inline-flex items-center space-x-3">
                    <span>View All Results</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
