import { fetchData } from '@/modules/http';

export const fetchSeries = (page = 1, filters = {}) => {
  const { genres, years, country } = filters;
  let url = `${import.meta.env.VITE_BASE_URL}discover/tv?language=en-US&page=${page}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_API_KEY}`;

  if (genres && genres.length) {
    url += `&with_genres=${genres.join(',')}`;
  }

  if (years && years.length) {
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    url += `&first_air_date.gte=${minYear}-01-01&first_air_date.lte=${maxYear}-12-31`;
  }

  if (country) {
    url += `&with_origin_country=${country}`;
  }

  return fetchData(url);
};
