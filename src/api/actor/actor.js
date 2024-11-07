import { fetchData } from '@/modules/http';

// Функция для получения информации об актере
export const getActorDetails = (actorId) => {
  const url = `${import.meta.env.VITE_BASE_URL}person/${actorId}?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
