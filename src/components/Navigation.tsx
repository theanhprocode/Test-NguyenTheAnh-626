'use client';

import { useState } from 'react';

const navItems = [
  {
    id: 'home',
    name: 'Trang chủ',
    icon: (active: boolean) => (
      <svg fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3 12 2-2m0 0 7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'explore',
    name: 'Khám phá',
    icon: () => (
      <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    name: 'Hồ sơ',
    icon: () => (
      <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export const Navigation = () => {
  const [active, setActive] = useState('home');

  return (
    <>
      {/* Sidebar trái (desktop) */}
      <aside className="sidebar">
        <div className="sidebar-logo">VideoFeed</div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`sidebar-item${active === item.id ? ' active' : ''}`}
            >
              {item.icon(active === item.id)}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-avatar">U</div>
          <div>
            <div className="sidebar-user-name">User Name</div>
            <div className="sidebar-user-handle">@username</div>
          </div>
        </div>
      </aside>

      {/* Bottom nav (mobile) */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`bottom-nav-item${active === item.id ? ' active' : ''}`}
          >
            {item.icon(active === item.id)}
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
