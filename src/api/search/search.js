import { fetchData } from '@/modules/http';

// Функция для выполнения поиска по введённому тексту
export const searchMulti = async (query) => {
  const url = `${import.meta.env.VITE_BASE_URL}search/multi?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`;

  const data = await fetchData(url);

  const remappedData = data.results.map(item => {
    if (item.media_type === 'tv') {
      // Применяем ремаппинг только для сериалов
      return {
        id: item.id,
        title: item.name,
        release_date: item.first_air_date,
        genre_ids: item.genre_ids,
        vote_average: item.vote_average,
        poster_path: item.poster_path,
        overview: item.overview
      };
    }
    // Оставляем остальные данные без изменений
    return item;
  });
  
  return {
    ...data,
    results: remappedData  // Заменяем результаты на ремаппленные данные
  };
};
