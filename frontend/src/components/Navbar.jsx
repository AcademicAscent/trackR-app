// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const navItems = [
//     { path: '/dashboard', name: 'Dashboard', icon: '📊' },
//     { path: '/goals', name: 'Goals', icon: '🎯' },
//     { path: '/achievements', name: 'Achievements', icon: '🏆' }
//   ];

//   const isActive = (path) => location.pathname === path || (location.pathname === '/' && path === '/dashboard');

//   return (
//     <nav className="bg-white shadow-lg border-b-2 border-red-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
//               <div className="text-2xl">🐜</div>
//               <h1 className="text-2xl font-bold text-slate-800">Goal Tracker</h1>
//             </button>
//           </div>

//           {/* Navigation Links */}
//           <div className="flex space-x-2">
//             {navItems.map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => navigate(item.path)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
//                   isActive(item.path)
//                     ? 'bg-red-500 text-white shadow-md'
//                     : 'text-slate-600 hover:bg-red-50 hover:text-red-600'
//                 }`}
//               >
//                 <span className="text-lg">{item.icon}</span>
//                 <span>{item.name}</span>
//               </button>
//             ))}
//           </div>

//           {/* User Stats */}
//           <div className="flex items-center space-x-4 text-sm">
//             <div className="flex items-center space-x-1 bg-red-50 px-3 py-2 rounded-lg">
//               <span>🔥</span>
//               <span className="font-medium text-red-600">3 day streak</span>
//             </div>
//             <div className="flex items-center space-x-1 bg-red-50 px-3 py-2 rounded-lg">
//               <span>🏆</span>
//               <span className="font-medium text-red-600">2 badges</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;