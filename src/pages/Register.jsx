import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [user, setUser] = useLocalStorage('luxe_user', null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Mock Registration Logic
    const newUser = { 
      name: formData.name, 
      email: formData.email, 
      role: 'user' 
    };
    setUser(newUser);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="max-w-md w-full px-8 py-12 border border-neutral-100 shadow-premium relative bg-white overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-neutral-50 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
              <div className="w-10 h-10 bg-accent-dark flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <ShoppingBag size={20} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tighter">LUXE.</span>
            </Link>
            <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">Create Account</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Join the luxe community</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-none focus:ring-1 focus:ring-accent-dark text-sm transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-none focus:ring-1 focus:ring-accent-dark text-sm transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-none focus:ring-1 focus:ring-accent-dark text-sm transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-300" size={16} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-none focus:ring-1 focus:ring-accent-dark text-sm transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter text-center">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full btn-primary py-4 uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center space-x-3 group"
            >
              <span>Create Account</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            <p>Already have an account? <Link to="/login" className="text-accent-dark border-b border-accent-dark pb-0.5 ml-1">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
