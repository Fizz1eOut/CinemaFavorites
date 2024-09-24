import { fetchData } from '@/modules/http';

// Функция для получения мультфильмов
export const fetchAnimations = (page = 1, filters = {}) => {
  const { genres, years, country } = filters;
  
  // Всегда добавляем жанр "Animation" (id: 16) для фильтрации только мультфильмов
  let url = `${import.meta.env.VITE_BASE_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&api_key=${import.meta.env.VITE_API_KEY}&with_genres=16`;

  if (genres && genres.length) {
    url += `,${genres.join(',')}`;
  }

  if (years && years.length) {
    url += `&primary_release_year=${years.join(',')}`;
  }

  if (country) {
    url += `&with_origin_country=${country}`;
  }

  return fetchData(url);
};
