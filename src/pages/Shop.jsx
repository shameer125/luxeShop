import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, Check, Heart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../utils/mockData';
import { Link, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Shop = () => {
  const [products] = useLocalStorage('luxe_products', MOCK_PRODUCTS);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  
  
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [wishlist, setWishlist] = useLocalStorage('luxe_wishlist', []);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some(item => item.id === product.id);
    if (isWishlisted) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const categories = ['All', 'Apparel', 'Accessories', 'Footwear'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Newest') return b.new - a.new;
    return 0; // Featured (default)
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold mb-4">SHOP COLLECTION</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">Discover our curated selection of premium essentials, where quality meets minimalist design.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 border-b border-neutral-200 pb-2 w-full md:w-64">
            <Search size={18} className="text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none text-sm w-full focus:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-8 w-full md:w-auto justify-between md:justify-end">
            <div className="flex space-x-6 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
                    activeCategory === cat ? 'text-accent-dark' : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative group">
              <button 
                className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-neutral-600 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={14} />
                <span>Filter & Sort</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-neutral-50 p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Sort By */}
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">Sort By</h4>
                  <div className="space-y-3">
                    {['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortBy(option)}
                        className={`flex items-center space-x-3 text-sm transition-colors ${sortBy === option ? 'text-accent-dark font-bold' : 'text-neutral-500 hover:text-accent-dark'}`}
                      >
                        {sortBy === option && <Check size={14} />}
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="md:col-span-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-6">Price Range: ${priceRange[0]} — ${priceRange[1]}</h4>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-accent-dark"
                    />
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] font-bold text-neutral-400 uppercase">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.new && (
                    <span className="absolute top-4 left-4 bg-accent-dark text-white text-[10px] font-bold px-2 py-1 uppercase tracking-tighter">
                      New Arrival
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-accent-dark shadow-sm hover:bg-neutral-800 hover:text-white transition-all z-10"
                  >
                    <Heart size={16} fill={wishlist.some(item => item.id === product.id) ? "currentColor" : "none"} />
                  </button>

                  <Link 
                    to={`/product/${product.id}`}
                    className="absolute bottom-0 left-0 right-0 bg-accent-dark text-white py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-xl"
                  >
                    View Details
                  </Link>
                </div>

                <div className="pt-6">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-display font-medium text-sm text-accent-dark uppercase mb-2">{product.name}</h3>
                  <p className="font-bold text-sm">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-neutral-500 font-display text-xl">No products matched your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
