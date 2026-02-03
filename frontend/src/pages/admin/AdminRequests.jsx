// frontend/src/pages/admin/AdminRequests.jsx

import React, { useEffect, useState } from 'react';
import api from '../../api';

const STATUS_LABELS = {
  NEW: 'Новая',
  IN_PROGRESS: 'В работе',
  DONE: 'Завершена'
};

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const loadRequests = async () => {
    const response = await api.get('/requests');
    setRequests(response.data);
  };

  useEffect(() => {
    loadRequests().catch((error) => console.error('Requests load error', error));
  }, []);

  const handleExport = async () => {
    setDownloading(true);
    try {
      const response = await api.get('/requests/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'requests.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    await api.patch(`/requests/${id}/status`, { status });
    await loadRequests();
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Заявки</h2>
        <p className="text-sm text-slate-600">Управляйте статусами обращений.</p>
      </div>
      <button
        onClick={handleExport}
        disabled={downloading}
        className="w-fit rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-70"
      >
        {downloading ? 'Экспорт...' : 'Скачать Excel'}
      </button>
      <div className="space-y-3">
        {requests.map((request) => (
          <div key={request.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{request.kitchen?.name || 'Без кухни'}</p>
                <h3 className="text-lg font-semibold text-slate-900">{request.name}</h3>
                <p className="text-sm text-slate-600">{request.phone}</p>
                {request.comment && (
                  <p className="mt-2 text-sm text-slate-600">{request.comment}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500">Статус</label>
                <select
                  value={request.status}
                  onChange={(event) => handleStatusChange(request.id, event.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                  {Object.keys(STATUS_LABELS).map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        {!requests.length && (
          <p className="text-sm text-slate-500">Пока нет заявок.</p>
        )}
      </div>
    </div>
  );
}
