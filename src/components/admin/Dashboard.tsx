import React from 'react';
import { useAuthStore } from '../../lib/store';

const AdminDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}</h2>
        <p className="text-gray-300">
          This is a protected admin dashboard. Only authenticated users can access this page.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;