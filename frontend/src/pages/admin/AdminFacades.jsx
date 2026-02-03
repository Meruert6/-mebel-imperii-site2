// frontend/src/pages/admin/AdminFacades.jsx

import React, { useEffect, useState } from 'react';
import api, { uploadImage } from '../../api';
import { getFallbackImage, resolveImageUrl } from '../../utils/media';

export default function AdminFacades() {
  const [facades, setFacades] = useState([]);
  const [name, setName] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: '', success: '' });

  const loadFacades = async () => {
    const response = await api.get('/facades');
    setFacades(response.data);
  };

  useEffect(() => {
    loadFacades().catch((error) => console.error('Facades load error', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    setStatus({ loading: true, error: '', success: '' });
    try {
      await api.post('/facades', { name, imageUrls });
      setName('');
      setImageUrls([]);
      await loadFacades();
      setStatus({ loading: false, error: '', success: 'Фасад сохранён.' });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.error || 'Ошибка сохранения',
        success: ''
      });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить фасад?')) return;
    await api.delete(`/facades/${id}`);
    await loadFacades();
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const response = await uploadImage(file);
      setImageUrls((prev) => [...prev, response.url]);
      setStatus({ loading: false, error: '', success: 'Фото загружено.' });
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.error || 'Не удалось загрузить фото',
        success: ''
      });
    }
  };

  const handleRemoveImage = (url) => {
    setImageUrls((prev) => prev.filter((item) => item !== url));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Фасады</h2>
        {facades.map((facade) => (
          <div
            key={facade.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              {facade.images?.[0]?.url && (
                <img
                  src={resolveImageUrl(facade.images[0].url)}
                  alt={facade.name}
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = getFallbackImage();
                  }}
                />
              )}
              <span className="text-sm text-slate-700">{facade.name}</span>
            </div>
            <button
              className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-500"
              onClick={() => handleDelete(facade.id)}
            >
              Удалить
            </button>
          </div>
        ))}
        {!facades.length && <p className="text-sm text-slate-500">Фасадов нет.</p>}
      </div>
      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Добавить фасад</h3>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="Название фасада"
        />
        <div>
          <label className="text-sm font-medium text-slate-700">Фотографии фасада</label>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <input type="file" accept="image/*" onChange={handleUpload} />
          </div>
          {imageUrls.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {imageUrls.map((url) => (
                <span
                  key={url}
                  className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                >
                  <img
                    src={resolveImageUrl(url)}
                    alt="preview"
                    className="h-8 w-8 rounded-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = getFallbackImage();
                    }}
                  />
                  <span className="max-w-[180px] truncate">{url}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        {status.error && <p className="text-sm text-red-500">{status.error}</p>}
        {status.success && <p className="text-sm text-green-600">{status.success}</p>}
        <button
          type="submit"
          disabled={status.loading}
          className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600"
        >
          {status.loading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </form>
    </div>
  );
}
