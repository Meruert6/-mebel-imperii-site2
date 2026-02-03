// frontend/src/utils/media.js

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const serverBase = apiBase.replace(/\/api\/?$/, '');

const FALLBACK_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDYwMCA0NTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiNFNUU3RUIiLz48dGV4dCB4PSIzMDAiIHk9IjIyNSIgc3R5bGU9ImZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtmb250LXNpemU6MzBweDtmaWxsOiM5Q0E0QUY7dGV4dC1hbmNob3I6bWlkZGxlOyI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+';

export const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/uploads')) {
    return `${serverBase}${url}`;
  }
  return url;
};

export const getFallbackImage = () => FALLBACK_IMAGE;
