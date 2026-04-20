import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Plus, Minus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MOCK_PRODUCTS } from '../utils/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const [products] = useLocalStorage('luxe_products', MOCK_PRODUCTS);
  const [cart, setCart] = useLocalStorage('luxe_cart', []);
  const [wishlist, setWishlist] = useLocalStorage('luxe_wishlist', []);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const found = products.find(p => p.id === Number(id));
    if (found) setProduct(found);
  }, [id, products]);

  const addToCart = () => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    alert('Added to cart!');
  };
  

  const toggleWishlist = () => {
    const isWishlisted = wishlist.some(item => item.id === product.id);
    if (isWishlisted) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  if (!product) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center space-x-2 text-sm font-bold text-neutral-400 hover:text-accent-dark mb-12 transition-colors">
          <ArrowLeft size={16} />
          <span>BACK TO SHOP</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] bg-neutral-100 overflow-hidden"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl font-medium">${product.price}</span>
              <div className="flex items-center space-x-1 text-accent-gold">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold text-accent-dark">{product.rating}</span>
                <span className="text-xs text-neutral-400 font-normal">({product.reviews} Reviews)</span>
              </div>
            </div>

            <p className="text-neutral-500 leading-relaxed mb-10">
              {product.description || "A masterpiece of minimalist design and superior craftsmanship. This item represents the core values of our brand: quality, elegance, and timeless style."}
            </p>

            <div className="flex flex-col space-y-6 mb-12">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-neutral-200">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-neutral-50"><Minus size={16} /></button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-neutral-50"><Plus size={16} /></button>
                </div>
                <button 
                  onClick={addToCart}
                  className="flex-grow btn-primary flex items-center justify-center space-x-3"
                >
                  <ShoppingBag size={20} />
                  <span>ADD TO BAG</span>
                </button>
                <button 
                  onClick={toggleWishlist}
                  className="w-14 h-14 border border-neutral-200 flex items-center justify-center text-accent-dark hover:bg-neutral-50 transition-colors"
                >
                  <Heart size={20} fill={wishlist.some(item => item.id === product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-neutral-100">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <Truck size={20} className="mb-2 text-neutral-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <ShieldCheck size={20} className="mb-2 text-neutral-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Secure Audit</span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <RefreshCcw size={20} className="mb-2 text-neutral-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Return Policy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
