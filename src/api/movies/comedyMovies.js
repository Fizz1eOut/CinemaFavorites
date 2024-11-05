import { fetchData } from '@/modules/http';

// Запрос на комедийные фильмы и сериалы
export const getComedyMoviesAndShows = async () => {
  const urlComedyMovies = `${import.meta.env.VITE_BASE_URL}discover/movie?with_genres=35&api_key=${import.meta.env.VITE_API_KEY}`;
  const urlComedyTvShows = `${import.meta.env.VITE_BASE_URL}discover/tv?with_genres=35&api_key=${import.meta.env.VITE_API_KEY}`; // Получение комедийных сериалов

  // Выполняем оба запроса параллельно
  const [comedyMoviesResponse, comedyTvShowsResponse] = await Promise.all([
    fetchData(urlComedyMovies),
    fetchData(urlComedyTvShows),
  ]);

  // Ремаппинг данных для сериалов
  const remappedComedyTvShows = comedyTvShowsResponse.results.map(series => ({
    id: series.id,
    title: series.name,
    release_date: series.first_air_date,
    genre_ids: series.genre_ids,
    vote_average: series.vote_average,
    poster_path: series.poster_path,
    overview: series.overview
  }));

  return {
    comedyMovies: comedyMoviesResponse.results,
    tvShows: remappedComedyTvShows,
  };
};
