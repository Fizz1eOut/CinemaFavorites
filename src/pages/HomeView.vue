<script>
import { defineComponent } from 'vue';
import { getNewReleases } from '@/api/movies/newMovies';
import { fetchPopularContent } from '@/api/movies/popularMovies';
import { getComedyMoviesAndShows } from '@/api/movies/comedyMovies';
import { getHorrorMoviesAndShows } from '@/api/movies/horrorMovies';
import { getUpcomingReleasesMovies } from '@/api/movies/unreleasedMovies';
import AppContentSlider from '@/components/Base/AppContentSlider.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    AppContentSlider,
  },

  data() {
    return {
      upcomingReleasesMovies: [],
      newReleases: [],
      popularContent: [],
      comedyContent: [],
      horrorContent: [],
    };
  },

  async created() {
    await this.fetchUpcomingReleasesMovies();
    await this.fetchNewReleases();
    await this.fetchPopularMovies();
    await this.fetchComedyMoviesAndShows();
    await this.fetchHorrorMoviesAndShows();
  },

  methods: {
    async fetchUpcomingReleasesMovies() {
      try {
        const response = await getUpcomingReleasesMovies();
        this.upcomingReleasesMovies = response;
      } catch (err) {
        console.log('Error', err);
      }
    },

    async fetchNewReleases() {
      try {
        const response = await getNewReleases();

        this.newReleases = response.results;
      } catch (err) {
        console.error('Error:', err);
      }
    },

    async fetchComedyMoviesAndShows() {
      try {
        const { comedyMovies, tvShows } = await getComedyMoviesAndShows();

        // Добавляем типы для каждого элемента
        const comedyMoviesWithType = comedyMovies.map(item => ({ ...item, type: 'movie' }));
        const comedyTvShowsWithType = tvShows.map(item => ({ ...item, type: 'tv' }));

         // Максимальная длина среди массивов для итерации
         const maxLength = Math.max(comedyMoviesWithType.length, comedyTvShowsWithType.length);
        const sortedContent = [];

        // Чередуем фильмы, сериалы и анимации
        for (let i = 0; i < maxLength; i++) {
          if (i < comedyMoviesWithType.length) sortedContent.push(comedyMoviesWithType[i]);
          if (i < comedyTvShowsWithType.length) sortedContent.push(comedyTvShowsWithType[i]);
        }

        this.comedyContent = [
          ...comedyMoviesWithType,
          ...comedyTvShowsWithType,
        ];
      } catch (err) {
        console.error('Error:', err);
      }
    },

    async fetchPopularMovies() {
      try {
        const { movies, tvShows } = await fetchPopularContent();

        // Добавляем типы для каждого элемента в массиве
        const moviesWithType = movies.map(item => ({ ...item, type: 'movie' }));
        const tvShowsWithType = tvShows.map(item => ({ ...item, type: 'tv' }));


        // Максимальная длина среди массивов для итерации
        const maxLength = Math.max(moviesWithType.length, tvShowsWithType.length);
        const sortedContent = [];

        // Чередуем фильмы, сериалы и анимации
        for (let i = 0; i < maxLength; i++) {
          if (i < moviesWithType.length) sortedContent.push(moviesWithType[i]);
          if (i < tvShowsWithType.length) sortedContent.push(tvShowsWithType[i]);
        }

        // Присваиваем отсортированный массив в popularContent
        this.popularContent = sortedContent;
      } catch (err) {
        console.error('Error:', err);
      }
    },

    async fetchHorrorMoviesAndShows() {
      try {
        const { horrorMovies, tvShows } = await getHorrorMoviesAndShows();

        // Добавляем типы для каждого элемента
        const horrorMoviesWithType = horrorMovies.map(item => ({ ...item, type: 'movie' }));
        const horrorTvShowsWithType = tvShows.map(item => ({ ...item, type: 'tv' }));

        // Объединяем в один массив (при желании, можно отсортировать или чередовать)
        this.horrorContent = [
          ...horrorMoviesWithType,
          ...horrorTvShowsWithType,
        ];
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }
});
</script>

<template>
  <app-content-slider :movies="upcomingReleasesMovies">
    <template #subtitle>
      Upcoming Releases
    </template>
  </app-content-slider>

  <app-content-slider :movies="newReleases">
    <template #subtitle>
      New Releases
    </template>
  </app-content-slider>
    
  <app-content-slider :movies="comedyContent">
    <template #subtitle>
      Comedy
    </template>
  </app-content-slider>

  <app-content-slider :movies="popularContent">
    <template #subtitle>
      Popular
    </template>
  </app-content-slider>

  <app-content-slider :movies="horrorContent">
    <template #subtitle>
      Horror
    </template>
  </app-content-slider>
</template>

<style>

</style>
