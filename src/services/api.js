import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_CUSTOMERS, RECENT_ACTIVITY } from '../utils/mockData';

// Simulated latency for "Real" feel
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const safeParse = (data, fallback) => {
  try {
    if (!data || data === 'undefined') return fallback;
    return JSON.parse(data);
  } catch (e) {
    console.error('Data Corruption Detected:', e);
    return fallback;
  }
};

export const api = {
  // Products
  getProducts: async () => {
    await delay(800);
    const saved = localStorage.getItem('luxe_products');
    return safeParse(saved, MOCK_PRODUCTS);
  },
  saveProducts: async (products) => {
    if (!Array.isArray(products)) {
      console.error('[API] Validation failed: products node must be an array');
      return false;
    }
    console.log('[API] Persisting product node...', products.length);
    try {
      await delay(500);
      localStorage.setItem('luxe_products', JSON.stringify(products));
      console.log('[API] Product node persisted successfully');
      return true;
    } catch (err) {
      console.error('[API] Product persistence failure:', err);
      throw err;
    }
  },

  // Orders
  getOrders: async () => {
    await delay(1200);
    const saved = localStorage.getItem('luxe_orders');
    return safeParse(saved, MOCK_ORDERS);
  },
  saveOrders: async (orders) => {
    if (!Array.isArray(orders)) {
      console.error('[API] Validation failed: orders node must be an array');
      return false;
    }
    console.log('[API] Persisting orders node...', orders.length);
    try {
      await delay(600);
      localStorage.setItem('luxe_orders', JSON.stringify(orders));
      console.log('[API] Orders persisted');
      return true;
    } catch (err) {
      console.error('[API] Orders persistence failure:', err);
      throw err;
    }
  },

  // Customers
  getCustomers: async () => {
    await delay(1000);
    const saved = localStorage.getItem('luxe_customers');
    return safeParse(saved, MOCK_CUSTOMERS);
  },
  saveCustomers: async (customers) => {
    if (!Array.isArray(customers)) {
      console.error('[API] Validation failed: customers node must be an array');
      return false;
    }
    console.log('[API] Persisting customers node...', customers.length);
    try {
      await delay(500);
      localStorage.setItem('luxe_customers', JSON.stringify(customers));
      console.log('[API] Customers persisted');
      return true;
    } catch (err) {
      console.error('[API] Customers persistence failure:', err);
      throw err;
    }
  },

  // Activities
  getActivities: async () => {
    await delay(400);
    const saved = localStorage.getItem('luxe_activities');
    return safeParse(saved, RECENT_ACTIVITY);
  },
  saveActivities: async (activities) => {
    if (!Array.isArray(activities)) {
      console.error('[API] Validation failed: activities node must be an array');
      return false;
    }
    console.log('[API] Persisting activities node...', activities.length);
    try {
      localStorage.setItem('luxe_activities', JSON.stringify(activities));
      console.log('[API] Activities persisted');
      return true;
    } catch (err) {
      console.error('[API] Activities persistence failure:', err);
      throw err;
    }
  }
};
