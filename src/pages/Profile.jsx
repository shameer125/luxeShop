import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Profile = () => {
  const { user, setUser, orders } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('Overview');
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [profileData, setProfileData] = React.useState({ name: user?.name || '', email: user?.email || '' });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const menuItems = [
    { id: 'Overview', icon: <User size={18} />, label: 'Overview', desc: 'Account summary' },
    { id: 'Orders', icon: <Package size={18} />, label: 'My Orders', desc: 'Track, return, or buy again' },
    { id: 'Addresses', icon: <MapPin size={18} />, label: 'Addresses', desc: 'Edit shipping information' },
    { id: 'Payment', icon: <CreditCard size={18} />, label: 'Payment', desc: 'Manage your payment methods' },
    { id: 'Settings', icon: <Settings size={18} />, label: 'Settings', desc: 'Update profile and password' },
  ];

  const userOrders = orders.filter(order => order.customer === user.name);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, ...profileData });
    setIsEditingProfile(false);
  };

  return (
    <div className="pt-32 pb-24 bg-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 border border-neutral-100 shadow-sm text-center">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-300">
                <User size={40} />
              </div>
              <h2 className="font-display font-bold text-lg mb-1">{user.name}</h2>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">{user.email}</p>
              <button 
                onClick={handleLogout}
                className="w-full py-3 border border-red-100 text-[10px] font-bold text-red-500 uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>

            <nav className="bg-white border border-neutral-100 shadow-sm overflow-hidden">
              {menuItems.map((item, idx) => (
                <button 
                  key={item.label}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-6 transition-colors hover:bg-neutral-50 ${activeTab === item.id ? 'bg-neutral-50 border-l-4 border-neutral-900' : ''} ${idx !== menuItems.length - 1 ? 'border-b border-neutral-50' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${activeTab === item.id ? 'text-neutral-900' : 'text-neutral-400'}`}>{item.icon}</div>
                    <div className="text-left">
                      <p className={`text-sm font-bold uppercase tracking-widest ${activeTab === item.id ? 'text-neutral-900' : 'text-neutral-400'}`}>{item.label}</p>
                      <p className="text-[10px] text-neutral-400">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className={`${activeTab === item.id ? 'text-neutral-900' : 'text-neutral-300'}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {activeTab === 'Overview' && (
              <div className="space-y-12">
                <div className="bg-white p-8 border border-neutral-100 shadow-sm">
                  <h1 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight">Recent Orders</h1>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100">
                          <th className="pb-4">Order ID</th>
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-50">
                        {userOrders.slice(0, 3).map((order) => (
                          <tr key={order.id} className="text-xs group hover:bg-neutral-50 transition-colors">
                            <td className="py-6 font-bold">#{order.id.slice(-6)}</td>
                            <td className="py-6 text-neutral-500">{order.date}</td>
                            <td className="py-6">
                              <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-tighter ${
                                order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' : 
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-6 text-right font-medium">${order.total}</td>
                          </tr>
                        ))}
                        {userOrders.length === 0 && (
                          <tr>
                            <td colSpan="4" className="py-12 text-center text-neutral-400 uppercase text-[10px] font-bold tracking-widest">No recent movements found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {userOrders.length > 0 && (
                    <button 
                      onClick={() => setActiveTab('Orders')}
                      className="mt-8 text-[10px] font-bold text-neutral-900 uppercase tracking-widest border-b border-neutral-900 pb-1 hover:text-neutral-500 transition-colors"
                    >
                      View All Orders
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-8 border border-neutral-100 shadow-sm">
                    <h3 className="font-display font-bold text-lg mb-4 uppercase tracking-tight">Need Help?</h3>
                    <p className="text-sm text-neutral-500 mb-6 leading-relaxed">Our support team is available 24/7 to assist with your orders or any questions about our products.</p>
                    <Link to="/contact" className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest border-b border-neutral-900 pb-1">Contact Support</Link>
                  </div>
                  <div className="bg-white p-8 border border-neutral-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg mb-4 uppercase tracking-tight">Invite a Friend</h3>
                      <p className="text-sm text-neutral-500 mb-6 leading-relaxed">Refer a friend and both of you will receive 15% off your next purchase.</p>
                    </div>
                    <button className="text-[10px] font-bold text-neutral-900 uppercase tracking-widest border-b border-neutral-900 pb-1 w-fit">Refer Now</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Orders' && (
              <div className="bg-white p-8 border border-neutral-100 shadow-sm">
                <h1 className="text-2xl font-display font-bold mb-8 uppercase tracking-tight">Order Ledger</h1>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest border-b border-neutral-100">
                        <th className="pb-4">Order ID</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50">
                      {userOrders.map((order) => (
                        <tr key={order.id} className="text-xs group hover:bg-neutral-50 transition-colors">
                          <td className="py-6 font-bold">#{order.id.slice(-8)}</td>
                          <td className="py-6 text-neutral-500">{order.date}</td>
                          <td className="py-6">
                            <span className={`px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest ${
                              order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' : 
                              order.status === 'Processing' ? 'bg-blue-50 text-blue-700' : 'bg-neutral-100 text-neutral-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-6 text-right font-display font-black text-sm">${order.total}</td>
                        </tr>
                      ))}
                      {userOrders.length === 0 && (
                        <tr>
                          <td colSpan="4" className="py-20 text-center">
                            <Package size={40} className="mx-auto text-neutral-100 mb-4" />
                            <p className="text-neutral-400 uppercase text-[10px] font-bold tracking-[0.2em]">Your collection is currently empty.</p>
                            <Link to="/shop" className="inline-block mt-6 px-8 py-3 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl">Start Shopping</Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Addresses' && (
              <div className="bg-white p-8 border border-neutral-100 shadow-sm">
                <div className="flex justify-between items-center mb-12">
                   <h1 className="text-2xl font-display font-bold uppercase tracking-tight">Shipping Repository</h1>
                   <button className="px-6 py-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl">Add New</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 border border-neutral-900 bg-neutral-50 relative group">
                      <div className="absolute top-4 right-4 bg-neutral-900 text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full">Default</div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-4">Primary Destination</p>
                      <h4 className="font-bold text-sm mb-2">{user.name}</h4>
                      <p className="text-xs text-neutral-500 leading-relaxed mb-6">123 Luxury Avenue, Suite 400<br/>San Francisco, CA 94105<br/>United States</p>
                      <div className="flex space-x-4">
                         <button className="text-[10px] font-black uppercase tracking-widest border-b border-neutral-900 pb-0.5">Edit</button>
                         <button className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Remove</button>
                      </div>
                   </div>
                   
                   <div className="p-6 border border-neutral-100 hover:border-neutral-200 transition-colors cursor-pointer flex flex-col items-center justify-center text-neutral-300 hover:text-neutral-900 border-dashed border-2">
                       <MapPin size={24} className="mb-2" />
                       <p className="text-[10px] font-black uppercase tracking-widest">Secondary address...</p>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'Payment' && (
              <div className="bg-white p-8 border border-neutral-100 shadow-sm">
                <div className="flex justify-between items-center mb-12">
                   <h1 className="text-2xl font-display font-bold uppercase tracking-tight">Financial Wallet</h1>
                   <button className="px-6 py-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl">Add card</button>
                </div>

                <div className="space-y-4">
                   <div className="p-6 border border-neutral-100 rounded-3xl flex items-center justify-between group hover:bg-neutral-50 transition-all cursor-pointer">
                      <div className="flex items-center space-x-4">
                         <div className="w-12 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white font-black text-[8px] tracking-tighter italic">VISA</div>
                         <div>
                            <p className="text-xs font-bold">•••• •••• •••• 4242</p>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Expires 12/28</p>
                         </div>
                      </div>
                      <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[8px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">Primary</span>
                         <button className="text-neutral-400 hover:text-neutral-900"><ChevronRight size={16} /></button>
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'Settings' && (
              <div className="bg-white p-8 border border-neutral-100 shadow-sm">
                <h1 className="text-2xl font-display font-bold mb-12 uppercase tracking-tight">Identity Settings</h1>
                
                <form onSubmit={handleUpdateProfile} className="max-w-xl space-y-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Full Name</label>
                      <input 
                         type="text" 
                         value={profileData.name}
                         onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                         className="w-full bg-neutral-50 border-none px-6 py-4 text-xs font-bold outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Email Address</label>
                      <input 
                         type="email" 
                         value={profileData.email}
                         onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                         className="w-full bg-neutral-50 border-none px-6 py-4 text-xs font-bold outline-none focus:ring-2 focus:ring-neutral-900 transition-all"
                      />
                   </div>
                   
                   <div className="pt-4 flex items-center space-x-6">
                      <button 
                        type="submit"
                        className="px-10 py-4 bg-neutral-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-neutral-900/20 transition-all"
                      >
                        Commit Changes
                      </button>
                      <button 
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 transition-colors"
                      >
                        Cancel
                      </button>
                   </div>
                </form>

                <div className="mt-20 pt-12 border-t border-neutral-50">
                    <h3 className="font-display font-bold text-lg mb-4 text-red-500 uppercase tracking-tight">Danger Zone</h3>
                    <p className="text-xs text-neutral-500 mb-8 max-w-md">Deactivating your account will permanently remove all orders, addresses, and payment methods from our nodes.</p>
                    <button className="px-8 py-3 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all">Deactivate Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
