'use client';

import { useState } from 'react';

const navItems = [
  { 
    name: 'Trang chủ', 
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    id: 'home'
  },
  { 
    name: 'Khám phá', 
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    id: 'explore'
  },
  { 
    name: 'Hồ sơ', 
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    id: 'profile'
  }
];

export const Navigation = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:bg-black/90 md:backdrop-blur-sm md:p-6 md:z-50">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white">VideoFeed</h1>
        </div>
        
        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-white/20 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.icon(activeTab === item.id)}
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <div>
              <p className="text-white font-medium">User Name</p>
              <p className="text-gray-400 text-sm">@username</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 z-50">
        <nav className="flex justify-around py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-4 transition-all duration-200 ${
                activeTab === item.id ? 'text-white' : 'text-gray-400'
              }`}
            >
              {item.icon(activeTab === item.id)}
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};