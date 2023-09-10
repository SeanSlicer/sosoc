// pages/dashboard.tsx

import React from 'react';
import SignOutButton from '../components/auth/signOut';

const Dashboard: React.FC = () => {

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-1/4 h-screen p-4">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <SignOutButton />
        <ul className="space-y-4">
          <li>
            <a href="#" className="block hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-blue-500">
              Profile
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-blue-500">
              Messages
            </a>
          </li>
          {/* Add more sidebar links as needed */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-4 ml-auto">
        {/* Content goes here */}
        <h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>
        {/* Add your dashboard components and content */}
      </main>
    </div>
  );
};

export default Dashboard;