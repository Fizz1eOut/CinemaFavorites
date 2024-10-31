import { fetchData } from '@/modules/http';

export const getMovieDetails = async (id, type) => {
  const url = `${import.meta.env.VITE_BASE_URL}${type}/${id}/credits?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
