import { fetchData } from '@/modules/http';

export const getNewReleases = () => {
  const url = `${import.meta.env.VITE_BASE_URL}movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
