# LuxeShop 🛍️

LuxeShop is a premium, high-fidelity e-commerce application built with a modern tech stack. It features a sleek customer-facing storefront and a powerful administrative dashboard for seamless business management.

## ✨ Key Features

### 🛒 Customer Storefront
- **Dynamic Catalog**: Browse products across various categories with a modern grid layout.
- **Product Details**: Comprehensive views including high-quality images, descriptions, and ratings.
- **Cart & Wishlist**: Intuitive management of items for immediate purchase or future consideration.
- **Streamlined Checkout**: A smooth, multi-step checkout process for an optimal user experience.
- **Account Management**: Secure login and registration with personalized profile pages to track activity.
- **Engagement**: Interactive Blog and FAQ sections to build community and trust.

### 📊 Admin Dashboard
- **Real-time Analytics**: Interactive charts (Recharts) visualizing sales, orders, and customer growth.
- **Comprehensive Management**: Deep control over products, orders, and user data.
- **Security**: Protected admin routes ensuring only authorized personnel can access sensitive data.

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)

## 🛠️ Getting Started

### Prerequisites
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Scripts
- `npm run dev`: Start development server.
- `npm run build`: Build the production application.
- `npm run lint`: Run ESLint to find and fix problems.
- `npm run preview`: Preview the production build locally.

## 📂 Project Structure

```text
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI and Layout components
│   ├── layout/     # Shared layout wrappers
│   └── ui/         # Base UI components (buttons, inputs)
├── context/        # State management (auth, cart)
├── hooks/          # Custom React hooks
├── pages/          # Full page components
│   └── admin/      # Admin-specific dashboard pages
├── services/       # API and external service logic
├── utils/          # Utility functions and constants
├── App.jsx         # Main application routing
└── main.jsx        # Entry point
```

## 🗺️ Future Roadmap
- [ ] Integration with a real backend API.
- [ ] Payment gateway integration (Stripe/PayPal).
- [ ] Advanced product filtering and search.
- [ ] Multi-language and multi-currency support.

---
Built with ❤️ by shameer ali.
