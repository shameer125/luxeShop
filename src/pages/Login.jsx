import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Lock, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useStore();
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    
    // Mock Authentication Logic
    // In a real app, this would be an API call
    if (email === 'admin@luxe.com' && password === 'admin123') {
      const adminUser = { email, role: 'admin', name: 'Admin Manager' };
      setUser(adminUser);
      navigate('/admin');
    } else if (email && password) {
      const regularUser = { email, role: 'user', name: 'John Doe' };
      setUser(regularUser);
      navigate('/');
    } else {
      setError('Please enter valid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="max-w-md w-full px-8 py-12 border border-neutral-100 shadow-premium relative bg-white overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-neutral-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10">
          {/* Admin Hint Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-neutral-900 text-white px-4 py-2 rounded-full border border-white/10 shadow-xl flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em]">
                Admin Access: <span className="text-white/60 lowercase font-bold">admin@luxe.com</span> / <span className="text-white/60 lowercase font-bold">admin123</span>
              </p>
            </div>
          </div>

          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
              <div className="w-10 h-10 bg-accent-dark flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <ShoppingBag size={20} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tighter">LUXE.</span>
            </Link>
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">Welcome Back</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Please enter your details</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@luxe.com"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-none focus:ring-1 focus:ring-accent-dark text-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
                <input 
                  type="password" 
                  required
                  placeholder="admin123"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-none focus:ring-1 focus:ring-accent-dark text-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 font-bold uppercase tracking-tighter text-center"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full btn-primary py-4 uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center space-x-3 group"
            >
              <span>Sign In</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            <p>Don't have an account? <Link to="/register" className="text-accent-dark border-b border-accent-dark pb-0.5 ml-1">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
