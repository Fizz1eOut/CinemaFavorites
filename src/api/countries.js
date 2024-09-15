import { fetchData } from '@/modules/http';

// Функция для получения списка стран
export const fetchCountries = () => {
  const url = `${import.meta.env.VITE_BASE_URL}configuration/countries?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
