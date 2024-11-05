import { fetchData } from '@/modules/http';

const urlPopularMovies = `${import.meta.env.VITE_BASE_URL}movie/popular?api_key=${import.meta.env.VITE_API_KEY}`;
const urlPopularTv = `${import.meta.env.VITE_BASE_URL}tv/popular?api_key=${import.meta.env.VITE_API_KEY}`;

export const fetchPopularContent = async () => {
  const [moviesResponse, tvShowsResponse] = await Promise.all([
    fetchData(urlPopularMovies),
    fetchData(urlPopularTv),
  ]);

  // Ремаппинг данных для сериалов
  const remappedTvShows = tvShowsResponse.results.map(series => ({
    id: series.id,
    title: series.name,
    release_date: series.first_air_date,
    genre_ids: series.genre_ids,
    vote_average: series.vote_average,
    poster_path: series.poster_path,
    overview: series.overview
  }));

  return {
    movies: moviesResponse.results,
    tvShows: remappedTvShows,
  };
};
