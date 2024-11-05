import { fetchData } from '@/modules/http';

// Запрос на фильмы и сериалы в жанре ужасов
export const getHorrorMoviesAndShows = async () => {
  const urlHorrorMovies = `${import.meta.env.VITE_BASE_URL}discover/movie?with_genres=27&api_key=${import.meta.env.VITE_API_KEY}`;
  const urlHorrorTvShows = `${import.meta.env.VITE_BASE_URL}discover/tv?with_genres=27&api_key=${import.meta.env.VITE_API_KEY}`; // Получение комедийных сериалов

  // Выполняем оба запроса параллельно
  const [horrorMoviesResponse, horrorTvShowsResponse] = await Promise.all([
    fetchData(urlHorrorMovies),
    fetchData(urlHorrorTvShows),
  ]);

  // Ремаппинг данных для сериалов
  const remappedHorrorTvShows = horrorTvShowsResponse.results.map(series => ({
    id: series.id,
    title: series.name,
    release_date: series.first_air_date,
    genre_ids: series.genre_ids,
    vote_average: series.vote_average,
    poster_path: series.poster_path,
    overview: series.overview
  }));

  return {
    horrorMovies: horrorMoviesResponse.results, // Данные о фильмах в жанре ужасов без изменений
    tvShows: remappedHorrorTvShows,             // Ремаппинг только для сериалов в жанре ужасов
  };
};
