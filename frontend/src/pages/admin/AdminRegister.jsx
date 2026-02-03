// frontend/src/pages/admin/AdminRegister.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';

export default function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      const response = await api.post('/auth/register', form);
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.error || 'Ошибка регистрации'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container flex min-h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div>
            <p className="text-sm text-slate-500">Админ-панель</p>
            <h1 className="text-2xl font-semibold text-slate-900">Регистрация</h1>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Имя</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Пароль</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          {status.error && <p className="text-sm text-red-500">{status.error}</p>}
          <button
            type="submit"
            disabled={status.loading}
            className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-70"
          >
            {status.loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <div className="text-center text-sm text-slate-500">
            Уже есть аккаунт?{' '}
            <Link to="/admin/login" className="font-medium text-orange-600">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
