import React from "react";
import { Link } from "react-router-dom";

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white p-6 shadow-lg h-screen">
      <h2 className="text-xl font-semibold text-yellow-400 mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="hover:text-yellow-400">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/gallery" className="hover:text-yellow-400">Gallery</Link>
        </li>
        <li>
          <Link to="/admin/users" className="hover:text-yellow-400">Users</Link>
        </li>
        <li>
          <Link to="/admin/settings" className="hover:text-yellow-400">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

// Dashboard Card Component
const DashboardCard = ({ title, count }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-yellow-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  );
};

// Admin Dashboard Page
const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-500">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Users" count={125} />
          <DashboardCard title="Gallery Images" count={64} />
          <DashboardCard title="Feedbacks" count={18} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
