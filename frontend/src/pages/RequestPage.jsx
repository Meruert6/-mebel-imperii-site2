// frontend/src/pages/RequestPage.jsx

import React, { useEffect, useState } from 'react';
import api from '../api';

export default function RequestPage() {
  const [kitchens, setKitchens] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    comment: '',
    kitchenId: ''
  });
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  useEffect(() => {
    const loadKitchens = async () => {
      try {
        const response = await api.get('/kitchens');
        setKitchens(response.data);
      } catch (error) {
        console.error('Failed to load kitchens', error);
      }
    };
    loadKitchens();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, message: '', error: '' });
    try {
      await api.post('/requests', {
        ...form,
        kitchenId: form.kitchenId || undefined
      });
      setForm({ name: '', phone: '', comment: '', kitchenId: '' });
      setStatus({ loading: false, message: 'Заявка отправлена!', error: '' });
    } catch (error) {
      const apiError = error.response?.data?.error;
      const fallbackMessage =
        apiError?.includes('Database is unavailable') ||
        apiError?.includes('Database') ||
        apiError?.includes('database')
          ? 'Сервер базы данных недоступен. Запустите PostgreSQL и попробуйте снова.'
          : 'Не удалось отправить заявку';
      setStatus({
        loading: false,
        message: '',
        error: apiError || fallbackMessage
      });
    }
  };

  return (
    <section className="py-10">
      <div className="container grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Оставьте заявку</h1>
          <p className="mt-3 text-sm text-slate-600">
            Заполните форму, и мы свяжемся с вами, чтобы обсудить проект.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-slate-600">
            <li>• Бесплатный замер и консультация</li>
            <li>• Расчёт стоимости в течение дня</li>
            <li>• Согласование материалов и сроков</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="text-sm font-medium text-slate-700">Имя</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Телефон</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Выберите кухню (по желанию)</label>
            <select
              name="kitchenId"
              value={form.kitchenId}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Не выбрано</option>
              {kitchens.map((kitchen) => (
                <option key={kitchen.id} value={kitchen.id}>
                  {kitchen.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Комментарий</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows={4}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>

          {status.message && <p className="text-sm text-green-600">{status.message}</p>}
          {status.error && <p className="text-sm text-red-500">{status.error}</p>}

          <button
            type="submit"
            disabled={status.loading}
            className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-70"
          >
            {status.loading ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </section>
  );
}
