// frontend/src/pages/admin/AdminCategories.jsx

import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const loadCategories = async () => {
    const response = await api.get('/categories');
    setCategories(response.data);
  };

  useEffect(() => {
    loadCategories().catch((error) => console.error('Categories load error', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    await api.post('/categories', { name });
    setName('');
    await loadCategories();
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить категорию?')) return;
    await api.delete(`/categories/${id}`);
    await loadCategories();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Категории</h2>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <span className="text-sm text-slate-700">{category.name}</span>
            <button
              className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-500"
              onClick={() => handleDelete(category.id)}
            >
              Удалить
            </button>
          </div>
        ))}
        {!categories.length && <p className="text-sm text-slate-500">Категорий нет.</p>}
      </div>
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Добавить категорию</h3>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="Название"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
