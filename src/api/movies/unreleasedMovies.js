import { fetchData } from '@/modules/http';

// Получаем текущую дату в формате YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

export const getUpcomingReleasesMovies = async () => {
 // Используем TMDB "upcoming" эндпоинт
 const url = `${import.meta.env.VITE_BASE_URL}movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&region=US`;

 try {
   const response = await fetchData(url);

   // Отфильтровываем фильмы, чтобы оставить только те, которые ещё не вышли
   const upcomingMovies = response.results.filter(movie => {
     const releaseDate = new Date(movie.release_date);
     return releaseDate > new Date(today); // Только будущие релизы
   });

   // Сортируем по возрастанию даты выхода, чтобы ближайшие даты были первыми
   upcomingMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

   return upcomingMovies;
 } catch (error) {
   console.error('Error fetching upcoming movies:', error);
   return [];
 }
};
