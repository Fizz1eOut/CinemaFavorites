import { fetchData } from '@/modules/http';

// Функция для выполнения поиска по введённому тексту
export const searchMulti = async (query) => {
  const url = `${import.meta.env.VITE_BASE_URL}search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`;
  return fetchData(url);
};
