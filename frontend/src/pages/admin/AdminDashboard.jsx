// frontend/src/pages/admin/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ kitchens: 0, requests: 0, categories: 0, materials: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [kitchens, requests, categories, materials] = await Promise.all([
          api.get('/kitchens'),
          api.get('/requests'),
          api.get('/categories'),
          api.get('/materials')
        ]);
        setStats({
          kitchens: kitchens.data.length,
          requests: requests.data.length,
          categories: categories.data.length,
          materials: materials.data.length
        });
      } catch (error) {
        console.error('Dashboard stats error:', error);
      }
    };
    loadStats();
  }, []);

  const cards = [
    { label: 'Кухни', value: stats.kitchens },
    { label: 'Заявки', value: stats.requests },
    { label: 'Категории', value: stats.categories },
    { label: 'Материалы', value: stats.materials }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Добро пожаловать!</h2>
        <p className="text-sm text-slate-600">Сводка по каталогу и заявкам.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
