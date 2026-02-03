// frontend/src/layouts/AdminLayout.jsx

import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Обзор' },
  { to: '/admin/kitchens', label: 'Кухни' },
  { to: '/admin/requests', label: 'Заявки' },
  { to: '/admin/categories', label: 'Категории' },
  { to: '/admin/materials', label: 'Материалы' },
  { to: '/admin/facades', label: 'Фасады' }
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between py-4">
          <div>
            <p className="text-sm text-slate-500">Админ-панель</p>
            <h1 className="text-xl font-semibold text-slate-900">Мебель Империи</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Открыть сайт
            </a>
            <button
              className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="container grid gap-6 py-6 lg:grid-cols-[220px_1fr]">
        <nav className="rounded-lg border border-slate-200 bg-white p-4">
          <ul className="space-y-2 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/admin'}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-2 ${
                      isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
