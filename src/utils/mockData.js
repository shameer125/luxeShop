export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Classic Silk Shirt",
    price: 120,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
    description: "A timeless silk shirt with a modern tailored fit. Perfect for any formal or semi-formal occasion.",
    rating: 4.8,
    reviews: 24,
    new: true,
    stock: 12
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 185,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    description: "Handcrafted leather band with a clean, sapphire glass face. Water resistant and durably built.",
    rating: 4.9,
    reviews: 42,
    new: false,
    stock: 85
  },
  {
    id: 3,
    name: "Canvas Desert Boots",
    price: 95,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    description: "Lightweight canvas boots designed for comfort and durability during long walks.",
    rating: 4.7,
    reviews: 18,
    new: true,
    stock: 4
  },
  {
    id: 4,
    name: "Structured Wool Blazer",
    price: 250,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
    description: "Premium Italian wool blazer with a sharp, structured silhouette.",
    rating: 5.0,
    reviews: 12,
    new: false,
    stock: 0
  },
  {
    id: 5,
    name: "Geometric Gold Earrings",
    price: 65,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    description: "14k gold plated earrings featuring a unique geometric design.",
    rating: 4.6,
    reviews: 56,
    new: true,
    stock: 62
  },
  {
    id: 6,
    name: "Urban Knit Sneakers",
    price: 110,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
    description: "Breathable knit upper with custom EVA cushioning for all-day comfort.",
    rating: 4.8,
    reviews: 89,
    new: false,
    stock: 28
  }
];

export const MOCK_ORDERS = [
  { id: '#ORD-7231', customer: 'John Doe', date: '2026-03-12', total: 240, status: 'Delivered' },
  { id: '#ORD-7232', customer: 'Jane Smith', date: '2026-03-13', total: 185, status: 'Processing' },
  { id: '#ORD-7233', customer: 'Robert Brown', date: '2026-03-14', total: 65, status: 'Shipped' },
  { id: '#ORD-7234', customer: 'Emily White', date: '2026-03-14', total: 450, status: 'Pending' }
];

export const MOCK_CUSTOMERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', orders: 4, totalSpent: 840 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 2, totalSpent: 370 },
  { id: 3, name: 'Robert Brown', email: 'robert@example.com', orders: 1, totalSpent: 65 },
  { id: 4, name: 'Emily White', email: 'emily@example.com', orders: 5, totalSpent: 1250, location: 'London, UK', joined: 'Jan 2026' }
];

export const CATEGORY_DATA = [
  { name: 'Apparel', value: 45, color: '#171717' },
  { name: 'Accessories', value: 30, color: '#737373' },
  { name: 'Footwear', value: 25, color: '#A3A3A3' },
];

export const SALES_DATA = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 18 },
  { name: 'Wed', sales: 5000, orders: 32 },
  { name: 'Thu', sales: 2780, orders: 14 },
  { name: 'Fri', sales: 6890, orders: 45 },
  { name: 'Sat', sales: 8390, orders: 52 },
  { name: 'Sun', sales: 4490, orders: 28 },
];

export const RECENT_ACTIVITY = [
  { id: 1, type: 'order', user: 'Jane Smith', action: 'placed a new order', time: '2 mins ago', amount: '$185.00' },
  { id: 2, type: 'user', user: 'New Customer', action: 'created an account', time: '15 mins ago' },
  { id: 3, type: 'stock', action: 'Classic Silk Shirt is low in stock', time: '1 hour ago', level: 'Low' },
  { id: 4, type: 'order', user: 'Robert Brown', action: 'requested a return', time: '3 hours ago', amount: '$65.00' },
];
