import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [user] = useLocalStorage('luxe_user', null);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Redirect to home if admin permission is required but not met
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
