import { fetchData } from '@/modules/http';

 //запрос для получения полных данных о фильме, включая бюджет и доходы
export const getMovieFinancials = async (id, type = 'tv') => {
  const url = `${import.meta.env.VITE_BASE_URL}${type}/${id}?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
