import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

import { useLocalStorage } from '../hooks/useLocalStorage';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('luxe_user', null);
  const [products, _setProducts] = useState([]);
  const [orders, _setOrders] = useState([]);
  const [customers, _setCustomers] = useState([]);
  const [activities, _setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for synchronous state access in async functions
  const productsRef = React.useRef([]);
  const ordersRef = React.useRef([]);
  const customersRef = React.useRef([]);
  const activitiesRef = React.useRef([]);

  // Initial Data Fetch
  useEffect(() => {
    const initStore = async () => {
      setLoading(true);
      try {
        const [p, o, c, a] = await Promise.all([
          api.getProducts(),
          api.getOrders(),
          api.getCustomers(),
          api.getActivities()
        ]);
        
        productsRef.current = p;
        ordersRef.current = o;
        customersRef.current = c;
        activitiesRef.current = a;

        _setProducts(p);
        _setOrders(o);
        _setCustomers(c);
        _setActivities(a);
      } catch (err) {
        console.error('Failed to initialize store:', err);
      } finally {
        setLoading(false);
      }
    };
    initStore();
  }, []);

  const updateEntities = async ({ products: p, orders: o, customers: c, activities: a }) => {
    console.log('[Store] Synchronized update initiated...', { products: !!p, orders: !!o, customers: !!c, activities: !!a });
    
    try {
      const saveOps = [];

      if (p !== undefined) {
        const next = typeof p === 'function' ? p(productsRef.current) : p;
        productsRef.current = next;
        _setProducts(next);
        saveOps.push(api.saveProducts(next));
      }
      
      if (o !== undefined) {
        const next = typeof o === 'function' ? o(ordersRef.current) : o;
        ordersRef.current = next;
        _setOrders(next);
        saveOps.push(api.saveOrders(next));
      }
      
      if (c !== undefined) {
        const next = typeof c === 'function' ? c(customersRef.current) : c;
        customersRef.current = next;
        _setCustomers(next);
        saveOps.push(api.saveCustomers(next));
      }
      
      if (a !== undefined) {
        const next = typeof a === 'function' ? a(activitiesRef.current) : a;
        activitiesRef.current = next;
        _setActivities(next);
        saveOps.push(api.saveActivities(next));
      }

      if (saveOps.length > 0) {
        await Promise.all(saveOps);
        console.log('[Store] Persistence verified for all nodes');
      }
      
      return true;
    } catch (err) {
      console.error('[Store] Synchronized update failed:', err);
      throw err;
    }
  };

  const addOrder = async (order, activity) => {
    return updateEntities({
      orders: prev => [order, ...(prev || [])],
      activities: prev => [activity, ...(prev || []).slice(0, 9)]
    });
  };

  const value = {
    user,
    setUser,
    products: productsRef.current, // Provide ref current for latest view
    setProducts: (p) => updateEntities({ products: p }),
    orders: ordersRef.current,
    setOrders: (o) => updateEntities({ orders: o }),
    customers: customersRef.current,
    setCustomers: (c) => updateEntities({ customers: c }),
    activities: activitiesRef.current,
    setActivities: (a) => updateEntities({ activities: a }),
    addOrder,
    refreshStore: () => {
       console.log('[Store] Force refresh triggered');
       window.location.reload();
    },
    loading,
    updateEntities // Export for consolidated updates
  };

  // Re-render trigger when state changes 
  // (React will re-render when _setProducts etc. are called, 
  // and we use the refs in the value object to ensure consumers see the latest data)
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, [products, orders, customers, activities]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
