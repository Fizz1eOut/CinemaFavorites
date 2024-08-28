import { fetchData } from '@/modules/http';

// Функция для получения фильмов с определенной страницы
export const fetchMovies = (page = 3) => {
  const url = `${import.meta.env.VITE_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&without_genres=16,10770&api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
