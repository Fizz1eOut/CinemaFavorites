import { fetchData } from '@/modules/http';

export const getActorKnownForMovies = (actorId) => {
  const url = `${import.meta.env.VITE_BASE_URL}person/${actorId}/movie_credits?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
