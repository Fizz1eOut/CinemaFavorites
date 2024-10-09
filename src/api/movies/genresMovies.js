import { fetchData } from '@/modules/http';

// Функция для получения списка жанров
export const fetchMovieGenres = () => {
  const url = `${import.meta.env.VITE_BASE_URL}genre/movie/list?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
