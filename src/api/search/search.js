import { fetchData } from '@/modules/http';

export const searchMulti = async (query) => {
  const url = `${import.meta.env.VITE_BASE_URL}search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}&language=en-US`;
  const response = await fetchData(url);
  return response;
};
