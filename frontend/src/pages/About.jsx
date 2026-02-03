// frontend/src/pages/About.jsx

import React from 'react';

export default function About() {
  return (
    <section className="py-10">
      <div className="container space-y-6">
        <h1 className="text-3xl font-semibold text-slate-900">О компании</h1>
        <p className="text-sm text-slate-600">
          Мебель Империи — команда инженеров и дизайнеров, которая создаёт кухни с учётом
          эргономики и эстетики. Мы работаем по прозрачной смете и соблюдаем сроки.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: '10+ лет опыта', text: 'Сотни реализованных проектов по всей России.' },
            { title: 'Собственное производство', text: 'Контролируем качество материалов.' },
            { title: 'Гарантия 2 года', text: 'Постгарантийное обслуживание и поддержка.' }
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
