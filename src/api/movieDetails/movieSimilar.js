import { fetchData } from '@/modules/http';

export const getSimilarMovies = async (id, mediaType) => {
  const url = `${import.meta.env.VITE_BASE_URL}${mediaType}/${id}/similar?api_key=${import.meta.env.VITE_API_KEY}`;
  
  const data = await fetchData(url);

  return data.results.map(item => ({
    id: item.id,
    title: mediaType === 'tv' ? item.name : item.title,
    release_date: mediaType === 'tv' ? item.first_air_date : item.release_date,
    genre_ids: item.genre_ids,
    vote_average: item.vote_average,
    poster_path: item.poster_path,
    overview: item.overview
  }));
};
