import { fetchData } from '@/modules/http';

export const fetchTvGenres = () => {
  const url = `${import.meta.env.VITE_BASE_URL}genre/tv/list?language=en-US&api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
