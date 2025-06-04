import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../lib/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login\" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;