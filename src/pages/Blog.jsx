import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'The Art of Minimalist Living: Quality Over Quantity',
      excerpt: 'In a world of constant consumption, finding peace in simplicity is a form of rebellion.',
      category: 'Lifestyle',
      author: 'Elena Vance',
      date: 'March 10, 2026',
      image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Spring/Summer 2026: The Sustainable Collection',
      excerpt: 'Discover the materials and craftsmanship behind our most ethical collection yet.',
      category: 'Fashion',
      author: 'Marcus Thorne',
      date: 'March 05, 2026',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Behind the Design: The Modular Leather Bag',
      excerpt: 'A deep dive into the engineering process that created our most versatile accessory.',
      category: 'Design',
      author: 'Sophia Chen',
      date: 'February 28, 2026',
      image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 uppercase tracking-tighter">Journal</h1>
          <p className="text-neutral-500 max-w-xl mx-auto uppercase text-[10px] font-bold tracking-[0.3em]">Insights on design, ethics, and lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  <span className="text-accent-dark">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                
                <h2 className="text-xl font-display font-bold leading-tight group-hover:text-accent-dark transition-colors uppercase">
                  {post.title}
                </h2>
                
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest border-b border-accent-dark pb-1 w-fit mt-6 group-hover:pr-4 transition-all">
                  <span>Read Story</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Callout */}
        <div className="mt-32 bg-neutral-50 p-16 md:p-24 text-center">
          <h2 className="text-3xl font-display font-bold mb-6 uppercase tracking-tight">Stay Inspired</h2>
          <p className="text-neutral-500 mb-10 max-w-md mx-auto italic">Join our community for exclusive early access to new collections and ethical design insights.</p>
          <form className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-white border border-neutral-200 px-6 py-4 text-sm focus:ring-1 focus:ring-accent-dark outline-none"
            />
            <button className="btn-primary py-4 px-10 uppercase tracking-widest font-bold text-xs whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
