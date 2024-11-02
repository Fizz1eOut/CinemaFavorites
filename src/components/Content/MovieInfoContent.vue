<script>
import { defineComponent } from 'vue';
import { useGenresStore } from '@/store/genres.js';
import { getMovieFinancials } from '@/api/movieDetails/movieFinancials'

export default defineComponent({
  name: 'MovieInfoContent',

  props: {
    movie: {
      type: Object,
      required: true,
    },
    movieDetails: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      movieFinancials: {},
    };
  },

  computed: {
    genreNames() {
      const genresStore = useGenresStore();
      return this.movie.genre_ids
        .map((id) => {
          const name = genresStore.genresMap[id];
          return name ? { id, name } : null;
        })
        .filter(Boolean);
    },
    
    directors() {
      return this.movieDetails.crew
        ?.filter(member => member.job === 'Director')
        .map(director => director.name) || [];
    },

    writers() {
      return this.movieDetails.crew
        ?.filter(member => member.job === 'Screenplay' || member.job === 'Writer')
        .map(writer => writer.name) || [];
    },

    topActors() {
      return this.movieDetails.cast?.slice(0, 5).map(actor => actor.name) || [];
    }
  },

  watch: {
    movie: {
      immediate: true,
      handler() {
        this.fetchMovieFinancials();
      }
    }
  },

  async created() {
    await this.fetchMovieFinancials();
  },

  methods: {
    async fetchMovieFinancials() {
      try {
        const response = await getMovieFinancials(this.movie.id, this.movie.media_type);
        console.log(this.movie.media_type)
        this.movieFinancials = response;
        console.log(this.movieFinancials)
      } catch (err) {
        this.error = 'Error retrieving movie financials';
      }
    },
  }
});
</script>

<template>
  <div class="movie-info__content content">
    <div v-if="genreNames" class="content__group">
      <div class="content__title ganre__title">Genre:</div>
      <ul class="content__list">
        <li v-for="ganre in genreNames" :key="ganre.id" class="content__item content-ganre__item">
          {{ ganre.name }}
        </li>
      </ul>
    </div>

    <div v-if="movie.overview" class="content__group">
      <div class="content__title">Plot:</div>
      <ul class="content__list">
        <li class="content__item">
          <p>{{ movie.overview }}</p>
        </li>
      </ul>
    </div>

    <div v-if="directors.length > 0" class="content__group">
      <div class="content__title">Directors:</div>
      <ul class="content__list">
        <li
          v-for="(director, index) in directors"
          :key="director"
          class="content__item"
        >
          {{ director }}
          <span v-if="index < directors.length - 1">•</span>
        </li>
      </ul>
    </div>

    <div v-if="writers.length > 0" class="content__group">
      <div class="content__title">Writers:</div>
      <ul class="content__list">
        <li
          v-for="(writer, index) in writers"
          :key="writer"
          class="content__item"
        >
          {{ writer }}
          <span v-if="index < writers.length - 1">•</span>
        </li>
      </ul>
    </div>

    <div v-if="topActors.length > 0" class="content__group">
      <div class="content__title">Actors:</div>
      <ul class="content__list">
        <li 
          v-for="(actor, index) in topActors" 
          :key="actor" 
          class="content__item"
        >
          {{ actor }}
          <span v-if="index < topActors.length - 1">•</span>
        </li>
      </ul>
    </div>

    <div v-if="movieFinancials.budget !== undefined && movieFinancials.revenue !== undefined" class="content__group">
      <div class="content__title">Financials:</div>
      <ul class="content__list">
        <li class="content__item">
          Budget: {{ movieFinancials.budget ? `$${movieFinancials.budget.toLocaleString()}` : 'N/A' }}
        </li>
        <li class="content__item">
          Revenue: {{ movieFinancials.revenue ? `$${movieFinancials.revenue.toLocaleString()}` : 'N/A' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .content >*:not(:last-child) {
    margin-bottom: 20px;
  }
  .content__group {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .ganre__title {
    padding-top: 9px;
  }
  .content-ganre__item {
    padding: 10px 14px;
    background-color:  rgba(2, 41, 79, 0.8);
    border-radius: 15px;
  }
  .content__title {
    font-weight: 700;
    font-size: 20px;
    font-family: "Raleway", sans-serif;
    color: var(--color-white);
    min-width: 100px;
  }
  .content__list {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .content__item {
    font-weight: 400;
    font-size: 17px;
    line-height: 130%;
    color: var(--color-white);
  }
  .content__item span {
    margin-left: 8px;
  }

  @media (max-width: 499px) {
    .content__title {
      font-size: 15px;
      min-width: 80px;
    }
    .content__item {
      font-size: 13px;
    }
    .ganre__title {
      padding-top: 9px;
    }
    .content__list {
      gap: 5px;
    }
    .content__item span {
      margin-left: 2px;
    }
  }
</style>
