import { fetchData } from '@/modules/http';

// Функция для получения трейлера по ID фильма
export const fetchMovieTrailer = async (movieId) => {
  const url = `${import.meta.env.VITE_BASE_URL}movie/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`;

  try {
    const data = await fetchData(url);

    // Ищем трейлер среди видео
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    if (trailer) {
      return `https://www.youtube.com/watch?v=${trailer.key}`;
    } else {
      return null;
    }
  } catch (error) {
    console.warn(`Трейлер для фильма с ID ${movieId} не найден (404).`);
    throw error;
  }
};
