import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/goals', name: 'Goals', icon: '🎯' },
    { path: '/achievements', name: 'Achievements', icon: '🏆' },
    { path: '/settings', name: 'Settings', icon: '⚙️' }
  ];

  const isActive = (path) => location.pathname === path || (location.pathname === '/' && path === '/dashboard');

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white">Sidebar</h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                  isActive(item.path)
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;