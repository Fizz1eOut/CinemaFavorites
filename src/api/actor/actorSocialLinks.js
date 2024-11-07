import { fetchData } from '@/modules/http';

// Функция для получения информации об актере
export const getActorSocialLinks = (actorId) => {
  const url = `${import.meta.env.VITE_BASE_URL}person/${actorId}/external_ids?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
