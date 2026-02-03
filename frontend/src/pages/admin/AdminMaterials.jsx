// frontend/src/pages/admin/AdminMaterials.jsx

import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function AdminMaterials() {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');

  const loadMaterials = async () => {
    const response = await api.get('/materials');
    setMaterials(response.data);
  };

  useEffect(() => {
    loadMaterials().catch((error) => console.error('Materials load error', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    await api.post('/materials', { name });
    setName('');
    await loadMaterials();
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить материал?')) return;
    await api.delete(`/materials/${id}`);
    await loadMaterials();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Материалы</h2>
        {materials.map((material) => (
          <div key={material.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <span className="text-sm text-slate-700">{material.name}</span>
            <button
              className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-500"
              onClick={() => handleDelete(material.id)}
            >
              Удалить
            </button>
          </div>
        ))}
        {!materials.length && <p className="text-sm text-slate-500">Материалов нет.</p>}
      </div>
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Добавить материал</h3>
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
