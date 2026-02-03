// frontend/src/pages/Contact.jsx

import React from 'react';

export default function Contact() {
  return (
    <section className="py-10">
      <div className="container grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Контакты</h1>
          <p className="mt-3 text-sm text-slate-600">
            Свяжитесь с нами удобным способом — мы ответим на вопросы и подберём решение.
          </p>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <p>Телефон: +7 701 014 4807</p>
            <p>Email: meb.imperii@mail.ru</p>
            <p>Адрес: г.Алматы, ARMADA CK, улц Кабдолов 1/8 3 блок В корпус 9 ряд</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Часы работы</h2>
          <p className="mt-3 text-sm text-slate-600">
            Наша команда работает ежедневно, без выходных и перерывов, чтобы вы могли обратиться к
            нам в любое удобное время.
          </p>
        </div>
      </div>
    </section>
  );
}
