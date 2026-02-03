// frontend/src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { uploadPublicImage } from '../api';
import { getFallbackImage, resolveImageUrl } from '../utils/media';

const formatPrice = (value) => {
  if (!value) return '';
  return Number(value).toLocaleString('ru-RU');
};

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
    imageUrls: []
  });
  const [reviewStatus, setReviewStatus] = useState({ loading: false, error: '', success: '' });

  useEffect(() => {
    api
      .get('/reviews')
      .then((res) => setReviews(res.data))
      .catch((error) => console.error('Reviews fetch error', error));
  }, []);

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const available = 10 - reviewForm.imageUrls.length;
    const selected = files.slice(0, available);
    setReviewStatus({ loading: true, error: '', success: '' });
    try {
      const uploaded = [];
      for (const file of selected) {
        const response = await uploadPublicImage(file);
        uploaded.push(response.url);
      }
      setReviewForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...uploaded] }));
      setReviewStatus({ loading: false, error: '', success: 'Фото добавлены.' });
    } catch (error) {
      setReviewStatus({
        loading: false,
        error: error.response?.data?.error || 'Не удалось загрузить фото',
        success: ''
      });
    }
  };

  const handleReviewRemoveImage = (url) => {
    setReviewForm((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((item) => item !== url)
    }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setReviewStatus({ loading: true, error: '', success: '' });
    try {
      const payload = {
        name: reviewForm.name,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment || undefined,
        imageUrls: reviewForm.imageUrls
      };
      const response = await api.post('/reviews', payload);
      setReviews((prev) => [response.data, ...prev]);
      setReviewForm({ name: '', rating: 5, comment: '', imageUrls: [] });
      setReviewStatus({ loading: false, error: '', success: 'Спасибо за отзыв!' });
    } catch (error) {
      const apiError = error.response?.data;
      const detailMessage = Array.isArray(apiError?.details)
        ? apiError.details.map((item) => item.msg).join(', ')
        : '';
      setReviewStatus({
        loading: false,
        error: detailMessage || apiError?.error || 'Не удалось отправить отзыв',
        success: ''
      });
    }
  };
  return (
    <div>
      <section className="bg-slate-900 text-white">
        <div className="container grid items-center gap-10 py-16 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-wide text-orange-300">Кухни под ключ</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Современные кухни на заказ с точной подгонкой и гарантией
            </h1>
            <p className="text-base text-slate-200">
              Проектируем, производим и устанавливаем кухни за 30 дней. Выберите стиль, материалы
              и получите бесплатный расчёт.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/kitchens"
                className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Смотреть каталог
              </Link>
              <Link
                to="/request"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
          <div className="h-72 overflow-hidden rounded-2xl bg-slate-800 md:h-96">
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200"
              alt="Kitchen"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            { title: 'Дизайн проект', text: 'Подбираем планировку, материалы и цветовые решения.' },
            { title: 'Собственное производство', text: 'Контроль качества на каждом этапе.' },
            { title: 'Установка под ключ', text: 'Монтаж и финальная проверка в один день.' }
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>



      <section className="bg-slate-50 py-14">
        <div className="container grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Как мы работаем</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-600">
              <li>1. Созвон и замер помещения</li>
              <li>2. 3D-визуализация и смета</li>
              <li>3. Производство и доставка</li>
              <li>4. Монтаж и сдача проекта</li>
            </ol>
          </div>
          <div className="rounded-2xl bg-orange-500 p-8 text-white">
            <h2 className="text-2xl font-semibold">Нужна консультация?</h2>
            <p className="mt-3 text-sm text-orange-50">
              Оставьте заявку, и менеджер свяжется с вами в течение 15 минут.
            </p>
            <Link
              to="/request"
              className="mt-6 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-orange-600"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Отзывы клиентов</h2>
            <p className="text-sm text-slate-600">
              Поделитесь впечатлениями о работе с нами. Можно добавить до 10 фото.
            </p>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">{review.name}</h3>
                    <div className="flex text-orange-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index}>{index < review.rating ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
                  )}
                  {review.images?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {review.images.map((img) => (
                        <img
                          key={img.id}
                          src={resolveImageUrl(img.url)}
                          alt="review"
                          className="h-16 w-16 rounded-lg object-cover"
                          onError={(event) => {
                            event.currentTarget.src = getFallbackImage();
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {!reviews.length && (
                <p className="text-sm text-slate-500">Пока нет отзывов.</p>
              )}
            </div>
          </div>

          <form
            onSubmit={handleReviewSubmit}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">Оставить отзыв</h3>
            <div>
              <label className="text-sm font-medium text-slate-700">Имя</label>
              <input
                name="name"
                value={reviewForm.name}
                onChange={handleReviewChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Оценка</label>
              <div className="mt-2 flex gap-1 text-xl text-orange-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setReviewForm((prev) => ({ ...prev, rating: index + 1 }))}
                  >
                    {index < reviewForm.rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Комментарий</label>
              <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleReviewChange}
                rows={4}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Фото (до 10)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleReviewUpload}
                className="mt-2 text-sm text-slate-500"
              />
              {reviewForm.imageUrls.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {reviewForm.imageUrls.map((url) => (
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
                      <button
                        type="button"
                        onClick={() => handleReviewRemoveImage(url)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            {reviewStatus.error && <p className="text-sm text-red-500">{reviewStatus.error}</p>}
            {reviewStatus.success && (
              <p className="text-sm text-green-600">{reviewStatus.success}</p>
            )}
            <button
              type="submit"
              disabled={reviewStatus.loading}
              className="w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-70"
            >
              {reviewStatus.loading ? 'Отправка...' : 'Отправить отзыв'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
