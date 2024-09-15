import { fetchData } from '@/modules/http';

// Функция для получения фильмов с фильтрацией
export const fetchMovies = (page = 1, filters = {}) => {
  const { genres, years } = filters;
  let url = `${import.meta.env.VITE_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&without_genres=16,10770&api_key=${import.meta.env.VITE_API_KEY}`;
  
  if (genres && genres.length) {
    url += `&with_genres=${genres.join(',')}`;
  }
  
  if (years && years.length) {
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    url += `&primary_release_date.gte=${minYear}-01-01&primary_release_date.lte=${maxYear}-12-31`;
  }

  return fetchData(url);
};
