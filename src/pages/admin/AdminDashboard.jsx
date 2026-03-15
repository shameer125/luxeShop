import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  CreditCard,
  Users,
  LayoutDashboard,
  Bell,
  Settings,
  MoreVertical,
  TrendingUp,
  ShoppingBag,
  ExternalLink,
  Eye,
  Activity,
  Menu,
  User,
  UserMinus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { SALES_DATA, CATEGORY_DATA } from '../../utils/mockData';

const AdminDashboard = () => {
  const { products, setProducts, orders, setOrders, customers, setCustomers, activities, setActivities, loading, refreshStore, updateEntities } = useStore();
  const [activeView, setActiveView] = useState('Overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * 50) + 120);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Pulse Engine - Real-time Simulator
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate active user fluctuations
      setActiveUsers(prev => Math.max(80, prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)));

      // Occasional new activities
      if (Math.random() > 0.85) {
        const newEvent = {
          id: Date.now(),
          type: 'system',
          user: 'System Bot',
          action: 'Optimization check complete',
          time: 'Just now',
          amount: null
        };
        setActivities(prev => [newEvent, ...prev.slice(0, 9)]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [setActivities]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Apparel',
    image: '',
    description: '',
    sku: '',
    stock: '',
    status: 'Live',
    new: true
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        ...product,
        sku: product.sku || `LX-${Math.floor(Math.random() * 9000) + 1000}`,
        stock: product.stock || Math.floor(Math.random() * 50) + 10,
        status: product.status || 'Live'
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        category: 'Apparel',
        image: '',
        description: '',
        sku: `LX-${Math.floor(Math.random() * 9000) + 1000}`,
        stock: '20',
        status: 'Live',
        new: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('[Dashboard] Initiating handleSave. Editing:', !!editingProduct);
    setNotification('Deploying entity to node...');
    
    try {
      const productData = {
        ...formData,
        name: formData.name.trim(),
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        sku: formData.sku || `LX-${Math.floor(Math.random() * 9000) + 1000}`,
      };

      if (!productData.name) throw new Error('Entity Identifier required');

      let productsUpdate;
      let activityAction;

      if (editingProduct) {
        productsUpdate = (prev) => (prev || []).map(p => p.id === editingProduct.id ? { ...productData, id: p.id } : p);
        activityAction = `Updated entity: ${productData.name}`;
      } else {
        const newProduct = {
          ...productData,
          id: Date.now(),
          rating: 5.0,
          reviews: 0
        };
        productsUpdate = (prev) => [newProduct, ...(prev || [])];
        activityAction = `Launched new entity: ${newProduct.name}`;
      }

      console.log('[Dashboard] Atomic update: products and activity');
      const activity = {
        id: Date.now(),
        type: editingProduct ? 'system' : 'product',
        user: 'Admin',
        action: activityAction,
        time: 'Just now',
        amount: null
      };

      await updateEntities({
        products: productsUpdate,
        activities: prev => [activity, ...(prev || []).slice(0, 9)]
      });
      
      setNotification(editingProduct ? 'Product node updated successfully' : 'New entity launched successfully');
      setTimeout(() => setNotification(null), 3000);
      handleCloseModal();
    } catch (err) {
      console.error('[Dashboard] Save operation failed:', err);
      setNotification(`Critical Error: ${err.message}`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleDelete = async (id) => {
    const productToDelete = products.find(p => p.id === id);
    if (!productToDelete) return;

    if (window.confirm(`Are you sure you want to purge entity: ${productToDelete.name}?`)) {
      try {
        const activity = {
          id: Date.now(),
          type: 'system',
          user: 'Admin',
          action: `Purged entity: ${productToDelete.name}`,
          time: 'Just now',
          amount: null
        };

        await updateEntities({
          products: prev => (prev || []).filter(p => p.id !== id),
          activities: prev => [activity, ...(prev || []).slice(0, 9)]
        });

        setNotification('Entity purged successfully');
        setTimeout(() => setNotification(null), 3000);
      } catch (err) {
        console.error('[Dashboard] Purge failed:', err);
        setNotification('Failed to purge entity');
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm(`Are you sure you want to purge Order #${id.toString().replace('#', '')}?`)) {
      try {
        const activity = {
          id: Date.now(),
          type: 'system',
          user: 'Admin',
          action: `Purged Order #${id.toString().replace('#', '')}`,
          time: 'Just now',
          amount: null
        };

        await updateEntities({
          orders: prev => (prev || []).filter(o => o.id !== id),
          activities: prev => [activity, ...(prev || []).slice(0, 9)]
        });

        setNotification('Order record purged');
        setTimeout(() => setNotification(null), 3000);
      } catch (err) {
        console.error('[Dashboard] Order purge failed:', err);
        setNotification('Failed to purge order');
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };

  const handleDeleteCustomer = async (id) => {
    const customer = customers.find(c => c.id === id);
    if (window.confirm(`Are you sure you want to purge customer record: ${customer?.name || id}?`)) {
      try {
        const activity = {
          id: Date.now(),
          type: 'system',
          user: 'Admin',
          action: `Purged Customer: ${customer?.name || id}`,
          time: 'Just now',
          amount: null
        };

        await updateEntities({
          customers: prev => (prev || []).filter(c => c.id !== id),
          activities: prev => [activity, ...(prev || []).slice(0, 9)]
        });

        setNotification('Customer record purged');
        setTimeout(() => setNotification(null), 3000);
      } catch (err) {
        console.error('[Dashboard] Customer purge failed:', err);
        setNotification('Failed to purge customer');
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await updateEntities({
        activities: prev => (prev || []).filter(act => act.id !== id)
      });
      setNotification('Activity record purged');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error('[Dashboard] Activity purge failed:', err);
      setNotification('Failed to purge activity');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handlePurgeSegment = async (segment, label) => {
    if (window.confirm(`CRITICAL: Are you sure you want to PURGE ALL ${label}? This cannot be undone.`)) {
      try {
        await updateEntities({ [segment]: [] });
        setNotification(`${label} cleared successfully`);
        setTimeout(() => setNotification(null), 3000);
      } catch (err) {
        console.error(`[Dashboard] ${label} purge failed:`, err);
        setNotification(`Failed to purge ${label}`);
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };

  const stats = [
    { 
      label: 'Revenue', 
      value: `$${orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}`, 
      trend: '+12.5%', 
      isUp: true, 
      icon: <CreditCard size={20} />, 
      color: 'bg-blue-50' 
    },
    { 
      label: 'Inventory', 
      value: products.length, 
      trend: '+2', 
      isUp: true, 
      icon: <Package size={20} />, 
      color: 'bg-emerald-50' 
    },
    { 
      label: 'Customers', 
      value: customers.length.toLocaleString(), 
      trend: '+5.2%', 
      isUp: true, 
      icon: <Users size={20} />, 
      color: 'bg-orange-50' 
    },
    { 
      label: 'Customer LTV', 
      value: `$${Math.floor(orders.reduce((acc, curr) => acc + curr.total, 0) / (customers.length || 1))}`, 
      trend: '+3.1%', 
      isUp: true, 
      icon: <TrendingUp size={20} />, 
      color: 'bg-purple-50' 
    },
  ];

  const filteredProducts = (products || []).filter(p => 
    (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredOrders = orders.filter(o => 
    o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-10">
        <div className="flex flex-col items-center space-y-10">
          <div className="w-24 h-24 border-t-4 border-white rounded-full animate-spin" />
          <div className="text-center">
             <h2 className="text-white font-display text-4xl font-bold uppercase tracking-tighter mb-4 animate-pulse">Syncing Intel</h2>
             <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.3em]">Establishing secure data link...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex overflow-hidden">
      {/* Premium Sidebar - Desktop */}
      <aside className="w-72 bg-neutral-900 text-white p-8 hidden lg:flex flex-col h-screen overflow-y-auto">
        <Link to="/" className="flex items-center space-x-3 mb-12">
          <div className="w-10 h-10 bg-white flex items-center justify-center text-neutral-900 rounded-xl">
            <Package size={20} />
          </div>
          <span className="font-display text-2xl font-bold tracking-tighter">LUXE.</span>
        </Link>
        <div className="px-4 py-1.5 bg-white/10 rounded-full mb-10 self-start border border-white/5">
          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/50">System Admin</p>
        </div>
        
        <nav className="space-y-2 flex-grow">
          {[
            { id: 'Overview', icon: <LayoutDashboard size={20} /> },
            { id: 'Products', icon: <Package size={20} /> },
            { id: 'Orders', icon: <ShoppingBag size={20} />, badge: 3 },
            { id: 'Customers', icon: <Users size={20} /> },
            { id: 'Settings', icon: <Settings size={20} /> },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeView === item.id 
                  ? 'bg-white text-neutral-900 shadow-xl shadow-black/20 font-bold text-sm' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 text-sm'
              }`}
            >
              <div className="flex items-center space-x-4">
                {item.icon}
                <span className="tracking-wide uppercase font-bold text-[10px]">{item.id}</span>
              </div>
              {item.badge && <span className="bg-red-50 text-neutral-900 text-[10px] px-2 py-0.5 rounded-full font-bold">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/10 mt-auto">
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Enterprise Dev</p>
            <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed">Full system audit enabled.</p>
            <button className="w-full bg-white text-neutral-900 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors shadow-lg">Docs</button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-neutral-900 text-white p-8 z-[70] lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <Link to="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white flex items-center justify-center text-neutral-900 rounded-xl">
                    <Package size={20} />
                  </div>
                  <span className="font-display text-2xl font-bold tracking-tighter">LUXE.</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>

              <div className="px-4 py-1.5 bg-white/10 rounded-full mb-10 self-start border border-white/5">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/50">System Admin</p>
              </div>

              <nav className="space-y-2 flex-grow">
                {[
                  { id: 'Overview', icon: <LayoutDashboard size={20} /> },
                  { id: 'Products', icon: <Package size={20} /> },
                  { id: 'Orders', icon: <ShoppingBag size={20} />, badge: 3 },
                  { id: 'Customers', icon: <Users size={20} /> },
                  { id: 'Settings', icon: <Settings size={20} /> },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                      activeView === item.id 
                        ? 'bg-white text-neutral-900 shadow-xl' 
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {item.icon}
                      <span className="tracking-wide uppercase font-bold text-[10px]">{item.id}</span>
                    </div>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-y-auto w-full">
        <header className="bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 sm:px-10 py-4 sm:py-6 sticky top-0 z-50 flex justify-between items-center">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 rounded-xl bg-neutral-100/50 flex items-center justify-center text-neutral-900"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center bg-neutral-100/50 px-5 py-3 rounded-2xl w-full sm:w-96 group focus-within:ring-4 focus-within:ring-neutral-900/5 transition-all border border-neutral-100 hidden sm:flex">
              <Search size={18} className="text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
              <input 
                type="text" 
                placeholder="Query nodes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full ml-3 focus:ring-0 placeholder:text-neutral-300"
              />
            </div>
            <div className="lg:hidden">
               <span className="font-display text-xl font-bold tracking-tighter">LUXE.</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-8">
            <div className="flex space-x-2 sm:space-x-4 items-center mr-0 sm:mr-4">
              <button className="w-10 h-10 rounded-xl bg-neutral-100/50 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors">
                <Bell size={20} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-neutral-100/50 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors hidden sm:flex">
                <Settings size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => refreshStore()}
                    className="hidden sm:flex items-center space-x-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                    title="Force Data Sync"
                  >
                    <Activity size={18} className="animate-pulse text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live Sync</span>
                  </button>
                  <div className="relative group hidden sm:block">
                <p className="text-sm font-bold">Admin Manager</p>
                <div className="flex items-center justify-end space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <p className="text-[9px] font-black uppercase tracking-tight text-emerald-600 truncate max-w-[50px]">{activeUsers}</p>
                  </div>
                  <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                  <p className="text-[9px] font-black uppercase tracking-tight text-neutral-400">Security: T1</p>
                </div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-900 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold ring-4 ring-neutral-100 shadow-lg cursor-pointer hover:scale-105 transition-transform">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-10 space-y-6 sm:space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end space-y-4 sm:space-y-0">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-2">Internal Administration</p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight">{activeView} Intelligence</h1>
            </div>
            {activeView === 'Products' && (
              <button 
                onClick={() => handleOpenModal()}
                className="px-8 py-4 bg-neutral-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-3 hover:shadow-2xl hover:shadow-neutral-900/20 transition-all active:scale-95"
              >
                <Plus size={18} />
                <span>Add New Product</span>
              </button>
            )}
            {activeView === 'Overview' && (
               <div className="flex flex-wrap gap-3">
                 <button 
                  onClick={() => handleOpenModal()}
                  className="px-6 py-3 bg-neutral-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10 flex items-center space-x-2"
                 >
                   <Plus size={14} />
                   <span>Add New Product</span>
                 </button>
                 <button 
                  onClick={() => {
                    const newEvent = {
                      id: Date.now(),
                      type: 'order',
                      user: 'Manual Trigger',
                      action: 'triggered a simulation event',
                      time: 'Just now',
                      amount: `$${Math.floor(Math.random() * 500)}`
                    };
                    setActivities(prev => [newEvent, ...prev.slice(0, 9)]);
                    setNotification('Simulation event triggered');
                    setTimeout(() => setNotification(null), 2000);
                  }}
                  className="px-6 py-3 bg-white border border-neutral-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors shadow-sm"
                 >
                   Simulate Event
                 </button>
                 <button className="px-6 py-3 bg-white border border-neutral-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors shadow-sm hidden sm:block">Full Export</button>
               </div>
            )}
          </div>

          {activeView === 'Overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
                {stats.map((s) => (
                  <motion.div 
                    key={s.label} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-neutral-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform hidden sm:block">
                      {s.icon}
                    </div>
                    <div className={`${s.color} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-neutral-900 mb-6 sm:mb-8 group-hover:rotate-6 transition-transform`}>
                      {s.icon}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                       <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">{s.label}</p>
                       <div className={`flex items-center text-[8px] font-black px-1.5 py-0.5 rounded-md ${s.isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                          {s.trend}
                       </div>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter">{s.value}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-neutral-100 shadow-sm relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 space-y-4 sm:space-y-0">
                     <div>
                        <h2 className="font-display font-bold text-2xl uppercase tracking-tighter">Performance Outlook</h2>
                        <p className="text-neutral-400 text-xs mt-1">Net revenue growth over current cycle.</p>
                     </div>
                     <div className="flex bg-neutral-50 p-1.5 rounded-2xl border border-neutral-100">
                        {['Daily', 'Weekly', 'Monthly'].map(p => (
                          <button key={p} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${p === 'Weekly' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400'}`}>{p}</button>
                        ))}
                     </div>
                  </div>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={SALES_DATA}>
                        <defs>
                          <linearGradient id="proGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#171717" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#171717" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#FAFAFA" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: '#D4D4D4', fontSize: 10, fontWeight: 800}} 
                          dy={15}
                        />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '24px', padding: '20px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                          itemStyle={{ color: '#FFF', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                          labelStyle={{ color: '#737373', fontSize: '10px', marginBottom: '8px', fontWeight: 800 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="sales" 
                          stroke="#171717" 
                          strokeWidth={4}
                          fill="url(#proGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Categories & Segments */}
                <div className="bg-white p-10 rounded-[48px] border border-neutral-100 shadow-sm flex flex-col">
                  <h2 className="font-display font-bold text-2xl uppercase tracking-tighter mb-4">Inventory Mix</h2>
                  <p className="text-neutral-400 text-xs mb-10">Weight by product cluster.</p>
                  
                  <div className="h-64 w-full mb-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={CATEGORY_DATA}
                          innerRadius={80}
                          outerRadius={100}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {CATEGORY_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '16px' }}
                          itemStyle={{ color: '#FFF', fontSize: '10px', fontWeight: 900 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    {CATEGORY_DATA.map((item) => (
                      <div key={item.name} className="flex justify-between items-center group cursor-pointer">
                        <div className="flex items-center space-x-3">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-neutral-900 transition-colors">{item.name}</span>
                        </div>
                        <span className="text-[10px] font-black">{item.value}%</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-auto w-full py-4 border border-neutral-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center justify-center space-x-2">
                     <span>Optimization Tools</span>
                     <ExternalLink size={12} />
                  </button>
                </div>
              </div>

              {/* Latest Transactions */}
              <div className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-neutral-100 shadow-sm overflow-hidden">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 space-y-4 sm:space-y-0">
                    <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tighter">Recent Movements</h2>
                    <div className="flex items-center space-x-4">
                       <button 
                         onClick={() => handlePurgeSegment('activities', 'Activities')} 
                         className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                       >
                         Clear Audit
                       </button>
                       <button className="text-[10px] font-black uppercase tracking-widest text-neutral-900 border-b-2 border-neutral-900 pb-0.5">Audit All</button>
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-black text-neutral-300 uppercase tracking-widest bg-neutral-50/30">
                          <th className="px-6 py-5">Originator</th>
                          <th className="px-6 py-5">Action Type</th>
                          <th className="px-6 py-5">Timestamp</th>
                          <th className="px-6 py-5 text-right">Magnitude</th>
                          <th className="px-6 py-5 text-right">Clear</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-50 text-[10px] font-bold">
                        <AnimatePresence initial={false}>
                          {activities.map((act) => (
                            <motion.tr 
                              key={act.id} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="group hover:bg-neutral-50/50 transition-colors"
                            >
                              <td className="px-6 py-6 flex items-center space-x-4">
                                 <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center font-black text-[10px]">
                                    {act.user ? act.user[0] : 'S'}
                                 </div>
                                 <div className="flex flex-col">
                                    <p className="text-xs font-bold">{act.user || 'System'}</p>
                                    <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-tight">Level: Secure</p>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors">{act.action}</span>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{act.time}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <span className="font-display font-black text-sm">{act.amount || '—'}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <button 
                                   onClick={() => handleDeleteActivity(act.id)} 
                                   className="p-2 text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                   title="Clear Record"
                                 >
                                   <X size={14} />
                                 </button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                 </div>
              </div>
            </>
          )}

          {activeView === 'Products' && (
            <div className="space-y-8">
              {/* Inventory Intelligence Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Total Units', value: products.reduce((acc, p) => acc + (p.stock || 0), 0), icon: <Package size={16} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Active SKUs', value: products.length, icon: <Activity size={16} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Low Stock', value: products.filter(p => p.stock > 0 && p.stock < 15).length, icon: <TrendingUp size={16} />, color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'Depleted', value: products.filter(p => (p.stock || 0) === 0).length, icon: <X size={16} />, color: 'text-red-600', bg: 'bg-red-50' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex items-center space-x-4">
                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">{stat.label}</p>
                      <p className="text-xl font-display font-bold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[32px] sm:rounded-[48px] shadow-sm border border-neutral-100 overflow-hidden">
                <div className="p-6 sm:p-10 border-b border-neutral-50 flex flex-col lg:flex-row justify-between lg:items-center space-y-4 lg:space-y-0">
                  <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight">Active Inventory</h2>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handlePurgeSegment('products', 'Inventory')} 
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                    >
                      Purge Collection
                    </button>
                    <div className="flex bg-neutral-50 p-1 rounded-2xl border border-neutral-100 self-start lg:self-auto overflow-x-auto max-w-full">
                      {['All Items', 'Limited Stock', 'Drafts'].map(f => (
                        <button key={f} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${f === 'All Items' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400'}`}>{f}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-neutral-300 uppercase tracking-widest bg-neutral-50/30 border-b border-neutral-50">
                        <th className="px-10 py-6">Identity</th>
                        <th className="px-10 py-6">SKU / Code</th>
                        <th className="px-10 py-6">Resource Allocation</th>
                        <th className="px-10 py-6">Value Unit</th>
                        <th className="px-10 py-6 text-right">Management</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                       {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-50/50 transition-all group">
                          <td className="px-10 py-8">
                            <div className="flex items-center space-x-5">
                              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm relative group-hover:scale-105 transition-transform">
                                <img src={p.image} className="w-full h-full object-cover" alt="" />
                                <div className={`absolute top-1 right-1 w-2 h-2 rounded-full border border-white ${p.status === 'Draft' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                              </div>
                              <div>
                                 <p className="font-bold text-sm tracking-tight group-hover:text-neutral-900 transition-colors">{p.name}</p>
                                 <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">{p.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                             <code className="text-[10px] font-black bg-neutral-50 px-2 py-1 rounded-md text-neutral-500">
                               {p.sku || `LX-${p.id.toString().slice(-4)}`}
                             </code>
                          </td>
                          <td className="px-10 py-6">
                             <div className="w-32">
                                <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">
                                   <span>Availability</span>
                                   <span className="text-neutral-900">{p.stock !== undefined ? p.stock : 85}%</span>
                                </div>
                                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden border border-neutral-50 shadow-inner">
                                   <div 
                                     className={`h-full rounded-full transition-all duration-1000 ${
                                       (p.stock !== undefined ? p.stock : 85) < 15 
                                         ? 'bg-gradient-to-r from-red-500 to-orange-400' 
                                         : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                     }`} 
                                     style={{ width: `${p.stock !== undefined ? p.stock : 85}%` }} 
                                   />
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-6 font-display font-black text-sm">${p.price}</td>
                          <td className="px-10 py-6 text-right space-x-2">
                            <button onClick={() => handleOpenModal(p)} className="w-12 h-12 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-xl rounded-2xl transition-all" title="View Entity">
                              <Eye size={18} />
                            </button>
                            <button onClick={() => handleOpenModal(p)} className="w-12 h-12 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-white hover:shadow-xl rounded-2xl transition-all" title="Edit Node">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="w-12 h-12 inline-flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all" title="Purge Node">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeView === 'Orders' && (
            <div className="bg-white rounded-[32px] sm:rounded-[48px] shadow-sm border border-neutral-100 overflow-hidden">
              <div className="p-6 sm:p-10 border-b border-neutral-50 flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
                 <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight">Transaction Log</h2>
                 <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handlePurgeSegment('orders', 'Orders')} 
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                    >
                      Purge Ledger
                    </button>
                    <select className="bg-neutral-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none border border-neutral-100">
                       <option>Latest First</option>
                       <option>High Value</option>
                    </select>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-neutral-300 uppercase tracking-widest bg-neutral-50/30 border-b border-neutral-50">
                      <th className="px-10 py-6">Reference ID</th>
                      <th className="px-10 py-6">Consumer</th>
                      <th className="px-10 py-6">Status Marker</th>
                      <th className="px-10 py-6">Total Volume</th>
                      <th className="px-10 py-6 text-right">Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-neutral-50/50 transition-all group">
                        <td className="px-10 py-8 font-black text-xs text-neutral-900">#{o.id.replace('#', '')}</td>
                        <td className="px-10 py-6">
                           <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-black">{o.customer[0]}</div>
                              <span className="font-bold text-xs">{o.customer}</span>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <span className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                             o.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                             o.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                           }`}>
                             {o.status}
                           </span>
                        </td>
                        <td className="px-10 py-6 font-display font-black text-sm">${o.total}</td>
                        <td className="px-10 py-6 text-right space-x-2">
                           <button className="w-10 h-10 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors" title="Audit Transaction">
                              <MoreVertical size={18} />
                           </button>
                           <button 
                             onClick={() => handleDeleteOrder(o.id)} 
                             className="w-10 h-10 inline-flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" 
                             title="Purge Order"
                           >
                              <Trash2 size={16} />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'Customers' && (
            <div className="bg-white rounded-[32px] sm:rounded-[48px] shadow-sm border border-neutral-100 overflow-hidden">
              <div className="p-6 sm:p-10 border-b border-neutral-50 flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
                 <h2 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight">Consumer Base</h2>
                 <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handlePurgeSegment('customers', 'Customers')} 
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                    >
                      Reset Base
                    </button>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Tracking {filteredCustomers.length} Verified Segments</p>
                 </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-neutral-300 uppercase tracking-widest bg-neutral-50/30 border-b border-neutral-50">
                      <th className="px-10 py-6">Identity Profile</th>
                      <th className="px-10 py-6">Engagement</th>
                      <th className="px-10 py-6">Localization</th>
                      <th className="px-10 py-6">Lifetime Yield</th>
                      <th className="px-10 py-6 text-right">Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-50">
                    {filteredCustomers.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-50/50 transition-all group">
                        <td className="px-10 py-8">
                           <div>
                              <p className="font-black text-sm tracking-tight mb-1">{c.name}</p>
                              <p className="text-[10px] text-neutral-400 font-bold tracking-tight uppercase">{c.email}</p>
                           </div>
                        </td>
                        <td className="px-10 py-6">
                           <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md">{c.orders} Orders</span>
                              <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Active since {c.joined || 'Jan 2026'}</span>
                           </div>
                        </td>
                        <td className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-neutral-500">{c.location || 'San Francisco, US'}</td>
                        <td className="px-10 py-6 text-right font-display font-black text-sm text-emerald-600">${c.totalSpent}</td>
                        <td className="px-10 py-6 text-right space-x-2">
                            <button className="w-10 h-10 inline-flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors" title="Consumer Profile">
                               <User size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteCustomer(c.id)} 
                              className="w-10 h-10 inline-flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" 
                              title="Purge Consumer"
                            >
                               <UserMinus size={16} />
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeView === 'Settings' && (
            <div className="max-w-4xl mx-auto space-y-10 pb-20">
              <div className="bg-white rounded-[48px] p-10 border border-neutral-100 shadow-sm">
                <h2 className="font-display font-bold text-2xl uppercase tracking-tight mb-8">System Configuration</h2>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Store Environment</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border-none text-sm font-bold outline-none">
                        <option>Production (Live)</option>
                        <option>Staging</option>
                        <option>Maintenance</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Currency Unit</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-neutral-50 border-none text-sm font-bold outline-none">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-50">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6">API & Integration</h3>
                    <div className="p-6 bg-neutral-900 rounded-3xl text-white space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] font-bold text-neutral-400 uppercase">Production API Key</p>
                          <code className="text-xs">lx_live_8239...j92k</code>
                        </div>
                        <button className="text-[10px] font-bold uppercase py-2 px-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">Reveal</button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button 
                      onClick={() => {
                        setNotification('System settings synchronized');
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="px-10 py-5 bg-neutral-900 text-white rounded-[28px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-red-50/50 rounded-[48px] p-10 border border-red-100">
                <h2 className="text-red-600 font-display font-bold text-2xl uppercase tracking-tight mb-2">Danger Zone</h2>
                <p className="text-red-500/60 text-xs mb-8">Irreversible system actions. Use with extreme caution.</p>
                <button 
                  onClick={() => {
                    if (window.confirm('WIPE ALL DATA? This will reset all entities to default.')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="px-8 py-4 border-2 border-red-200 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                >
                  Purge Entire Data Node
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-8 left-1/2 z-[110] bg-neutral-900 text-white px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center space-x-4 border border-white/10"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal - Enterprise Style */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-neutral-900/80 backdrop-blur-xl"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-2xl rounded-[30px] sm:rounded-[60px] shadow-2xl relative z-10 overflow-y-auto max-h-[95vh] border border-white/10"
            >
              <div className="p-12 border-b border-neutral-50 flex justify-between items-center bg-neutral-50/20">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tighter">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                  <p className="text-neutral-400 text-[10px] mt-2 font-bold uppercase tracking-widest">Enterprise Inventory v1.0.5</p>
                </div>
                <button onClick={handleCloseModal} className="w-16 h-16 flex items-center justify-center bg-white shadow-xl rounded-3xl text-neutral-400 hover:text-neutral-900 transition-all duration-300"><X size={28} /></button>
              </div>
              <form onSubmit={handleSave} className="p-12 space-y-10">
                <div className="grid grid-cols-2 gap-10">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">Entity Identifier</label>
                    <input 
                      required
                      placeholder="e.g. Premium Silk Tunic"
                      className="w-full px-8 py-5 rounded-[24px] bg-neutral-50 border-none focus:ring-4 focus:ring-neutral-900/5 text-sm font-bold transition-all placeholder:text-neutral-200"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">SKU Code</label>
                    <input 
                      disabled
                      className="w-full px-8 py-5 rounded-[24px] bg-neutral-100 border-none text-[10px] font-black uppercase text-neutral-400"
                      value={formData.sku}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">Base Value ($)</label>
                    <input 
                      required
                      type="number"
                      className="w-full px-8 py-5 rounded-[24px] bg-neutral-50 border-none focus:ring-4 focus:ring-neutral-900/5 text-sm font-bold transition-all"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">Cluster</label>
                    <select 
                      className="w-full px-8 py-5 rounded-[24px] bg-neutral-50 border-none focus:ring-4 focus:ring-neutral-900/5 text-xs font-black uppercase tracking-widest appearance-none outline-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Apparel</option>
                      <option>Accessories</option>
                      <option>Footwear</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">Inventory Level</label>
                    <input 
                      required
                      type="number"
                      className="w-full px-8 py-5 rounded-[24px] bg-neutral-50 border-none focus:ring-4 focus:ring-neutral-900/5 text-sm font-bold transition-all"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">Description Intel</label>
                    <textarea 
                      rows={3}
                      placeholder="Enter detailed technical specifications..."
                      className="w-full px-8 py-5 rounded-[24px] bg-neutral-50 border-none focus:ring-4 focus:ring-neutral-900/5 text-sm font-bold transition-all placeholder:text-neutral-200 resize-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4">Visual Asset Vector</label>
                    <input 
                      required
                      placeholder="https://images.unsplash..."
                      className="w-full px-8 py-5 rounded-[24px] bg-neutral-50 border-none focus:ring-4 focus:ring-neutral-900/5 text-[10px] font-bold transition-all"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>
                </div>
                <div className="pt-10 flex justify-end space-x-6">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="px-10 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] hover:text-neutral-900 transition-colors"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="px-16 py-5 bg-neutral-900 text-white rounded-[28px] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-neutral-900/40 hover:scale-105 active:scale-95 transition-all"
                  >
                    {editingProduct ? 'Save Changes' : 'Add Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
