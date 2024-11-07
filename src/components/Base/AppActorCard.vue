<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppActorCard',

  props: {
    actor: {
      type: Object,
      required: true
    },
  },

  computed: {
    // Извлекаем только три лучших фильма
    topMovies() {
      console.log(this.actor.known_for)
      return this.actor.known_for.slice(0, 3).map(movie => movie.title || movie.name);
    },

    // Функция для получения имени актера
    actorName() {
      return this.actor.name || 'Unknown Actor';
    },

    imageUrl() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      return this.actor.profile_path ? `${baseImageUrl}${this.actor.profile_path}` : '';
    },
  }
});
</script>

<template>
  <router-link :to="{ name: 'ActorDetailView', params: { id: actor.id, title: actor.name } }">
    <div class="actor-card">
      <div class="actor-card__group">
        <div class="actor-card__image">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            :alt="actorName"
          >
          <img v-else src="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" alt="Image not available">
        </div>
        <h3 class="actor-card__name">{{ actorName }}</h3>
      </div>
    </div>
  </router-link>
</template>

<style>
  .actor-card {
    max-width: 130px;
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    gap: 8px;
  }
  .actor-card__image img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 15px;
  }
  .card__no-poster {
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
    max-width: 130px;
    width: 100%;
    min-height: 163px;
    font-weight: 600;
    font-size: 15px;
  }
  .actor-card__name {
    margin-top: 8px;
    font-weight: 600;
    font-size: 15px;
    color: var(--color-white);
  }
  .actor-card__movies {
  }
  .movies__item {
    display: inline-block;
    font-weight: 400;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
  }
</style>
